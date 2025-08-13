import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  HardHat, 
  Cog, 
  Wrench, 
  Building2, 
  Zap,
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    icon: Building2,
    title: "Construction Equipment",
    description: "Heavy machinery for construction projects",
    items: ["Cranes", "Excavators", "Bulldozers", "Loaders"],
    count: "2,400+",
    color: "bg-blue-500"
  },
  {
    icon: Truck,
    title: "Transportation & Logistics",
    description: "Vehicles and transport solutions",
    items: ["Dump Trucks", "Concrete Mixers", "Flatbed Trucks", "Trailers"],
    count: "1,800+",
    color: "bg-green-500"
  },
  {
    icon: Zap,
    title: "Power & Electrical",
    description: "Generators and electrical equipment",
    items: ["Generators", "Compressors", "Welding Equipment", "Power Tools"],
    count: "3,200+",
    color: "bg-yellow-500"
  },
  {
    icon: HardHat,
    title: "Safety & Protection",
    description: "Safety gear and protection equipment",
    items: ["Hard Hats", "Safety Vests", "Harnesses", "Barriers"],
    count: "950+",
    color: "bg-red-500"
  },
  {
    icon: Cog,
    title: "Specialized Machinery",
    description: "Industry-specific equipment",
    items: ["Mining Equipment", "Marine Tools", "Forestry", "Agriculture"],
    count: "1,100+",
    color: "bg-purple-500"
  },
  {
    icon: Wrench,
    title: "Tools & Accessories",
    description: "Hand tools and accessories",
    items: ["Power Tools", "Measuring", "Cutting Tools", "Accessories"],
    count: "4,500+",
    color: "bg-orange-500"
  }
];

export const EquipmentCategories = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
            Equipment Categories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Find Exactly What You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through our comprehensive catalog of industrial equipment, 
            organized by category for easy discovery.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card 
              key={category.title} 
              className="group hover:shadow-hover transition-all duration-300 hover:scale-105 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${category.color} bg-opacity-10`}>
                    <category.icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>

                {/* Items List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.items.map((item) => (
                    <Badge 
                      key={item} 
                      variant="outline" 
                      className="text-xs hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-all"
                >
                  Browse Category
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="hero" className="px-8">
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};