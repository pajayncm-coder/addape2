import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar, 
  Truck, 
  Shield, 
  Award,
  MessageSquare,
  Heart,
  Share2
} from "lucide-react";

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock equipment data - in real app, fetch based on id
  const equipment = {
    id: id || "1",
    name: "CAT 320 Excavator",
    category: "Excavators",
    rating: 4.8,
    reviewCount: 127,
    pricePerDay: 350,
    pricePerWeek: 2100,
    pricePerMonth: 8000,
    location: "Houston, TX",
    availability: "Available",
    description: "Heavy-duty excavator perfect for construction, demolition, and earthmoving projects. Features advanced hydraulics and operator comfort systems.",
    specifications: {
      "Operating Weight": "20,300 kg",
      "Engine Power": "122 kW",
      "Bucket Capacity": "0.9 m³",
      "Max Dig Depth": "6.5 m",
      "Max Reach": "9.9 m",
      "Transport Length": "9.4 m",
      "Transport Width": "2.5 m",
      "Transport Height": "2.9 m"
    },
    features: [
      "GPS Tracking System",
      "Climate Control Cab",
      "LED Work Lights",
      "Backup Camera",
      "Advanced Hydraulics",
      "Fuel Efficient Engine"
    ],
    supplier: {
      name: "Houston Heavy Equipment",
      rating: 4.9,
      yearsInBusiness: 15,
      totalEquipment: 200,
      avatar: "/placeholder.svg"
    },
    images: [
      "/placeholder.svg",
      "/placeholder.svg", 
      "/placeholder.svg"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/customer/search" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <img 
                    src={equipment.images[0]} 
                    alt={equipment.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="flex gap-2 p-4">
                  {equipment.images.slice(1).map((img, idx) => (
                    <div key={idx} className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center cursor-pointer">
                      <img src={img} alt={`${equipment.name} ${idx + 2}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Info */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl">{equipment.name}</CardTitle>
                      <Badge variant="secondary">{equipment.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{equipment.rating}</span>
                        <span>({equipment.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{equipment.location}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {equipment.availability}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{equipment.description}</p>
                
                <Tabs defaultValue="specifications" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="specifications" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(equipment.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-border">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equipment.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-4">
                      {/* Mock reviews */}
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Excellent excavator, very reliable and efficient. The operator cab is comfortable for long work days.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle>Rental Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Daily Rate</span>
                    <span className="font-bold text-lg">${equipment.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weekly Rate</span>
                    <span className="font-bold text-lg">${equipment.pricePerWeek}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Rate</span>
                    <span className="font-bold text-lg">${equipment.pricePerMonth}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Request Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/customer/booking/${equipment.id}`)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Supplier
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Info */}
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={equipment.supplier.avatar} />
                    <AvatarFallback>HH</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{equipment.supplier.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{equipment.supplier.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Years in Business</span>
                    <span>{equipment.supplier.yearsInBusiness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Equipment</span>
                    <span>{equipment.supplier.totalEquipment}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View Supplier Profile
                </Button>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Delivery Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Certified Operators</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Insurance Coverage</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;