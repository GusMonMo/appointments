import type { EventInput } from "@fullcalendar/core"

// Datas relativas a hoje para sempre aparecerem no calendário atual
const today = new Date()
const y = today.getFullYear()
const m = String(today.getMonth() + 1).padStart(2, "0")

export const MOCK_EVENTS: EventInput[] = [
  {
    id: "mock-1",
    title: "Consulta Geral — Ana Lima",
    start: `${y}-${m}-03T08:00:00`,
    end: `${y}-${m}-03T09:00:00`,
    extendedProps: {
      patientName: "Ana Lima",
      consultType: "Consulta Geral",
      description: "Paciente com queixas de dor de cabeça frequente e tontura.",
    },
  },
  {
    id: "mock-2",
    title: "Retorno — Carlos Souza",
    start: `${y}-${m}-05T10:00:00`,
    end: `${y}-${m}-05T11:00:00`,
    extendedProps: {
      patientName: "Carlos Souza",
      consultType: "Retorno",
      description: "Retorno pós-cirúrgico para avaliação de cicatrização.",
    },
  },
  {
    id: "mock-3",
    title: "Exame — Beatriz Mendes",
    start: `${y}-${m}-10T14:00:00`,
    end: `${y}-${m}-10T15:00:00`,
    extendedProps: {
      patientName: "Beatriz Mendes",
      consultType: "Exame",
      description: "Exame de rotina anual. Paciente assintomática.",
    },
  },
  {
    id: "mock-4",
    title: "Urgência — Rafael Torres",
    start: `${y}-${m}-12T09:00:00`,
    end: `${y}-${m}-12T10:00:00`,
    extendedProps: {
      patientName: "Rafael Torres",
      consultType: "Urgência",
      description: "Dor abdominal aguda. Encaminhado da UPA para avaliação.",
    },
  },
  {
    id: "mock-5",
    title: "Cirurgia — Márcia Oliveira",
    start: `${y}-${m}-18T16:00:00`,
    end: `${y}-${m}-18T17:00:00`,
    extendedProps: {
      patientName: "Márcia Oliveira",
      consultType: "Cirurgia",
      description: "Procedimento de retirada de lipoma. Pré-operatório confirmado.",
    },
  },
]