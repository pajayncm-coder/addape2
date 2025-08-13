import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  HelpCircle,
  FileText,
  Headphones,
  Zap,
  Shield,
  CreditCard,
  Truck,
  AlertCircle
} from "lucide-react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      category: "Booking & Orders",
      icon: FileText,
      questions: [
        {
          question: "How do I book equipment for multiple dates?",
          answer: "You can book equipment for multiple dates by selecting your start and end dates during the booking process. For extended rentals over 30 days, please contact our support team for special pricing."
        },
        {
          question: "Can I modify my booking after confirmation?",
          answer: "Yes, you can modify your booking up to 24 hours before the delivery date. Changes may affect pricing and are subject to equipment availability."
        },
        {
          question: "What happens if I need to cancel my order?",
          answer: "Cancellations made 48+ hours before delivery receive a full refund. Cancellations made 24-48 hours before delivery incur a 25% fee. Last-minute cancellations (under 24 hours) are charged 50% of the rental fee."
        }
      ]
    },
    {
      category: "Payment & Billing",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, Amex), bank transfers, and for established customers, we offer Net 30 payment terms with approved credit."
        },
        {
          question: "When am I charged for my rental?",
          answer: "A deposit of 50% is charged upon booking confirmation. The remaining balance is charged 24 hours before delivery. Additional charges for damages or late returns are processed within 5 business days."
        },
        {
          question: "How do refunds work?",
          answer: "Refunds are processed within 5-7 business days to your original payment method. Partial refunds may apply based on our cancellation policy and any equipment damage."
        }
      ]
    },
    {
      category: "Delivery & Pickup",
      icon: Truck,
      questions: [
        {
          question: "What are your delivery hours?",
          answer: "Standard delivery hours are 8:00 AM to 6:00 PM, Monday through Saturday. Emergency weekend and after-hours delivery is available for an additional fee."
        },
        {
          question: "Do you deliver to all locations?",
          answer: "We deliver within a 50-mile radius of our facilities. Extended delivery zones are available with additional transportation fees. Rural or difficult-to-access locations may have special requirements."
        },
        {
          question: "What if I'm not available during delivery?",
          answer: "We require someone 18+ to be present during delivery for equipment inspection and sign-off. You can designate an authorized representative if you cannot be present."
        }
      ]
    },
    {
      category: "Equipment & Safety",
      icon: Shield,
      questions: [
        {
          question: "What if equipment breaks down during my rental?",
          answer: "Contact our 24/7 support line immediately. We'll arrange repair or replacement within 4 hours for critical equipment. You're not charged for downtime due to equipment failure."
        },
        {
          question: "Do you provide operator training?",
          answer: "Yes, we offer certified operator training for all equipment types. Training sessions can be scheduled before delivery or on-site. Costs vary by equipment complexity and duration."
        },
        {
          question: "What safety equipment is included?",
          answer: "All rentals include basic safety equipment as required by OSHA standards. Additional safety gear can be rented separately. We also provide safety briefings for all operators."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">How can we help?</h1>
          <p className="text-muted-foreground">
            Get instant answers or contact our support team
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center shadow-elegant border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get instant help from our support team
              </p>
              <Badge variant="secondary">Online</Badge>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                (555) 123-RENT
              </p>
              <Badge variant="outline">24/7 Emergency</Badge>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elegant border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                support@equipmentrental.com
              </p>
              <Badge variant="outline">24h response</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-6">
            {/* Search */}
            <Card className="shadow-elegant border-primary/10">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <div className="space-y-6">
              {filteredFaqs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="shadow-elegant border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contact */}
            <Card className="shadow-elegant border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  <h3 className="font-semibold text-destructive">Emergency Support</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  For equipment breakdowns, safety incidents, or urgent delivery issues, 
                  call our 24/7 emergency hotline:
                </p>
                <Button variant="destructive" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency Line: (555) 911-RENT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="shadow-elegant border-primary/10">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    We'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="john@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input type="tel" id="phone" placeholder="(555) 123-4567" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your question or issue..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:shadow-glow">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="shadow-elegant border-primary/10">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">General Support</div>
                        <div className="text-sm text-muted-foreground">(555) 123-RENT</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-destructive" />
                      <div>
                        <div className="font-medium">Emergency Line</div>
                        <div className="text-sm text-muted-foreground">(555) 911-RENT</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Email Support</div>
                        <div className="text-sm text-muted-foreground">support@equipmentrental.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-muted-foreground">Available 24/7</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Support Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>General Support</span>
                      <span className="text-sm text-muted-foreground">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone Support</span>
                      <span className="text-sm text-muted-foreground">6 AM - 10 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Live Chat</span>
                      <span className="text-sm text-muted-foreground">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Line</span>
                      <span className="text-sm text-muted-foreground">24/7</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant border-primary/10">
                  <CardHeader>
                    <CardTitle>Response Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Emergency Issues</span>
                      <Badge variant="destructive">Immediate</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Live Chat</span>
                      <Badge variant="secondary">&lt; 5 min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Email Support</span>
                      <Badge variant="secondary">&lt; 24 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>General Inquiries</span>
                      <Badge variant="outline">&lt; 48 hours</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Support;