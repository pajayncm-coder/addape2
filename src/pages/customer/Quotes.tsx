import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Calendar,
  MapPin,
  Truck,
  MessageCircle,
  Filter,
  Search,
  Download
} from "lucide-react";
import { Header } from "@/components/Header";

const Quotes = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      equipment: "CAT 320 Excavator",
      supplier: "Heavy Equipment Co.",
      project: "Downtown Office Complex",
      requestDate: "2024-07-25",
      responseDate: "2024-07-26",
      amount: 2500,
      duration: "5 days",
      status: "pending",
      location: "New York, NY",
      notes: "Includes operator and fuel",
      validUntil: "2024-08-05"
    },
    {
      id: 2,
      equipment: "Concrete Mixer Truck",
      supplier: "Construction Supply Plus",
      project: "Downtown Office Complex",
      requestDate: "2024-07-24",
      responseDate: "2024-07-25",
      amount: 1800,
      duration: "3 days",
      status: "approved",
      location: "Brooklyn, NY",
      notes: "Clean record, experienced driver",
      validUntil: "2024-08-10"
    },
    {
      id: 3,
      equipment: "Tower Crane",
      supplier: "Metro Crane Services",
      project: "Highway Bridge Construction",
      requestDate: "2024-07-23",
      responseDate: "2024-07-24",
      amount: 5200,
      duration: "10 days",
      status: "rejected",
      location: "Manhattan, NY",
      notes: "Equipment not available for requested dates",
      validUntil: "2024-07-30"
    },
    {
      id: 4,
      equipment: "Bulldozer D6T",
      supplier: "Alpha Construction Equipment",
      project: "Residential Complex Phase 2",
      requestDate: "2024-07-22",
      responseDate: null,
      amount: 3200,
      duration: "7 days",
      status: "awaiting_response",
      location: "Queens, NY",
      notes: "Rush job, need ASAP",
      validUntil: "2024-08-15"
    }
  ]);

  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      case "awaiting_response": return "bg-info/10 text-info border-info/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      case "awaiting_response": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesStatus = filterStatus === "all" || quote.status === filterStatus;
    const matchesSearch = quote.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quote Requests</h1>
            <p className="text-muted-foreground">
              Manage your equipment quote requests and responses
            </p>
          </div>
          
          <Dialog open={isNewQuoteOpen} onOpenChange={setIsNewQuoteOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                New Quote Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Request Equipment Quote</DialogTitle>
                <DialogDescription>
                  Submit a quote request to suppliers for equipment rental
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Equipment Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excavator">Excavator</SelectItem>
                      <SelectItem value="crane">Crane</SelectItem>
                      <SelectItem value="bulldozer">Bulldozer</SelectItem>
                      <SelectItem value="mixer">Concrete Mixer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Project</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Office Complex</SelectItem>
                      <SelectItem value="bridge">Highway Bridge Construction</SelectItem>
                      <SelectItem value="residential">Residential Complex Phase 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration</label>
                    <Input placeholder="e.g., 5 days" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Project location" />
                </div>
                <div>
                  <label className="text-sm font-medium">Special Requirements</label>
                  <Textarea placeholder="Any specific requirements or notes" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsNewQuoteOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-primary">
                    Send Request
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6 shadow-elegant border-primary/10">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search quotes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quotes</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="awaiting_response">Awaiting Response</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-elegant transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Quote Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {quote.equipment}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Supplier: {quote.supplier}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Project: {quote.project}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(quote.status)}
                      >
                        {getStatusIcon(quote.status)}
                        <span className="ml-1 capitalize">
                          {quote.status.replace("_", " ")}
                        </span>
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {quote.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {quote.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        Requested: {quote.requestDate}
                      </span>
                    </div>

                    {quote.notes && (
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        "{quote.notes}"
                      </p>
                    )}
                  </div>

                  {/* Quote Details */}
                  <div className="text-center">
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Quote Amount
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ${quote.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per day
                    </div>
                    {quote.validUntil && (
                      <div className="text-xs text-muted-foreground mt-2">
                        Valid until: {quote.validUntil}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {quote.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept Quote
                        </Button>
                        <Button variant="outline" size="sm">
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </>
                    )}
                    
                    {quote.status === "approved" && (
                      <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Delivery
                      </Button>
                    )}

                    {quote.status === "awaiting_response" && (
                      <Button variant="outline" size="sm" disabled>
                        <Clock className="h-4 w-4 mr-1" />
                        Waiting for Response
                      </Button>
                    )}

                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message Supplier
                    </Button>

                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuotes.length === 0 && (
          <Card className="text-center py-12 shadow-elegant border-primary/10">
            <CardContent>
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No quotes found
              </h3>
              <p className="text-muted-foreground mb-4">
                {filterStatus === "all" 
                  ? "Create your first quote request to get started" 
                  : `No quotes with status "${filterStatus}"`
                }
              </p>
              {filterStatus === "all" ? (
                <Button 
                  className="bg-gradient-primary hover:shadow-glow"
                  onClick={() => setIsNewQuoteOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Request Quote
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setFilterStatus("all")}>
                  Show All Quotes
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Quotes;