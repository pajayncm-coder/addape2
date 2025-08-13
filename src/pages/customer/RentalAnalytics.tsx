import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, DollarSign, Calendar, Clock, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Header } from "@/components/Header";

export default function RentalAnalytics() {
  const [timeRange, setTimeRange] = useState("12months");
  const [equipmentFilter, setEquipmentFilter] = useState("all");

  // Mock data for analytics
  const monthlySpending = [
    { month: "Jan", amount: 12500, bookings: 15 },
    { month: "Feb", amount: 18200, bookings: 22 },
    { month: "Mar", amount: 15800, bookings: 18 },
    { month: "Apr", amount: 22100, bookings: 28 },
    { month: "May", amount: 19500, bookings: 25 },
    { month: "Jun", amount: 25400, bookings: 32 },
    { month: "Jul", amount: 28900, bookings: 35 },
    { month: "Aug", amount: 26700, bookings: 33 },
    { month: "Sep", amount: 23200, bookings: 29 },
    { month: "Oct", amount: 21800, bookings: 27 },
    { month: "Nov", amount: 19400, bookings: 24 },
    { month: "Dec", amount: 16500, bookings: 20 }
  ];

  const equipmentUsage = [
    { name: "Excavators", value: 35, color: "#8884d8" },
    { name: "Cranes", value: 25, color: "#82ca9d" },
    { name: "Dump Trucks", value: 20, color: "#ffc658" },
    { name: "Compactors", value: 12, color: "#ff7c7c" },
    { name: "Others", value: 8, color: "#8dd1e1" }
  ];

  const vendorPerformance = [
    { vendor: "Heavy Equipment Co.", bookings: 45, avgRating: 4.8, totalSpent: 125000 },
    { vendor: "Mega Lifts", bookings: 32, avgRating: 4.9, totalSpent: 98000 },
    { vendor: "City Rentals", bookings: 28, avgRating: 4.6, totalSpent: 67000 },
    { vendor: "Transport Plus", bookings: 22, avgRating: 4.7, totalSpent: 45000 },
    { vendor: "Industrial Works", bookings: 18, avgRating: 4.5, totalSpent: 38000 }
  ];

  const utilizationTrend = [
    { month: "Jan", utilization: 68 },
    { month: "Feb", utilization: 72 },
    { month: "Mar", utilization: 75 },
    { month: "Apr", utilization: 82 },
    { month: "May", utilization: 78 },
    { month: "Jun", utilization: 85 },
    { month: "Jul", utilization: 88 },
    { month: "Aug", utilization: 86 },
    { month: "Sep", utilization: 81 },
    { month: "Oct", utilization: 79 },
    { month: "Nov", utilization: 73 },
    { month: "Dec", utilization: 70 }
  ];

  const topEquipment = [
    { name: "CAT 320 Excavator", bookings: 28, revenue: 84000, utilization: 92 },
    { name: "50-ton Mobile Crane", bookings: 18, revenue: 126000, utilization: 88 },
    { name: "Dump Truck 20-yard", bookings: 35, revenue: 42000, utilization: 85 },
    { name: "Bobcat Skid Steer", bookings: 24, revenue: 36000, utilization: 82 },
    { name: "Compactor Plate", bookings: 15, revenue: 18000, utilization: 78 }
  ];

  const summary = {
    totalSpent: 245600,
    totalBookings: 308,
    avgBookingValue: 797,
    utilizationRate: 79,
    topCategory: "Excavators",
    topVendor: "Heavy Equipment Co.",
    costSavings: 32400,
    activeProjects: 12
  };

  const exportData = () => {
    // Mock export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rental Analytics</h1>
            <p className="text-muted-foreground">Track your equipment usage patterns and spending insights</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
                <SelectItem value="2years">Last 2 Years</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Equipment</SelectItem>
                <SelectItem value="excavators">Excavators</SelectItem>
                <SelectItem value="cranes">Cranes</SelectItem>
                <SelectItem value="trucks">Trucks</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${summary.totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+12.5% from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{summary.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+8.3% from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Booking Value</p>
                  <p className="text-2xl font-bold">${summary.avgBookingValue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+3.7% from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Utilization Rate</p>
                  <p className="text-2xl font-bold">{summary.utilizationRate}%</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+5.2% from last year</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="spending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="usage">Equipment Usage</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="spending" className="space-y-6">
            {/* Monthly Spending Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Equipment Categories Spending */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={equipmentUsage}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {equipmentUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold">Bulk Booking Discounts</span>
                    <span className="text-green-600 font-bold">₹4,33,180 saved</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold">Long-term Contracts</span>
                    <span className="text-blue-600 font-bold">₹7,41,990 saved</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-semibold">Off-peak Rentals</span>
                    <span className="text-purple-600 font-bold">₹2,83,310 saved</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-semibold">Vendor Negotiations</span>
                    <span className="text-orange-600 font-bold">₹12,41,985 saved</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            {/* Top Equipment */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEquipment.map((equipment, index) => (
                    <div key={equipment.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{equipment.name}</p>
                          <p className="text-sm text-muted-foreground">{equipment.bookings} bookings</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${equipment.revenue.toLocaleString()}</p>
                        <Badge variant="outline">{equipment.utilization}% utilized</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Utilization Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Equipment Utilization Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={utilizationTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                    <Line type="monotone" dataKey="utilization" stroke="#82ca9d" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            {/* Vendor Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorPerformance.map((vendor) => (
                    <div key={vendor.vendor} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{vendor.vendor}</p>
                        <p className="text-sm text-muted-foreground">{vendor.bookings} bookings</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="font-semibold">{vendor.avgRating}</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">${vendor.totalSpent.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Total Spent</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Booking Volume vs Spending */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Volume vs Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
                    <Bar dataKey="amount" fill="#82ca9d" name="Amount ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h4 className="font-semibold text-blue-900">Peak Season Preparation</h4>
                  <p className="text-blue-700">Your usage peaks in July-August. Consider booking equipment in advance for better rates.</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h4 className="font-semibold text-green-900">Cost Optimization</h4>
                  <p className="text-green-700">Switching to bulk contracts could save you an estimated ₹12,49,750 annually.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <h4 className="font-semibold text-yellow-900">Vendor Diversification</h4>
                  <p className="text-yellow-700">Consider working with 2-3 additional vendors to improve negotiating power and backup options.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <h4 className="font-semibold text-purple-900">Equipment Efficiency</h4>
                  <p className="text-purple-700">Your excavator utilization is 92%. Consider owning frequently used equipment for long-term savings.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}