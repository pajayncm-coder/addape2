import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

export default function BookingCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock booking data
  const bookings = [
    {
      id: "BK-001",
      equipment: "CAT 320 Excavator",
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
      status: "confirmed",
      location: "Downtown Site",
      vendor: "Heavy Equipment Co."
    },
    {
      id: "BK-002", 
      equipment: "Bobcat Skid Steer",
      startDate: new Date(2024, 2, 22),
      endDate: new Date(2024, 2, 24),
      status: "pending",
      location: "Uptown Project",
      vendor: "City Rentals"
    },
    {
      id: "BK-003",
      equipment: "Crane 50-ton",
      startDate: new Date(2024, 2, 28),
      endDate: new Date(2024, 2, 30),
      status: "in-progress",
      location: "Harbor Construction",
      vendor: "Mega Lifts"
    },
    {
      id: "BK-004",
      equipment: "Dump Truck",
      startDate: new Date(2024, 3, 5),
      endDate: new Date(2024, 3, 8),
      status: "confirmed",
      location: "Highway Project",
      vendor: "Transport Plus"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const bookingStart = booking.startDate;
      const bookingEnd = booking.endDate;
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  const filteredBookings = statusFilter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const renderCalendarDay = (date: Date) => {
    const dayBookings = getBookingsForDate(date);
    const hasBookings = dayBookings.length > 0;
    
    return (
      <div
        className={cn(
          "min-h-[80px] p-1 border border-border cursor-pointer hover:bg-muted/50 transition-colors",
          !isSameMonth(date, currentDate) && "text-muted-foreground bg-muted/20",
          isSameDay(date, new Date()) && "bg-primary/10",
          selectedDate && isSameDay(date, selectedDate) && "bg-primary/20"
        )}
        onClick={() => setSelectedDate(date)}
      >
        <div className="text-sm font-medium mb-1">{format(date, "d")}</div>
        <div className="space-y-1">
          {dayBookings.slice(0, 2).map((booking) => (
            <div
              key={booking.id}
              className={cn(
                "text-xs p-1 rounded truncate",
                getStatusColor(booking.status)
              )}
              title={`${booking.equipment} - ${booking.location}`}
            >
              {booking.equipment}
            </div>
          ))}
          {dayBookings.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{dayBookings.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() - monthStart.getDay());
    const endDate = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), monthEnd.getDate() + (6 - monthEnd.getDay()));
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 bg-muted">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((day) => renderCalendarDay(day))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booking Calendar</h1>
            <p className="text-muted-foreground">View and manage all your equipment bookings</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => navigate("/customer/search")}>
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {format(currentDate, "MMMM yyyy")}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth("prev")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth("next")}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderMonthView()}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Status Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100"></div>
                  <span className="text-sm">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-100"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100"></div>
                  <span className="text-sm">Cancelled</span>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Details */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {format(selectedDate, "MMMM d, yyyy")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getBookingsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      {getBookingsForDate(selectedDate).map((booking) => (
                        <div key={booking.id} className="p-3 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/customer/order/${booking.id}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="font-semibold text-sm">{booking.equipment}</p>
                          <p className="text-xs text-muted-foreground">{booking.location}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(booking.startDate, "MMM d")} - {format(booking.endDate, "MMM d")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No bookings for this date
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Bookings</span>
                  <span className="font-semibold">{filteredBookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Confirmed</span>
                  <span className="font-semibold text-green-600">
                    {filteredBookings.filter(b => b.status === "confirmed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {filteredBookings.filter(b => b.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">In Progress</span>
                  <span className="font-semibold text-blue-600">
                    {filteredBookings.filter(b => b.status === "in-progress").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}