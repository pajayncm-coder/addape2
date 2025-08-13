import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Truck,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Filter
} from "lucide-react";
import { Header } from "@/components/Header";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Downtown Office Complex",
      description: "25-story commercial building construction",
      location: "New York, NY",
      status: "active",
      progress: 75,
      startDate: "2024-08-15",
      endDate: "2024-12-15",
      budget: 125000,
      equipmentCount: 5,
      teamSize: 12,
      priority: "high"
    },
    {
      id: 2,
      name: "Highway Bridge Construction",
      description: "Interstate bridge replacement project",
      location: "Austin, TX",
      status: "active",
      progress: 45,
      startDate: "2024-09-01",
      endDate: "2025-01-30",
      budget: 280000,
      equipmentCount: 8,
      teamSize: 18,
      priority: "medium"
    },
    {
      id: 3,
      name: "Residential Complex Phase 2",
      description: "200-unit apartment construction",
      location: "Miami, FL",
      status: "planning",
      progress: 10,
      startDate: "2024-11-01",
      endDate: "2025-06-30",
      budget: 95000,
      equipmentCount: 3,
      teamSize: 8,
      priority: "low"
    },
    {
      id: 4,
      name: "Industrial Warehouse",
      description: "Logistics center construction",
      location: "Chicago, IL",
      status: "completed",
      progress: 100,
      startDate: "2024-03-01",
      endDate: "2024-07-30",
      budget: 180000,
      equipmentCount: 6,
      teamSize: 15,
      priority: "high"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "planning": return "bg-info/10 text-info border-info/20";
      case "completed": return "bg-primary/10 text-primary border-primary/20";
      case "paused": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const filteredProjects = projects.filter(project => 
    filterStatus === "all" || project.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Manage and track your construction projects
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Start a new construction project and track its progress
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <Input placeholder="Enter project name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Project description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Project location" />
                </div>
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-primary">
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-elegant border-primary/10">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Badge variant="outline">{filteredProjects.length} projects</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-elegant transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(project.status)}
                  >
                    {project.status}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getPriorityColor(project.priority)} border-current`}
                  >
                    {project.priority} priority
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Project Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>${project.budget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/10">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Truck className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Equipment</span>
                    </div>
                    <span className="font-semibold text-foreground">{project.equipmentCount}</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Team</span>
                    </div>
                    <span className="font-semibold text-foreground">{project.teamSize}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="text-center py-12 shadow-elegant border-primary/10">
            <CardContent>
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-4">
                {filterStatus === "all" 
                  ? "Create your first project to get started" 
                  : `No projects with status "${filterStatus}"`
                }
              </p>
              {filterStatus === "all" ? (
                <Button 
                  className="bg-gradient-primary hover:shadow-glow"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setFilterStatus("all")}>
                  Show All Projects
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Projects;