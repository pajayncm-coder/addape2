import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  Truck, 
  Eye, 
  MessageSquare,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Package
} from "lucide-react";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      equipmentName: "CAT 320 Excavator",
      supplier: "Houston Heavy Equipment",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-01-30",
      totalAmount: 5250,
      location: "Houston, TX",
      deliveryStatus: "delivered",
      orderDate: "2024-01-10",
      equipmentImage: "/placeholder.svg"
    },
    {
      id: "ORD-002", 
      equipmentName: "John Deere 410L Backhoe",
      supplier: "Texas Equipment Rental",
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-01-14",
      totalAmount: 3200,
      location: "Dallas, TX",
      deliveryStatus: "returned",
      orderDate: "2023-12-28",
      equipmentImage: "/placeholder.svg"
    },
    {
      id: "ORD-003",
      equipmentName: "Bobcat S650 Skid Steer",
      supplier: "Austin Construction Supply",
      status: "pending",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      totalAmount: 2800,
      location: "Austin, TX",
      deliveryStatus: "scheduled",
      orderDate: "2024-01-25",
      equipmentImage: "/placeholder.svg"
    },
    {
      id: "ORD-004",
      equipmentName: "Liebherr LTM 1050-3.1 Crane",
      supplier: "Lone Star Cranes",
      status: "cancelled",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      totalAmount: 8500,
      location: "San Antonio, TX",
      deliveryStatus: "cancelled",
      orderDate: "2024-01-18",
      equipmentImage: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-transit":
        return "bg-yellow-100 text-yellow-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
            <p className="text-muted-foreground">Track and manage your equipment rental orders</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, equipment, or suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <img 
                            src={order.equipmentImage} 
                            alt={order.equipmentName}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{order.equipmentName}</h3>
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{order.supplier}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Package className="h-4 w-4" />
                              <span>Order #{order.id}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{order.startDate} - {order.endDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{order.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Truck className="h-4 w-4" />
                              <Badge variant="secondary" className={getDeliveryStatusColor(order.deliveryStatus)}>
                                {order.deliveryStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">${order.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          {order.status === "active" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Invoice
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filterStatus !== "all" 
                      ? "No orders match your current filters. Try adjusting your search."
                      : "You haven't placed any equipment rental orders yet."
                    }
                  </p>
                  <div className="flex justify-center gap-2">
                    {searchQuery || filterStatus !== "all" ? (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery("");
                          setFilterStatus("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    ) : (
                      <Button asChild>
                        <a href="/customer/search">Browse Equipment</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Timeline View</h3>
                <p className="text-muted-foreground">
                  Timeline view coming soon - visualize your order history in chronological order.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;