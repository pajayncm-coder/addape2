import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Truck,
  Package,
  CheckCircle,
  Clock,
  User,
  CreditCard,
  MessageCircle,
  Download,
  Star,
  AlertTriangle
} from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  
  // Mock order data
  const order = {
    id: "ORD-2024-001",
    status: "in_progress",
    progress: 60,
    orderDate: "2024-07-28",
    deliveryDate: "2024-08-01",
    returnDate: "2024-08-05",
    total: 29052,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567"
    },
    deliveryAddress: {
      street: "123 Construction Ave",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    items: [
      {
        id: 1,
        name: "CAT 320 Excavator",
        image: "/placeholder.svg",
        quantity: 1,
        pricePerDay: 2500,
        duration: 5,
        total: 12500,
        supplier: "Heavy Equipment Co.",
        serialNumber: "CAT320-2024-001"
      },
      {
        id: 2,
        name: "Concrete Mixer Truck",
        image: "/placeholder.svg",
        quantity: 2,
        pricePerDay: 1800,
        duration: 4,
        total: 14400,
        supplier: "Construction Supply Plus",
        serialNumber: "CMT-2024-045"
      }
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "2024-07-28 10:30 AM",
        completed: true,
        icon: Package,
        description: "Order confirmed and payment processed"
      },
      {
        status: "Equipment Prepared",
        date: "2024-07-30 2:15 PM",
        completed: true,
        icon: CheckCircle,
        description: "Equipment inspected and ready for delivery"
      },
      {
        status: "Out for Delivery",
        date: "2024-08-01 8:00 AM",
        completed: true,
        icon: Truck,
        description: "Equipment dispatched to delivery location"
      },
      {
        status: "Delivered",
        date: "2024-08-01 11:30 AM",
        completed: true,
        icon: CheckCircle,
        description: "Equipment delivered and setup completed"
      },
      {
        status: "In Use",
        date: "Current",
        completed: false,
        icon: Clock,
        description: "Equipment currently on site"
      },
      {
        status: "Pickup Scheduled",
        date: "2024-08-05 9:00 AM",
        completed: false,
        icon: Truck,
        description: "Equipment pickup scheduled"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-info/10 text-info border-info/20";
      case "in_progress": return "bg-warning/10 text-warning border-warning/20";
      case "delivered": return "bg-success/10 text-success border-success/20";
      case "completed": return "bg-primary/10 text-primary border-primary/20";
      case "cancelled": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getProgressPercentage = () => {
    const completedSteps = order.timeline.filter(step => step.completed).length;
    return (completedSteps / order.timeline.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/customer/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order {order.id}
            </h1>
            <p className="text-muted-foreground">
              Placed on {order.orderDate}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className={getStatusColor(order.status)}>
              {order.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Timeline & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Progress */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Order Progress
                </CardTitle>
                <CardDescription>
                  Track your equipment rental from order to return
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <Progress value={getProgressPercentage()} className="h-2" />
                </div>

                <div className="space-y-4">
                  {order.timeline.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className={`p-2 rounded-full ${
                          step.completed 
                            ? "bg-success text-success-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className={`font-medium ${
                                step.completed ? "text-foreground" : "text-muted-foreground"
                              }`}>
                                {step.status}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {step.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Details */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle>Equipment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-primary/10">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-muted"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {item.supplier}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Serial: {item.serialNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            ${item.total.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity} × ${item.pricePerDay}/day × {item.duration} days
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Contact Supplier
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="h-3 w-3 mr-1" />
                          Rate Equipment
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Delivery Address</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{order.deliveryAddress.street}</div>
                      <div>
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zip}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Schedule</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        Delivery: {order.deliveryDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        Return: {order.returnDate}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(order.total * 0.926).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(order.total * 0.074).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-muted-foreground">{order.customer.email}</div>
                  <div className="text-muted-foreground">{order.customer.phone}</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;