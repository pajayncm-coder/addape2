import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star,
  Plus,
  Calendar,
  Filter,
  Search,
  ThumbsUp,
  Flag,
  MessageCircle,
  Award,
  TrendingUp
} from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      equipment: "CAT 320 Excavator",
      supplier: "Heavy Equipment Co.",
      rating: 5,
      date: "2024-07-20",
      title: "Excellent performance and condition",
      review: "The excavator was in perfect condition and performed flawlessly throughout our 5-day rental. The operator was professional and the equipment was exactly as described. Highly recommended!",
      helpful: 12,
      order: "ORD-2024-001",
      verified: true
    },
    {
      id: 2,
      equipment: "Concrete Mixer Truck",
      supplier: "Construction Supply Plus",
      rating: 4,
      date: "2024-07-15",
      title: "Good equipment, minor delivery delay",
      review: "The mixer truck worked well for our project. Only issue was a 2-hour delay in delivery, but the supplier was communicative about it. Equipment quality was good overall.",
      helpful: 8,
      order: "ORD-2024-002",
      verified: true
    },
    {
      id: 3,
      equipment: "Tower Crane",
      supplier: "Metro Crane Services",
      rating: 3,
      date: "2024-07-10",
      title: "Average experience",
      review: "The crane did the job but had some maintenance issues during the rental period. Customer service was responsive in addressing the problems.",
      helpful: 5,
      order: "ORD-2024-003",
      verified: true
    }
  ]);

  const [filterRating, setFilterRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === "all" || review.rating >= parseInt(filterRating);
    const matchesSearch = review.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Equipment Reviews</h1>
            <p className="text-muted-foreground">
              Share your experience and help others make informed decisions
            </p>
          </div>
          
          <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                Write Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Write Equipment Review</DialogTitle>
                <DialogDescription>
                  Share your experience with rented equipment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="order">Order Number</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ord1">ORD-2024-001 - CAT 320 Excavator</SelectItem>
                      <SelectItem value="ord2">ORD-2024-002 - Concrete Mixer</SelectItem>
                      <SelectItem value="ord3">ORD-2024-003 - Tower Crane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="p-1 hover:bg-muted rounded">
                        <Star className="h-6 w-6 text-muted-foreground hover:text-yellow-400" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title">Review Title</Label>
                  <Input id="title" placeholder="Summarize your experience" />
                </div>
                
                <div>
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea 
                    id="review" 
                    placeholder="Share details about your experience..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsWriteReviewOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-primary">
                    Submit Review
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">{getAverageRating()}</h3>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">{reviews.length}</h3>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">
                {reviews.filter(r => r.verified).length}
              </h3>
              <p className="text-sm text-muted-foreground">Verified Reviews</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-info mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">94%</h3>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6 shadow-elegant border-primary/10">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                  <SelectItem value="1">1+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="shadow-elegant border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {review.equipment}
                      </h3>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Supplier: {review.supplier} • Order: {review.order}
                    </p>
                    
                    <div className="flex items-center gap-3 mb-3">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Flag className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {review.rating}/5 rating
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <Card className="text-center py-12 shadow-elegant border-primary/10">
            <CardContent>
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No reviews found
              </h3>
              <p className="text-muted-foreground mb-4">
                {filterRating === "all" 
                  ? "Be the first to write a review!" 
                  : `No reviews match your filter criteria`
                }
              </p>
              {filterRating === "all" ? (
                <Button 
                  className="bg-gradient-primary hover:shadow-glow"
                  onClick={() => setIsWriteReviewOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Write Review
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setFilterRating("all")}>
                  Show All Reviews
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Reviews;