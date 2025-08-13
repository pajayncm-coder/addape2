import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertTriangle, DollarSign, Calendar, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function BookingCancellation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // Mock booking data
  const booking = {
    id: "BK-2024-001",
    equipment: "CAT 320 Excavator",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    duration: "5 days",
    totalAmount: 2500,
    location: "Downtown Construction Site",
    status: "Confirmed",
    canCancel: true,
    hoursUntilStart: 48
  };

  const cancellationReasons = [
    "Project postponed",
    "Changed equipment requirements",
    "Weather conditions",
    "Budget constraints",
    "Found alternative equipment",
    "Other"
  ];

  const getRefundPolicy = () => {
    const { hoursUntilStart } = booking;
    
    if (hoursUntilStart >= 72) {
      return {
        refundPercentage: 100,
        cancellationFee: 0,
        refundAmount: booking.totalAmount,
        policy: "Full refund - More than 72 hours before start"
      };
    } else if (hoursUntilStart >= 48) {
      return {
        refundPercentage: 90,
        cancellationFee: booking.totalAmount * 0.1,
        refundAmount: booking.totalAmount * 0.9,
        policy: "90% refund - 48-72 hours before start"
      };
    } else if (hoursUntilStart >= 24) {
      return {
        refundPercentage: 75,
        cancellationFee: booking.totalAmount * 0.25,
        refundAmount: booking.totalAmount * 0.75,
        policy: "75% refund - 24-48 hours before start"
      };
    } else {
      return {
        refundPercentage: 50,
        cancellationFee: booking.totalAmount * 0.5,
        refundAmount: booking.totalAmount * 0.5,
        policy: "50% refund - Less than 24 hours before start"
      };
    }
  };

  const refundInfo = getRefundPolicy();

  const handleCancelBooking = () => {
    if (!reason || !agreedToPolicy) return;

    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Booking Cancelled",
        description: `Your booking has been cancelled. Refund of $${refundInfo.refundAmount} will be processed within 3-5 business days.`,
      });
      navigate("/customer/orders");
    }, 2000);
  };

  if (!booking.canCancel) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This booking cannot be cancelled. Please contact support for assistance.
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Cancel Booking</h1>
          <p className="text-muted-foreground">Booking ID: {booking.id}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-semibold">{booking.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{booking.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {booking.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {booking.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-semibold">${booking.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="secondary">{booking.status}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Time Warning */}
            <Alert className="mt-4">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>{booking.hoursUntilStart} hours</strong> until rental start time
              </AlertDescription>
            </Alert>
          </div>

          {/* Cancellation Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Refund Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Refund Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Refund Policy</span>
                      <Badge variant={refundInfo.refundPercentage >= 90 ? "default" : "secondary"}>
                        {refundInfo.refundPercentage}% Refund
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{refundInfo.policy}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Original Amount</span>
                      <span>${booking.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cancellation Fee</span>
                      <span className="text-red-600">-${refundInfo.cancellationFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Refund Amount</span>
                      <span className="text-green-600">${refundInfo.refundAmount}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Refund will be processed to your original payment method within 3-5 business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Reason */}
            <Card>
              <CardHeader>
                <CardTitle>Reason for Cancellation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={reason} onValueChange={setReason}>
                  {cancellationReasons.map((reasonOption) => (
                    <div key={reasonOption} className="flex items-center space-x-2">
                      <RadioGroupItem value={reasonOption} id={reasonOption} />
                      <Label htmlFor={reasonOption}>{reasonOption}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {reason === "Other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customReason">Please specify</Label>
                    <Textarea
                      id="customReason"
                      placeholder="Please provide details about your cancellation reason..."
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms Agreement */}
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Important Notes:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Cancellation is final and cannot be undone</li>
                      <li>• Refund processing takes 3-5 business days</li>
                      <li>• Late cancellations may affect future booking eligibility</li>
                      <li>• Emergency cancellations may be reviewed case by case</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agreePolicy"
                      checked={agreedToPolicy}
                      onCheckedChange={(checked) => setAgreedToPolicy(checked as boolean)}
                    />
                    <Label htmlFor="agreePolicy" className="text-sm">
                      I understand and agree to the cancellation policy and refund terms
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleCancelBooking}
                disabled={!reason || !agreedToPolicy || isConfirming}
                variant="destructive"
                className="flex-1"
              >
                {isConfirming ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Cancel Booking
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/customer/orders")}
                className="flex-1"
                disabled={isConfirming}
              >
                Keep Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}