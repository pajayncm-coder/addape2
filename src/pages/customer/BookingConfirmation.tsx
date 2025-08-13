import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, MapPin, Clock, DollarSign, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";

export default function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking data
  const booking = {
    id: "BK-2024-001",
    equipment: "CAT 320 Excavator",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    duration: "5 days",
    totalAmount: 2500,
    location: "Downtown Construction Site",
    deliveryTime: "8:00 AM",
    pickupTime: "5:00 PM",
    vendor: "Heavy Equipment Co.",
    status: "Confirmed"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your equipment rental has been successfully booked</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-semibold">{booking.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Equipment</p>
                <p className="font-semibold">{booking.equipment}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-semibold">{booking.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-semibold">{booking.endDate}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{booking.duration}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {booking.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{booking.location}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Time</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.deliveryTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Time</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.pickupTime}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Vendor</p>
                <p className="font-semibold">{booking.vendor}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Rental Cost ({booking.duration})</span>
                <span>${booking.totalAmount - 200}</span>
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
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Paid</span>
                <span>${booking.totalAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
                <div>
                  <p className="font-semibold">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">You'll receive a detailed confirmation email within 5 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
                <div>
                  <p className="font-semibold">Vendor Contact</p>
                  <p className="text-sm text-muted-foreground">The vendor will contact you 24 hours before delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
                <div>
                  <p className="font-semibold">Equipment Delivery</p>
                  <p className="text-sm text-muted-foreground">Equipment will be delivered on {booking.startDate} at {booking.deliveryTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Call Support</p>
                  <p className="text-sm text-muted-foreground">1-800-RENT-NOW</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@equiprental.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button onClick={() => navigate("/customer/orders")} className="flex-1">
            View All Orders
          </Button>
          <Button variant="outline" onClick={() => navigate("/customer/dashboard")} className="flex-1">
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate("/customer/search")} className="flex-1">
            Rent More Equipment
          </Button>
        </div>
      </div>
    </div>
  );
}