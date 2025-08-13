import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Calendar, Phone, Mail } from "lucide-react";

export default function SupplierOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "ABC Construction Ltd",
      contact: "+91 98765 43210",
      email: "contact@abcconstruction.com",
      equipment: "JCB Excavator 3DX",
      startDate: "2024-08-10",
      endDate: "2024-08-20",
      duration: "10 days",
      rate: "₹2,500/day",
      totalAmount: "₹25,000",
      status: "pending",
      priority: "high",
      location: "Gurgaon, Haryana",
      requestedDate: "2024-08-07"
    },
    {
      id: "ORD-002",
      customer: "XYZ Builders",
      contact: "+91 87654 32109",
      email: "projects@xyzbuilders.com",
      equipment: "Concrete Mixer 500L",
      startDate: "2024-08-09",
      endDate: "2024-08-15",
      duration: "6 days",
      rate: "₹800/day",
      totalAmount: "₹4,800",
      status: "confirmed",
      priority: "medium",
      location: "Noida, UP",
      requestedDate: "2024-08-05"
    },
    {
      id: "ORD-003",
      customer: "Metro Infrastructure",
      contact: "+91 76543 21098",
      email: "ops@metroinfra.com",
      equipment: "Tower Crane 50T",
      startDate: "2024-08-15",
      endDate: "2024-09-15",
      duration: "31 days",
      rate: "₹5,000/day",
      totalAmount: "₹1,55,000",
      status: "in-progress",
      priority: "high",
      location: "Delhi NCR",
      requestedDate: "2024-08-01"
    },
    {
      id: "ORD-004",
      customer: "Green Valley Projects",
      contact: "+91 65432 10987",
      email: "admin@greenvalley.com",
      equipment: "Bulldozer CAT D6",
      startDate: "2024-08-08",
      endDate: "2024-08-12",
      duration: "4 days",
      rate: "₹3,500/day",
      totalAmount: "₹14,000",
      status: "completed",
      priority: "low",
      location: "Faridabad, Haryana",
      requestedDate: "2024-08-03"
    },
    {
      id: "ORD-005",
      customer: "Skyline Constructions",
      contact: "+91 54321 09876",
      email: "rental@skylineconstruct.com",
      equipment: "Hydraulic Hammer",
      startDate: "2024-08-12",
      endDate: "2024-08-18",
      duration: "6 days",
      rate: "₹1,200/day",
      totalAmount: "₹7,200",
      status: "cancelled",
      priority: "medium",
      location: "Greater Noida, UP",
      requestedDate: "2024-08-06"
    }
  ];

  const statuses = ["all", "pending", "confirmed", "in-progress", "completed", "cancelled"];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "destructive";
      case "confirmed": return "default";
      case "in-progress": return "secondary";
      case "completed": return "default";
      case "cancelled": return "destructive";
      default: return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "default";
    }
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Manage incoming rental requests and active orders</p>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOrdersByStatus("pending")}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOrdersByStatus("confirmed")}</div>
            <p className="text-xs text-muted-foreground">Ready to start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOrdersByStatus("in-progress")}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOrdersByStatus("completed")}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOrdersByStatus("cancelled")}</div>
            <p className="text-xs text-muted-foreground">Cancelled orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Management */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage all rental orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.equipment}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{order.duration}</p>
                      <p className="text-xs text-muted-foreground">{order.startDate} to {order.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{order.totalAmount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.id}</DialogTitle>
                            <DialogDescription>Complete order information and actions</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="details">Order Details</TabsTrigger>
                              <TabsTrigger value="actions">Actions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Customer</Label>
                                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Equipment</Label>
                                  <p className="text-sm text-muted-foreground">{order.equipment}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Contact</Label>
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Phone className="h-3 w-3" />
                                      {order.contact}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Mail className="h-3 w-3" />
                                      {order.email}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Location</Label>
                                  <p className="text-sm text-muted-foreground">{order.location}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Duration</Label>
                                  <p className="text-sm text-muted-foreground">{order.startDate} to {order.endDate}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Total Amount</Label>
                                  <p className="text-sm text-muted-foreground">{order.totalAmount}</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="actions" className="space-y-4">
                              {order.status === "pending" && (
                                <div className="space-y-4">
                                  <div className="flex gap-2">
                                    <Button className="flex-1">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Approve Order
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Reject Order
                                    </Button>
                                  </div>
                                  <div>
                                    <Label htmlFor="notes">Add Notes</Label>
                                    <Textarea id="notes" placeholder="Add any notes or special instructions..." />
                                  </div>
                                </div>
                              )}
                              {order.status === "confirmed" && (
                                <div className="space-y-4">
                                  <Button className="w-full">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Mark as Started
                                  </Button>
                                </div>
                              )}
                              {order.status === "in-progress" && (
                                <div className="space-y-4">
                                  <Button className="w-full">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Completed
                                  </Button>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      {order.status === "pending" && (
                        <>
                          <Button size="sm" variant="default">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}