import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, Star } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Industrial Construction Site" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30 animate-fade-in">
            🚀 Connecting Industry Leaders Since 2024
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            One Platform,{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Endless Possibilities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Connect with top-tier industrial equipment suppliers, streamline your project management, 
            and access cutting-edge machinery for your construction needs.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button size="lg" variant="hero" className="text-lg px-8 py-4">
              <Search className="mr-2 h-5 w-5" />
              Find Equipment
            </Button>
            <Button size="lg" variant="premium" className="text-lg px-8 py-4">
              Become a Supplier
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto animate-scale-in">
            <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Equipment Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Equipment Type</label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent">
                      <option>All Equipment</option>
                      <option>Cranes</option>
                      <option>Excavators</option>
                      <option>Bulldozers</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Enter location"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Project Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Duration</label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent">
                    <option>Any Duration</option>
                    <option>1-7 days</option>
                    <option>1-4 weeks</option>
                    <option>1-6 months</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button className="w-full py-3" variant="hero">
                    <Search className="mr-2 h-4 w-4" />
                    Search Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">10K+</div>
              <div className="text-primary-foreground/80">Equipment Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">500+</div>
              <div className="text-primary-foreground/80">Verified Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">25K+</div>
              <div className="text-primary-foreground/80">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-primary-foreground">4.9</span>
                <Star className="h-6 w-6 fill-secondary text-secondary" />
              </div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};