import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  MapPin, 
  User, 
  Calendar, 
  Shield, 
  Truck,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const orderItems = [
    {
      id: 1,
      name: "CAT 320 Excavator",
      quantity: 1,
      duration: 5,
      pricePerDay: 2500,
      total: 12500
    },
    {
      id: 2,
      name: "Concrete Mixer Truck",
      quantity: 2,
      duration: 4,
      pricePerDay: 1800,
      total: 14400
    }
  ];

  const subtotal = 26900;
  const tax = 2152;
  const total = 29052;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/customer/cart">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
                <CardDescription>
                  Where should we deliver your equipment?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input type="date" id="deliveryDate" />
                  </div>
                  <div>
                    <Label htmlFor="deliveryTime">Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8-10">8:00 AM - 10:00 AM</SelectItem>
                        <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                        <SelectItem value="12-14">12:00 PM - 2:00 PM</SelectItem>
                        <SelectItem value="14-16">2:00 PM - 4:00 PM</SelectItem>
                        <SelectItem value="16-18">4:00 PM - 6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" placeholder="Street address" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="State" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="ZIP" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea 
                    id="instructions" 
                    placeholder="Any special delivery instructions..."
                    className="h-20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="john@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input type="tel" id="phone" placeholder="(555) 123-4567" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    <TabsTrigger value="invoice">Invoice</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bank" className="space-y-4 mt-6">
                    <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                      <h4 className="font-medium text-info mb-2">Bank Transfer Details</h4>
                      <p className="text-sm text-muted-foreground">
                        You will receive bank transfer instructions after placing your order.
                        Payment must be completed within 24 hours to secure your booking.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="invoice" className="space-y-4 mt-6">
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-medium text-warning mb-2">Invoice Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Available for established customers with approved credit terms.
                        Net 30 payment terms apply.
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company Inc." />
                    </div>
                    
                    <div>
                      <Label htmlFor="taxId">Tax ID</Label>
                      <Input id="taxId" placeholder="12-3456789" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="shadow-elegant border-primary/10 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-muted-foreground">
                          Qty: {item.quantity} × {item.duration} days
                        </div>
                      </div>
                      <div className="font-medium">
                        ${item.total.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-success">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-primary/10">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>

                {/* Place Order Button */}
                <Button className="w-full bg-gradient-primary hover:shadow-glow" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Place Order
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;