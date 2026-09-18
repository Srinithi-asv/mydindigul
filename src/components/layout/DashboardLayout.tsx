import { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Building2, LayoutDashboard, MessageSquare, ShoppingBag, Briefcase, Calendar, Heart,
  User, Settings, LogOut, Menu, X, ChevronRight, Bell, Search, Crown, Lock,
  Store, Users, Package, TrendingUp, FileText, Tag, MapPin, BarChart2, Shield
} from "lucide-react";
import { Avatar } from "../ui";

// ─── USER SIDEBAR ─────────────────────────────────────────────────────────────
const userNav = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/user/dashboard" },
  { icon: MessageSquare, label: "Enquiries", to: "/user/enquiries" },
  { icon: ShoppingBag, label: "Orders", to: "/user/orders" },
  { icon: Briefcase, label: "Jobs Applied", to: "/user/jobs" },
  { icon: Calendar, label: "Events Booked", to: "/user/events" },
  { icon: Heart, label: "Wishlist", to: "/user/wishlist" },
  { icon: User, label: "Profile", to: "/user/profile" },
  { icon: Settings, label: "Reset Password", to: "/user/reset-password" },
];

// ─── VENDOR SIDEBAR ──────────────────────────────────────────────────────────
const vendorNav = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/vendor/dashboard", locked: false },
  { icon: Store, label: "Company Info", to: "/vendor/company-info", locked: false },
  { icon: FileText, label: "CMS", to: "/vendor/cms", locked: false },
  { icon: Package, label: "Services", to: "/vendor/services", locked: false },
  { icon: ShoppingBag, label: "Products", to: "/vendor/products", locked: false },
  { icon: Tag, label: "Industry Catalogue", to: "/vendor/catalogue", locked: false },
  { icon: ShoppingBag, label: "Orders", to: "/vendor/orders", locked: true },
  { icon: Users, label: "Customers", to: "/vendor/customers", locked: false },
  { icon: TrendingUp, label: "Leads", to: "/vendor/leads", locked: false },
  { icon: Briefcase, label: "Jobs", to: "/vendor/jobs", locked: false },
  { icon: Calendar, label: "Events", to: "/vendor/events", locked: false },
  { icon: Tag, label: "Offers", to: "/vendor/offers", locked: false },
  { icon: BarChart2, label: "Analytics", to: "/vendor/analytics", locked: false },
  { icon: Settings, label: "Settings", to: "/vendor/settings", locked: false },
];

// ─── ADMIN SIDEBAR ────────────────────────────────────────────────────────────
const adminNav = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin/dashboard" },
  { icon: Store, label: "Vendors", to: "/admin/vendors" },
  { icon: Users, label: "Users", to: "/admin/users" },
  { icon: Package, label: "Services", to: "/admin/services" },
  { icon: ShoppingBag, label: "Products", to: "/admin/products" },
  { icon: Tag, label: "Industries", to: "/admin/industries" },
  { icon: Briefcase, label: "Jobs", to: "/admin/jobs" },
  { icon: Calendar, label: "Events", to: "/admin/events" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  type: "user" | "vendor" | "admin";
  userName?: string;
  plan?: "free" | "premium";
}

export default function DashboardLayout({ children, type, userName = "Rajesh Kumar", plan = "free" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = type === "user" ? userNav : type === "vendor" ? vendorNav : adminNav;

  const brandLabels = { user: "User Panel", vendor: "Vendor Panel", admin: "Admin Panel" };
  const brandColors = { user: "bg-sky-500", vendor: "bg-brand-500", admin: "bg-violet-600" };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 bg-white border-r border-slate-200 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
          <div className={`w-7 h-7 ${brandColors[type]} rounded-lg flex items-center justify-center shrink-0`}>
            {type === "admin" ? <Shield size={15} className="text-white" /> : <Building2 size={15} className="text-white" />}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight">MyDindigul</p>
            <p className="text-xs text-slate-400">{brandLabels[type]}</p>
          </div>
          <button className="ml-auto lg:hidden p-1 rounded hover:bg-slate-100" onClick={() => setSidebarOpen(false)}>
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Plan badge (vendor only) */}
        {type === "vendor" && (
          <div className="px-4 py-3 border-b border-slate-100">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${plan === "premium" ? "bg-violet-50 text-violet-700" : "bg-slate-50 text-slate-600"}`}>
              <Crown size={13} />
              {plan === "premium" ? "Premium Plan" : "Free Plan"}
              {plan === "free" && <span className="ml-auto text-brand-500 font-semibold cursor-pointer hover:underline" onClick={() => {}}>Upgrade</span>}
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll py-3 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            const locked = (item as any).locked && plan === "free";

            return (
              <Link
                key={item.to}
                to={locked ? "#" : item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all
                  ${active ? "bg-brand-50 text-brand-700" : locked ? "text-slate-400 cursor-not-allowed" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"}`}
              >
                <Icon size={16} className={active ? "text-brand-600" : locked ? "text-slate-300" : "text-slate-400"} />
                <span className="flex-1">{item.label}</span>
                {locked && <Lock size={12} className="text-slate-300" />}
                {active && <ChevronRight size={14} className="text-brand-400" />}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={userName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">{userName}</p>
              <p className="text-xs text-slate-400 capitalize">{type}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-rose-600 rounded-lg transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} className="text-slate-600" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-sm relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 text-slate-700"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="text-xs text-slate-500 hover:text-brand-600 transition-colors hidden sm:block">← Back to site</Link>
            <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
            <Avatar name={userName} size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
