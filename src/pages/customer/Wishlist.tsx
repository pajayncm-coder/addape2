import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, MapPin, Calendar, Eye, Trash2, ShoppingCart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function Wishlist() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "WL-001",
      equipmentId: "EQ-001",
      name: "CAT 320 Excavator",
      category: "Heavy Equipment",
      image: "/placeholder.svg",
      vendor: "Heavy Equipment Co.",
      location: "Downtown Depot",
      rating: 4.8,
      reviewCount: 124,
      dailyRate: 400,
      availability: "available",
      dateAdded: "2024-03-01",
      notes: "Good for residential excavation projects",
      tags: ["excavator", "heavy-duty", "tracked"]
    },
    {
      id: "WL-002",
      equipmentId: "EQ-002", 
      name: "50-ton Mobile Crane",
      category: "Lifting Equipment",
      image: "/placeholder.svg",
      vendor: "Mega Lifts",
      location: "Harbor District",
      rating: 4.9,
      reviewCount: 89,
      dailyRate: 3500,
      availability: "limited",
      dateAdded: "2024-02-28",
      notes: "Perfect for high-rise construction",
      tags: ["crane", "mobile", "heavy-lifting"]
    },
    {
      id: "WL-003",
      equipmentId: "EQ-003",
      name: "Bobcat Skid Steer",
      category: "Compact Equipment",
      image: "/placeholder.svg",
      vendor: "City Rentals",
      location: "Midtown Branch",
      rating: 4.6,
      reviewCount: 156,
      dailyRate: 250,
      availability: "unavailable",
      dateAdded: "2024-02-25",
      notes: "Compact and versatile for tight spaces",
      tags: ["skid-steer", "compact", "versatile"]
    },
    {
      id: "WL-004",
      equipmentId: "EQ-004",
      name: "Dump Truck 20-yard",
      category: "Transportation",
      image: "/placeholder.svg",
      vendor: "Transport Plus",
      location: "Industrial Zone",
      rating: 4.7,
      reviewCount: 92,
      dailyRate: 180,
      availability: "available",
      dateAdded: "2024-02-20",
      notes: "Reliable for material hauling",
      tags: ["dump-truck", "transportation", "hauling"]
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dateAdded");

  const categories = [
    "all",
    "Heavy Equipment",
    "Lifting Equipment", 
    "Compact Equipment",
    "Transportation"
  ];

  const availabilityOptions = [
    { value: "all", label: "All Items" },
    { value: "available", label: "Available" },
    { value: "limited", label: "Limited Availability" },
    { value: "unavailable", label: "Unavailable" }
  ];

  const sortOptions = [
    { value: "dateAdded", label: "Date Added" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price (Low to High)" },
    { value: "priceDesc", label: "Price (High to Low)" },
    { value: "rating", label: "Rating" }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800";
      case "limited": return "bg-yellow-100 text-yellow-800";
      case "unavailable": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case "available": return "Available";
      case "limited": return "Limited";
      case "unavailable": return "Unavailable";
      default: return availability;
    }
  };

  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesAvailability = availabilityFilter === "all" || item.availability === availabilityFilter;
      
      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.dailyRate - b.dailyRate;
        case "priceDesc":
          return b.dailyRate - a.dailyRate;
        case "rating":
          return b.rating - a.rating;
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const removeSelectedItems = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    toast({
      title: "Items Removed",
      description: `${selectedItems.length} items removed from wishlist.`,
    });
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedItems.map(item => item.id));
    }
  };

  const addToCart = (item: any) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-8 h-8 fill-red-500 text-red-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} saved items • {selectedItems.length} selected
            </p>
          </div>
          
          {selectedItems.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={removeSelectedItems}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Selected ({selectedItems.length})
              </Button>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-5 gap-4">
              <div>
                <Input
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="selectAll"
                  checked={selectedItems.length === filteredAndSortedItems.length && filteredAndSortedItems.length > 0}
                  onCheckedChange={selectAllItems}
                />
                <label htmlFor="selectAll" className="text-sm font-medium">
                  Select All
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        {filteredAndSortedItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {wishlistItems.length === 0 ? "Your wishlist is empty" : "No items match your filters"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {wishlistItems.length === 0 
                  ? "Start browsing equipment and save your favorites here"
                  : "Try adjusting your search or filter criteria"}
              </p>
              <Button onClick={() => navigate("/customer/search")}>
                Browse Equipment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredAndSortedItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                      />
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
                      </div>
                      <Badge className={getAvailabilityColor(item.availability)}>
                        {getAvailabilityLabel(item.availability)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{item.vendor} - {item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Added {new Date(item.dateAdded).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-sm text-muted-foreground italic">
                        "{item.notes}"
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <span className="text-2xl font-bold">${item.dailyRate}</span>
                        <span className="text-sm text-muted-foreground">/day</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/customer/equipment/${item.equipmentId}`)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {item.availability === "available" && (
                          <Button 
                            size="sm"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}