import { useState } from "react";
import { Link } from "react-router";
import {
  Crown, Package, Users, TrendingUp, ShoppingBag, Calendar, Tag, Briefcase, Eye, Edit2, Trash2, Plus, Download, Phone, Mail, Lock
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  StatCard, Card, Badge, StatusBadge, Table, Td, EmptyState, Button, Breadcrumb, UpgradeBanner, LockedModule, UsageCounter, Modal, ConfirmDialog, Input, Select, Textarea, Tabs, Pagination, SearchBar, Alert, Avatar
} from "../../components/ui";
import { vendorLeads, vendorCustomers, vendorOrders, visitorData, monthlyData } from "../../data/mockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const vendorStats = {
  services: 3,
  products: 4,
  orders: 12,
  customers: 5,
  leads: 5,
  jobs: 1,
  events: 1,
  offers: 2,
  visitors: 312,
};

function VLayout({ children, title, breadcrumbs, plan = "free" }: { children: React.ReactNode; title: string; breadcrumbs?: { label: string; href?: string }[]; plan?: "free" | "premium" }) {
  return (
    <DashboardLayout type="vendor" userName="Murugan Pillai" plan={plan}>
      <div className="mb-5">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <h1 className="text-xl font-bold text-slate-800 mt-1">{title}</h1>
      </div>
      {children}
    </DashboardLayout>
  );
}

// ─── VENDOR DASHBOARD ─────────────────────────────────────────────────────────
export function VendorDashboard() {
  const [plan, setPlan] = useState<"free" | "premium">("free");
  const [upgradeModal, setUpgradeModal] = useState(false);

  return (
    <DashboardLayout type="vendor" userName="Murugan Pillai" plan={plan}>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Vendor Dashboard</h1>
        <button
          onClick={() => setPlan(plan === "free" ? "premium" : "free")}
          className="text-xs px-3 py-1.5 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors font-medium border border-violet-200"
        >
          Toggle: {plan === "free" ? "→ Premium" : "→ Free"}
        </button>
      </div>

      {/* Plan Banner */}
      {plan === "free" ? (
        <UpgradeBanner onUpgrade={() => setUpgradeModal(true)} />
      ) : (
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 rounded-xl p-5 text-white flex items-center gap-4 mb-0">
          <Crown size={28} className="text-yellow-300 shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-base">Premium Plan Active</p>
            <p className="text-sm text-white/80">Expires: March 15, 2025 · All features unlocked</p>
          </div>
          <Badge variant="premium" className="bg-white/20 text-white border-0">✓ Premium</Badge>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-5">
        <StatCard label="Services" value={vendorStats.services} icon={<Package size={18} />} color="brand" />
        <StatCard label="Products" value={vendorStats.products} icon={<ShoppingBag size={18} />} color="sky" />
        <StatCard label="Customers" value={`${vendorStats.customers}/5`} icon={<Users size={18} />} color="emerald" />
        <StatCard label="Leads" value={`${vendorStats.leads}/5`} icon={<TrendingUp size={18} />} color="amber" />
        <StatCard label="Visitors" value={vendorStats.visitors} icon={<Eye size={18} />} color="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor trend chart */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Visitor Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Line type="monotone" dataKey="visitors" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#f97316", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Leads */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Recent Leads</h3>
            <Link to="/vendor/leads" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {vendorLeads.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <Avatar name={l.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{l.name}</p>
                  <p className="text-xs text-slate-500 truncate">{l.enquiry}</p>
                </div>
                <StatusBadge status={l.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Recent Orders</h3>
            <Link to="/vendor/orders" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {vendorOrders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingBag size={15} className="text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{o.customer}</p>
                  <p className="text-xs text-slate-500">{o.items} · {o.amount}</p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Plan Usage */}
        {plan === "free" && (
          <Card className="p-5">
            <h3 className="font-bold text-slate-700 mb-4">Free Plan Usage</h3>
            <div className="space-y-3">
              <UsageCounter used={5} max={5} label="Customers" />
              <UsageCounter used={5} max={5} label="Leads" />
              <UsageCounter used={1} max={1} label="Job Postings" />
              <UsageCounter used={1} max={1} label="Events" />
            </div>
            <button onClick={() => setUpgradeModal(true)} className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors">
              <Crown size={14} /> Upgrade to Premium
            </button>
          </Card>
        )}
      </div>

      {/* Upgrade Modal */}
      <Modal isOpen={upgradeModal} onClose={() => setUpgradeModal(false)} title="Upgrade to Premium" size="md">
        <div className="text-center mb-6">
          <Crown size={40} className="text-yellow-400 mx-auto mb-3" />
          <h3 className="font-bold text-2xl text-slate-800">Go Premium</h3>
          <p className="text-slate-500 text-sm mt-1">Unlock all features and grow your business</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {["Unlimited Customers", "Unlimited Leads", "Full Phone Numbers", "Multiple Job Posts", "Multiple Events", "Order Management", "Advanced Analytics", "Priority Support"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-emerald-500 font-bold">✓</span> {f}
            </div>
          ))}
        </div>
        <div className="bg-brand-50 rounded-xl p-4 mb-5 text-center">
          <p className="text-3xl font-bold text-slate-800">₹999 <span className="text-base font-normal text-slate-500">/year</span></p>
          <p className="text-xs text-slate-500 mt-1">Billed annually · Cancel anytime</p>
        </div>
        <Button fullWidth size="lg" onClick={() => setUpgradeModal(false)}>
          <Crown size={16} /> Upgrade Now
        </Button>
      </Modal>
    </DashboardLayout>
  );
}

// ─── COMPANY INFO ─────────────────────────────────────────────────────────────
export function VendorCompanyInfo() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <VLayout title="Company Information" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Company Info" }]}>
      {saved && <Alert type="success" message="Company information updated successfully!" onClose={() => setSaved(false)} className="mb-5" />}
      <div className="max-w-2xl">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-700">Business Profile</h3>
            {!editing && <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Edit2 size={14} /> Edit</Button>}
          </div>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
              {editing && <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"><span className="text-white text-xs font-medium">Change</span></div>}
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">Sri Murugan Mess</p>
              <p className="text-sm text-brand-600">Restaurants & Food</p>
              <Badge variant="premium" className="mt-1">⭐ Premium</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Business Name" value="Sri Murugan Mess" disabled={!editing} />
              <Input label="Owner Name" value="Murugan Pillai" disabled={!editing} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Phone" value="+91 94455 12345" disabled={!editing} />
              <Input label="Email" value="srimurugan@dindigul.com" disabled={!editing} />
            </div>
            <Input label="Address" value="42, Palani Road, Chinnalapatti, Dindigul - 624001" disabled={!editing} />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Industry" options={[{ value: "food", label: "Restaurants & Food" }]} value="food" disabled={!editing} />
              <Select label="Sub-Industry" options={[{ value: "catering", label: "Catering" }]} value="catering" disabled={!editing} />
            </div>
            <Textarea label="Description" value="Authentic Chettinad cuisine served fresh daily. Famous for mutton biryani and filter coffee." disabled={!editing} />
          </div>

          {editing && (
            <div className="flex gap-3 mt-6">
              <Button onClick={() => { setEditing(false); setSaved(true); }}>Save Changes</Button>
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          )}
        </Card>
      </div>
    </VLayout>
  );
}

// ─── VENDOR LEADS ─────────────────────────────────────────────────────────────
export function VendorLeads() {
  const [activeTab, setActiveTab] = useState("All Leads");
  const [showAddModal, setShowAddModal] = useState(false);
  const plan = "free";

  return (
    <VLayout title="Leads" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Leads" }]}>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-5">
        <StatCard label="Total Leads" value={vendorLeads.length} icon={<TrendingUp size={16} />} color="brand" />
        <StatCard label="New" value="2" icon={<TrendingUp size={16} />} color="sky" />
        <StatCard label="Contacted" value="2" icon={<Phone size={16} />} color="amber" />
        <StatCard label="Converted" value="1" icon={<TrendingUp size={16} />} color="emerald" />
        <StatCard label="Closed" value="1" icon={<TrendingUp size={16} />} color="rose" />
      </div>

      {plan === "free" && <UsageCounter used={5} max={5} label="Leads (Free Plan)" className="mb-5" />}

      <div className="flex items-center justify-between mb-4">
        <Tabs tabs={["New Leads", "All Leads"]} active={activeTab} onChange={setActiveTab} />
        <Button
          size="sm"
          onClick={() => setShowAddModal(true)}
          disabled={plan === "free" && vendorLeads.length >= 5}
          locked={plan === "free" && vendorLeads.length >= 5}
        >
          <Plus size={14} /> Add Lead
        </Button>
      </div>

      <Table headers={["Name", "Phone", "Source", "Enquiry", "Date", "Status", "Actions"]}>
        {vendorLeads.filter((l) => activeTab === "New Leads" ? l.status === "new" : true).map((l) => (
          <tr key={l.id} className="hover:bg-slate-50">
            <Td className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar name={l.name} size="sm" />
                {l.name}
              </div>
            </Td>
            <Td>
              {plan === "free" ? (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Lock size={12} />
                  <span className="text-xs">••••••••</span>
                  <Badge variant="premium" className="text-xs">Premium</Badge>
                </div>
              ) : (
                <span className="text-sm font-mono">{l.phone}</span>
              )}
            </Td>
            <Td className="text-slate-500 text-xs">{l.source}</Td>
            <Td className="text-slate-500 text-xs max-w-48"><p className="truncate">{l.enquiry}</p></Td>
            <Td className="text-slate-500 text-xs">{l.date}</Td>
            <Td><StatusBadge status={l.status} /></Td>
            <Td>
              <div className="flex items-center gap-2">
                <button className="text-xs text-brand-600 hover:underline"><Eye size={12} /></button>
                <button className="text-xs text-slate-400 hover:text-rose-500"><Trash2 size={12} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Lead">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" placeholder="Lead name" required />
            <Input label="Phone" placeholder="+91 9XXXXXXXXX" required />
          </div>
          <Input label="Email" placeholder="lead@example.com" type="email" />
          <Select label="Source" options={[{ value: "website", label: "Website Enquiry" }, { value: "phone", label: "Phone Call" }, { value: "walk-in", label: "Walk-in" }, { value: "referral", label: "Referral" }]} placeholder="Select source" />
          <Textarea label="Enquiry / Notes" placeholder="What did they enquire about?" rows={3} />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAddModal(false)}>Add Lead</Button>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </VLayout>
  );
}

// ─── VENDOR ORDERS ────────────────────────────────────────────────────────────
export function VendorOrders() {
  const [plan] = useState<"free" | "premium">("free");

  if (plan === "free") {
    return (
      <VLayout title="Orders" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Orders" }]}>
        <LockedModule feature="Order Management" />
      </VLayout>
    );
  }

  return (
    <VLayout title="Orders" plan="premium" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Orders" }]}>
      <Table headers={["Order ID", "Customer", "Date", "Items", "Amount", "Status", "Actions"]}>
        {vendorOrders.map((o) => (
          <tr key={o.id} className="hover:bg-slate-50">
            <Td className="font-mono text-xs">{o.id}</Td>
            <Td className="font-medium">{o.customer}</Td>
            <Td className="text-slate-500 text-xs">{o.date}</Td>
            <Td className="text-slate-500 text-xs">{o.items}</Td>
            <Td className="font-semibold">{o.amount}</Td>
            <Td><StatusBadge status={o.status} /></Td>
            <Td>
              <div className="flex gap-2">
                <button className="text-xs text-brand-600 hover:underline"><Eye size={12} /></button>
                <button className="text-xs text-slate-400 hover:text-slate-600"><Edit2 size={12} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </VLayout>
  );
}

// ─── VENDOR CUSTOMERS ─────────────────────────────────────────────────────────
export function VendorCustomers() {
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const plan = "free";

  return (
    <VLayout title="Customers" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Customers" }]}>
      {plan === "free" && <UsageCounter used={5} max={5} label="Customers (Free Plan)" className="mb-5" />}

      <div className="flex items-center justify-between mb-4">
        <SearchBar placeholder="Search customers..." className="w-64" />
        <Button size="sm" onClick={() => setShowAdd(true)} locked={plan === "free" && vendorCustomers.length >= 5}>
          <Plus size={14} /> Add Customer
        </Button>
      </div>

      <Table headers={["Name", "Phone", "Email", "Address", "Notes", "Actions"]}>
        {vendorCustomers.map((c) => (
          <tr key={c.id} className="hover:bg-slate-50">
            <Td>
              <div className="flex items-center gap-2">
                <Avatar name={c.name} size="sm" />
                <span className="font-medium text-sm">{c.name}</span>
              </div>
            </Td>
            <Td className="font-mono text-xs">{c.phone}</Td>
            <Td className="text-slate-500 text-xs">{c.email}</Td>
            <Td className="text-slate-500 text-xs max-w-40"><p className="truncate">{c.address}</p></Td>
            <Td className="text-slate-400 text-xs">{c.notes || "—"}</Td>
            <Td>
              <div className="flex gap-2">
                <button className="text-brand-600 hover:text-brand-700"><Eye size={14} /></button>
                <button className="text-slate-400 hover:text-slate-600"><Edit2 size={14} /></button>
                <button onClick={() => setDeleteId(c.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Customer">
        <div className="space-y-4">
          <Input label="Name" placeholder="Customer name" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone" placeholder="+91 9XXXXXXXXX" required />
            <Input label="Email" placeholder="email@example.com" />
          </div>
          <Input label="Address" placeholder="Full address" />
          <Textarea label="Notes" placeholder="Any notes..." rows={2} />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAdd(false)}>Add Customer</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => setDeleteId(null)}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        confirmLabel="Delete"
      />
    </VLayout>
  );
}

// ─── VENDOR SERVICES ─────────────────────────────────────────────────────────
export function VendorServices() {
  const [showAdd, setShowAdd] = useState(false);
  const sampleServices = [
    { id: 1, name: "Chettinad Catering", category: "Catering", price: "₹350/plate", status: "active", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=80&h=80&fit=crop" },
    { id: 2, name: "Tiffin Box Delivery", category: "Food Delivery", price: "₹60/box", status: "active", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop" },
    { id: 3, name: "Event Snacks Package", category: "Catering", price: "₹200/plate", status: "inactive", image: "https://images.unsplash.com/photo-1481931715705-36f5da8f4dff?w=80&h=80&fit=crop" },
  ];

  return (
    <VLayout title="Services" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Services" }]}>
      <div className="flex items-center justify-between mb-5">
        <SearchBar placeholder="Search services..." className="w-64" />
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Service</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleServices.map((s) => (
          <Card key={s.id} className="overflow-hidden">
            <div className="relative h-36">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              <StatusBadge status={s.status} className="absolute top-3 right-3" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-700">{s.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{s.category}</p>
              <p className="text-sm font-bold text-brand-600 mt-1">{s.price}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1"><Edit2 size={12} /> Edit</Button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 transition-colors">
                  <Trash2 size={14} className="text-slate-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Service" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Service Name" placeholder="e.g. Catering Service" required className="sm:col-span-2" />
          <Select label="Category" options={[{ value: "catering", label: "Catering" }, { value: "delivery", label: "Delivery" }, { value: "consultation", label: "Consultation" }]} placeholder="Select category" required />
          <Input label="Price / Details" placeholder="₹350 per plate" />
          <Textarea label="Description" placeholder="Describe your service..." rows={3} required className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700 block mb-1">Service Image</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-brand-300 cursor-pointer transition-colors">
              <p className="text-sm text-slate-400">Click to upload image</p>
            </div>
          </div>
          <Select label="Status" options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} value="active" />
        </div>
        <div className="flex gap-3 mt-5">
          <Button fullWidth onClick={() => setShowAdd(false)}>Save Service</Button>
          <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
        </div>
      </Modal>
    </VLayout>
  );
}

// ─── VENDOR ANALYTICS ─────────────────────────────────────────────────────────
export function VendorAnalytics() {
  const [period, setPeriod] = useState("7 days");
  const cityData = [
    { name: "Dindigul", value: 180 },
    { name: "Madurai", value: 72 },
    { name: "Coimbatore", value: 35 },
    { name: "Chennai", value: 25 },
  ];
  const COLORS = ["#f97316", "#0ea5e9", "#8b5cf6", "#10b981"];

  return (
    <VLayout title="Visitor Analytics" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Analytics" }]}>
      {/* Period filters */}
      <div className="flex gap-2 mb-5">
        {["Today", "7 days", "30 days", "Custom"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${period === p ? "bg-brand-500 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Visitors" value="312" icon={<Eye size={18} />} color="brand" trend="↑ 18% this week" />
        <StatCard label="Unique Visitors" value="248" icon={<Users size={18} />} color="sky" />
        <StatCard label="Profile Views" value="190" icon={<Eye size={18} />} color="emerald" />
        <StatCard label="Enquiries" value="14" icon={<TrendingUp size={18} />} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Visitor trend */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Visitor Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Line type="monotone" dataKey="visitors" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#f97316", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top cities */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Visitors by City</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={cityData} cx={85} cy={85} innerRadius={50} outerRadius={80} dataKey="value">
                  {cityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {cityData.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm text-slate-600">{c.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Visitors table */}
      <Card className="p-5">
        <h3 className="font-bold text-slate-700 mb-4">Recent Visitors</h3>
        <Table headers={["Visitor", "Time", "Pages Viewed", "Source", "Location"]}>
          {[
            { name: "Logged-in User", time: "2 mins ago", pages: "Profile, Services", source: "Direct", city: "Dindigul" },
            { name: "Anonymous", time: "15 mins ago", pages: "Profile", source: "Search", city: "Madurai" },
            { name: "Priya Selvam", time: "32 mins ago", pages: "Profile, Products", source: "Referral", city: "Dindigul" },
            { name: "Anonymous", time: "1 hr ago", pages: "Services", source: "Google", city: "Coimbatore" },
          ].map((v, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <Td>
                <div className="flex items-center gap-2">
                  <Avatar name={v.name === "Anonymous" ? "?" : v.name} size="sm" />
                  <span className="text-sm font-medium">{v.name}</span>
                </div>
              </Td>
              <Td className="text-slate-500 text-xs">{v.time}</Td>
              <Td className="text-slate-500 text-xs">{v.pages}</Td>
              <Td><Badge variant="info">{v.source}</Badge></Td>
              <Td className="text-slate-500 text-xs">{v.city}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </VLayout>
  );
}

// ─── VENDOR JOBS ─────────────────────────────────────────────────────────────
export function VendorJobs() {
  const [showAdd, setShowAdd] = useState(false);
  const plan = "free";
  const jobs = [
    { id: 1, title: "Restaurant Supervisor", type: "Full-time", status: "active", applicants: 8, posted: "2024-01-15" },
  ];

  return (
    <VLayout title="Jobs" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Jobs" }]}>
      {plan === "free" && <UsageCounter used={1} max={1} label="Job Postings (Free Plan)" className="mb-5" />}

      <div className="flex items-center justify-between mb-5">
        <div />
        <Button size="sm" onClick={() => setShowAdd(true)} locked={plan === "free" && jobs.length >= 1}>
          <Plus size={14} /> Post Job
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.map((j) => (
          <Card key={j.id} className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                <Briefcase size={18} className="text-brand-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-700">{j.title}</h3>
                  <StatusBadge status={j.status} />
                  <StatusBadge status={j.type} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Posted: {j.posted} · {j.applicants} applicants</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm"><Users size={12} /> {j.applicants} Candidates</Button>
                <Button variant="outline" size="sm"><Edit2 size={12} /></Button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 transition-colors">
                  <Trash2 size={14} className="text-slate-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Post a Job" size="lg">
        <div className="space-y-4">
          <Input label="Job Title" placeholder="e.g. Restaurant Supervisor" required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Job Type" options={[{ value: "full-time", label: "Full-time" }, { value: "part-time", label: "Part-time" }, { value: "contract", label: "Contract" }]} placeholder="Select type" required />
            <Input label="Salary Range" placeholder="₹15,000 - ₹20,000/month" />
          </div>
          <Input label="Location" placeholder="Job location" />
          <Textarea label="Job Description" placeholder="Describe the role..." rows={3} required />
          <Textarea label="Requirements" placeholder="List requirements..." rows={3} />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAdd(false)}>Post Job</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </VLayout>
  );
}

// ─── VENDOR EVENTS ────────────────────────────────────────────────────────────
export function VendorEvents() {
  const [showAdd, setShowAdd] = useState(false);
  const plan = "free";
  const events = [
    { id: 1, name: "Grand Opening Celebration", date: "2024-02-10", location: "Dindigul", status: "upcoming", bookings: 42, capacity: 100 },
  ];

  return (
    <VLayout title="Events" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Events" }]}>
      {plan === "free" && <UsageCounter used={1} max={1} label="Events (Free Plan)" className="mb-5" />}

      <div className="flex justify-end mb-5">
        <Button size="sm" onClick={() => setShowAdd(true)} locked={plan === "free" && events.length >= 1}>
          <Plus size={14} /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((e) => (
          <Card key={e.id} className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-700">{e.name}</h3>
                  <StatusBadge status={e.status} />
                </div>
                <p className="text-xs text-slate-500 mt-1">{e.date} · {e.location}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Bookings: {e.bookings}/{e.capacity}</span>
                    <span>{Math.round((e.bookings / e.capacity) * 100)}% full</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(e.bookings / e.capacity) * 100}%` }} />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm"><Users size={12} /> Bookings</Button>
                  <Button variant="outline" size="sm"><Edit2 size={12} /></Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Event" size="lg">
        <div className="space-y-4">
          <Input label="Event Name" placeholder="e.g. Grand Opening" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" required />
            <Input label="Time" type="time" required />
          </div>
          <Input label="Location" placeholder="Venue / address" required />
          <Input label="Capacity" placeholder="Max attendees" type="number" />
          <Textarea label="Description" placeholder="Describe the event..." rows={3} />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAdd(false)}>Save Event</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </VLayout>
  );
}

// ─── VENDOR SETTINGS ──────────────────────────────────────────────────────────
export function VendorSettings() {
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => { setDownloading(false); setDownloaded(true); }, 2000);
  };

  return (
    <VLayout title="Settings" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Settings" }]}>
      {saved && <Alert type="success" message="Settings saved successfully!" onClose={() => setSaved(false)} className="mb-5" />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <Input label="Display Name" value="Murugan Pillai" />
            <Input label="Email" value="srimurugan@dindigul.com" type="email" />
            <Input label="Phone" value="+91 94455 12345" />
            <Button onClick={() => setSaved(true)}>Save Changes</Button>
          </div>
        </Card>

        {/* Password */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Change Password</h3>
          <div className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="Min 8 characters" />
            <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
            <Button>Update Password</Button>
          </div>
        </Card>

        {/* Export / Download */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-bold text-slate-700 mb-2">Export Business Data</h3>
          <p className="text-sm text-slate-500 mb-5">Download your complete business information, leads, customers, and analytics as a PDF report.</p>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-5">
            <h4 className="font-semibold text-slate-700 text-sm mb-3">Report Preview</h4>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex justify-between"><span>Business Name</span><span className="text-slate-700 font-medium">Sri Murugan Mess</span></div>
              <div className="flex justify-between"><span>Total Leads</span><span className="text-slate-700 font-medium">5</span></div>
              <div className="flex justify-between"><span>Total Customers</span><span className="text-slate-700 font-medium">5</span></div>
              <div className="flex justify-between"><span>Total Visitors</span><span className="text-slate-700 font-medium">312</span></div>
              <div className="flex justify-between"><span>Services Listed</span><span className="text-slate-700 font-medium">3</span></div>
            </div>
          </div>

          {downloaded ? (
            <Alert type="success" message="Report downloaded successfully as PDF!" />
          ) : (
            <Button onClick={handleDownload} loading={downloading} className="flex items-center gap-2">
              <Download size={15} />
              {downloading ? "Generating PDF..." : "Download PDF Report"}
            </Button>
          )}
          <p className="text-xs text-slate-400 mt-2">Generated using jsPDF + html2canvas</p>
        </Card>
      </div>
    </VLayout>
  );
}

// ─── VENDOR CMS ───────────────────────────────────────────────────────────────
export function VendorCMS() {
  const [activeTab, setActiveTab] = useState("About Us");
  const [saved, setSaved] = useState(false);

  return (
    <VLayout title="CMS" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "CMS" }]}>
      {saved && <Alert type="success" message="Content saved successfully!" onClose={() => setSaved(false)} className="mb-5" />}

      <Tabs tabs={["About Us", "Terms & Policies"]} active={activeTab} onChange={setActiveTab} />

      <Card className="p-6 mt-5">
        <h3 className="font-bold text-slate-700 mb-4">{activeTab}</h3>
        <Textarea
          label={`Write your ${activeTab} content`}
          placeholder={activeTab === "About Us" ? "Tell customers about your business, history, values..." : "Write your terms, refund policy, service conditions..."}
          rows={10}
        />
        <div className="flex gap-3 mt-4">
          <Button onClick={() => setSaved(true)}>Save Content</Button>
          <Button variant="outline">Preview</Button>
        </div>
      </Card>
    </VLayout>
  );
}

// ─── VENDOR OFFERS ────────────────────────────────────────────────────────────
export function VendorOffers() {
  const [showAdd, setShowAdd] = useState(false);
  const offers = [
    { id: 1, title: "Summer Special Biryani Offer", discount: "20% off", start: "2024-01-15", end: "2024-02-15", status: "active" },
    { id: 2, title: "Bulk Order Discount", discount: "₹500 off on 100+ pax", start: "2024-01-01", end: "2024-03-31", status: "active" },
  ];

  return (
    <VLayout title="Offers" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Offers" }]}>
      <div className="flex justify-end mb-5">
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Offer</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {offers.map((o) => (
          <Card key={o.id} className="p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl shrink-0">🎁</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-700 text-sm">{o.title}</h3>
                  <StatusBadge status={o.status} />
                </div>
                <p className="text-brand-600 font-semibold mt-1">{o.discount}</p>
                <p className="text-xs text-slate-500 mt-1">{o.start} → {o.end}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm"><Edit2 size={12} /></Button>
                  <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 transition-colors">
                    <Trash2 size={13} className="text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Offer">
        <div className="space-y-4">
          <Input label="Offer Title" placeholder="e.g. Summer Special" required />
          <Input label="Discount / Details" placeholder="e.g. 20% off, ₹500 off" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" required />
            <Input label="End Date" type="date" required />
          </div>
          <Textarea label="Description" placeholder="More details about this offer..." rows={3} />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAdd(false)}>Add Offer</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </VLayout>
  );
}
