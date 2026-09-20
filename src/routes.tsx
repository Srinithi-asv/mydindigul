import { createBrowserRouter } from "react-router";

// Public pages
import HomePage from "./pages/public/HomePage";
import { ServicesPage, ProductsPage, JobsPage, EventsPage,EventDetailPage, TourismPage, VendorStorefront } from "./pages/public/ListingPages";
import { ProductDetailPage, ServiceDetailPage } from "./pages/public/DetailPages";

// Auth pages
import { LoginPage, RegisterPage, BusinessRegisterPage, ForgotPasswordPage } from "./pages/auth/AuthPages";

// User pages
import { UserDashboard, UserEnquiries, UserOrders, UserJobs, UserEvents, UserWishlist, UserProfile, UserResetPassword } from "./pages/user/UserPages";

// Vendor pages
import { VendorDashboard, VendorCompanyInfo, VendorLeads, VendorOrders, VendorCustomers, VendorServices, VendorAnalytics, VendorJobs, VendorEvents, VendorSettings, VendorCMS, VendorOffers } from "./pages/vendor/VendorPages";

// Admin pages
import { AdminDashboard, AdminVendors, AdminUsers, AdminServices, AdminProducts, AdminIndustries, AdminJobs, AdminEvents } from "./pages/admin/AdminPages";

// 404
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="text-8xl font-bold text-slate-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-700 mb-2">Page Not Found</h1>
        <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  // Public routes
  { path: "/", Component: HomePage },
  { path: "/services", Component: ServicesPage },
  { path: "/services/:id", Component: ServiceDetailPage },
  { path: "/products", Component: ProductsPage },
  { path: "/products/:id", Component: ProductDetailPage },
  { path: "/jobs", Component: JobsPage },
  { path: "/jobs/:id", Component: JobsPage },
  { path: "/events", Component: EventsPage },
{ path: "/events/:id", Component: EventDetailPage },
  { path: "/tourism", Component: TourismPage },
  { path: "/tourism/:id", Component: TourismPage },
  { path: "/vendor/:slug", Component: VendorStorefront },

  // Auth routes
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/businessregister", Component: BusinessRegisterPage },
  { path: "/forgot-password", Component: ForgotPasswordPage },

  // User panel routes
  { path: "/user/dashboard", Component: UserDashboard },
  { path: "/user/enquiries", Component: UserEnquiries },
  { path: "/user/orders", Component: UserOrders },
  { path: "/user/jobs", Component: UserJobs },
  { path: "/user/events", Component: UserEvents },
  { path: "/user/wishlist", Component: UserWishlist },
  { path: "/user/profile", Component: UserProfile },
  { path: "/user/reset-password", Component: UserResetPassword },

  // Vendor panel routes
  { path: "/vendor/dashboard", Component: VendorDashboard },
  { path: "/vendor/company-info", Component: VendorCompanyInfo },
  { path: "/vendor/cms", Component: VendorCMS },
  { path: "/vendor/services", Component: VendorServices },
  { path: "/vendor/products", Component: VendorServices }, // reuse form pattern
  { path: "/vendor/catalogue", Component: VendorServices },
  { path: "/vendor/orders", Component: VendorOrders },
  { path: "/vendor/customers", Component: VendorCustomers },
  { path: "/vendor/leads", Component: VendorLeads },
  { path: "/vendor/jobs", Component: VendorJobs },
  { path: "/vendor/events", Component: VendorEvents },
  { path: "/vendor/offers", Component: VendorOffers },
  { path: "/vendor/analytics", Component: VendorAnalytics },
  { path: "/vendor/settings", Component: VendorSettings },

  // Admin panel routes
  { path: "/admin/dashboard", Component: AdminDashboard },
  { path: "/admin/vendors", Component: AdminVendors },
  { path: "/admin/users", Component: AdminUsers },
  { path: "/admin/services", Component: AdminServices },
  { path: "/admin/products", Component: AdminProducts },
  { path: "/admin/industries", Component: AdminIndustries },
  { path: "/admin/jobs", Component: AdminJobs },
  { path: "/admin/events", Component: AdminEvents },

  // 404
  { path: "*", Component: NotFound },
]);
