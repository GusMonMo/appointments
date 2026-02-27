import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarPlus, User, Stethoscope, FileText, Clock } from "lucide-react"
import type { EventInput } from "@fullcalendar/core"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import dayjs from "@/lib/dayjs"

import {
  appointmentSchema,
  CONSULT_TYPES,
  type AppointmentFormData,
} from "@/schemas/appointment"

interface AppointmentFormProps {
  events: EventInput[]
  onAddEvent: (event: EventInput) => void
}

function hasConflict(date: Date, events: EventInput[]): boolean {
  const desired = dayjs(date)
  return events.some((ev) => {
    if (!ev.start) return false
    const evStart = dayjs(ev.start as string)
    const evEnd = evStart.add(1, "hour")
    return desired.isSameOrAfter(evStart) && desired.isBefore(evEnd)
  })
}

export function AppointmentForm({ events, onAddEvent }: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  function onSubmit(data: AppointmentFormData) {
    if (hasConflict(data.date, events)) {
      setError("date", {
        message: "Já existe uma consulta nesse horário. Escolha outro.",
      })
      return
    }

    const start = dayjs(data.date).toISOString()
    const end = dayjs(data.date).add(1, "hour").toISOString()

    onAddEvent({
      id: crypto.randomUUID(),
      title: `${data.consultType} — ${data.patientName}`,
      start,
      end,
      extendedProps: {
        patientName: data.patientName,
        consultType: data.consultType,
        description: data.description,
      },
    })

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] h-full flex flex-col gap-[1rem] py-[1vw]"
      noValidate
    >
      <div className="flex justify-center items-center gap-[1rem]">
        <CalendarPlus size={20} className="appointment-form__header-icon" />
        <h2 className="appointment-form__title">Novo Agendamento</h2>
      </div>

      <div className="appointment-form__fields">
        
        <div className="appointment-form__field">
          <label className="appointment-form__label">
            <User size={14} />
            Paciente
          </label>

          <input
            {...register("patientName")}
            type="text"
            placeholder="Nome completo do paciente"
            className={`appointment-form__input ${errors.patientName ? "appointment-form__input--error" : ""}`}
          />
          {errors.patientName && (
            <span className="appointment-form__field-error">
              {errors.patientName.message}
            </span>
          )}
        </div>

        <div className="appointment-form__field">
          <label className="appointment-form__label">
            <Stethoscope size={14} />
            Tipo de Consulta
          </label>
          <select
            {...register("consultType")}
            className={`appointment-form__input appointment-form__select ${errors.consultType ? "appointment-form__input--error" : ""}`}
          >
            <option value="">Selecione...</option>
            {CONSULT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.consultType && (
            <span className="appointment-form__field-error">
              {errors.consultType.message}
            </span>
          )}
        </div>

        <div className="appointment-form__field">
          <label className="appointment-form__label">
            <Clock size={14} />
            Data e Horário
            <span className="appointment-form__label-hint">(08:00 – 18:00)</span>
          </label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ?? null}
                onChange={field.onChange}
                showTimeSelect
                timeIntervals={60}
                minTime={new Date(new Date().setHours(8, 0, 0, 0))}
                maxTime={new Date(new Date().setHours(17, 0, 0, 0))}
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecione data e hora"
                className={`appointment-form__input ${errors.date ? "appointment-form__input--error" : ""}`}
                wrapperClassName="appointment-form__datepicker-wrapper"
                timeCaption="Hora"
              />
            )}
          />
          {errors.date && (
            <span className="appointment-form__field-error">
              {errors.date.message}
            </span>
          )}
        </div>

        <div className="appointment-form__field">
          <label className="appointment-form__label">
            <FileText size={14} />
            Descrição
          </label>
          <textarea
            {...register("description")}
            placeholder="Descreva o motivo da consulta, sintomas, observações..."
            rows={3}
            className={`appointment-form__input appointment-form__textarea ${errors.description ? "appointment-form__input--error" : ""}`}
            style={{resize: 'none'}}
          />
          {errors.description && (
            <span className="appointment-form__field-error">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>

      {isSubmitSuccessful && !Object.keys(errors).length && (
        <p className="appointment-form__success">
          ✓ Agendamento registrado com sucesso!
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="appointment-form__submit"
      >
        Agendar Consulta
      </button>
    </form>
  )
}