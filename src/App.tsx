import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/customer/Dashboard";
import Search from "./pages/customer/Search";
import EquipmentDetails from "./pages/customer/EquipmentDetails";
import Projects from "./pages/customer/Projects";
import Quotes from "./pages/customer/Quotes";
import Orders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";
import Settings from "./pages/customer/Settings";
import Booking from "./pages/customer/Booking";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderDetails from "./pages/customer/OrderDetails";
import Reviews from "./pages/customer/Reviews";
import Support from "./pages/customer/Support";
import Reports from "./pages/customer/Reports";
import Notifications from "./pages/customer/Notifications";
import Documents from "./pages/customer/Documents";
import EquipmentComparison from "./pages/customer/EquipmentComparison";
import PaymentMethods from "./pages/customer/PaymentMethods";
import DeliveryTracking from "./pages/customer/DeliveryTracking";
import BookingConfirmation from "./pages/customer/BookingConfirmation";
import BookingModification from "./pages/customer/BookingModification";
import BookingCancellation from "./pages/customer/BookingCancellation";
import PreBookingRequirements from "./pages/customer/PreBookingRequirements";
import BookingCalendar from "./pages/customer/BookingCalendar";
import RecurringBookings from "./pages/customer/RecurringBookings";
import BookingTemplates from "./pages/customer/BookingTemplates";
import Wishlist from "./pages/customer/Wishlist";

// Supplier Pages
import SupplierDashboard from "./pages/supplier/Dashboard";
import SupplierInventory from "./pages/supplier/Inventory";
import SupplierOrders from "./pages/supplier/Orders";
import SupplierAnalytics from "./pages/supplier/Analytics";
import SupplierProfile from "./pages/supplier/Profile";
import RentalAnalytics from "./pages/customer/RentalAnalytics";
import EmergencySupport from "./pages/customer/EmergencySupport";
import InsuranceOptions from "./pages/customer/InsuranceOptions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer/dashboard" element={<Dashboard />} />
          <Route path="/customer/search" element={<Search />} />
          <Route path="/customer/equipment/:id" element={<EquipmentDetails />} />
          <Route path="/customer/projects" element={<Projects />} />
          <Route path="/customer/quotes" element={<Quotes />} />
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/settings" element={<Settings />} />
          <Route path="/customer/booking/:id" element={<Booking />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/checkout" element={<Checkout />} />
          <Route path="/customer/order/:id" element={<OrderDetails />} />
          <Route path="/customer/reviews" element={<Reviews />} />
          <Route path="/customer/support" element={<Support />} />
          <Route path="/customer/reports" element={<Reports />} />
          <Route path="/customer/notifications" element={<Notifications />} />
          <Route path="/customer/documents" element={<Documents />} />
          <Route path="/customer/equipment-comparison" element={<EquipmentComparison />} />
          <Route path="/customer/payment-methods" element={<PaymentMethods />} />
          <Route path="/customer/delivery-tracking" element={<DeliveryTracking />} />
          <Route path="/customer/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/customer/booking-modification" element={<BookingModification />} />
          <Route path="/customer/booking-cancellation" element={<BookingCancellation />} />
          <Route path="/customer/pre-booking-requirements" element={<PreBookingRequirements />} />
          <Route path="/customer/booking-calendar" element={<BookingCalendar />} />
          <Route path="/customer/recurring-bookings" element={<RecurringBookings />} />
          <Route path="/customer/booking-templates" element={<BookingTemplates />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route path="/customer/rental-analytics" element={<RentalAnalytics />} />
          <Route path="/customer/emergency-support" element={<EmergencySupport />} />
          <Route path="/customer/insurance-options" element={<InsuranceOptions />} />
          
          {/* Supplier Routes */}
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/inventory" element={<SupplierInventory />} />
          <Route path="/supplier/orders" element={<SupplierOrders />} />
          <Route path="/supplier/analytics" element={<SupplierAnalytics />} />
          <Route path="/supplier/profile" element={<SupplierProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
