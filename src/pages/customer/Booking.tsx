import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, DollarSign, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
  const [duration, setDuration] = useState<string>();

  // Mock equipment data - in real app, fetch based on id
  const equipment = {
    id: "1",
    name: "Caterpillar 320 Excavator",
    category: "Excavators",
    image: "/api/placeholder/300/200",
    dailyRate: 450,
    weeklyRate: 2800,
    monthlyRate: 10500,
    location: "Downtown Depot",
    availability: "Available",
  };

  const timeSlots = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM",
    "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"
  ];

  const durationOptions = [
    { value: "daily", label: "Daily", rate: equipment.dailyRate },
    { value: "weekly", label: "Weekly", rate: equipment.weeklyRate },
    { value: "monthly", label: "Monthly", rate: equipment.monthlyRate }
  ];

  const calculateTotal = () => {
    if (!duration) return 0;
    const option = durationOptions.find(opt => opt.value === duration);
    return option ? option.rate : 0;
  };

  const handleBooking = () => {
    if (!startDate || !timeSlot || !duration) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Here you would typically send booking data to backend
    console.log({
      equipmentId: id,
      startDate,
      endDate,
      timeSlot,
      duration,
      total: calculateTotal()
    });
    
    alert("Booking confirmed! Redirecting to orders...");
    navigate("/customer/orders");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Book Equipment</h1>
          <p className="text-muted-foreground">Select your rental dates and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <img 
                  src={equipment.image} 
                  alt={equipment.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{equipment.name}</h3>
                <Badge variant="secondary" className="mb-2">{equipment.category}</Badge>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {equipment.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {equipment.availability}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Duration Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Rental Duration *</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} - ${option.rate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date *</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick end date (optional)"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < (startDate || new Date())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Preferred Time Slot *</label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Pricing Summary */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pricing Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{duration ? durationOptions.find(opt => opt.value === duration)?.label : "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>${duration ? durationOptions.find(opt => opt.value === duration)?.rate : 0}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleBooking}
                    disabled={!startDate || !timeSlot || !duration}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;