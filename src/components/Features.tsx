import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  TrendingUp, 
  Users, 
  MapPin, 
  FileText,
  Smartphone,
  HeadphonesIcon
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Suppliers",
    description: "All suppliers undergo rigorous verification processes to ensure quality and reliability.",
    color: "text-green-500"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Monitor your equipment requests, deliveries, and project progress in real-time.",
    color: "text-blue-500"
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Get insights into equipment performance, cost optimization, and project efficiency.",
    color: "text-purple-500"
  },
  {
    icon: Users,
    title: "Collaborative Platform",
    description: "Work seamlessly with your team, suppliers, and contractors on a unified platform.",
    color: "text-orange-500"
  },
  {
    icon: MapPin,
    title: "Location-based Search",
    description: "Find equipment and suppliers in your area to reduce transportation costs and time.",
    color: "text-red-500"
  },
  {
    icon: FileText,
    title: "Digital Documentation",
    description: "Manage contracts, invoices, and project documentation digitally with ease.",
    color: "text-indigo-500"
  },
  {
    icon: Smartphone,
    title: "Mobile-first Design",
    description: "Access all features on-the-go with our responsive mobile-optimized platform.",
    color: "text-pink-500"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Get round-the-clock assistance from our dedicated customer support team.",
    color: "text-teal-500"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Built for Industrial Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with industry expertise 
            to deliver an unmatched experience for all your equipment needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-hover transition-all duration-300 hover:scale-105 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div className="bg-background rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-elegant group-hover:shadow-hover transition-all">
                  <feature.icon className={`h-8 w-8 ${feature.color} mx-auto`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Enterprise-Grade Security & Compliance
              </h3>
              <p className="text-primary-foreground/90 text-lg mb-6">
                Your data is protected with bank-level security, and our platform 
                complies with industry standards and regulations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary-foreground mb-1">99.9%</div>
                  <div className="text-primary-foreground/80 text-sm">Uptime Guarantee</div>
                </div>
                <div className="bg-background/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary-foreground mb-1">ISO 27001</div>
                  <div className="text-primary-foreground/80 text-sm">Certified Security</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-background/10 rounded-2xl p-8 backdrop-blur-sm">
                <Shield className="h-24 w-24 text-primary-foreground mx-auto mb-4" />
                <div className="text-center">
                  <div className="text-xl font-semibold text-primary-foreground mb-2">
                    Secure & Trusted
                  </div>
                  <div className="text-primary-foreground/80">
                    Enterprise-grade protection for your business
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};