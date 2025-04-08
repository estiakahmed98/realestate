"use client"

import { useState } from "react"
import { addDays, format, startOfWeek, addWeeks, subWeeks } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppointmentForm } from "@/components/calendar/appointment-form"

// Sample appointment data
const appointments = [
  {
    id: "1",
    title: "Property Viewing",
    client: "Sarah Johnson",
    property: "Luxury Condo in Downtown",
    date: new Date(2024, 3, 6, 10, 0), // April 6, 2024, 10:00 AM
    duration: 60, // minutes
    type: "Viewing",
    notes: "Client is interested in the downtown area, looking for a 2-bedroom condo.",
  },
  {
    id: "2",
    title: "Follow-up Meeting",
    client: "Michael Brown",
    property: "Family Home with Garden",
    date: new Date(2024, 3, 6, 14, 30), // April 6, 2024, 2:30 PM
    duration: 45, // minutes
    type: "Follow-up",
    notes: "Discuss financing options and next steps.",
  },
  {
    id: "3",
    title: "Property Viewing",
    client: "Emily Davis",
    property: "Beach Villa with Ocean View",
    date: new Date(2024, 3, 7, 11, 0), // April 7, 2024, 11:00 AM
    duration: 90, // minutes
    type: "Viewing",
    notes: "Client is looking for a vacation home with ocean views.",
  },
  {
    id: "4",
    title: "Offer Discussion",
    client: "Robert Wilson",
    property: "City Apartment",
    date: new Date(2024, 3, 8, 15, 0), // April 8, 2024, 3:00 PM
    duration: 60, // minutes
    type: "Offer",
    notes: "Client wants to make an offer on the property.",
  },
  {
    id: "5",
    title: "Contract Signing",
    client: "Jennifer Smith",
    property: "Suburban House with Pool",
    date: new Date(2024, 3, 9, 13, 0), // April 9, 2024, 1:00 PM
    duration: 120, // minutes
    type: "Contract",
    notes: "Final contract signing for the property sale.",
  },
]

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const [dialogOpen, setDialogOpen] = useState(false)

  const startDate = startOfWeek(date)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  const formatTime = (date: Date) => {
    return format(date, "h:mm a")
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => format(appointment.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  }

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case "Viewing":
        return "default"
      case "Follow-up":
        return "secondary"
      case "Offer":
        return "destructive"
      case "Contract":
        return "success"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setDate(subWeeks(date, 1))}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous week</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{format(date, "MMMM yyyy")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon" onClick={() => setDate(addWeeks(date, 1))}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next week</span>
          </Button>
          <Button variant="ghost" onClick={() => setDate(new Date())}>
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border p-1">
            <Button
              variant={view === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("day")}
              className="text-xs"
            >
              Day
            </Button>
            <Button
              variant={view === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("week")}
              className="text-xs"
            >
              Week
            </Button>
            <Button
              variant={view === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("month")}
              className="text-xs"
            >
              Month
            </Button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>Schedule a new appointment with a client</DialogDescription>
              </DialogHeader>
              <AppointmentForm onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === "week" && (
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day) => (
            <Card key={day.toString()} className="overflow-hidden">
              <CardHeader className="p-3">
                <CardTitle className="text-center text-sm">
                  <div className="font-normal text-muted-foreground">{format(day, "EEE")}</div>
                  <div
                    className={cn(
                      "mt-1 h-7 w-7 rounded-full text-center leading-7 mx-auto",
                      format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                        ? "bg-primary text-primary-foreground"
                        : "",
                    )}
                  >
                    {format(day, "d")}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 max-h-[500px] overflow-y-auto">
                {getAppointmentsForDate(day).length > 0 ? (
                  <div className="space-y-2">
                    {getAppointmentsForDate(day).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="rounded-md border p-2 text-xs cursor-pointer hover:bg-accent"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant={getAppointmentTypeColor(appointment.type)}>{appointment.type}</Badge>
                          <span className="text-muted-foreground">{formatTime(appointment.date)}</span>
                        </div>
                        <div className="font-medium mt-1">{appointment.title}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={`/placeholder.svg?text=${appointment.client.charAt(0)}`} />
                            <AvatarFallback>{appointment.client.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{appointment.client}</span>
                        </div>
                        <div className="text-muted-foreground truncate mt-1">{appointment.property}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center text-xs text-muted-foreground">
                    No appointments
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

