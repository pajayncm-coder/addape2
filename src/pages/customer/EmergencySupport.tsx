import { useState } from "react";
import { Phone, MessageCircle, AlertTriangle, Clock, CheckCircle, MapPin, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function EmergencySupport() {
  const { toast } = useToast();

  const [emergencyForm, setEmergencyForm] = useState({
    type: "",
    severity: "",
    equipmentId: "",
    location: "",
    description: "",
    contactName: "",
    contactPhone: "",
    safetyStatus: ""
  });

  const [recentTickets] = useState([
    {
      id: "ES-001",
      type: "Equipment Malfunction",
      severity: "high",
      equipment: "CAT 320 Excavator",
      status: "resolved",
      createdAt: "2024-03-10 14:30",
      resolvedAt: "2024-03-10 16:45",
      description: "Hydraulic system failure during operation"
    },
    {
      id: "ES-002", 
      type: "Delivery Issue",
      severity: "medium",
      equipment: "Mobile Crane",
      status: "in-progress",
      createdAt: "2024-03-08 09:15",
      resolvedAt: null,
      description: "Equipment not delivered at scheduled time"
    },
    {
      id: "ES-003",
      type: "Safety Incident",
      severity: "critical",
      equipment: "Dump Truck",
      status: "resolved",
      createdAt: "2024-03-05 11:20",
      resolvedAt: "2024-03-05 12:30",
      description: "Brake system warning during operation"
    }
  ]);

  const emergencyTypes = [
    "Equipment Malfunction",
    "Safety Incident", 
    "Delivery Issue",
    "Operator Injury",
    "Equipment Damage",
    "Site Emergency",
    "Other"
  ];

  const severityLevels = [
    { value: "critical", label: "Critical - Immediate danger", color: "bg-red-100 text-red-800" },
    { value: "high", label: "High - Equipment down", color: "bg-orange-100 text-orange-800" },
    { value: "medium", label: "Medium - Affecting operations", color: "bg-yellow-100 text-yellow-800" },
    { value: "low", label: "Low - Minor issue", color: "bg-green-100 text-green-800" }
  ];

  const safetyStatusOptions = [
    "All personnel safe",
    "Minor injury reported",
    "Serious injury reported", 
    "Emergency services called",
    "Site evacuated"
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const submitEmergencyRequest = () => {
    if (!emergencyForm.type || !emergencyForm.severity || !emergencyForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate ticket ID
    const ticketId = `ES-${Date.now()}`;
    
    toast({
      title: "Emergency Request Submitted",
      description: `Ticket ${ticketId} created. Our emergency team will contact you immediately.`,
    });

    // Reset form
    setEmergencyForm({
      type: "",
      severity: "",
      equipmentId: "",
      location: "",
      description: "",
      contactName: "",
      contactPhone: "",
      safetyStatus: ""
    });
  };

  const callEmergencyHotline = () => {
    // In a real app, this might trigger a phone call
    toast({
      title: "Calling Emergency Hotline",
      description: "Connecting you to our 24/7 emergency support team...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            Emergency Support
          </h1>
          <p className="text-muted-foreground">24/7 emergency assistance for equipment issues and safety incidents</p>
        </div>

        {/* Emergency Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-semibold text-red-900 mb-2">Critical Emergency</h3>
              <p className="text-sm text-red-700 mb-4">Immediate danger or serious injury</p>
              <Button 
                variant="destructive" 
                onClick={callEmergencyHotline}
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Hotline
              </Button>
              <p className="text-xs text-red-600 mt-2">Available 24/7</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-orange-900 mb-2">Equipment Breakdown</h3>
              <p className="text-sm text-orange-700 mb-4">Equipment malfunction or failure</p>
              <Button variant="outline" className="w-full border-orange-300 text-orange-700">
                <Phone className="w-4 h-4 mr-2" />
                Call Support: 1-800-EQUIP-911
              </Button>
              <p className="text-xs text-orange-600 mt-2">Response time: 15-30 min</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Live Chat Support</h3>
              <p className="text-sm text-blue-700 mb-4">Real-time assistance and guidance</p>
              <Button variant="outline" className="w-full border-blue-300 text-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
              <p className="text-xs text-blue-600 mt-2">Average response: 2 min</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="report" className="space-y-6">
          <TabsList>
            <TabsTrigger value="report">Report Emergency</TabsTrigger>
            <TabsTrigger value="history">Support History</TabsTrigger>
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Emergency or Issue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>For life-threatening emergencies, call 911 immediately.</strong> 
                    Use this form for equipment-related emergencies and safety incidents.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Emergency Type *</Label>
                      <Select value={emergencyForm.type} onValueChange={(value) => setEmergencyForm(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select emergency type" />
                        </SelectTrigger>
                        <SelectContent>
                          {emergencyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Severity Level *</Label>
                      <Select value={emergencyForm.severity} onValueChange={(value) => setEmergencyForm(prev => ({ ...prev, severity: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          {severityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Equipment ID/Name</Label>
                      <Input
                        placeholder="e.g., CAT-320-001 or Excavator"
                        value={emergencyForm.equipmentId}
                        onChange={(e) => setEmergencyForm(prev => ({ ...prev, equipmentId: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Input
                        placeholder="Current location of incident"
                        value={emergencyForm.location}
                        onChange={(e) => setEmergencyForm(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Safety Status *</Label>
                      <Select value={emergencyForm.safetyStatus} onValueChange={(value) => setEmergencyForm(prev => ({ ...prev, safetyStatus: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select safety status" />
                        </SelectTrigger>
                        <SelectContent>
                          {safetyStatusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Contact Name</Label>
                      <Input
                        placeholder="Your name"
                        value={emergencyForm.contactName}
                        onChange={(e) => setEmergencyForm(prev => ({ ...prev, contactName: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Contact Phone *</Label>
                      <Input
                        placeholder="Phone number for immediate contact"
                        value={emergencyForm.contactPhone}
                        onChange={(e) => setEmergencyForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Incident Description *</Label>
                  <Textarea
                    placeholder="Provide detailed description of the incident, what happened, current status, and any immediate actions taken..."
                    rows={4}
                    value={emergencyForm.description}
                    onChange={(e) => setEmergencyForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {emergencyForm.severity && (
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Response Information</h4>
                    <div className="space-y-2 text-sm">
                      {emergencyForm.severity === "critical" && (
                        <p className="text-red-600">
                          <strong>Critical Priority:</strong> Emergency team will be dispatched immediately. 
                          Expected response time: 5-15 minutes.
                        </p>
                      )}
                      {emergencyForm.severity === "high" && (
                        <p className="text-orange-600">
                          <strong>High Priority:</strong> Technical support team will contact you within 15 minutes. 
                          Field technician dispatch if needed.
                        </p>
                      )}
                      {emergencyForm.severity === "medium" && (
                        <p className="text-yellow-600">
                          <strong>Medium Priority:</strong> Support team will contact you within 30 minutes. 
                          Remote assistance provided first.
                        </p>
                      )}
                      {emergencyForm.severity === "low" && (
                        <p className="text-green-600">
                          <strong>Low Priority:</strong> Support ticket created. 
                          Response within 1-2 hours during business hours.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <Button onClick={submitEmergencyRequest} className="w-full" size="lg">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Submit Emergency Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Emergency Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{ticket.id}</h4>
                            <Badge className={getSeverityColor(ticket.severity)}>
                              {ticket.severity}
                            </Badge>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{ticket.type} - {ticket.equipment}</p>
                          <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Created: {ticket.createdAt}</span>
                          </div>
                          {ticket.resolvedAt && (
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Resolved: {ticket.resolvedAt}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Hotlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-semibold">Critical Emergency</p>
                        <p className="text-sm text-muted-foreground">Life-threatening situations</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">911</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-semibold">Equipment Emergency</p>
                        <p className="text-sm text-muted-foreground">24/7 technical support</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">1-800-EQUIP-911</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">Live Chat Support</p>
                        <p className="text-sm text-muted-foreground">Real-time assistance</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Start Chat</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Support Centers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">Downtown Center</span>
                      </div>
                      <p className="text-sm text-muted-foreground">123 Main St, Downtown</p>
                      <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Coverage: Central & South Districts</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">Industrial Zone</span>
                      </div>
                      <p className="text-sm text-muted-foreground">456 Industrial Blvd</p>
                      <p className="text-sm text-muted-foreground">Phone: (555) 987-6543</p>
                      <p className="text-sm text-muted-foreground">Coverage: Industrial & Harbor Areas</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">North Branch</span>
                      </div>
                      <p className="text-sm text-muted-foreground">789 North Ave</p>
                      <p className="text-sm text-muted-foreground">Phone: (555) 456-7890</p>
                      <p className="text-sm text-muted-foreground">Coverage: North & East Districts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Equipment Malfunction</h4>
                    <ol className="text-sm space-y-2">
                      <li>1. Immediately stop operation and secure the area</li>
                      <li>2. Ensure all personnel are at a safe distance</li>
                      <li>3. Call emergency hotline: 1-800-EQUIP-911</li>
                      <li>4. Do not attempt repairs unless certified</li>
                      <li>5. Document the incident with photos if safe</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Safety Incident</h4>
                    <ol className="text-sm space-y-2">
                      <li>1. Call 911 if anyone is injured</li>
                      <li>2. Secure the incident area</li>
                      <li>3. Provide first aid if trained and safe to do so</li>
                      <li>4. Contact emergency support: 1-800-EQUIP-911</li>
                      <li>5. Complete incident report within 24 hours</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}