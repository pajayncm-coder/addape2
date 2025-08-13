import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-secondary p-2 rounded-lg">
                <div className="w-8 h-8 bg-primary-foreground rounded flex items-center justify-center font-bold text-secondary">
                  A
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Addape</h3>
                <p className="text-sm text-primary-foreground/80">Industrial Excellence</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 mb-6 text-lg">
              Connecting suppliers and customers for industrial construction needs. 
              Building the future of equipment marketplace with trust and innovation.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span>contact@addape.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>123 Industrial Ave, Tech City, TC 12345</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="hover:bg-secondary hover:text-secondary-foreground">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-secondary hover:text-secondary-foreground">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-secondary hover:text-secondary-foreground">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-secondary hover:text-secondary-foreground">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-secondary hover:text-secondary-foreground">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Equipment Rental</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Fleet Management</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Project Management</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Maintenance Services</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Equipment Sales</a></li>
            </ul>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="text-lg font-semibold mb-6">For Customers</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Browse Equipment</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Request Quotes</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Project Dashboard</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Supplier Reviews</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* For Suppliers */}
          <div>
            <h4 className="text-lg font-semibold mb-6">For Suppliers</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">List Equipment</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Manage Inventory</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Bid Management</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Analytics Dashboard</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Supplier Resources</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-4">Stay Updated</h4>
              <p className="text-primary-foreground/90">
                Get the latest updates on new equipment, industry trends, and platform features.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-background/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              <Button variant="secondary" className="px-6">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20 bg-primary-hover">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/80">
              © 2024 Addape. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Cookie Policy</a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};