import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Plus, Trash2, Edit, Shield, Building, DollarSign } from "lucide-react";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit_card",
      cardNumber: "**** **** **** 4242",
      cardType: "Visa",
      expiryDate: "12/26",
      holderName: "John Doe",
      isDefault: true,
      lastUsed: "2024-01-15"
    },
    {
      id: 2,
      type: "credit_card",
      cardNumber: "**** **** **** 8888",
      cardType: "Mastercard",
      expiryDate: "09/25",
      holderName: "John Doe",
      isDefault: false,
      lastUsed: "2024-01-10"
    },
    {
      id: 3,
      type: "bank_account",
      accountNumber: "**** **** 1234",
      bankName: "Chase Bank",
      accountType: "Business Checking",
      holderName: "Doe Construction LLC",
      isDefault: false,
      lastUsed: "2024-01-05"
    }
  ]);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
    setAsDefault: false
  });

  const getCardIcon = (cardType: string) => {
    // In a real app, you'd have actual card brand icons
    return <CreditCard className="h-6 w-6" />;
  };

  const getBankIcon = () => {
    return <Building className="h-6 w-6" />;
  };

  const setAsDefault = (id: number) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const addNewCard = () => {
    const newPaymentMethod = {
      id: Date.now(),
      type: "credit_card" as const,
      cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
      cardType: "Visa", // Would detect from card number
      expiryDate: newCard.expiryDate,
      holderName: newCard.holderName,
      isDefault: newCard.setAsDefault,
      lastUsed: new Date().toISOString().split('T')[0]
    };

    if (newCard.setAsDefault) {
      setPaymentMethods(prev =>
        prev.map(method => ({ ...method, isDefault: false }))
      );
    }

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setIsAddingCard(false);
    setNewCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
      setAsDefault: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <p className="text-muted-foreground">Manage your saved payment methods and billing information</p>
        </div>

        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Saved Payment Methods</h2>
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Card</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={newCard.expiryDate}
                        onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={newCard.cvv}
                        onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="holderName">Cardholder Name</Label>
                    <Input
                      id="holderName"
                      placeholder="John Doe"
                      value={newCard.holderName}
                      onChange={(e) => setNewCard(prev => ({ ...prev, holderName: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="setAsDefault"
                      checked={newCard.setAsDefault}
                      onChange={(e) => setNewCard(prev => ({ ...prev, setAsDefault: e.target.checked }))}
                    />
                    <Label htmlFor="setAsDefault">Set as default payment method</Label>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={addNewCard} className="flex-1">Add Card</Button>
                    <Button variant="outline" onClick={() => setIsAddingCard(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        {method.type === "credit_card" ? getCardIcon(method.cardType!) : getBankIcon()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">
                            {method.type === "credit_card" 
                              ? `${method.cardType} ${method.cardNumber}` 
                              : `${method.bankName} ${method.accountNumber}`
                            }
                          </h3>
                          {method.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {method.type === "credit_card" 
                            ? `Expires ${method.expiryDate} • ${method.holderName}` 
                            : `${method.accountType} • ${method.holderName}`
                          }
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last used: {method.lastUsed}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setAsDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => deletePaymentMethod(method.id)}
                        disabled={method.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Payment Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and securely stored
                  </p>
                </div>
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Automatic Billing</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic billing for recurring rentals
                  </p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "2024-01-15", amount: "₹2,08,250", description: "Caterpillar 320 Excavator Rental", method: "**** 4242" },
                  { date: "2024-01-10", amount: "₹99,960", description: "Bobcat S650 Skid Steer Rental", method: "**** 8888" },
                  { date: "2024-01-05", amount: "₹3,16,620", description: "Equipment Package Rental", method: "**** 1234" }
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.date} • Paid with {transaction.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{transaction.amount}</div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;