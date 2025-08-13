import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Plus, Edit, Trash2, Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function BookingTemplates() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [templates, setTemplates] = useState([
    {
      id: "TPL-001",
      name: "Standard Excavation Project",
      description: "Complete setup for residential excavation projects",
      equipment: [
        { name: "CAT 320 Excavator", duration: "5 days" },
        { name: "Dump Truck", duration: "5 days" },
        { name: "Compactor", duration: "2 days" }
      ],
      location: "To be specified",
      deliveryTime: "07:00",
      pickupTime: "17:00",
      specialInstructions: "Ensure clear access for delivery. Site contact required.",
      estimatedCost: 4200,
      usageCount: 12,
      lastUsed: "2024-02-28",
      isFavorite: true,
      tags: ["excavation", "residential", "multi-equipment"]
    },
    {
      id: "TPL-002",
      name: "Single Day Crane Job",
      description: "Quick crane rental for lifting operations",
      equipment: [
        { name: "50-ton Mobile Crane", duration: "1 day" }
      ],
      location: "To be specified",
      deliveryTime: "06:00",
      pickupTime: "18:00",
      specialInstructions: "Certified operator required. Clear overhead access needed.",
      estimatedCost: 3500,
      usageCount: 8,
      lastUsed: "2024-03-05",
      isFavorite: false,
      tags: ["crane", "single-day", "heavy-lifting"]
    },
    {
      id: "TPL-003",
      name: "Road Construction Package",
      description: "Complete equipment set for road construction",
      equipment: [
        { name: "Asphalt Paver", duration: "10 days" },
        { name: "Road Roller", duration: "10 days" },
        { name: "Dump Truck", duration: "10 days" },
        { name: "Compactor", duration: "8 days" }
      ],
      location: "To be specified",
      deliveryTime: "06:00",
      pickupTime: "18:00",
      specialInstructions: "Staged delivery required. Traffic control permits needed.",
      estimatedCost: 15600,
      usageCount: 4,
      lastUsed: "2024-01-15",
      isFavorite: true,
      tags: ["road-construction", "long-term", "multiple-equipment"]
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    equipment: [{ name: "", duration: "" }],
    location: "",
    deliveryTime: "",
    pickupTime: "",
    specialInstructions: "",
    tags: ""
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const addEquipmentField = () => {
    setNewTemplate(prev => ({
      ...prev,
      equipment: [...prev.equipment, { name: "", duration: "" }]
    }));
  };

  const removeEquipmentField = (index: number) => {
    setNewTemplate(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  const updateEquipmentField = (index: number, field: string, value: string) => {
    setNewTemplate(prev => ({
      ...prev,
      equipment: prev.equipment.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const toggleFavorite = (id: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    toast({
      title: "Template Deleted",
      description: "Booking template has been deleted.",
    });
  };

  const duplicateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: `TPL-${Date.now()}`,
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastUsed: new Date().toISOString().split('T')[0]
    };
    setTemplates(prev => [...prev, newTemplate]);
    toast({
      title: "Template Duplicated",
      description: "A copy of the template has been created.",
    });
  };

  const useTemplate = (template: any) => {
    toast({
      title: "Using Template",
      description: "Redirecting to booking with template configuration...",
    });
    // Navigate to booking with template data
    navigate("/customer/search", { state: { template } });
  };

  const createTemplate = () => {
    if (!newTemplate.name || !newTemplate.equipment[0].name) {
      toast({
        title: "Missing Information",
        description: "Please provide a template name and at least one equipment item.",
        variant: "destructive"
      });
      return;
    }

    const template = {
      id: `TPL-${Date.now()}`,
      ...newTemplate,
      tags: newTemplate.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      estimatedCost: 2500, // This would be calculated based on equipment
      usageCount: 0,
      lastUsed: "",
      isFavorite: false
    };

    setTemplates(prev => [...prev, template as any]);
    setNewTemplate({
      name: "",
      description: "",
      equipment: [{ name: "", duration: "" }],
      location: "",
      deliveryTime: "",
      pickupTime: "",
      specialInstructions: "",
      tags: ""
    });
    setIsCreating(false);

    toast({
      title: "Template Created",
      description: "Your booking template has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booking Templates</h1>
            <p className="text-muted-foreground">Save and reuse common equipment booking configurations</p>
          </div>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Booking Template</DialogTitle>
                <DialogDescription>
                  Create a reusable template for common equipment booking configurations
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Template Name *</Label>
                    <Input
                      placeholder="e.g., Standard Excavation Project"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <Input
                      placeholder="excavation, residential, multi-equipment"
                      value={newTemplate.tags}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Brief description of this template's purpose..."
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Equipment *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEquipmentField}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Equipment
                    </Button>
                  </div>
                  
                  {newTemplate.equipment.map((item, index) => (
                    <div key={index} className="grid md:grid-cols-3 gap-3 items-end">
                      <div className="space-y-2">
                        <Input
                          placeholder="Equipment name"
                          value={item.name}
                          onChange={(e) => updateEquipmentField(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          placeholder="Duration (e.g., 3 days)"
                          value={item.duration}
                          onChange={(e) => updateEquipmentField(index, "duration", e.target.value)}
                        />
                      </div>
                      <div>
                        {newTemplate.equipment.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeEquipmentField(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Default Location</Label>
                  <Input
                    placeholder="Leave blank to specify for each booking"
                    value={newTemplate.location}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Delivery Time</Label>
                    <Input
                      type="time"
                      value={newTemplate.deliveryTime}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, deliveryTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Pickup Time</Label>
                    <Input
                      type="time"
                      value={newTemplate.pickupTime}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, pickupTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Special Instructions</Label>
                  <Textarea
                    placeholder="Default instructions for this type of booking..."
                    value={newTemplate.specialInstructions}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={createTemplate} className="flex-1">
                    Create Template
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Templates Grid */}
        <div className="space-y-6">
          {templates.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Templates Created</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first booking template to save time on future rentals
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </CardContent>
            </Card>
          ) : (
            templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Bookmark className="w-5 h-5" />
                          {template.name}
                        </CardTitle>
                        {template.isFavorite && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-muted-foreground">{template.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(template.id)}
                        title="Toggle Favorite"
                      >
                        <Star className={`w-4 h-4 ${template.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => duplicateTemplate(template)}
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteTemplate(template.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Equipment List */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Equipment ({template.equipment.length})</h4>
                      <div className="space-y-2">
                        {template.equipment.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span className="text-muted-foreground">{item.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Default Settings */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Default Settings</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span>{template.location || "To be specified"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Delivery: </span>
                          <span>{template.deliveryTime || "Not set"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pickup: </span>
                          <span>{template.pickupTime || "Not set"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Usage Statistics</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Used: </span>
                          <span>{template.usageCount} times</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last used: </span>
                          <span>{template.lastUsed || "Never"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Est. cost: </span>
                          <span className="font-semibold">${template.estimatedCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {template.specialInstructions && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h4 className="font-semibold mb-2">Special Instructions</h4>
                        <p className="text-sm text-muted-foreground">{template.specialInstructions}</p>
                      </div>
                    </>
                  )}

                  <Separator className="my-4" />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => useTemplate(template)} className="flex-1">
                      Use This Template
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Edit Template
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => duplicateTemplate(template)}
                      className="flex-1"
                    >
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}