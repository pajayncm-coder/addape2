import { useState } from "react";
import { Shield, DollarSign, CheckCircle, X, Info, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function InsuranceOptions() {
  const { toast } = useToast();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [equipmentValue, setEquipmentValue] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [additionalCoverage, setAdditionalCoverage] = useState<string[]>([]);

  const insurancePlans = [
    {
      id: "basic",
      name: "Basic Protection",
      description: "Essential coverage for equipment damage and liability",
      monthlyRate: 2.5, // percentage of equipment value
      deductible: 1000,
      maxCoverage: 100000,
      features: [
        "Equipment damage coverage",
        "Third-party liability (₹83,30,000)",
        "Basic theft protection",
        "24/7 claims support"
      ],
      limitations: [
        "Excludes operator error",
        "No coverage for pre-existing damage",
        "Limited natural disaster coverage"
      ],
      recommended: false
    },
    {
      id: "standard",
      name: "Standard Protection",
      description: "Comprehensive coverage for most rental scenarios",
      monthlyRate: 4.0,
      deductible: 500,
      maxCoverage: 250000,
      features: [
        "Full equipment replacement value",
        "Third-party liability (₹2,08,25,000)",
        "Comprehensive theft protection",
        "Operator error coverage",
        "Natural disaster protection",
        "24/7 emergency response"
      ],
      limitations: [
        "Some high-risk activities excluded",
        "Requires safety compliance"
      ],
      recommended: true
    },
    {
      id: "premium",
      name: "Premium Protection",
      description: "Maximum coverage for high-value and high-risk operations",
      monthlyRate: 6.0,
      deductible: 250,
      maxCoverage: 500000,
      features: [
        "Full replacement + business interruption",
        "Third-party liability (₹4,16,50,000)",
        "Global coverage",
        "All risk coverage",
        "Expedited claims processing",
        "Dedicated account manager",
        "Equipment upgrade coverage"
      ],
      limitations: [
        "Higher premium costs",
        "Requires detailed risk assessment"
      ],
      recommended: false
    }
  ];

  const additionalOptions = [
    {
      id: "business-interruption",
      name: "Business Interruption",
      description: "Covers lost revenue when equipment is unavailable",
      cost: 1.5, // percentage
      maxBenefit: "Up to ₹8,33,000/day"
    },
    {
      id: "operator-training",
      name: "Operator Training Coverage",
      description: "Coverage for accidents during operator training",
      cost: 0.8,
      maxBenefit: "Up to ₹20,82,500"
    },
    {
      id: "environmental",
      name: "Environmental Liability",
      description: "Protection against environmental damage claims",
      cost: 2.0,
      maxBenefit: "Up to ₹83,30,000"
    },
    {
      id: "cyber-security",
      name: "Cyber Security",
      description: "Coverage for equipment with digital systems",
      cost: 1.0,
      maxBenefit: "Up to ₹41,65,000"
    }
  ];

  const calculatePremium = () => {
    if (!equipmentValue || !selectedPlan || !rentalDuration) return 0;
    
    const plan = insurancePlans.find(p => p.id === selectedPlan);
    if (!plan) return 0;
    
    const baseValue = parseFloat(equipmentValue);
    const duration = parseFloat(rentalDuration);
    const basePremium = (baseValue * plan.monthlyRate / 100) * (duration / 30);
    
    const additionalCost = additionalCoverage.reduce((sum, optionId) => {
      const option = additionalOptions.find(o => o.id === optionId);
      return sum + (option ? (baseValue * option.cost / 100) * (duration / 30) : 0);
    }, 0);
    
    return basePremium + additionalCost;
  };

  const toggleAdditionalCoverage = (optionId: string) => {
    setAdditionalCoverage(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const purchaseInsurance = () => {
    if (!selectedPlan) {
      toast({
        title: "No Plan Selected",
        description: "Please select an insurance plan to continue.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Insurance Purchased",
      description: `${insurancePlans.find(p => p.id === selectedPlan)?.name} plan activated for your rental.`,
    });
  };

  const premium = calculatePremium();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Insurance Options
          </h1>
          <p className="text-muted-foreground">Protect your equipment rentals with comprehensive insurance coverage</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Insurance Plans */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="plans" className="space-y-6">
              <TabsList>
                <TabsTrigger value="plans">Insurance Plans</TabsTrigger>
                <TabsTrigger value="calculator">Premium Calculator</TabsTrigger>
                <TabsTrigger value="claims">Claims Process</TabsTrigger>
              </TabsList>

              <TabsContent value="plans" className="space-y-6">
                <div className="grid gap-6">
                  {insurancePlans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className={`cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? 'ring-2 ring-primary border-primary' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                checked={selectedPlan === plan.id}
                                onChange={() => setSelectedPlan(plan.id)}
                              />
                              <CardTitle className="flex items-center gap-2">
                                {plan.name}
                                {plan.recommended && (
                                  <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                                )}
                              </CardTitle>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{plan.monthlyRate}%</p>
                            <p className="text-sm text-muted-foreground">of equipment value/month</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-green-700">What's Covered</h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3 text-red-700">Limitations</h4>
                            <ul className="space-y-2">
                              {plan.limitations.map((limitation, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <X className="w-4 h-4 text-red-600" />
                                  {limitation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Deductible</p>
                            <p className="font-semibold">${plan.deductible}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Max Coverage</p>
                            <p className="font-semibold">${plan.maxCoverage.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Claims Processing</p>
                            <p className="font-semibold">24-48 hours</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Additional Coverage Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Coverage Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {additionalOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Checkbox 
                            checked={additionalCoverage.includes(option.id)}
                            onCheckedChange={() => toggleAdditionalCoverage(option.id)}
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm font-medium">+{option.cost}% premium</span>
                              <span className="text-sm text-green-600">{option.maxBenefit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Premium Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Equipment Value ($)</Label>
                        <Input
                          type="number"
                          placeholder="50000"
                          value={equipmentValue}
                          onChange={(e) => setEquipmentValue(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Rental Duration (days)</Label>
                        <Input
                          type="number"
                          placeholder="30"
                          value={rentalDuration}
                          onChange={(e) => setRentalDuration(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Risk Level</Label>
                      <Select value={riskLevel} onValueChange={setRiskLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Risk - Standard construction</SelectItem>
                          <SelectItem value="medium">Medium Risk - Urban projects</SelectItem>
                          <SelectItem value="high">High Risk - Marine/Hazardous sites</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {equipmentValue && rentalDuration && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Premium Estimates</h4>
                        {insurancePlans.map((plan) => {
                          const baseValue = parseFloat(equipmentValue);
                          const duration = parseFloat(rentalDuration);
                          const estimatedPremium = (baseValue * plan.monthlyRate / 100) * (duration / 30);
                          
                          return (
                            <div key={plan.id} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <p className="font-semibold">{plan.name}</p>
                                <p className="text-sm text-muted-foreground">{plan.monthlyRate}% monthly rate</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">${estimatedPremium.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">for {duration} days</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="claims" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Claims Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">How to File a Claim</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <p className="font-semibold">Report Immediately</p>
                              <p className="text-sm text-muted-foreground">Contact our claims hotline within 24 hours: 1-800-CLAIMS-24</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <p className="font-semibold">Document Everything</p>
                              <p className="text-sm text-muted-foreground">Take photos, gather witness statements, and preserve evidence</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <p className="font-semibold">Submit Documentation</p>
                              <p className="text-sm text-muted-foreground">Provide all required forms and supporting documents</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <p className="font-semibold">Claim Processing</p>
                              <p className="text-sm text-muted-foreground">We'll review and process your claim within 48-72 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3">Required Documentation</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Police report (if applicable)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Photos of damage/incident scene
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Rental agreement and insurance certificate
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Witness statements
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Repair estimates or invoices
                          </li>
                        </ul>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          <strong>24/7 Claims Hotline:</strong> 1-800-CLAIMS-24 | Online portal available at claims.equiprental.com
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quote Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Quote</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlan ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Plan</p>
                      <p className="font-semibold">{insurancePlans.find(p => p.id === selectedPlan)?.name}</p>
                    </div>
                    
                    {equipmentValue && (
                      <div>
                        <p className="text-sm text-muted-foreground">Equipment Value</p>
                        <p className="font-semibold">${parseFloat(equipmentValue).toLocaleString()}</p>
                      </div>
                    )}
                    
                    {rentalDuration && (
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{rentalDuration} days</p>
                      </div>
                    )}
                    
                    {additionalCoverage.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">Additional Coverage</p>
                        {additionalCoverage.map(optionId => {
                          const option = additionalOptions.find(o => o.id === optionId);
                          return (
                            <p key={optionId} className="text-sm">{option?.name}</p>
                          );
                        })}
                      </div>
                    )}
                    
                    <Separator />
                    
                    {premium > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Premium</p>
                        <p className="text-2xl font-bold">${premium.toFixed(2)}</p>
                      </div>
                    )}
                    
                    <Button onClick={purchaseInsurance} className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Purchase Insurance
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Select an insurance plan to see quote details
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose Insurance?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Financial Protection</p>
                    <p className="text-xs text-muted-foreground">Avoid out-of-pocket costs for equipment damage</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Peace of Mind</p>
                    <p className="text-xs text-muted-foreground">Focus on your project, not potential risks</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Cost Effective</p>
                    <p className="text-xs text-muted-foreground">Small premium vs. large replacement costs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}