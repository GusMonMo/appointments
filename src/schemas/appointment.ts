import { z } from "zod"

// 1. O Zod passa a ser a fonte da verdade. Criamos o enum direto nele:
const consultTypeEnum = z.enum([
  "Consulta Geral",
  "Retorno",
  "Exame",
  "Cirurgia",
  "Urgência",
], { error: "Selecione um tipo de consulta válido." })

// 2. O Zod já tem propriedades nativas para extrair o array e o tipo!
export const CONSULT_TYPES = consultTypeEnum.options // Extrai o array readonly
export type ConsultType = z.infer<typeof consultTypeEnum> // Extrai o Union Type

export const appointmentSchema = z.object({
  patientName: z
    .string()
    .min(3, "Nome deve ter ao menos 3 caracteres.")
    .max(100, "Nome muito longo."),

  // 3. Agora basta usar o schema que criamos acima
  consultType: consultTypeEnum,

  description: z
    .string()
    .min(10, "Descrição deve ter ao menos 10 caracteres.")
    .max(500, "Descrição deve ter no máximo 500 caracteres."),

  date: z
    .date({ error: "Selecione uma data e horário." })
    .refine(
      (d) => {
        const h = d.getHours()
        return h >= 8 && h < 18
      },
      { message: "O agendamento deve ser entre 08:00 e 18:00." }
    ),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>