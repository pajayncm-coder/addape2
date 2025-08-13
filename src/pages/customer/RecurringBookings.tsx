import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Repeat, Plus, Edit, Trash2, Play, Pause, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function RecurringBookings() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [recurringBookings, setRecurringBookings] = useState([
    {
      id: "RB-001",
      name: "Weekly Excavator Rental",
      equipment: "CAT 320 Excavator",
      frequency: "weekly",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-01"),
      duration: "3",
      location: "Downtown Construction Site",
      nextBooking: new Date("2024-03-15"),
      status: "active",
      totalBookings: 12,
      completedBookings: 3,
      vendor: "Heavy Equipment Co.",
      amount: 1200
    },
    {
      id: "RB-002", 
      name: "Monthly Crane Service",
      equipment: "50-ton Mobile Crane",
      frequency: "monthly",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-12-01"),
      duration: "2",
      location: "Harbor Project",
      nextBooking: new Date("2024-04-01"),
      status: "active",
      totalBookings: 11,
      completedBookings: 2,
      vendor: "Mega Lifts",
      amount: 3500
    },
    {
      id: "RB-003",
      name: "Bi-weekly Dump Truck",
      equipment: "Dump Truck 20-yard",
      frequency: "bi-weekly",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-05-15"),
      duration: "1",
      location: "Highway Project",
      nextBooking: new Date("2024-03-25"),
      status: "paused",
      totalBookings: 8,
      completedBookings: 4,
      vendor: "Transport Plus",
      amount: 800
    }
  ]);

  const [newBooking, setNewBooking] = useState({
    name: "",
    equipment: "",
    frequency: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    duration: "",
    location: "",
    deliveryTime: "",
    pickupTime: ""
  });

  const [isCreating, setIsCreating] = useState(false);

  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "bi-weekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" }
  ];

  const durationOptions = [
    { value: "1", label: "1 Day" },
    { value: "2", label: "2 Days" },
    { value: "3", label: "3 Days" },
    { value: "5", label: "5 Days" },
    { value: "7", label: "1 Week" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    return frequencyOptions.find(f => f.value === frequency)?.label || frequency;
  };

  const toggleBookingStatus = (id: string) => {
    setRecurringBookings(prev => prev.map(booking => 
      booking.id === id 
        ? { ...booking, status: booking.status === "active" ? "paused" : "active" }
        : booking
    ));
    
    const booking = recurringBookings.find(b => b.id === id);
    toast({
      title: booking?.status === "active" ? "Booking Paused" : "Booking Activated",
      description: `Recurring booking has been ${booking?.status === "active" ? "paused" : "activated"}.`,
    });
  };

  const deleteBooking = (id: string) => {
    setRecurringBookings(prev => prev.filter(booking => booking.id !== id));
    toast({
      title: "Booking Deleted",
      description: "Recurring booking has been deleted.",
    });
  };

  const createRecurringBooking = () => {
    if (!newBooking.name || !newBooking.frequency || !newBooking.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const booking = {
      id: `RB-${Date.now()}`,
      ...newBooking,
      status: "active",
      totalBookings: 0,
      completedBookings: 0,
      vendor: "Auto-assigned",
      amount: 1000,
      nextBooking: newBooking.startDate
    };

    setRecurringBookings(prev => [...prev, booking as any]);
    setNewBooking({
      name: "",
      equipment: "",
      frequency: "",
      startDate: undefined,
      endDate: undefined,
      duration: "",
      location: "",
      deliveryTime: "",
      pickupTime: ""
    });
    setIsCreating(false);

    toast({
      title: "Recurring Booking Created",
      description: "Your recurring booking has been set up successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recurring Bookings</h1>
            <p className="text-muted-foreground">Set up and manage repeat equipment rentals</p>
          </div>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Recurring Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Recurring Booking</DialogTitle>
                <DialogDescription>
                  Set up automatic equipment rentals on a recurring schedule
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Booking Name *</Label>
                    <Input
                      placeholder="e.g., Weekly Excavator Rental"
                      value={newBooking.name}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Equipment *</Label>
                    <Input
                      placeholder="Equipment name or ID"
                      value={newBooking.equipment}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, equipment: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency *</Label>
                    <Select value={newBooking.frequency} onValueChange={(value) => setNewBooking(prev => ({ ...prev, frequency: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration per Booking</Label>
                    <Select value={newBooking.duration} onValueChange={(value) => setNewBooking(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newBooking.startDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {newBooking.startDate ? format(newBooking.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={newBooking.startDate}
                          onSelect={(date) => setNewBooking(prev => ({ ...prev, startDate: date }))}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newBooking.endDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {newBooking.endDate ? format(newBooking.endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={newBooking.endDate}
                          onSelect={(date) => setNewBooking(prev => ({ ...prev, endDate: date }))}
                          disabled={(date) => date < (newBooking.startDate || new Date())}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Delivery location"
                    value={newBooking.location}
                    onChange={(e) => setNewBooking(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Delivery Time</Label>
                    <Input
                      type="time"
                      value={newBooking.deliveryTime}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, deliveryTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Pickup Time</Label>
                    <Input
                      type="time"
                      value={newBooking.pickupTime}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, pickupTime: e.target.value }))}
                    />
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    Recurring bookings will be automatically created based on your schedule. You can pause or modify them at any time.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button onClick={createRecurringBooking} className="flex-1">
                    Create Recurring Booking
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Bookings */}
        <div className="space-y-6">
          {recurringBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Repeat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recurring Bookings</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first recurring booking to automate your equipment rentals
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Recurring Booking
                </Button>
              </CardContent>
            </Card>
          ) : (
            recurringBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Repeat className="w-5 h-5" />
                        {booking.name}
                      </CardTitle>
                      <p className="text-muted-foreground">{booking.equipment}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleBookingStatus(booking.id)}
                          title={booking.status === "active" ? "Pause" : "Resume"}
                        >
                          {booking.status === "active" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteBooking(booking.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Schedule Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Frequency</p>
                        <p className="font-semibold">{getFrequencyLabel(booking.frequency)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{booking.duration} day(s)</p>
                      </div>
                    </div>

                    {/* Date Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(booking.startDate, "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Booking</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format(booking.nextBooking, "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="font-semibold">
                          {booking.completedBookings}/{booking.totalBookings} completed
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount per Booking</p>
                        <p className="font-semibold">${booking.amount}</p>
                      </div>
                    </div>

                    {/* Location & Vendor */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-semibold">{booking.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vendor</p>
                        <p className="font-semibold">{booking.vendor}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => navigate(`/customer/order/${booking.id}`)}>
                      View Details
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/customer/booking-calendar")}>
                      View in Calendar
                    </Button>
                    <Button variant="outline">
                      Modify Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}