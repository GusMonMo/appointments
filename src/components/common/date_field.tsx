import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ptBR } from "date-fns/locale"

interface DateFieldProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  label?: string
  placeholder?: string
}

export function DateField({ selected, onChange, label, placeholder }: DateFieldProps) {
  return (
    <div className="date-field">
      {label && <label className="date-field__label">{label}</label>}
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText={placeholder ?? "Selecione uma data e hora"}
        locale={ptBR}
        timeCaption="Hora"
        className="date-field__input"
        wrapperClassName="date-field__wrapper"
      />
    </div>
  )
}