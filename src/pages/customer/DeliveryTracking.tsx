import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  MessageSquare,
  Navigation,
  Calendar
} from "lucide-react";

const DeliveryTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const activeDeliveries = [
    {
      id: 1,
      orderId: "ORD-2024-003",
      equipment: "Caterpillar 320 Excavator",
      status: "in_transit",
      driver: "Mike Johnson",
      driverPhone: "+1 (555) 123-4567",
      vehicle: "Truck #TRK-001",
      estimatedArrival: "2024-01-16 09:00",
      actualPickup: "2024-01-15 14:30",
      currentLocation: "Downtown Distribution Center",
      deliveryAddress: "123 Construction Site Rd, Downtown",
      timeline: [
        { time: "14:30", status: "picked_up", description: "Equipment picked up from depot", completed: true },
        { time: "15:45", status: "in_transit", description: "En route to delivery location", completed: true },
        { time: "09:00", status: "delivered", description: "Estimated delivery", completed: false }
      ]
    },
    {
      id: 2,
      orderId: "ORD-2024-004",
      equipment: "Bobcat S650 Skid Steer",
      status: "scheduled",
      driver: "Sarah Wilson",
      driverPhone: "+1 (555) 987-6543",
      vehicle: "Truck #TRK-003",
      estimatedArrival: "2024-01-17 10:30",
      scheduledPickup: "2024-01-17 08:00",
      deliveryAddress: "456 Industrial Ave, North District",
      timeline: [
        { time: "08:00", status: "pickup", description: "Scheduled pickup from depot", completed: false },
        { time: "10:30", status: "delivery", description: "Estimated delivery", completed: false }
      ]
    }
  ];

  const completedDeliveries = [
    {
      id: 3,
      orderId: "ORD-2024-002",
      equipment: "John Deere 310L Backhoe",
      status: "delivered",
      driver: "Robert Chen",
      deliveredAt: "2024-01-14 11:15",
      deliveryAddress: "789 Project Site Dr, South Bay"
    },
    {
      id: 4,
      orderId: "ORD-2024-001",
      equipment: "Komatsu PC200 Excavator",
      status: "returned",
      driver: "Lisa Garcia",
      returnedAt: "2024-01-12 16:45",
      pickupAddress: "321 Warehouse Blvd, East Side"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "in_transit": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "returned": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "delayed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled": return <Clock className="h-4 w-4" />;
      case "in_transit": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "returned": return <Package className="h-4 w-4" />;
      case "delayed": return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Delivery Tracking</h1>
          <p className="text-muted-foreground">Track your equipment deliveries and pickups in real-time</p>
        </div>

        <div className="mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter tracking number or order ID..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button>Track</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Active Deliveries ({activeDeliveries.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({completedDeliveries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{delivery.equipment}</CardTitle>
                      <p className="text-sm text-muted-foreground">Order: {delivery.orderId}</p>
                    </div>
                    <Badge className={getStatusColor(delivery.status)}>
                      {getStatusIcon(delivery.status)}
                      <span className="ml-1 capitalize">{delivery.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Delivery Information
                        </h4>
                        <div className="text-sm space-y-1">
                          <p><strong>To:</strong> {delivery.deliveryAddress}</p>
                          <p><strong>Estimated Arrival:</strong> {delivery.estimatedArrival}</p>
                          {delivery.currentLocation && (
                            <p><strong>Current Location:</strong> {delivery.currentLocation}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Driver & Vehicle
                        </h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Driver:</strong> {delivery.driver}</p>
                          <p><strong>Vehicle:</strong> {delivery.vehicle}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Call Driver
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Delivery Timeline
                      </h4>
                      <div className="space-y-3">
                        {delivery.timeline.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className={`mt-1 w-2 h-2 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{step.time}</span>
                                <Badge variant="outline" className="text-xs">
                                  {step.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline">
                      <Navigation className="h-3 w-3 mr-1" />
                      Live Tracking
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedDeliveries.map((delivery) => (
              <Card key={delivery.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{delivery.equipment}</h3>
                      <p className="text-sm text-muted-foreground">Order: {delivery.orderId}</p>
                      <div className="text-sm text-muted-foreground mt-2">
                        <p><strong>Driver:</strong> {delivery.driver}</p>
                        {delivery.deliveredAt && (
                          <p><strong>Delivered:</strong> {delivery.deliveredAt} to {delivery.deliveryAddress}</p>
                        )}
                        {delivery.returnedAt && (
                          <p><strong>Returned:</strong> {delivery.returnedAt} from {delivery.pickupAddress}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(delivery.status)}>
                        {getStatusIcon(delivery.status)}
                        <span className="ml-1 capitalize">{delivery.status}</span>
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeliveryTracking;