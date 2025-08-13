import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Calendar, Download, Target } from "lucide-react";

export default function SupplierAnalytics() {
  const revenueData = [
    { month: "Jan", revenue: 65000, orders: 12 },
    { month: "Feb", revenue: 78000, orders: 15 },
    { month: "Mar", revenue: 92000, orders: 18 },
    { month: "Apr", revenue: 85000, orders: 16 },
    { month: "May", revenue: 105000, orders: 22 },
    { month: "Jun", revenue: 118000, orders: 25 },
    { month: "Jul", revenue: 134000, orders: 28 }
  ];

  const equipmentPerformance = [
    { name: "Excavators", utilization: 85, revenue: 45000, orders: 12 },
    { name: "Cranes", utilization: 78, revenue: 38000, orders: 8 },
    { name: "Mixers", utilization: 92, revenue: 25000, orders: 18 },
    { name: "Bulldozers", utilization: 70, revenue: 22000, orders: 6 },
    { name: "Attachments", utilization: 65, revenue: 15000, orders: 15 }
  ];

  const customerSegments = [
    { name: "Construction Companies", value: 45, color: "#8884d8" },
    { name: "Infrastructure Projects", value: 30, color: "#82ca9d" },
    { name: "Individual Contractors", value: 15, color: "#ffc658" },
    { name: "Government Projects", value: 10, color: "#ff7300" }
  ];

  const topCustomers = [
    { name: "ABC Construction Ltd", orders: 8, revenue: 45000, growth: 12 },
    { name: "Metro Infrastructure", orders: 6, revenue: 38000, growth: 8 },
    { name: "XYZ Builders", orders: 12, revenue: 25000, growth: -5 },
    { name: "Green Valley Projects", orders: 4, revenue: 18000, growth: 15 },
    { name: "Skyline Constructions", orders: 7, revenue: 22000, growth: 3 }
  ];

  const utilizationTrend = [
    { week: "Week 1", utilization: 75 },
    { week: "Week 2", utilization: 82 },
    { week: "Week 3", utilization: 78 },
    { week: "Week 4", utilization: 85 },
    { week: "Week 5", utilization: 88 },
    { week: "Week 6", utilization: 92 },
    { week: "Week 7", utilization: 89 }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Analytics</h1>
          <p className="text-muted-foreground">Insights into your equipment rental business performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 3 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,45,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +3.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.4% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and order count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Orders'
                ]} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Equipment Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Utilization Trend</CardTitle>
            <CardDescription>Weekly utilization rate across all equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={utilizationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                <Line type="monotone" dataKey="utilization" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Category Performance</CardTitle>
            <CardDescription>Utilization and revenue by equipment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipmentPerformance.map((equipment) => (
                <div key={equipment.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{equipment.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{equipment.orders} orders</span>
                      <span className="font-semibold">₹{equipment.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={equipment.utilization} className="flex-1" />
                    <span className="text-sm font-medium">{equipment.utilization}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Revenue distribution by customer type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Your most valuable customers by revenue and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} orders this month</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{customer.revenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    {customer.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${customer.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {customer.growth > 0 ? '+' : ''}{customer.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}