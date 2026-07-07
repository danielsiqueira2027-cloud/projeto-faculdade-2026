'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Loader2,
  CalendarX,
} from 'lucide-react';
import { getProfessionalAppointments } from '@/app/actions/appointments';

const MONTHS_PT = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];
const WEEKDAYS_PT = ['D','S','T','Q','Q','S','S'];

interface AppointmentItem {
  id: string;
  orderId: string;
  clientName: string;
  clientPhone: string;
  clientAvatar: string | null;
  serviceName: string;
  scheduledAt: Date | string;
  status: string;
  address: string;
  notes: string;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AgendaProfissionalPage() {
  const router = useRouter();
  const today = new Date();

  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProfessionalAppointments();
      setAppointments(data as any[]);
      setLoading(false);
    }
    load();
  }, []);

  // Navega meses
  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  // Dias que têm agendamento neste mês/ano
  const appointmentDays = new Set(
    appointments
      .filter(a => {
        const d = new Date(a.scheduledAt);
        return d.getFullYear() === calYear && d.getMonth() === calMonth;
      })
      .map(a => new Date(a.scheduledAt).getDate())
  );

  // Agendamentos para o dia selecionado
  const selectedDay = (() => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    return { year: y, month: m, day: d };
  })();

  const appointmentsForSelected = appointments.filter(a => {
    const d = new Date(a.scheduledAt);
    return (
      d.getFullYear() === selectedDay.year &&
      d.getMonth()    === selectedDay.month &&
      d.getDate()     === selectedDay.day
    );
  }).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  // Agendamentos de hoje
  const todayAppointments = appointments.filter(a => {
    const d = new Date(a.scheduledAt);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth()    === today.getMonth() &&
      d.getDate()     === today.getDate()
    );
  }).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  // Próximos agendamentos (futuro, exceto hoje)
  const upcomingAppointments = appointments.filter(a => {
    const d = new Date(a.scheduledAt);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return d >= todayStart;
  }).slice(0, 5);

  // Calendar grid
  const totalDays   = daysInMonth(calYear, calMonth);
  const startOffset = firstDayOfMonth(calYear, calMonth);
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  function AppointmentCard({ a }: { a: AppointmentItem }) {
    const dt = new Date(a.scheduledAt);
    const timeStr = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="flex gap-6 relative z-10">
        {/* Time column */}
        <div className="w-16 pt-3 text-right shrink-0">
          <span className="text-lg font-black text-[#103569]">
            {timeStr.split(':')[0]}:{timeStr.split(':')[1]}
          </span>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {dt.getHours() < 12 ? 'AM' : 'PM'}
          </p>
        </div>
        {/* Dot */}
        <div className="absolute left-16 top-5 w-4 h-4 bg-[#f7941d] rounded-full border-4 border-white shadow-sm -translate-x-1/2" />
        {/* Card */}
        <Card className="flex-1 border-none shadow-xl shadow-blue-900/5 rounded-[2rem] hover:shadow-blue-900/10 transition-all group">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#103569] text-[10px] font-black uppercase tracking-widest">
                  {a.serviceName}
                </span>
                <span className="text-[10px] font-black text-slate-300">
                  #{a.orderId.substring(0, 8)}
                </span>
              </div>
              <h4 className="text-xl font-black text-[#103569] group-hover:text-[#f7941d] transition-colors">
                {a.clientName}
              </h4>
              {a.address && (
                <p className="text-sm text-slate-500 font-bold flex items-center gap-2">
                  <MapPin size={14} className="text-slate-300 shrink-0" />
                  {a.address}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              {a.clientPhone && (
                <a
                  href={`tel:${a.clientPhone.replace(/\D/g,'')}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#103569] border border-slate-100 hover:bg-slate-50 transition-all no-underline"
                >
                  <Phone size={14} /> Ligar
                </a>
              )}
              <button
                onClick={() => router.push(`/chat/${a.orderId}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#103569] text-white hover:bg-[#103569]/90 transition-all border-none cursor-pointer shadow-md"
              >
                <MessageSquare size={14} /> Chat
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayAppointments = (() => {
    const selKey = `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`;
    if (selKey === todayKey) return todayAppointments;
    return appointmentsForSelected;
  })();

  const displayTitle = (() => {
    const selKey = `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`;
    if (selKey === todayKey) return 'Compromissos de Hoje';
    return `Compromissos em ${String(selectedDay.day).padStart(2,'0')}/${String(selectedDay.month+1).padStart(2,'0')}/${selectedDay.year}`;
  })();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#103569] tracking-tighter uppercase">Minha Agenda</h2>
          <p className="text-slate-500 font-bold">Gerencie seus compromissos e visitas técnicas.</p>
        </div>
        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-3 text-center">
            <p className="text-2xl font-black text-[#103569]">{todayAppointments.length}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoje</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-3 text-center">
            <p className="text-2xl font-black text-[#f7941d]">{appointments.length}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-16 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-[#103569]" size={40} />
          <p className="text-[#103569] font-bold">Carregando agendamentos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Calendar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-none shadow-2xl shadow-blue-900/5 rounded-[2rem] bg-white overflow-hidden">
              <CardContent className="p-5">
                {/* Month nav */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-[#103569]"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-black uppercase tracking-widest text-[#103569]">
                    {MONTHS_PT[calMonth]} {calYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-[#103569]"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Weekday labels */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {WEEKDAYS_PT.map((d, i) => (
                    <div key={`wd-${i}`} className="text-center text-[9px] font-black text-[#103569]/30 pb-1">{d}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-0.5">
                  {cells.map((day, idx) => {
                    if (!day) return <div key={`e-${idx}`} />;

                    const cellKey = `${calYear}-${calMonth}-${day}`;
                    const isToday = cellKey === todayKey;
                    const isSelected = cellKey === selectedDate;
                    const hasEvent = appointmentDays.has(day);
                    const isPast = new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(cellKey)}
                        className={`
                          h-8 w-full flex flex-col items-center justify-center rounded-xl text-xs font-bold transition-all border-none cursor-pointer relative
                          ${isSelected ? 'bg-[#f7941d] text-white shadow-md' : ''}
                          ${isToday && !isSelected ? 'ring-2 ring-[#f7941d] text-[#f7941d]' : ''}
                          ${!isSelected && !isToday ? (isPast ? 'text-slate-300' : 'text-[#103569] hover:bg-[#103569]/5') : ''}
                        `}
                      >
                        {day}
                        {hasEvent && !isSelected && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#f7941d]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            {upcomingAppointments.length > 0 && (
              <Card className="border-none shadow-lg rounded-[2rem] bg-white overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#103569]/40">Próximos</p>
                  {upcomingAppointments.map(a => {
                    const d = new Date(a.scheduledAt);
                    return (
                      <div
                        key={a.id}
                        onClick={() => setSelectedDate(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#f7941d]/10 text-[#f7941d] flex items-center justify-center text-xs font-black shrink-0">
                          {d.getDate()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-[#103569] truncate">{a.clientName}</p>
                          <p className="text-[10px] text-slate-400 font-bold">
                            {d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · {a.serviceName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Schedule List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f7941d]/10 rounded-lg text-[#f7941d]">
                <Clock size={20} />
              </div>
              <h3 className="text-xl font-black text-[#103569] uppercase tracking-tight">
                {displayTitle}
              </h3>
            </div>

            {displayAppointments.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto border border-slate-100">
                  <CalendarX size={28} />
                </div>
                <div>
                  <h4 className="font-black text-[#103569]">Nenhum compromisso</h4>
                  <p className="text-sm text-slate-400 font-semibold mt-1">
                    Agendamentos aparecem aqui após serem definidos no chat com o cliente.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:left-16 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
                {displayAppointments.map(a => (
                  <AppointmentCard key={a.id} a={a} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
