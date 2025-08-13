import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Star, MapPin, DollarSign, Calendar, Wrench, Fuel, Weight, Ruler } from "lucide-react";

const EquipmentComparison = () => {
  const [compareItems, setCompareItems] = useState([
    {
      id: 1,
      name: "Caterpillar 320 Excavator",
      category: "Excavators",
      dailyRate: 450,
      weeklyRate: 2250,
      monthlyRate: 8500,
      rating: 4.8,
      reviews: 124,
      location: "Downtown Depot",
      image: "/placeholder.svg",
      specs: {
        weight: "20,500 kg",
        bucketCapacity: "1.2 m³",
        maxDigDepth: "6.5 m",
        fuelCapacity: "400 L",
        engine: "Cat C7.1 ACERT"
      },
      features: ["GPS Tracking", "Auto-Idle", "Hydraulic Quick Coupler", "LED Work Lights"]
    },
    {
      id: 2,
      name: "Komatsu PC200 Excavator",
      category: "Excavators",
      dailyRate: 425,
      weeklyRate: 2100,
      monthlyRate: 8000,
      rating: 4.6,
      reviews: 89,
      location: "North Yard",
      image: "/placeholder.svg",
      specs: {
        weight: "19,800 kg",
        bucketCapacity: "1.0 m³",
        maxDigDepth: "6.4 m",
        fuelCapacity: "380 L",
        engine: "Komatsu SAA4D107E-2"
      },
      features: ["KOMTRAX System", "Eco Mode", "Anti-Theft System", "Reversible Fan"]
    }
  ]);

  const [availableEquipment] = useState([
    {
      id: 3,
      name: "John Deere 310L Backhoe",
      category: "Backhoes",
      dailyRate: 350,
      weeklyRate: 1750,
      monthlyRate: 6500,
      rating: 4.7,
      reviews: 156,
      location: "South Branch",
      image: "/placeholder.svg",
      specs: {
        weight: "8,200 kg",
        bucketCapacity: "0.27 m³",
        maxDigDepth: "4.3 m",
        fuelCapacity: "151 L",
        engine: "John Deere 4045T"
      },
      features: ["4WD", "Side-Shift", "Extendahoe", "PowerShift Transmission"]
    },
    {
      id: 4,
      name: "Bobcat S650 Skid Steer",
      category: "Skid Steers",
      dailyRate: 275,
      weeklyRate: 1375,
      monthlyRate: 5200,
      rating: 4.5,
      reviews: 203,
      location: "East Facility",
      image: "/placeholder.svg",
      specs: {
        weight: "3,300 kg",
        bucketCapacity: "0.5 m³",
        maxDigDepth: "N/A",
        fuelCapacity: "95 L",
        engine: "Kubota V2607-DI-T"
      },
      features: ["Selectable Joystick", "Bob-Tach", "Pressurized Cab", "LED Lighting"]
    }
  ]);

  const removeFromComparison = (id: number) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };

  const addToComparison = (equipment: any) => {
    if (compareItems.length < 4 && !compareItems.find(item => item.id === equipment.id)) {
      setCompareItems(prev => [...prev, equipment]);
    }
  };

  const getLowestPrice = (items: any[], priceType: 'dailyRate' | 'weeklyRate' | 'monthlyRate') => {
    return Math.min(...items.map(item => item[priceType]));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Equipment Comparison</h1>
          <p className="text-muted-foreground">Compare up to 4 pieces of equipment side by side</p>
        </div>

        {compareItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No equipment selected for comparison</h3>
                <p className="text-muted-foreground mb-6">Add equipment from your search results or browse our catalog</p>
                <Button>Browse Equipment</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Comparing {compareItems.length} item{compareItems.length > 1 ? 's' : ''}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setCompareItems([])}
                disabled={compareItems.length === 0}
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {compareItems.map((item) => (
                <Card key={item.id} className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeFromComparison(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <CardHeader className="pb-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {item.rating} ({item.reviews} reviews)
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Pricing</h4>
                      <div className="space-y-1 text-sm">
                        <div className={`flex justify-between ${item.dailyRate === getLowestPrice(compareItems, 'dailyRate') ? 'text-green-600 font-medium' : ''}`}>
                          <span>Daily:</span>
                          <span>${item.dailyRate}</span>
                        </div>
                        <div className={`flex justify-between ${item.weeklyRate === getLowestPrice(compareItems, 'weeklyRate') ? 'text-green-600 font-medium' : ''}`}>
                          <span>Weekly:</span>
                          <span>${item.weeklyRate}</span>
                        </div>
                        <div className={`flex justify-between ${item.monthlyRate === getLowestPrice(compareItems, 'monthlyRate') ? 'text-green-600 font-medium' : ''}`}>
                          <span>Monthly:</span>
                          <span>${item.monthlyRate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Specifications</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Weight:</span>
                          <span>{item.specs.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bucket:</span>
                          <span>{item.specs.bucketCapacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Dig:</span>
                          <span>{item.specs.maxDigDepth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel:</span>
                          <span>{item.specs.fuelCapacity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {item.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button size="sm" className="flex-1">Quote</Button>
                      <Button size="sm" variant="outline" className="flex-1">Book</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {compareItems.length < 4 && (
                <Card className="border-dashed">
                  <CardContent className="p-6 flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-2">Add Equipment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Compare up to 4 items
                      </p>
                      <Button variant="outline" size="sm">
                        Browse Catalog
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {availableEquipment.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Add More Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {availableEquipment
                    .filter(eq => !compareItems.find(item => item.id === eq.id))
                    .slice(0, 4)
                    .map((equipment) => (
                    <Card key={equipment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-lg mb-3"></div>
                        <h4 className="font-medium mb-2">{equipment.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {equipment.rating} ({equipment.reviews})
                        </div>
                        <div className="text-sm font-medium mb-3">
                          ${equipment.dailyRate}/day
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => addToComparison(equipment)}
                          disabled={compareItems.length >= 4}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Compare
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentComparison;