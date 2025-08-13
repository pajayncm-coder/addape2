import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, MapPin, Phone, Mail, Globe, Camera, Shield, Star, Award, Calendar } from "lucide-react";

export default function SupplierProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const supplierData = {
    name: "Heavy Equipment Rentals Pvt Ltd",
    ownerName: "Rajesh Kumar",
    email: "contact@heavyequipment.com",
    phone: "+91 98765 43210",
    website: "www.heavyequipment.com",
    address: "123 Industrial Area, Sector 18, Gurgaon, Haryana 122015",
    established: "2015",
    gstNumber: "06AABCH2194R1Z5",
    panNumber: "AABCH2194R",
    licenseNumber: "HR/RNT/2015/001234",
    description: "Leading equipment rental company providing high-quality construction machinery for infrastructure projects across North India.",
    specialization: ["Excavators", "Cranes", "Concrete Equipment", "Earth Moving"],
    serviceAreas: ["Delhi NCR", "Haryana", "Punjab", "Uttar Pradesh"],
    rating: 4.8,
    totalOrders: 1250,
    yearsInBusiness: 9,
    verificationStatus: "verified"
  };

  const certifications = [
    { name: "ISO 9001:2015", issuer: "Bureau Veritas", validity: "2025-12-31" },
    { name: "Equipment Safety Certification", issuer: "National Safety Council", validity: "2024-11-30" },
    { name: "Environmental Compliance", issuer: "Pollution Control Board", validity: "2025-06-15" }
  ];

  const businessHours = [
    { day: "Monday", hours: "08:00 - 18:00", isOpen: true },
    { day: "Tuesday", hours: "08:00 - 18:00", isOpen: true },
    { day: "Wednesday", hours: "08:00 - 18:00", isOpen: true },
    { day: "Thursday", hours: "08:00 - 18:00", isOpen: true },
    { day: "Friday", hours: "08:00 - 18:00", isOpen: true },
    { day: "Saturday", hours: "08:00 - 14:00", isOpen: true },
    { day: "Sunday", hours: "Closed", isOpen: false }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder-company.jpg" />
            <AvatarFallback className="text-2xl font-bold">HE</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{supplierData.name}</h1>
            <p className="text-muted-foreground">Owner: {supplierData.ownerName}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{supplierData.rating}</span>
                <span className="text-sm text-muted-foreground">({supplierData.totalOrders} orders)</span>
              </div>
              <Badge variant={supplierData.verificationStatus === "verified" ? "default" : "secondary"}>
                <Shield className="mr-1 h-3 w-3" />
                {supplierData.verificationStatus === "verified" ? "Verified Supplier" : "Pending Verification"}
              </Badge>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="hours">Business Hours</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic details about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name</Label>
                    {isEditing ? (
                      <Input defaultValue={supplierData.name} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{supplierData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>Owner Name</Label>
                    {isEditing ? (
                      <Input defaultValue={supplierData.ownerName} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{supplierData.ownerName}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input defaultValue={supplierData.email} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{supplierData.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input defaultValue={supplierData.phone} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{supplierData.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Website</Label>
                    {isEditing ? (
                      <Input defaultValue={supplierData.website} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{supplierData.website}</p>
                    )}
                  </div>
                  <div>
                    <Label>Established</Label>
                    {isEditing ? (
                      <Input defaultValue={supplierData.established} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{supplierData.established}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  {isEditing ? (
                    <Textarea defaultValue={supplierData.address} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{supplierData.address}</p>
                  )}
                </div>
                <div>
                  <Label>Description</Label>
                  {isEditing ? (
                    <Textarea defaultValue={supplierData.description} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{supplierData.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                    <span className="font-semibold">{supplierData.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Years in Business</span>
                    <span className="font-semibold">{supplierData.yearsInBusiness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <span className="font-semibold">{supplierData.rating}/5.0</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Specialization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {supplierData.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {supplierData.serviceAreas.map((area) => (
                      <div key={area} className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Legal & Registration Details</CardTitle>
              <CardDescription>Important business registration and legal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>GST Number</Label>
                  {isEditing ? (
                    <Input defaultValue={supplierData.gstNumber} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{supplierData.gstNumber}</p>
                  )}
                </div>
                <div>
                  <Label>PAN Number</Label>
                  {isEditing ? (
                    <Input defaultValue={supplierData.panNumber} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{supplierData.panNumber}</p>
                  )}
                </div>
                <div>
                  <Label>License Number</Label>
                  {isEditing ? (
                    <Input defaultValue={supplierData.licenseNumber} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{supplierData.licenseNumber}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certifications & Compliance</CardTitle>
              <CardDescription>Your business certifications and compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">Issued by: {cert.issuer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">Valid</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Until {cert.validity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Add New Certification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent matters</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Accept Orders</Label>
                  <p className="text-sm text-muted-foreground">Automatically accept orders from verified customers</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to all customers</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your operating hours for customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessHours.map((day) => (
                  <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={day.isOpen} />
                      <Label className="font-medium">{day.day}</Label>
                    </div>
                    <div className="flex gap-2">
                      {day.isOpen ? (
                        <>
                          <Input defaultValue="08:00" className="w-20" type="time" />
                          <span className="text-muted-foreground">to</span>
                          <Input defaultValue="18:00" className="w-20" type="time" />
                        </>
                      ) : (
                        <span className="text-muted-foreground">Closed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">Save Business Hours</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}