import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun, 
  Monitor,
  Smartphone,
  Mail,
  AlertTriangle,
  Trash2,
  Download,
  Eye,
  EyeOff
} from "lucide-react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailQuotes: true,
    emailOrders: true,
    emailProjects: false,
    emailMarketing: false,
    pushQuotes: true,
    pushOrders: true,
    pushDeliveries: true,
    pushMaintenance: false,
    smsOrders: false,
    smsDeliveries: true,
    smsEmergency: true
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    currency: "INR",
    timezone: "America/Chicago",
    dateFormat: "MM/DD/YYYY",
    autoSave: true,
    quickActions: true,
    compactView: false
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailQuotes">Quote Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified when quotes are updated or responded to</p>
                      </div>
                      <Switch
                        id="emailQuotes"
                        checked={notifications.emailQuotes}
                        onCheckedChange={(value) => handleNotificationChange('emailQuotes', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailOrders">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive updates on your rental orders and deliveries</p>
                      </div>
                      <Switch
                        id="emailOrders"
                        checked={notifications.emailOrders}
                        onCheckedChange={(value) => handleNotificationChange('emailOrders', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailProjects">Project Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about project milestones and changes</p>
                      </div>
                      <Switch
                        id="emailProjects"
                        checked={notifications.emailProjects}
                        onCheckedChange={(value) => handleNotificationChange('emailProjects', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailMarketing">Marketing & Promotions</Label>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and equipment recommendations</p>
                      </div>
                      <Switch
                        id="emailMarketing"
                        checked={notifications.emailMarketing}
                        onCheckedChange={(value) => handleNotificationChange('emailMarketing', value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Push Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushQuotes">Quote Responses</Label>
                        <p className="text-sm text-muted-foreground">Instant notifications for quote responses</p>
                      </div>
                      <Switch
                        id="pushQuotes"
                        checked={notifications.pushQuotes}
                        onCheckedChange={(value) => handleNotificationChange('pushQuotes', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushOrders">Order Status</Label>
                        <p className="text-sm text-muted-foreground">Real-time updates on order status changes</p>
                      </div>
                      <Switch
                        id="pushOrders"
                        checked={notifications.pushOrders}
                        onCheckedChange={(value) => handleNotificationChange('pushOrders', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushDeliveries">Delivery Updates</Label>
                        <p className="text-sm text-muted-foreground">Notifications about delivery schedules and arrivals</p>
                      </div>
                      <Switch
                        id="pushDeliveries"
                        checked={notifications.pushDeliveries}
                        onCheckedChange={(value) => handleNotificationChange('pushDeliveries', value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* SMS Notifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsOrders">Critical Order Updates</Label>
                        <p className="text-sm text-muted-foreground">SMS for urgent order issues</p>
                      </div>
                      <Switch
                        id="smsOrders"
                        checked={notifications.smsOrders}
                        onCheckedChange={(value) => handleNotificationChange('smsOrders', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsDeliveries">Delivery Confirmations</Label>
                        <p className="text-sm text-muted-foreground">SMS confirmations for deliveries and pickups</p>
                      </div>
                      <Switch
                        id="smsDeliveries"
                        checked={notifications.smsDeliveries}
                        onCheckedChange={(value) => handleNotificationChange('smsDeliveries', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsEmergency">Emergency Alerts</Label>
                        <p className="text-sm text-muted-foreground">Critical safety or equipment alerts</p>
                      </div>
                      <Switch
                        id="smsEmergency"
                        checked={notifications.smsEmergency}
                        onCheckedChange={(value) => handleNotificationChange('smsEmergency', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Display & Language
                </CardTitle>
                <CardDescription>
                  Customize how the application looks and behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={preferences.currency} onValueChange={(value) => handlePreferenceChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Interface Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoSave">Auto-save Forms</Label>
                        <p className="text-sm text-muted-foreground">Automatically save form progress</p>
                      </div>
                      <Switch
                        id="autoSave"
                        checked={preferences.autoSave}
                        onCheckedChange={(value) => handlePreferenceChange('autoSave', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="quickActions">Quick Actions</Label>
                        <p className="text-sm text-muted-foreground">Show quick action buttons in lists</p>
                      </div>
                      <Switch
                        id="quickActions"
                        checked={preferences.quickActions}
                        onCheckedChange={(value) => handlePreferenceChange('quickActions', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compactView">Compact View</Label>
                        <p className="text-sm text-muted-foreground">Use compact layout for tables and lists</p>
                      </div>
                      <Switch
                        id="compactView"
                        checked={preferences.compactView}
                        onCheckedChange={(value) => handlePreferenceChange('compactView', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">SMS Authentication</h4>
                        <p className="text-sm text-muted-foreground">Receive verification codes via SMS</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Authenticator App</h4>
                        <p className="text-sm text-muted-foreground">Use an authenticator app for verification</p>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Login Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Current Session</h4>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Houston, TX</p>
                      </div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Mobile App</h4>
                        <p className="text-sm text-muted-foreground">iPhone • Last active 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing & Payments
                </CardTitle>
                <CardDescription>
                  Manage your payment methods and billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          MC
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 8888</p>
                          <p className="text-sm text-muted-foreground">Expires 08/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Add Payment Method
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingName">Full Name</Label>
                      <Input id="billingName" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingCompany">Company</Label>
                      <Input id="billingCompany" defaultValue="Doe Construction LLC" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input id="billingAddress" defaultValue="123 Construction Ave" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingCity">City</Label>
                      <Input id="billingCity" defaultValue="Houston" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State</Label>
                        <Input id="billingState" defaultValue="TX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input id="billingZip" defaultValue="77001" />
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4">Update Billing Address</Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Invoice #INV-001</p>
                        <p className="text-sm text-muted-foreground">January 2024 • ₹4,37,250.00</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Invoice #INV-002</p>
                        <p className="text-sm text-muted-foreground">December 2023 • ₹2,66,400.00</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">View All Invoices</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Export your data or permanently delete your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Export</h3>
                  <p className="text-muted-foreground mb-4">
                    Download a copy of all your account data including projects, orders, and quotes.
                  </p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Account Data
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h3>
                  <div className="border border-destructive/20 rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        Delete Account
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;