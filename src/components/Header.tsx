import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-secondary p-2 rounded-lg shadow-elegant">
              <div className="w-8 h-8 bg-primary-foreground rounded flex items-center justify-center font-bold text-secondary">
                A
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Addape</h1>
              <p className="text-xs text-muted-foreground">Industrial Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/customer/dashboard" className="text-foreground hover:text-secondary transition-colors">
              Dashboard
            </Link>
            <Link to="/customer/search" className="text-foreground hover:text-secondary transition-colors">
              Search
            </Link>
            <Link to="/customer/projects" className="text-foreground hover:text-secondary transition-colors">
              Projects
            </Link>
            <Link to="/customer/quotes" className="text-foreground hover:text-secondary transition-colors">
              Quotes
            </Link>
            <Link to="/customer/orders" className="text-foreground hover:text-secondary transition-colors">
              Orders
            </Link>
            <Link to="/customer/support" className="text-foreground hover:text-secondary transition-colors">
              Support
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-secondary"></Badge>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/customer/profile">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden mt-4 space-y-4 transition-all duration-300",
          isMenuOpen ? "block animate-fade-in" : "hidden"
        )}>
          <nav className="flex flex-col space-y-3">
            <Link to="/customer/dashboard" className="text-foreground hover:text-secondary transition-colors py-2">
              Dashboard
            </Link>
            <Link to="/customer/search" className="text-foreground hover:text-secondary transition-colors py-2">
              Search
            </Link>
            <Link to="/customer/projects" className="text-foreground hover:text-secondary transition-colors py-2">
              Projects
            </Link>
            <Link to="/customer/quotes" className="text-foreground hover:text-secondary transition-colors py-2">
              Quotes
            </Link>
            <Link to="/customer/orders" className="text-foreground hover:text-secondary transition-colors py-2">
              Orders
            </Link>
            <Link to="/customer/profile" className="text-foreground hover:text-secondary transition-colors py-2">
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};