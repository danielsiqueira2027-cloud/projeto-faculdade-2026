'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  Phone, 
  Calendar, 
  CircleDollarSign, 
  TrendingUp, 
  CheckCircle,
  Loader2,
  AlertTriangle,
  Lock,
  X,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { getChatRoomDetails, sendMessageAction } from '@/app/actions/chat';
import { getCurrentUserAction } from '@/app/actions/auth';
import { updateOrderPriceAction } from '@/app/actions/orders';
import { Button } from '@/components/ui/button';
import AppointmentModal from '@/components/chat/AppointmentModal';

interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  type: 'texto' | 'imagem' | 'sistema';
  content: string;
  createdAt: Date | string;
  isMe: boolean;
}

interface InterlocutorDetails {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}

interface ChatRoomDetails {
  orderId: string;
  serviceType: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';
  agreedPrice: string;
  scheduledAt: string;
  interlocutor: InterlocutorDetails;
  myRole: 'client' | 'professional';
  clientName: string;
  professionalName: string;
}

interface AppointmentData {
  id: string;
  scheduledAt: string;
  status: string;
}

export default function ChatRoomPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();

  const [details, setDetails] = useState<ChatRoomDetails | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  
  const [textInput, setTextInput] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Lightbox Modal para fotos
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // "+" actions menu
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Agendamento
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [suggestedAt, setSuggestedAt] = useState<string | null>(null);
  const [existingAppointment, setExistingAppointment] = useState<AppointmentData | null>(null);

  // Preço
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBRLMask = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) return 'R$ 0,00';
    const numberValue = parseFloat(cleanValue) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue);
  };

  const getNumericPrice = (formattedPrice: string) => {
    const clean = formattedPrice.replace(/[^\d]/g, '');
    return parseFloat(clean) / 100;
  };

  const scrollToBottom = (behavior: 'smooth' | 'instant' = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Fecha o menu de ações ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
        setActionMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Verifica a sessão do usuário
  useEffect(() => {
    async function checkAuth() {
      setUserLoading(true);
      const user = await getCurrentUserAction();
      if (!user) {
        setIsLogged(false);
        router.push(`/login?callbackUrl=/chat/${orderId}`);
        setUserLoading(false);
        return;
      }
      setIsLogged(true);
      setUserLoading(false);
    }
    checkAuth();
  }, [router, orderId]);

  // Carrega os detalhes do chat/pedido
  const loadDetails = async () => {
    try {
      const roomDetails = await getChatRoomDetails(orderId);
      setDetails(roomDetails as any);
    } catch (err: any) {
      console.error('Erro ao carregar detalhes do chat:', err);
      alert(err.message || 'Erro ao carregar a conversa');
      router.push('/chats');
    }
  };

  // Carrega as mensagens e dados de agendamento
  const loadMessages = async (isInitial = false) => {
    try {
      const res = await fetch(`/api/chat/${orderId}/messages`);
      if (!res.ok) throw new Error('Falha ao consultar mensagens');
      const data = await res.json();
      
      setMessages(data.messages);
      
      // Atualiza o status do pedido se mudou na polling
      if (details && details.status !== data.orderStatus) {
        setDetails(prev => prev ? { ...prev, status: data.orderStatus } : null);
      }

      // Atualiza dados de agendamento vindos da API
      if (data.suggestedAt !== undefined) setSuggestedAt(data.suggestedAt);
      if (data.appointment !== undefined) setExistingAppointment(data.appointment);

      if (isInitial) {
        setTimeout(() => scrollToBottom('instant'), 100);
      }
    } catch (err) {
      console.error('Erro no short-polling do chat:', err);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      loadDetails();
      loadMessages(true);
    }
  }, [isLogged, orderId]);

  // Subscrever ao SSE em tempo real
  useEffect(() => {
    if (!isLogged) return;

    const eventSource = new EventSource('/api/sse');

    eventSource.addEventListener('message', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data.orderId === orderId) {
          setMessages(prev => {
            if (!data.message || !data.message.id) return prev;
            if (prev.some(m => m.id === data.message.id)) return prev;
            return [...prev, data.message];
          });
          setTimeout(() => scrollToBottom('smooth'), 50);
        }
      } catch (err) {
        console.error('Erro ao processar mensagem via SSE:', err);
      }
    });

    eventSource.addEventListener('order', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data.orderId === orderId) {
          loadDetails();
          loadMessages();
        }
      } catch (err) {
        console.error('Erro ao processar atualização de pedido via SSE:', err);
      }
    });

    eventSource.addEventListener('appointment', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data.orderId === orderId) {
          loadMessages();
        }
      } catch (err) {
        console.error('Erro ao processar agendamento via SSE:', err);
      }
    });

    return () => {
      eventSource.close();
    };
  }, [isLogged, orderId]);

  // Auto-scroll sempre que novas mensagens chegarem
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom('smooth');
    }
  }, [messages.length]);

  // Trata envio de texto
  const handleSendText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || sending) return;

    const content = textInput.trim();
    setTextInput('');
    setSending(true);

    try {
      const newMsg = await sendMessageAction(orderId, 'texto', content);
      setMessages(prev => {
        if (prev.some(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg as any];
      });
      setTimeout(() => scrollToBottom('smooth'), 50);
    } catch (err: any) {
      alert(err.message || 'Erro ao enviar mensagem');
      setTextInput(content);
    } finally {
      setSending(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  // Trata envio de imagem
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || uploading) return;

    setUploading(true);
    setActionMenuOpen(false);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('orderId', orderId);

    try {
      const uploadRes = await fetch('/api/chat/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const errData = await uploadRes.json();
        throw new Error(errData.error || 'Erro ao carregar arquivo no servidor');
      }

      const uploadData = await uploadRes.json();
      const newMsg = await sendMessageAction(orderId, 'imagem', uploadData.url);
      setMessages(prev => {
        if (prev.some(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg as any];
      });
      setTimeout(() => scrollToBottom('smooth'), 50);
    } catch (err: any) {
      alert(err.message || 'Falha ao processar imagem');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const formatMsgTime = (dateInput: Date | string) => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex flex-col items-center justify-center font-sans">
        <Loader2 className="animate-spin text-[#103569] mb-4" size={40} />
        <p className="text-[#103569] font-bold">Verificando credenciais...</p>
      </div>
    );
  }

  if (!isLogged) return null;

  if (loading || !details) {
    return (
      <div className="min-h-screen bg-[#fefccf]/20 flex flex-col items-center justify-center font-sans">
        <Loader2 className="animate-spin text-[#103569] mb-4" size={40} />
        <p className="text-[#103569] font-bold">Carregando sala de chat segura...</p>
      </div>
    );
  }

  const isCompleted = details.status === 'CONCLUIDO';
  const isProfessional = details.myRole === 'professional';

  return (
    <div className="min-h-screen bg-[#fefccf]/10 flex flex-col font-sans relative">
      
      {/* Appointment Modal */}
      {appointmentModalOpen && (
        <AppointmentModal
          orderId={orderId}
          serviceType={details.serviceType}
          clientName={details.clientName}
          suggestedAt={suggestedAt}
          existingAppointment={existingAppointment}
          onClose={() => setAppointmentModalOpen(false)}
          onSuccess={() => loadMessages(true)}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/95 z-[150] flex items-center justify-center animate-in fade-in duration-300">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all border-none cursor-pointer"
          >
            <X size={24} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Visualização aproximada" 
            className="max-w-[90%] max-h-[85%] object-contain rounded-xl shadow-2xl border border-white/10 animate-in zoom-in duration-200"
          />
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-[#103569] text-white shadow-xl shrink-0">
        <div className="max-w-[1000px] mx-auto p-4 md:py-5 md:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Back & Interlocutor Info */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (details.myRole === 'professional') {
                  router.push('/dashboard/profissional/pedidos');
                } else {
                  router.push('/chats');
                }
              }}
              className="text-white hover:text-[#f7941d] transition-colors bg-transparent border-none cursor-pointer p-1.5 rounded-xl hover:bg-white/10 shrink-0"
              title="Voltar"
            >
              <ArrowLeft size={22} />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#f7941d] text-white font-black text-md flex items-center justify-center shadow-lg border border-white/20 shrink-0 uppercase">
              {details.interlocutor.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-md leading-tight">{details.interlocutor.name}</h3>
                <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md leading-none text-white/90">
                  {details.interlocutor.role}
                </span>
              </div>
              <p className="text-xs text-white/70 font-semibold leading-normal mt-0.5">
                Pedido: <span className="font-bold text-[#fddfa2]">{details.serviceType}</span> (#{details.orderId.substring(0, 8)})
              </p>
            </div>
          </div>

          {/* Quick Order Info Tags */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
            {details.status === 'EM_ANDAMENTO' ? (
              <span className="flex items-center gap-1 text-[10px] font-black text-blue-200 bg-blue-900/40 px-3 py-1.5 rounded-xl border border-blue-700/50 uppercase tracking-widest shrink-0">
                <TrendingUp size={10} /> Em Andamento
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black text-green-200 bg-green-900/40 px-3 py-1.5 rounded-xl border border-green-700/50 uppercase tracking-widest shrink-0">
                <CheckCircle size={10} /> Concluído
              </span>
            )}

            {/* Agendamento badge — se existir appointment confirmado */}
            {existingAppointment && (
              <button
                onClick={() => isProfessional && setAppointmentModalOpen(true)}
                className={`flex items-center gap-1 text-[10px] font-black text-[#fddfa2] bg-[#f7941d]/20 px-3 py-1.5 rounded-xl border border-[#f7941d]/30 tracking-wide shrink-0 ${isProfessional ? 'cursor-pointer hover:bg-[#f7941d]/30 transition-colors border-none' : 'cursor-default'}`}
                title={isProfessional ? 'Reagendar' : 'Horário agendado'}
              >
                <Calendar size={11} />
                {new Date(existingAppointment.scheduledAt).toLocaleString('pt-BR', {
                  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                })}
              </button>
            )}

            <span className="flex items-center gap-1 text-[10px] font-black text-[#fddfa2] bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 tracking-wide shrink-0">
              <CircleDollarSign size={11} /> {details.agreedPrice}
            </span>

            <a 
              href={`tel:${details.interlocutor.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1 text-[10px] font-black text-white hover:text-[#f7941d] bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/10 no-underline transition-colors shrink-0 uppercase tracking-wider ml-auto sm:ml-0"
              title="Ligar"
            >
              <Phone size={10} /> Ligar
            </a>
          </div>
        </div>
      </div>

      {/* Message Body Container */}
      <div className="grow max-w-[1000px] w-full mx-auto p-4 md:p-6 space-y-4 flex flex-col">
        {messages.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto text-center border border-slate-100 shadow-sm space-y-4 my-auto">
            <div className="w-16 h-16 bg-[#103569]/5 rounded-full flex items-center justify-center text-[#103569] mx-auto border border-[#103569]/10">
              <MessageSquare size={28} />
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-[#103569] text-md">Inicie a conversa!</h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Este é o canal seguro de comunicação do ClickServiço. Combine datas, detalhes, valores e envie imagens locais com facilidade.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            // ── Mensagem de sistema ──────────────────────────────────────
            if (msg.type === 'sistema') {
              return (
                <div key={msg.id} className="flex items-center justify-center gap-3 my-2 animate-in fade-in duration-300">
                  <div className="h-px bg-slate-100 flex-1" />
                  <div className="flex items-center gap-2 bg-[#103569]/5 text-[#103569] text-xs font-black px-4 py-2 rounded-full border border-[#103569]/10 whitespace-nowrap">
                    <Calendar size={12} className="text-[#f7941d]" />
                    {msg.content}
                  </div>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>
              );
            }

            // ── Mensagem normal ──────────────────────────────────────────
            return (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[75%] sm:max-w-[60%] ${msg.isMe ? 'self-end items-end' : 'self-start items-start'} space-y-1 animate-in fade-in duration-300`}
              >
                {!msg.isMe && (
                  <span className="text-[10px] font-black text-slate-400 ml-2">
                    {msg.senderName.split(' ')[0]}
                  </span>
                )}
                <div 
                  className={`p-3.5 md:p-4 rounded-3xl shadow-sm border ${
                    msg.isMe 
                      ? 'bg-[#103569] text-white border-[#103569]/5 rounded-tr-none' 
                      : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.type === 'imagem' ? (
                    <div className="relative group cursor-zoom-in">
                      <img 
                        src={msg.content} 
                        alt="Imagem enviada no chat" 
                        onClick={() => setLightboxImage(msg.content)}
                        className="rounded-2xl max-w-full max-h-[300px] object-cover transition-opacity duration-200 hover:opacity-90 shadow-inner"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap select-text">
                      {msg.content}
                    </p>
                  )}
                </div>
                <span className={`text-[9px] font-bold text-slate-400 ${msg.isMe ? 'mr-2' : 'ml-2'}`}>
                  {formatMsgTime(msg.createdAt)}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Action footer input bar */}
      <div className="sticky bottom-0 z-30 bg-[#fefccf]/10 backdrop-blur-md border-t border-slate-200/40 shrink-0 px-4 pt-2 pb-3">
        <div className="max-w-[800px] mx-auto">
          {isCompleted ? (
            <div className="bg-[#103569] text-white p-4 rounded-2xl shadow-lg border border-[#f7941d]/10 flex items-center justify-center gap-3 text-center animate-in fade-in zoom-in duration-300">
              <Lock className="text-[#f7941d] shrink-0" size={18} />
              <p className="text-xs font-black uppercase tracking-wider">
                Este serviço foi concluído. O histórico de mensagens está disponível para consulta.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendText} className="flex items-center gap-2 bg-white rounded-2xl shadow-lg border border-slate-100 p-2">
              
              {/* Hidden file input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                disabled={sending || uploading}
              />

              {/* "+" Button with expandable action menu */}
              <div className="relative shrink-0" ref={actionMenuRef}>
                <button
                  type="button"
                  onClick={() => setActionMenuOpen(prev => !prev)}
                  disabled={sending || uploading}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all border-none cursor-pointer shrink-0 ${
                    actionMenuOpen
                      ? 'bg-[#103569] text-white rotate-45'
                      : 'text-slate-400 hover:text-[#103569] hover:bg-slate-50 bg-transparent'
                  } disabled:opacity-50`}
                  title="Mais ações"
                >
                  {uploading ? (
                    <Loader2 className="animate-spin text-[#f7941d]" size={20} />
                  ) : (
                    <Plus size={20} className="transition-transform duration-200" />
                  )}
                </button>

                {/* Expandable menu */}
                {actionMenuOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in slide-in-from-bottom-2 duration-150">
                    {/* Enviar Foto */}
                    <button
                      type="button"
                      onClick={() => {
                        setActionMenuOpen(false);
                        fileInputRef.current?.click();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#103569] hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer text-left"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <ImageIcon size={16} />
                      </div>
                      Enviar Foto
                    </button>

                    {/* Definir Agendamento — apenas para profissional */}
                    {isProfessional && (
                      <button
                        type="button"
                        onClick={() => {
                          setActionMenuOpen(false);
                          setAppointmentModalOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#103569] hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-[#f7941d]">
                          <Calendar size={16} />
                        </div>
                        <span>
                          {existingAppointment ? 'Reagendar Serviço' : 'Definir Data e Horário'}
                        </span>
                      </button>
                    )}

                    {/* Definir Preço — apenas para profissional */}
                    {isProfessional && (
                      <button
                        type="button"
                        onClick={() => {
                          setActionMenuOpen(false);
                          setPriceModalOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#103569] hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                          <CircleDollarSign size={16} />
                        </div>
                        <span>Definir Preço</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Text Input area */}
              <input 
                ref={inputRef}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={uploading ? 'Aguarde o upload da imagem...' : 'Digite sua mensagem...'}
                disabled={sending || uploading}
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-sm px-2 focus:ring-0"
              />

              {/* Send Button */}
              <Button
                type="submit"
                disabled={!textInput.trim() || sending || uploading}
                className="bg-[#103569] hover:bg-[#103569]/90 text-white rounded-xl w-10 h-10 flex items-center justify-center p-0 shrink-0 shadow-md transition-all active:scale-95 border-none cursor-pointer disabled:opacity-50 disabled:scale-100"
                title="Enviar"
              >
                {sending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Send size={16} />
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Modal de Definir Preço */}
      {priceModalOpen && (
        <div className="fixed inset-0 bg-[#103569]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-100 max-w-md w-full space-y-6 animate-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <CircleDollarSign size={20} />
                </div>
                <h3 className="text-xl font-black text-[#103569]">Definir Preço</h3>
              </div>
              <button 
                onClick={() => setPriceModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-1"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-slate-500 font-bold text-sm leading-relaxed">
              Defina ou reajuste o valor total acordado para a realização deste serviço. A alteração será enviada imediatamente ao cliente.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#103569] uppercase tracking-widest ml-1">Valor do Serviço</label>
              <input
                type="text"
                value={priceInput}
                onChange={(e) => setPriceInput(formatBRLMask(e.target.value))}
                placeholder="R$ 0,00"
                className="w-full bg-[#fefccf]/30 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#103569]/10 outline-none transition-all font-black text-2xl text-[#103569] placeholder:text-[#103569]/20"
              />
              <p className="text-[10px] text-slate-400 font-bold mt-1 ml-1 uppercase tracking-wider">
                Exemplos: R$ 150,00 / R$ 350,50 / R$ 1.200,00
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={() => setPriceModalOpen(false)}
                variant="outline" 
                className="flex-1 h-12 rounded-xl font-bold border-slate-200 text-slate-500"
              >
                Cancelar
              </Button>
              <Button 
                onClick={async () => {
                  const numericValue = getNumericPrice(priceInput);
                  if (isNaN(numericValue) || numericValue <= 0) {
                    alert('Por favor, digite um valor válido maior que R$ 0,00');
                    return;
                  }
                  
                  const res = await updateOrderPriceAction(orderId, numericValue);
                  if (res.error) {
                    alert(res.error);
                  } else {
                    setPriceModalOpen(false);
                    // Atualizar detalhes locais
                    loadDetails();
                  }
                }}
                className="flex-1 h-12 rounded-xl font-black bg-green-600 hover:bg-green-700 text-white shadow-md border-none cursor-pointer"
              >
                Confirmar Preço
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
