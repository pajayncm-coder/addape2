import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Truck,
  BarChart3,
  Download,
  Filter,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Reports = () => {
  const [timeframe, setTimeframe] = useState("last-30-days");
  
  // Mock data for reports
  const spendingData = {
    total: 285420,
    previous: 245380,
    growth: 16.3,
    breakdown: [
      { category: "Excavators", amount: 125000, percentage: 43.8 },
      { category: "Concrete Equipment", amount: 85000, percentage: 29.8 },
      { category: "Cranes", amount: 45000, percentage: 15.8 },
      { category: "Compactors", amount: 30420, percentage: 10.6 }
    ]
  };

  const utilizationData = {
    average: 78,
    projects: [
      { name: "Downtown Office Complex", utilization: 92, status: "active" },
      { name: "Highway Bridge Construction", utilization: 85, status: "active" },
      { name: "Residential Complex Phase 2", utilization: 65, status: "planning" },
      { name: "Industrial Warehouse", utilization: 95, status: "completed" }
    ]
  };

  const costsData = {
    totalSaved: 847000,
    avgDailySavings: 2845,
    costBreakdown: [
      { metric: "Equipment Rental", amount: 285420, trend: "up", change: 16.3 },
      { metric: "Delivery Fees", amount: 12500, trend: "down", change: -8.2 },
      { metric: "Late Fees", amount: 1250, trend: "down", change: -45.6 },
      { metric: "Insurance", amount: 15000, trend: "up", change: 5.2 }
    ]
  };

  const performanceMetrics = [
    { 
      title: "On-Time Delivery", 
      value: "94%", 
      target: "95%", 
      status: "warning",
      icon: Truck 
    },
    { 
      title: "Equipment Uptime", 
      value: "98.5%", 
      target: "98%", 
      status: "success",
      icon: CheckCircle 
    },
    { 
      title: "Project Completion", 
      value: "87%", 
      target: "90%", 
      status: "warning",
      icon: Target 
    },
    { 
      title: "Cost Efficiency", 
      value: "23%", 
      target: "20%", 
      status: "success",
      icon: DollarSign 
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "danger": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
            <p className="text-muted-foreground">
              Track your equipment usage, costs, and project performance
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="shadow-elegant border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
                    <Badge variant={metric.status === "success" ? "secondary" : "outline"}>
                      {metric.status === "success" ? "On Track" : "Needs Attention"}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Target: {metric.target}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="spending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Total Spending */}
              <Card className="shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Total Spending
                  </CardTitle>
                  <CardDescription>Equipment rental costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${spendingData.total.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success">
                      +{spendingData.growth}% from last period
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Previous: ${spendingData.previous.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              {/* Spending Breakdown */}
              <Card className="lg:col-span-2 shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <CardDescription>Equipment type breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {spendingData.breakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm font-semibold">
                          ${item.amount.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="utilization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Average Utilization */}
              <Card className="shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Average Utilization
                  </CardTitle>
                  <CardDescription>Equipment usage efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {utilizationData.average}%
                  </div>
                  <Progress value={utilizationData.average} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    Target: 80% utilization
                  </div>
                </CardContent>
              </Card>

              {/* Project Utilization */}
              <Card className="lg:col-span-2 shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle>Project Utilization</CardTitle>
                  <CardDescription>Equipment usage by project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {utilizationData.projects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-primary/10">
                      <div className="flex-1">
                        <div className="font-medium mb-1">{project.name}</div>
                        <div className="flex items-center gap-2">
                          <Progress value={project.utilization} className="h-2 flex-1" />
                          <span className="text-sm font-semibold w-12">
                            {project.utilization}%
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`ml-4 ${
                          project.status === "active" ? "text-success border-success" :
                          project.status === "completed" ? "text-primary border-primary" :
                          "text-warning border-warning"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Total Savings */}
              <Card className="shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-success" />
                    Total Savings
                  </CardTitle>
                  <CardDescription>Cost optimization results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success mb-2">
                    ${costsData.totalSaved.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. daily savings: ${costsData.avgDailySavings.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card className="lg:col-span-2 shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Detailed cost breakdown with trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {costsData.costBreakdown.map((cost, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-primary/10">
                      <div>
                        <div className="font-medium">{cost.metric}</div>
                        <div className="text-sm text-muted-foreground">
                          ${cost.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        cost.trend === "up" ? "text-destructive" : "text-success"
                      }`}>
                        {cost.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {cost.change > 0 ? "+" : ""}{cost.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Usage Trends */}
              <Card className="shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Usage Trends
                  </CardTitle>
                  <CardDescription>Equipment rental patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/10 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Chart visualization would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Efficiency Metrics */}
              <Card className="shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Efficiency Metrics
                  </CardTitle>
                  <CardDescription>Performance indicators and goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Equipment Availability</span>
                      <span className="text-success font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cost Per Hour</span>
                      <span className="text-primary font-medium">₹20,404</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Project Efficiency</span>
                      <span className="text-warning font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Recommendations
                </CardTitle>
                <CardDescription>AI-powered insights to optimize your operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                  <h4 className="font-medium text-info mb-2">Optimize Equipment Mix</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider reducing excavator usage by 15% and increasing concrete equipment 
                    usage to better match your project requirements and reduce costs.
                  </p>
                </div>
                
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success mb-2">Schedule Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Your current scheduling efficiency is 94%. You could save approximately 
                    ₹4,16,500/month by optimizing delivery schedules and reducing idle time.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning mb-2">Maintenance Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Equipment downtime has increased by 8% this month. Review maintenance 
                    schedules and consider preventive measures to reduce unexpected failures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;