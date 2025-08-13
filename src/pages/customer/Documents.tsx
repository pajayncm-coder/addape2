import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, Search, Calendar, DollarSign, FileCheck, Shield } from "lucide-react";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    {
      id: 1,
      title: "Rental Agreement - Caterpillar 320 Excavator",
      type: "contract",
      date: "2024-01-15",
      size: "245 KB",
      status: "active",
      orderId: "ORD-2024-003"
    },
    {
      id: 2,
      title: "Invoice - INV-2024-001",
      type: "invoice",
      date: "2024-01-10",
      size: "89 KB",
      status: "paid",
      amount: "₹2,08,250"
    },
    {
      id: 3,
      title: "Equipment Inspection Report",
      type: "report",
      date: "2024-01-08",
      size: "156 KB",
      status: "completed",
      orderId: "ORD-2024-003"
    },
    {
      id: 4,
      title: "Delivery Receipt - Bobcat S650",
      type: "receipt",
      date: "2024-01-05",
      size: "67 KB",
      status: "delivered",
      orderId: "ORD-2024-002"
    },
    {
      id: 5,
      title: "Insurance Certificate",
      type: "insurance",
      date: "2024-01-01",
      size: "123 KB",
      status: "valid",
      expiryDate: "2024-12-31"
    },
    {
      id: 6,
      title: "Safety Training Certificate",
      type: "certificate",
      date: "2023-12-15",
      size: "98 KB",
      status: "valid",
      expiryDate: "2024-12-15"
    }
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "contract": return <FileCheck className="h-5 w-5" />;
      case "invoice": return <DollarSign className="h-5 w-5" />;
      case "receipt": return <FileText className="h-5 w-5" />;
      case "insurance": return <Shield className="h-5 w-5" />;
      case "certificate": return <FileCheck className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "paid": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "valid": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const documentsByType = {
    contracts: filteredDocuments.filter(doc => doc.type === "contract"),
    invoices: filteredDocuments.filter(doc => doc.type === "invoice"),
    receipts: filteredDocuments.filter(doc => doc.type === "receipt"),
    certificates: filteredDocuments.filter(doc => ["insurance", "certificate"].includes(doc.type)),
    reports: filteredDocuments.filter(doc => doc.type === "report")
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage your contracts, invoices, receipts, and certificates</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Documents ({filteredDocuments.length})</TabsTrigger>
            <TabsTrigger value="contracts">Contracts ({documentsByType.contracts.length})</TabsTrigger>
            <TabsTrigger value="invoices">Invoices ({documentsByType.invoices.length})</TabsTrigger>
            <TabsTrigger value="receipts">Receipts ({documentsByType.receipts.length})</TabsTrigger>
            <TabsTrigger value="certificates">Certificates ({documentsByType.certificates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} getDocumentIcon={getDocumentIcon} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          {Object.entries(documentsByType).map(([type, docs]) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {docs.map((doc) => (
                <DocumentCard key={doc.id} document={doc} getDocumentIcon={getDocumentIcon} getStatusColor={getStatusColor} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

const DocumentCard = ({ document, getDocumentIcon, getStatusColor }: any) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-muted rounded-lg">
            {getDocumentIcon(document.type)}
          </div>
          <div>
            <h3 className="font-medium mb-1">{document.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {document.date}
              </div>
              <span>{document.size}</span>
              {document.orderId && <span>Order: {document.orderId}</span>}
              {document.amount && <span>{document.amount}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(document.status)}>
            {document.status}
          </Badge>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Documents;