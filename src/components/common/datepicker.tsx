import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function DateField() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      selected={date}
      onChange={(d : Date | null) => setDate(d)}
      showTimeSelect
      dateFormat="dd/MM/yyyy HH:mm"
    />
  )
}