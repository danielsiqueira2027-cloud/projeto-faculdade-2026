'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { createOrUpdateAppointment } from '@/app/actions/appointments';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ExistingAppointment {
  id: string;
  scheduledAt: string | Date;
  status: string;
}

interface AppointmentModalProps {
  orderId: string;
  serviceType: string;
  clientName: string;
  /** Data sugerida pelo cliente no formulário de orçamento */
  suggestedAt: string | Date | null;
  /** Agendamento já confirmado (para reagendamento) */
  existingAppointment: ExistingAppointment | null;
  onClose: () => void;
  /** Chamado após sucesso para atualizar o chat */
  onSuccess: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS_PT = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];
const WEEKDAYS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

/** Gera lista de horários de 06:00 a 22:00 em passos de 30 min */
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 6; h <= 22; h++) {
    slots.push(`${String(h).padStart(2,'0')}:00`);
    if (h < 22) slots.push(`${String(h).padStart(2,'0')}:30`);
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AppointmentModal({
  orderId,
  serviceType,
  clientName,
  suggestedAt,
  existingAppointment,
  onClose,
  onSuccess,
}: AppointmentModalProps) {
  const isReschedule = !!existingAppointment;

  // ── Inicializa a data ────────────────────────────────────────────────────
  const getInitialDate = (): Date => {
    // Prioridade: agendamento existente > data sugerida pelo cliente > hoje
    const source = existingAppointment?.scheduledAt ?? suggestedAt ?? null;
    if (source) {
      const d = new Date(source);
      if (!isNaN(d.getTime()) && d > new Date()) return d;
    }
    return new Date();
  };

  const initialDate = getInitialDate();
  const [calYear,  setCalYear]  = useState(initialDate.getFullYear());
  const [calMonth, setCalMonth] = useState(initialDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(initialDate.getDate());
  const [selectedTime, setSelectedTime] = useState<string>('06:00');

  // Se agendamento existente, pré-preenche o horário
  useEffect(() => {
    if (existingAppointment?.scheduledAt) {
      const d = new Date(existingAppointment.scheduledAt);
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = d.getMinutes() >= 30 ? '30' : '00';
      setSelectedTime(`${hh}:${mm}`);
    }
  }, [existingAppointment]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflictAt, setConflictAt] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const today = new Date();
  const todayKey = toDateKey(today);

  // ── Computed: selected date is in the past? ──────────────────────────────
  const selectedDate = new Date(calYear, calMonth, selectedDay);
  const isPast = selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // ── Navigate months ──────────────────────────────────────────────────────
  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelectedDay(1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelectedDay(1);
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (isPast) { setError('Selecione uma data que não seja no passado.'); return; }

    const [hh, mm] = selectedTime.split(':').map(Number);
    const scheduledAt = new Date(calYear, calMonth, selectedDay, hh, mm, 0);

    if (scheduledAt < new Date()) {
      setError('A data e horário selecionados já passaram.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setConflictAt(null);

    const result = await createOrUpdateAppointment({
      orderId,
      scheduledAt: scheduledAt.toISOString(),
    });

    setSubmitting(false);

    if (result.error && result.conflict) {
      setConflictAt(result.conflict.existingAt);
      return;
    }
    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1200);
  };

  // ── Calendar grid ────────────────────────────────────────────────────────
  const totalDays   = daysInMonth(calYear, calMonth);
  const startOffset = firstDayOfMonth(calYear, calMonth);
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full sm:max-w-[520px] bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in duration-300 max-h-[95dvh] flex flex-col">

        {/* Header */}
        <div className="bg-[#103569] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#f7941d]" />
              <h3 className="font-black text-base">
                {isReschedule ? 'Reagendar Serviço' : 'Definir Data e Horário'}
              </h3>
            </div>
            <p className="text-xs text-white/60 font-semibold mt-0.5">
              {serviceType} · {clientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border-none cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Success state */}
          {success && (
            <div className="flex flex-col items-center justify-center py-8 gap-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
              <p className="font-black text-[#103569] text-center">
                {isReschedule ? 'Reagendamento confirmado!' : 'Agendamento confirmado!'}
              </p>
              <p className="text-sm text-slate-400 font-semibold">Atualizando o chat...</p>
            </div>
          )}

          {!success && (
            <>
              {/* Calendar */}
              <div>
                <p className="text-xs font-black text-[#103569]/50 uppercase tracking-widest mb-3">Selecione a Data</p>

                {/* Month nav */}
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-[#103569]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="font-black text-[#103569] text-sm">
                    {MONTHS_PT[calMonth]} {calYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-[#103569]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Weekday labels */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {WEEKDAYS_PT.map(d => (
                    <div key={d} className="text-center text-[10px] font-black text-[#103569]/30 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, idx) => {
                    if (!day) return <div key={`e-${idx}`} />;

                    const cellDate = new Date(calYear, calMonth, day);
                    const cellKey  = toDateKey(cellDate);
                    const isPastDay = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSelected = day === selectedDay && calMonth === calMonth;
                    const isToday = cellKey === todayKey;

                    return (
                      <button
                        key={day}
                        onClick={() => !isPastDay && setSelectedDay(day)}
                        disabled={isPastDay}
                        className={`
                          h-9 w-full rounded-xl text-sm font-bold transition-all border-none cursor-pointer
                          ${isPastDay ? 'text-slate-200 cursor-not-allowed' : 'hover:bg-[#103569]/5'}
                          ${isSelected ? 'bg-[#103569] text-white shadow-md hover:bg-[#103569]' : ''}
                          ${isToday && !isSelected ? 'ring-2 ring-[#f7941d] text-[#f7941d]' : ''}
                          ${!isSelected && !isPastDay ? 'text-[#103569]' : ''}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time selector */}
              <div>
                <p className="text-xs font-black text-[#103569]/50 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Clock size={12} /> Selecione o Horário
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        py-2 rounded-xl text-xs font-black transition-all border cursor-pointer
                        ${selectedTime === slot
                          ? 'bg-[#f7941d] text-white border-[#f7941d] shadow-md'
                          : 'bg-white text-[#103569] border-slate-100 hover:border-[#f7941d]/40 hover:bg-[#f7941d]/5'
                        }
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary pill */}
              {!isPast && (
                <div className="bg-[#103569]/5 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#103569] rounded-xl flex items-center justify-center text-white shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#103569]/40 uppercase tracking-widest">Agendamento selecionado</p>
                    <p className="font-black text-[#103569] text-sm">
                      {String(selectedDay).padStart(2,'0')}/{String(calMonth+1).padStart(2,'0')}/{calYear} às {selectedTime}
                    </p>
                  </div>
                </div>
              )}

              {/* Conflict warning */}
              {conflictAt && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in duration-200">
                  <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-amber-800 text-sm">Conflito de agenda</p>
                    <p className="text-xs text-amber-700 font-semibold mt-1">
                      Você já tem um serviço agendado para <strong>{conflictAt}</strong>. Escolha outro horário.
                    </p>
                  </div>
                </div>
              )}

              {/* Generic error */}
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in duration-200">
                  <AlertTriangle size={16} className="text-red-500 shrink-0" />
                  <p className="text-sm font-bold text-red-700">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="px-6 pb-6 pt-2 shrink-0 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-500 border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer bg-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || isPast}
              className="flex-1 py-3 rounded-xl font-black text-sm text-white bg-[#103569] hover:bg-[#103569]/90 disabled:opacity-50 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {submitting ? (
                <><Loader2 size={16} className="animate-spin" /> Salvando...</>
              ) : (
                <><Check size={16} /> {isReschedule ? 'Confirmar Reagendamento' : 'Confirmar Agendamento'}</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
