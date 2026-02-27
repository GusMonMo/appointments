import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventInput } from "@fullcalendar/core"
import {
  TooltipProvider
} from "@/components/ui/tooltip"

interface CalendarProps {
  events: EventInput[]
}

interface TooltipInfo {
  title: string
  start: string
  end: string
  patientName: string
  consultType: string
  x: number
  y: number
}

export function Calendar({ events }: CalendarProps) {
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)

  function formatDateTime(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  return (
    <TooltipProvider> 
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="UTC"
        selectable
        editable
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        locale="pt-br"
        eventDidMount={(info) => {
          info.el.style.color = "#ffffff"
          const titleEl = info.el.querySelector(".fc-event-title") as HTMLElement
          if (titleEl) titleEl.style.color = "#ffffff"
          
          info.el.addEventListener("mouseenter", (e) => {
              const mouse = e as MouseEvent
              const ep = info.event.extendedProps

              setTooltip({
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr,
                patientName: ep.patientName ?? "",
                consultType: ep.consultType ?? "",
                x: mouse.clientX,
                y: mouse.clientY,
              })
            })
          info.el.addEventListener("mousemove", (e) => {
              const mouse = e as MouseEvent
              setTooltip((prev) =>
                prev ? { ...prev, x: mouse.clientX, y: mouse.clientY } : null
              )
          })
          info.el.addEventListener("mouseleave", () => {
              setTooltip(null)
          })

          
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
      />

      {tooltip && (
          <div
            className="w-full flex justify-center items-center pointer-events-none fixed z-50"
            style={{ top: 0, left: 0 }}
          >
            <div className="rounded-md border bg-popover px-[2vw] py-[2vw] text-[1rem] text-popover-foreground shadow-md">
              <p className="font-semibold">{tooltip.consultType}</p>
              <p className="text-muted-foreground">{tooltip.patientName}</p>
              <div className="mt-1 border-t pt-1 text-[1rem] text-muted-foreground">
                <p>🕐 Início: {formatDateTime(tooltip.start)}</p>
                <p>🕑 Fim: &nbsp;&nbsp;&nbsp;{formatDateTime(tooltip.end)}</p>
              </div>
            </div>
          </div>
        )}
    </div>
    </TooltipProvider>
  )
}