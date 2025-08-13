import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Star, 
  Calendar,
  DollarSign,
  Truck,
  Settings,
  Heart,
  Eye
} from "lucide-react";
import { Header } from "@/components/Header";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([100, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [equipment] = useState([
    {
      id: 1,
      name: "CAT 320 Excavator",
      category: "Excavation",
      supplier: "Heavy Equipment Co.",
      location: "New York, NY",
      pricePerDay: 2500,
      rating: 4.8,
      reviews: 124,
      availability: "Available",
      image: "/placeholder.svg",
      features: ["GPS Tracking", "Fuel Efficient", "Latest Model"]
    },
    {
      id: 2,
      name: "Concrete Mixer Truck",
      category: "Concrete",
      supplier: "Construction Supply Plus",
      location: "Brooklyn, NY",
      pricePerDay: 1800,
      rating: 4.6,
      reviews: 89,
      availability: "Available",
      image: "/placeholder.svg",
      features: ["High Capacity", "Clean Record", "Experienced Operator"]
    },
    {
      id: 3,
      name: "Tower Crane",
      category: "Lifting",
      supplier: "Metro Crane Services",
      location: "Manhattan, NY",
      pricePerDay: 5200,
      rating: 4.9,
      reviews: 156,
      availability: "Booked",
      image: "/placeholder.svg",
      features: ["200ft Range", "Heavy Lift", "Certified Operator"]
    },
    {
      id: 4,
      name: "Bulldozer D6T",
      category: "Earthmoving",
      supplier: "Alpha Construction Equipment",
      location: "Queens, NY",
      pricePerDay: 3200,
      rating: 4.7,
      reviews: 98,
      availability: "Available",
      image: "/placeholder.svg",
      features: ["Blade Control", "Powerful Engine", "Track Type"]
    }
  ]);

  const categories = ["Excavation", "Concrete", "Lifting", "Earthmoving", "Compaction", "Material Handling"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesPrice = item.pricePerDay >= priceRange[0] && item.pricePerDay <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Find Equipment
          </h1>
          <p className="text-muted-foreground">
            Search and compare construction equipment from verified suppliers
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 shadow-elegant border-primary/10">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search equipment, category, or supplier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="nj">New Jersey</SelectItem>
                  <SelectItem value="ct">Connecticut</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant border-primary/10 sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={category} 
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-3">
                    Price Range (${priceRange[0]} - ${priceRange[1]}/day)
                  </h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={100}
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                </div>

                {/* Availability */}
                <div>
                  <h4 className="font-semibold mb-3">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" />
                      <label htmlFor="available" className="text-sm text-foreground">
                        Available Now
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tomorrow" />
                      <label htmlFor="tomorrow" className="text-sm text-foreground">
                        Available Tomorrow
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="week" />
                      <label htmlFor="week" className="text-sm text-foreground">
                        Available This Week
                      </label>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-semibold mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm text-foreground flex items-center">
                          {rating}+ <Star className="h-3 w-3 ml-1 fill-current" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">
                {filteredEquipment.length} equipment found
              </p>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEquipment.map((item) => (
                <Card key={item.id} className="group hover:shadow-elegant transition-all duration-300 border-primary/10 hover:border-primary/30">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Badge 
                        variant={item.availability === "Available" ? "default" : "secondary"}
                        className="bg-white/90"
                      >
                        {item.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      by {item.supplier}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          ${item.pricePerDay.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">/day</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg">
                Load More Equipment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;