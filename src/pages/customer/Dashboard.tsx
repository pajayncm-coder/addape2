import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  MapPin,
  DollarSign
} from "lucide-react";
import { Header } from "@/components/Header";

const Dashboard = () => {
  const [activeProjects] = useState([
    {
      id: 1,
      name: "Downtown Office Complex",
      equipment: 5,
      progress: 75,
      status: "active",
      location: "New York, NY",
      budget: "₹1,04,12,500",
      deadline: "Dec 15, 2024"
    },
    {
      id: 2,
      name: "Highway Bridge Construction",
      equipment: 8,
      progress: 45,
      status: "active",
      location: "Austin, TX",
      budget: "₹2,33,24,000",
      deadline: "Jan 30, 2025"
    }
  ]);

  const [recentQuotes] = useState([
    {
      id: 1,
      equipment: "CAT 320 Excavator",
      supplier: "Heavy Equipment Co.",
      amount: "₹2,08,250/day",
      status: "pending",
      submitted: "2 hours ago"
    },
    {
      id: 2,
      equipment: "Concrete Mixer Truck",
      supplier: "Construction Supply Plus",
      amount: "₹1,49,940/day",
      status: "approved",
      submitted: "1 day ago"
    },
    {
      id: 3,
      equipment: "Tower Crane",
      supplier: "Metro Crane Services",
      amount: "₹4,33,180/day",
      status: "rejected",
      submitted: "3 days ago"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Manage your construction projects and equipment rentals
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link to="/customer/search">
            <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 text-center">
                <Search className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Search Equipment</h3>
                <p className="text-sm text-muted-foreground">Find the perfect equipment</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/customer/projects">
            <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">New Project</h3>
                <p className="text-sm text-muted-foreground">Start a new project</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/customer/quotes">
            <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">View Quotes</h3>
                <p className="text-sm text-muted-foreground">Manage quote requests</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/customer/reports">
            <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Reports</h3>
                <p className="text-sm text-muted-foreground">View project analytics</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Active Projects
                </CardTitle>
                <CardDescription>
                  Track your ongoing construction projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-card rounded-lg border border-primary/10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{project.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </span>
                          <span>{project.budget}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{project.equipment} Equipment</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-primary/10">
                      <span className="text-sm text-muted-foreground">
                        Due: {project.deadline}
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Quotes */}
          <div>
            <Card className="shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Quotes
                </CardTitle>
                <CardDescription>
                  Latest quote requests and responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="p-3 bg-card rounded-lg border border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-sm text-foreground">
                        {quote.equipment}
                      </h5>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(quote.status)}
                      >
                        {quote.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {quote.supplier}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">{quote.amount}</span>
                      <span className="text-xs text-muted-foreground">
                        {quote.submitted}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Quotes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">12</h3>
              <p className="text-sm text-muted-foreground">Completed Projects</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">5</h3>
              <p className="text-sm text-muted-foreground">Pending Quotes</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">₹7,05,91,570</h3>
              <p className="text-sm text-muted-foreground">Total Saved</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <AlertCircle className="h-8 w-8 text-info mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">24</h3>
              <p className="text-sm text-muted-foreground">Active Equipment</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;