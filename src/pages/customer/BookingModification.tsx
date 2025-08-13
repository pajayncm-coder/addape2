import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function BookingModification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock booking data
  const [booking, setBooking] = useState({
    id: "BK-2024-001",
    equipment: "CAT 320 Excavator",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-20"),
    duration: "5",
    location: "Downtown Construction Site",
    deliveryTime: "08:00",
    pickupTime: "17:00",
    totalAmount: 2500,
    status: "Confirmed",
    canModify: true,
    modificationDeadline: "2024-03-13"
  });

  const [originalBooking] = useState({ ...booking });
  const [hasChanges, setHasChanges] = useState(false);

  const durationOptions = [
    { value: "1", label: "1 Day" },
    { value: "3", label: "3 Days" },
    { value: "5", label: "5 Days" },
    { value: "7", label: "1 Week" },
    { value: "14", label: "2 Weeks" },
    { value: "30", label: "1 Month" }
  ];

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", 
    "11:00", "12:00", "13:00", "14:00", "15:00", 
    "16:00", "17:00", "18:00"
  ];

  const handleFieldChange = (field: string, value: any) => {
    setBooking(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);

    // Auto-calculate end date when start date or duration changes
    if (field === "startDate" || field === "duration") {
      const startDate = field === "startDate" ? value : booking.startDate;
      const duration = field === "duration" ? parseInt(value) : parseInt(booking.duration);
      
      if (startDate && duration) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration - 1);
        setBooking(prev => ({ ...prev, endDate }));
      }
    }
  };

  const calculateNewTotal = () => {
    const baseCost = parseInt(booking.duration) * 33300; // ₹33,300 per day
    const deliveryFee = 150;
    const insurance = 50;
    return baseCost + deliveryFee + insurance;
  };

  const getChangeSummary = () => {
    const changes = [];
    if (booking.startDate.getTime() !== originalBooking.startDate.getTime()) {
      changes.push(`Start date: ${format(originalBooking.startDate, "MMM dd")} → ${format(booking.startDate, "MMM dd")}`);
    }
    if (booking.endDate.getTime() !== originalBooking.endDate.getTime()) {
      changes.push(`End date: ${format(originalBooking.endDate, "MMM dd")} → ${format(booking.endDate, "MMM dd")}`);
    }
    if (booking.duration !== originalBooking.duration) {
      changes.push(`Duration: ${originalBooking.duration} days → ${booking.duration} days`);
    }
    if (booking.deliveryTime !== originalBooking.deliveryTime) {
      changes.push(`Delivery time: ${originalBooking.deliveryTime} → ${booking.deliveryTime}`);
    }
    if (booking.pickupTime !== originalBooking.pickupTime) {
      changes.push(`Pickup time: ${originalBooking.pickupTime} → ${booking.pickupTime}`);
    }
    return changes;
  };

  const handleSaveChanges = () => {
    const newTotal = calculateNewTotal();
    const priceDifference = newTotal - originalBooking.totalAmount;
    
    toast({
      title: "Booking Updated",
      description: `Your booking has been successfully modified. ${
        priceDifference > 0 
          ? `Additional charge: $${priceDifference}` 
          : priceDifference < 0 
          ? `Refund: $${Math.abs(priceDifference)}` 
          : "No price change"
      }`,
    });
    
    navigate("/customer/orders");
  };

  const handleCancel = () => {
    setBooking(originalBooking);
    setHasChanges(false);
  };

  if (!booking.canModify) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Alert>
            <X className="h-4 w-4" />
            <AlertDescription>
              This booking cannot be modified. Modification deadline has passed or the booking status doesn't allow changes.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate("/customer/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Modify Booking</h1>
            <p className="text-muted-foreground">Booking ID: {booking.id}</p>
          </div>
          <Badge variant="secondary">
            Modification deadline: {booking.modificationDeadline}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Booking Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Current Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-semibold">{booking.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{booking.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="secondary">{booking.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Original Total</p>
                  <p className="font-semibold">${originalBooking.totalAmount}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modification Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Modify Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !booking.startDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {booking.startDate ? format(booking.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={booking.startDate}
                          onSelect={(date) => date && handleFieldChange("startDate", date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={booking.duration} onValueChange={(value) => handleFieldChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue />
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

                {/* End Date Display */}
                <div className="space-y-2">
                  <Label>End Date (Calculated)</Label>
                  <Input
                    value={booking.endDate ? format(booking.endDate, "PPP") : ""}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* Time Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Delivery Time</Label>
                    <Select value={booking.deliveryTime} onValueChange={(value) => handleFieldChange("deliveryTime", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Pickup Time</Label>
                    <Select value={booking.pickupTime} onValueChange={(value) => handleFieldChange("pickupTime", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Update */}
                {hasChanges && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Price Update</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Rental Cost ({booking.duration} days)</span>
                        <span>${parseInt(booking.duration) * 400}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹12,495</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance</span>
                        <span>₹4,165</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>New Total</span>
                        <span>${calculateNewTotal()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Price Difference</span>
                        <span className={calculateNewTotal() - originalBooking.totalAmount >= 0 ? "text-red-600" : "text-green-600"}>
                          {calculateNewTotal() - originalBooking.totalAmount >= 0 ? "+" : ""}
                          ${calculateNewTotal() - originalBooking.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Change Summary */}
                {hasChanges && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Summary of Changes</h4>
                    <ul className="text-sm space-y-1">
                      {getChangeSummary().map((change, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleSaveChanges} 
                    disabled={!hasChanges}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}