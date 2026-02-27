import { useState } from "react"
import type { EventInput } from "@fullcalendar/core"
import { Calendar } from "@/components/common/calendar"
import { AppointmentForm } from "@/components/common/appointment_form"
import { MOCK_EVENTS } from "@/mock/mock_events"
import { 
  Dialog, 
  DialogTrigger, 
  DialogPortal, 
  DialogOverlay,
  DialogContent
} from "./components/ui/dialog"
export default function App() {
  const [events, setEvents] = useState<EventInput[]>(MOCK_EVENTS)

  function handleAddEvent(event: EventInput) {
    setEvents((prev) => [...prev, event])
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__logo">
            <span className="app__logo-cross">✚</span>
            <span className="app__logo-text">MedAgenda</span>
          </div>
          <p className="app__tagline">Gerenciamento de consultas médicas</p>
        </div>
      </header>

      <main className="app__main">
        <section className="app__calendar-section">
          <Calendar events={events} />
        </section>

        <Dialog>
          <DialogTrigger>
            <button className="w-[20vw] rounded-full mt-[2vw] bg-[#1a4f6e] pl-[2rem] cursor-pointer text-white hover">Criar Agendamento</button>
          </DialogTrigger>

          <DialogPortal>
            <DialogOverlay/>
            <DialogContent className="w-[80%] h-[80%] overflow-hidden flex justify-center" onInteractOutside={(e) => e.preventDefault()}>
                <AppointmentForm events={events} onAddEvent={handleAddEvent} />
            </DialogContent>
          </DialogPortal>
        </Dialog>   
      </main>
    </div>
  )
}