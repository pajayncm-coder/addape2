import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  Handshake, 
  CheckCircle,
  ArrowRight,
  Users,
  Building
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search & Discover",
    description: "Browse our extensive catalog of equipment or use advanced filters to find exactly what you need for your project.",
    features: ["Advanced Search Filters", "Real-time Availability", "Price Comparison", "Detailed Specifications"]
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Request & Compare",
    description: "Send quote requests to multiple suppliers and compare offers to get the best deal for your requirements.",
    features: ["Multi-Supplier Quotes", "Instant Messaging", "Negotiation Tools", "Service Comparison"]
  },
  {
    number: "03",
    icon: Handshake,
    title: "Connect & Collaborate",
    description: "Work directly with verified suppliers, track your orders, and manage your projects all in one place.",
    features: ["Verified Suppliers", "Project Management", "Real-time Tracking", "Secure Payments"]
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Execute & Succeed",
    description: "Get your equipment delivered on time, track performance, and leave reviews to help the community.",
    features: ["On-time Delivery", "Performance Analytics", "Community Reviews", "24/7 Support"]
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Simple Process, Powerful Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined platform makes it easy to connect, collaborate, and complete 
            your industrial projects with confidence.
          </p>
        </div>

        {/* User Type Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted rounded-lg p-1 inline-flex">
            <Button variant="secondary" className="rounded-md">
              <Building className="mr-2 h-4 w-4" />
              For Customers
            </Button>
            <Button variant="ghost" className="rounded-md">
              <Users className="mr-2 h-4 w-4" />
              For Suppliers
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="relative overflow-hidden border-border/50 hover:shadow-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-secondary/10">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="bg-gradient-secondary p-3 rounded-lg w-fit mb-6 shadow-elegant">
                  <step.icon className="h-6 w-6 text-secondary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {step.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-secondary transform -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className="bg-gradient-secondary p-4 rounded-full shadow-elegant mb-4">
                    <step.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-primary">{step.title}</h4>
                    <span className="text-sm text-muted-foreground">Step {step.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center shadow-elegant">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and suppliers who trust Addape 
            for their industrial equipment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="text-lg px-8">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};