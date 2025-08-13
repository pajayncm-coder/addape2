import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, Upload, CheckCircle, AlertTriangle, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export default function PreBookingRequirements() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock equipment data
  const equipment = {
    id: "EQ-001",
    name: "CAT 320 Excavator",
    category: "Heavy Equipment",
    requiredLicenses: ["Heavy Equipment Operator License", "OSHA 10-Hour Certification"],
    requiredInsurance: "General Liability (₹8,33,00,000 minimum)",
    safetyRequirements: ["Hard Hat", "Safety Vest", "Steel-toe Boots"],
    operatorExperience: "Minimum 2 years",
    additionalCertifications: ["Swing Radius Awareness", "Excavation Safety"]
  };

  const [requirements, setRequirements] = useState({
    operatorLicense: { verified: false, file: null, expiryDate: "" },
    oshaCertification: { verified: false, file: null, expiryDate: "" },
    insurance: { verified: false, file: null, expiryDate: "" },
    experienceYears: "",
    safetyAcknowledgment: false,
    emergencyContact: { name: "", phone: "" },
    medicalClearance: { verified: false, file: null }
  });

  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileUpload = (requirementType: string, file: File | null) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [requirementType]: file }));
      setRequirements(prev => ({
        ...prev,
        [requirementType]: { ...prev[requirementType], file, verified: true }
      }));
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const calculateProgress = () => {
    const totalRequirements = 7;
    let completed = 0;
    
    if (requirements.operatorLicense.verified) completed++;
    if (requirements.oshaCertification.verified) completed++;
    if (requirements.insurance.verified) completed++;
    if (requirements.experienceYears) completed++;
    if (requirements.safetyAcknowledgment) completed++;
    if (requirements.emergencyContact.name && requirements.emergencyContact.phone) completed++;
    if (requirements.medicalClearance.verified) completed++;
    
    return (completed / totalRequirements) * 100;
  };

  const canProceed = () => {
    return calculateProgress() === 100;
  };

  const handleProceedToBooking = () => {
    if (canProceed()) {
      toast({
        title: "Requirements Verified",
        description: "All requirements met. Proceeding to booking...",
      });
      navigate(`/customer/booking/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pre-Booking Requirements</h1>
          <p className="text-muted-foreground">Complete all requirements before booking {equipment.name}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Equipment Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-semibold">{equipment.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold">{equipment.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <Progress value={calculateProgress()} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round(calculateProgress())}% complete
                  </p>
                </div>
              </CardContent>
            </Card>

            <Alert className="mt-4">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                All documents must be valid and current. Expired certifications will not be accepted.
              </AlertDescription>
            </Alert>
          </div>

          {/* Requirements Checklist */}
          <div className="lg:col-span-3 space-y-6">
            {/* Licenses & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Licenses & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Operator License */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="operatorLicense">Heavy Equipment Operator License</Label>
                      {requirements.operatorLicense.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <Badge variant={requirements.operatorLicense.verified ? "default" : "secondary"}>
                      Required
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("operatorLicense", e.target.files?.[0] || null)}
                      />
                    </div>
                    <div>
                      <Input
                        type="date"
                        placeholder="Expiry Date"
                        value={requirements.operatorLicense.expiryDate}
                        onChange={(e) => setRequirements(prev => ({
                          ...prev,
                          operatorLicense: { ...prev.operatorLicense, expiryDate: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* OSHA Certification */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="oshaCert">OSHA 10-Hour Certification</Label>
                      {requirements.oshaCertification.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <Badge variant={requirements.oshaCertification.verified ? "default" : "secondary"}>
                      Required
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("oshaCertification", e.target.files?.[0] || null)}
                      />
                    </div>
                    <div>
                      <Input
                        type="date"
                        placeholder="Expiry Date"
                        value={requirements.oshaCertification.expiryDate}
                        onChange={(e) => setRequirements(prev => ({
                          ...prev,
                          oshaCertification: { ...prev.oshaCertification, expiryDate: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Insurance Coverage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label>General Liability Insurance (₹8,33,00,000 minimum)</Label>
                    {requirements.insurance.verified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <Badge variant={requirements.insurance.verified ? "default" : "secondary"}>
                    Required
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("insurance", e.target.files?.[0] || null)}
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      placeholder="Policy Expiry Date"
                      value={requirements.insurance.expiryDate}
                      onChange={(e) => setRequirements(prev => ({
                        ...prev,
                        insurance: { ...prev.insurance, expiryDate: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience & Medical */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Experience & Medical Clearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Years of Heavy Equipment Operating Experience</Label>
                  <Input
                    type="number"
                    placeholder="Minimum 2 years required"
                    min="0"
                    value={requirements.experienceYears}
                    onChange={(e) => setRequirements(prev => ({
                      ...prev,
                      experienceYears: e.target.value
                    }))}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label>Medical Clearance (if required)</Label>
                      {requirements.medicalClearance.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("medicalClearance", e.target.files?.[0] || null)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Name</Label>
                    <Input
                      placeholder="Full name"
                      value={requirements.emergencyContact.name}
                      onChange={(e) => setRequirements(prev => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="Phone number"
                      value={requirements.emergencyContact.phone}
                      onChange={(e) => setRequirements(prev => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Acknowledgment */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Acknowledgment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Required Safety Equipment:</h4>
                    <ul className="text-sm space-y-1">
                      {equipment.safetyRequirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="safetyAck"
                      checked={requirements.safetyAcknowledgment}
                      onCheckedChange={(checked) => setRequirements(prev => ({
                        ...prev,
                        safetyAcknowledgment: checked as boolean
                      }))}
                    />
                    <Label htmlFor="safetyAck" className="text-sm">
                      I acknowledge that I have all required safety equipment and understand the safety requirements for operating this equipment
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleProceedToBooking}
                disabled={!canProceed()}
                className="flex-1"
              >
                {canProceed() ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Proceed to Booking
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Complete Requirements ({Math.round(calculateProgress())}%)
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => navigate("/customer/search")} className="flex-1">
                Back to Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}