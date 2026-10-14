import React from "react";
import { useEffect, useState } from "react";
import { apiFetch } from "../../api";
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
  const [businessName, setBusinessName] = React.useState("Vendor");

  React.useEffect(() => {
    apiFetch("/vendor/dashboard")
      .then((data) => {
        setBusinessName(data?.vendor?.business_name || "Vendor");
      })
      .catch((error) => {
        console.error("Failed to load vendor name:", error);
      });
  }, []);

  return (
    <DashboardLayout type="vendor" userName={businessName} plan={plan}>
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
  const [vendor, setVendor] = useState<any>(null);
const [stats, setStats] = useState<any>(null);
const [visitorTrend, setVisitorTrend] = useState<any[]>([]);
const [recentLeads, setRecentLeads] = useState<any[]>([]);
const [recentOrders, setRecentOrders] = useState<any[]>([]);
const [limits, setLimits] = useState<any>(null);

useEffect(() => {
  apiFetch("/vendor/dashboard")
    .then((data) => {
      setVendor(data.vendor);
      setPlan(data.plan?.type === "premium" ? "premium" : "free");
      setStats(data.stats);
      setVisitorTrend(data.visitor_trend || []);
      setRecentLeads(data.recent_leads || []);
      setRecentOrders(data.recent_orders || []);
      setLimits(data.limits || null);
    })
    .catch((error) => {
      console.error("Failed to load vendor dashboard:", error);
    });
}, []);
  return (
    <DashboardLayout
  type="vendor"
  userName={vendor?.business_name || "Vendor"}
  plan={plan}
>
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
       <StatCard
  label="Services"
  value={stats?.services ?? 0}
  icon={<Package size={18} />}
  color="brand"
/>
        <StatCard
  label="Products"
  value={stats?.products ?? 0}
  icon={<ShoppingBag size={18} />}
  color="sky"
/>
        <StatCard
  label="Customers"
  value={`${stats?.customers ?? 0}/5`}
  icon={<Users size={18} />}
  color="emerald"
/>
        <StatCard
  label="Leads"
  value={`${stats?.leads ?? 0}/5`}
  icon={<TrendingUp size={18} />}
  color="amber"
/>
        <StatCard
  label="Visitors"
  value={stats?.visitors ?? 0}
  icon={<Eye size={18} />}
  color="violet"
/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor trend chart */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Visitor Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
  data={Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    const key = date.toLocaleDateString("en-CA");
    const record = visitorTrend.find((item) => item.date === key);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      visitors: Number(record?.visitors ?? 0),
    };
  })}
>
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
            {recentLeads.slice(0, 4).map((l) => (
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
            {recentOrders.slice(0, 4).map((o) => (
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
              <UsageCounter
  used={limits?.customers?.used ?? 0}
  max={limits?.customers?.max ?? 0}
  label="Customers"
/>
              <UsageCounter
  used={limits?.leads?.used ?? 0}
  max={limits?.leads?.max ?? 0}
  label="Leads"
/>
              <UsageCounter
  used={limits?.active_jobs?.used ?? 0}
  max={limits?.active_jobs?.max ?? 0}
  label="Job Postings"
/>
              <UsageCounter
  used={limits?.events?.used ?? 0}
  max={limits?.events?.max ?? 0}
  label="Events"
/>
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    business_name: "",
    contact_person: "",
    phone: "",
    email: "",
    address_line1: "",
    address_line2: "",
    city: "",
    pincode: "",
    industry_id: "",
    sub_industry_id: "",
    about_us: "",
  });

  const [originalForm, setOriginalForm] = useState(form);
 const [vendor, setVendor] = useState <any>(null);

  useEffect(() => {
    apiFetch("/vendors/2")
      .then((data) => {
        const v = data.vendor;
        setVendor(v);

        const details = {
          business_name: v.business_name || "",
          contact_person: v.contact_person || "",
          phone: v.phone || "",
          email: v.email || "",
          address_line1: v.address_line1 || "",
          address_line2: v.address_line2 || "",
          city: v.city || "",
          pincode: v.pincode || "",
          industry_id: String(v.industry_id || ""),
          sub_industry_id: v.sub_industry_id
            ? String(v.sub_industry_id)
            : "",
          about_us: v.about_us || "",
        };

        setForm(details);
        setOriginalForm(details);
      })
      .catch((err) => {
        setError(err.message || "Failed to load company information.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSave = async () => {
    if (
      !form.business_name.trim() ||
      !form.phone.trim() ||
      !form.address_line1.trim() ||
      !form.pincode.trim()
    ) {
      setError("Please fill in the required business fields.");
      return;
    }

    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const data = await apiFetch("/vendors/2", {
        method: "PUT",
        body: JSON.stringify({
          business_name: form.business_name,
          contact_person: form.contact_person || null,
          phone: form.phone,
          email: form.email || null,
          address_line1: form.address_line1,
          address_line2: form.address_line2 || null,
          city: form.city,
          pincode: form.pincode,
          industry_id: Number(form.industry_id),
          sub_industry_id: form.sub_industry_id
            ? Number(form.sub_industry_id)
            : null,
          about_us: form.about_us || null,
        }),
      });

      const v = data.vendor;
      setVendor(v);

      const updated = {
        business_name: v.business_name || "",
        contact_person: v.contact_person || "",
        phone: v.phone || "",
        email: v.email || "",
        address_line1: v.address_line1 || "",
        address_line2: v.address_line2 || "",
        city: v.city || "",
        pincode: v.pincode || "",
        industry_id: String(v.industry_id || ""),
        sub_industry_id: v.sub_industry_id
          ? String(v.sub_industry_id)
          : "",
        about_us: v.about_us || "",
      };

      setForm(updated);
      setOriginalForm(updated);
      setEditing(false);
      setSaved(true);
    } catch (err: any) {
      setError(err.message || "Failed to save company information.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <VLayout
      title="Company Information"
      breadcrumbs={[
        { label: "Dashboard", href: "/vendor/dashboard" },
        { label: "Company Info" },
      ]}
    >
      {saved && (
        <div className="mb-5">
          <Alert
            type="success"
            message="Company information updated successfully!"
            onClose={() => setSaved(false)}
          />
        </div>
      )}

      {error && (
        <div className="mb-5">
          <Alert
            type="error"
            message={error}
            onClose={() => setError("")}
          />
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading company information...</p>
      ) : (
        <div className="max-w-2xl">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-700">
                Business Profile
              </h3>
              {!editing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setForm(originalForm);
                    setEditing(true);
                  }}
                >
                  <Edit2 size={14} /> Edit
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <img
                  src={
                    vendor?.logo_url ||
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop"
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-lg">
                  {form.business_name}
                </p>
                <p className="text-sm text-brand-600">
                  {vendor?.industry?.name || "Industry not selected"}
                </p>
                <Badge
                  variant="premium"
                  className="mt-1"
                >
                  {vendor?.plan_type === "premium" ? "⭐ Premium" : "Free Plan"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Business Name"
                  value={form.business_name}
                  disabled={!editing}
                  onChange={(value) => updateField("business_name", value)}
                />
                <Input
                  label="Owner Name"
                  value={form.contact_person}
                  disabled={!editing}
                  onChange={(value) => updateField("contact_person", value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Phone"
                  value={form.phone}
                  disabled={!editing}
                  onChange={(value) => updateField("phone", value)}
                />
                <Input
                  label="Email"
                  value={form.email}
                  disabled={!editing}
                  onChange={(value) => updateField("email", value)}
                />
              </div>

              <Input
                label="Address"
                value={form.address_line1}
                disabled={!editing}
                onChange={(value) => updateField("address_line1", value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={form.city}
                  disabled={!editing}
                  onChange={(value) => updateField("city", value)}
                />
                <Input
                  label="Pincode"
                  value={form.pincode}
                  disabled={!editing}
                  onChange={(value) => updateField("pincode", value)}
                />
              </div>

              <Input
                label="Address Line 2"
                value={form.address_line2}
                disabled={!editing}
                onChange={(value) => updateField("address_line2", value)}
              />

              <Input
                label="Industry ID"
                value={form.industry_id}
                disabled
              />

              <Input
                label="Sub-Industry ID"
                value={form.sub_industry_id}
                disabled
              />

              <Textarea
  label="Description"
  value={form.about_us}
  onChange={(value) => updateField("about_us", value)}
  className={!editing ? "pointer-events-none opacity-70" : ""}
 />
            </div>

            {editing && (
              <div className="flex gap-3 mt-6">
                <Button onClick={handleSave} loading={saving}>
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  disabled={saving}
                  onClick={() => {
                    setForm(originalForm);
                    setEditing(false);
                    setError("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </VLayout>
  );
}


// ─── VENDOR LEADS ─────────────────────────────────────────────────────────────
export function VendorLeads() {
  const [activeTab, setActiveTab] = useState("All Leads");
  const [showAddModal, setShowAddModal] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [leadName, setLeadName] = useState("");
const [leadPhone, setLeadPhone] = useState("");
const [leadEmail, setLeadEmail] = useState("");
const [leadSource, setLeadSource] = useState("enquiry");
const [leadRequirement, setLeadRequirement] = useState("");
  const plan = "free";
  useEffect(() => {
  apiFetch("/vendor/dashboard")
    .then(async (data) => {
      const id = data?.vendor?.id;

      if (!id) return;

      setVendorId(id);

      const response = await apiFetch(`/leads/vendor/${id}`);
      setLeads(response.leads || response.data || []);
    })
    .catch((error) => {
      console.error("Failed to load vendor leads:", error);
    });
}, []);

const handleAddLead = async () => {
  if (!vendorId) {
    console.error("Vendor ID is not available yet.");
    return;
  }

  try {
    await apiFetch("/leads", {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendorId,
        customer_name: leadName,
        customer_phone: leadPhone,
        masked_phone: "••••••••",
        customer_email: leadEmail || null,
        lead_source: leadSource,
        requirement_details: leadRequirement || null,
        lead_status: "new",
      }),
    });

    const data = await apiFetch(`/leads/vendor/${vendorId}`);
    setLeads(data.leads || data.data || []);

    setLeadName("");
    setLeadPhone("");
    setLeadEmail("");
    setLeadSource("enquiry");
    setLeadRequirement("");
    setShowAddModal(false);
  } catch (error) {
    console.error("Failed to add lead:", error);
  }
};


  return (
    <VLayout title="Leads" breadcrumbs={[{ label: "Dashboard", href: "/vendor/dashboard" }, { label: "Leads" }]}>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-5">
        <StatCard label="Total Leads" value={leads.length} icon={<TrendingUp size={16} />} color="brand" />
        <StatCard label="New" value={leads.filter((l) => l.lead_status === "new").length} icon={<TrendingUp size={16} />} color="sky" />
        <StatCard label="Contacted" value={leads.filter((l) => l.lead_status === "contacted").length} icon={<Phone size={16} />} color="amber" />
        <StatCard label="Converted" value={leads.filter((l) => l.lead_status === "converted").length} icon={<TrendingUp size={16} />} color="emerald" />
        <StatCard label="Closed" value={leads.filter((l) => l.lead_status === "closed").length} icon={<TrendingUp size={16} />} color="rose" />
      </div>

      {plan === "free" && <div className="mb-5">
  <UsageCounter
  used={leads.length}
  max={5}
  label="Leads (Free Plan)"
/>
</div>}

      <div className="flex items-center justify-between mb-4">
        <Tabs tabs={["New Leads", "All Leads"]} active={activeTab} onChange={setActiveTab} />
        <Button
          size="sm"
          onClick={() => setShowAddModal(true)}
          disabled={plan === "free" && leads.length >= 5}
locked={plan === "free" && leads.length >= 5}
        >
          <Plus size={14} /> Add Lead
        </Button>
      </div>

      <Table headers={["Name", "Phone", "Source", "Enquiry", "Date", "Status", "Actions"]}>
        {leads.filter((l) => activeTab === "New Leads" ? l.lead_status === "new" : true).map((l) => (
          <tr key={l.id} className="hover:bg-slate-50">
            <Td className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar name={l.customer_name} size="sm" />
                {l.customer_name}
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
                <span className="text-sm font-mono">{l.customer_phone}</span>
              )}
            </Td>
            <Td className="text-slate-500 text-xs">{l.lead_source}</Td>
            <Td className="text-slate-500 text-xs max-w-48"><p className="truncate">{l.requirement_details}</p></Td>
            <Td className="text-slate-500 text-xs">{new Date(l.created_at).toLocaleDateString()}</Td>
            <Td><StatusBadge status={l.lead_status} /></Td>
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
            <Input
  label="Name"
  placeholder="Lead name"
  required
  value={leadName}
  onChange={(value) => setLeadName(value)}
/>
            <Input
  label="Phone"
  placeholder="+91 9XXXXXXXXX"
  required
  value={leadPhone}
  onChange={(value) => setLeadPhone(value)}
/>
          </div>
          <Input
  label="Email"
  placeholder="lead@example.com"
  type="email"
  value={leadEmail}
  onChange={(value) => setLeadEmail(value)}
/>
          <Select
  label="Source"
  options={[
    { value: "enquiry", label: "Website Enquiry" },
    { value: "click_to_call", label: "Phone Call" },
    { value: "direct", label: "Walk-in" },
    { value: "direct", label: "Referral" },
  ]}
  value={leadSource}
  onChange={(value) => setLeadSource(value)}
  placeholder="Select source"
/>
          <Textarea
  label="Enquiry / Notes"
  placeholder="What did they enquire about?"
  rows={3}
  value={leadRequirement}
  onChange={(value) => setLeadRequirement(value)}
/>
          <div className="flex gap-3">
            <Button fullWidth onClick={handleAddLead}>Add Lead</Button>
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
      {plan === "free" && (
  <div className="mb-5">
    <UsageCounter
      used={vendorStats.customers}
      max={5}
      label="Customers (Free Plan)"
    />
  </div>
)}

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
  const [services, setServices] = useState<any[]>([]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [subIndustryId, setSubIndustryId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const emptyForm = {
    title: "",
    short_description: "",
    description: "",
    pricing_type: "fixed",
    price: "",
    duration: "",
    service_area: "",
    status: "active",
  };

  const [form, setForm] = useState(emptyForm);

  
const loadServices = async () => {
  try {
    setLoading(true);
    setError("");

    const dashboard = await apiFetch("/vendor/dashboard");
    const id = dashboard?.vendor?.id;
    console.log("Vendor data:", dashboard?.vendor);
console.log("Vendor industry ID:", dashboard?.vendor?.industry_id);
console.log("Vendor sub-industry ID:", dashboard?.vendor?.sub_industry_id);

    if (!id) {
      throw new Error("Unable to identify the logged-in vendor.");
    }

    setVendorId(id);
    setSubIndustryId(
  dashboard?.vendor?.sub_industry_id
    ? Number(dashboard.vendor.sub_industry_id)
    : null
);

    const data = await apiFetch(`/services/vendor/${id}`);
    setServices(data.services || data.data || []);
  } catch (err: any) {
    setError(err.message || "Unable to load services.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadServices();
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const saveService = async () => {
    if (!form.title.trim()) {
      setError("Please enter a service name.");
      return;
    }

    try {
      setError("");
      setMessage("");
      if (!vendorId) {
  setError("Vendor information is still loading. Please try again.");
  return;
}
      const payload = {
        vendor_id: vendorId,
        sub_industry_id: subIndustryId,
        title: form.title.trim(),
        short_description: form.short_description || null,
        description: form.description || null,
        pricing_type: form.pricing_type,
        price: form.price === "" ? null : Number(form.price),
        duration: form.duration || null,
        service_area: form.service_area || null,
        status: form.status,
      };

      if (editingId !== null) {
        await apiFetch(`/services/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setMessage("Service updated successfully.");
      } else {
        await apiFetch("/services", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setMessage("Service added successfully.");
      }

      setShowAdd(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadServices();
    } catch (err: any) {
      setError(err.message || "Unable to save service. Please check the details.");
    }
  };

  const editService = (service: any) => {
    setEditingId(service.id);
    setForm({
      title: service.title || "",
      short_description: service.short_description || "",
      description: service.description || "",
      pricing_type: service.pricing_type || "fixed",
      price: service.price == null ? "" : String(service.price),
      duration: service.duration || "",
      service_area: service.service_area || "",
      status: service.status || "active",
    });
    setError("");
    setMessage("");
    setShowAdd(true);
  };

  const deleteService = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      setError("");
      setMessage("");
      await apiFetch(`/services/${id}`, { method: "DELETE" });
      setMessage("Service deleted successfully.");
      await loadServices();
    } catch (err: any) {
      setError(err.message || "Unable to delete service.");
    }
  };

  const filteredServices = services.filter((service) =>
    (service.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VLayout
      title="Services"
      breadcrumbs={[
        { label: "Dashboard", href: "/vendor/dashboard" },
        { label: "Services" },
      ]}
    >
      {message && (
        <Alert
          type="success"
          message={message}
          onClose={() => setMessage("")}
        />
      )}

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="flex items-center justify-between gap-3 mb-5">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search services..."
          className="w-64 max-w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
        />

        <Button
          size="sm"
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setError("");
            setMessage("");
            setShowAdd(true);
          }}
        >
          <Plus size={14} /> Add Service
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading services...</p>
      ) : filteredServices.length === 0 ? (
        <Card className="p-8 text-center">
          <Package size={32} className="mx-auto text-slate-400 mb-3" />
          <p className="font-semibold text-slate-700">No services found</p>
          <p className="text-sm text-slate-500 mt-1">
            Add a service to see it listed here.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-700">
                    {service.title}
                  </h3>
                  <StatusBadge status={service.status} />
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  {service.sub_industry?.name || "Web Development"}
                </p>

                <p className="text-sm text-slate-600 mt-2">
                  {service.short_description ||
                    service.description ||
                    "No description provided."}
                </p>

                <p className="text-sm font-bold text-brand-600 mt-3">
                  {service.price == null
                    ? "Contact for price"
                    : `₹${service.price}`}
                  {service.pricing_type === "hourly" ? " / hour" : ""}
                </p>

                {service.duration && (
                  <p className="text-xs text-slate-500 mt-1">
                    Duration: {service.duration}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => editService(service)}
                  >
                    <Edit2 size={12} /> Edit
                  </Button>

                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200"
                    aria-label="Delete service"
                  >
                    <Trash2 size={14} className="text-rose-500" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={showAdd}
        onClose={() => {
          setShowAdd(false);
          setEditingId(null);
          setForm(emptyForm);
          setError("");
        }}
        title={editingId !== null ? "Edit Service" : "Add Service"}
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Service Name"
              placeholder="e.g. Website Development"
              required
              value={form.title}
              onChange={(value) => updateField("title", value)}
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              label="Short Description"
              placeholder="Brief summary of your service"
              value={form.short_description}
              onChange={(value) => updateField("short_description", value)}
            />
          </div>

          <Select
            label="Pricing Type"
            options={[
              { value: "fixed", label: "Fixed Price" },
              { value: "starting_at", label: "Starting At" },
              { value: "hourly", label: "Hourly" },
              { value: "custom_quote", label: "Custom Quote" },
            ]}
            value={form.pricing_type}
            onChange={(value) => updateField("pricing_type", value)}
          />

          <Input
            label="Price (₹)"
            type="number"
            placeholder="e.g. 5000"
            value={form.price}
            onChange={(value) => updateField("price", value)}
          />

          <Input
            label="Duration"
            placeholder="e.g. 3 days"
            value={form.duration}
            onChange={(value) => updateField("duration", value)}
          />

          <Input
            label="Service Area"
            placeholder="e.g. Dindigul"
            value={form.service_area}
            onChange={(value) => updateField("service_area", value)}
          />

          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              placeholder="Describe your service..."
              rows={3}
              value={form.description}
              onChange={(value) => updateField("description", value)}
            />
          </div>

          <Select
            label="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "draft", label: "Draft" },
            ]}
            value={form.status}
            onChange={(value) => updateField("status", value)}
          />
        </div>

        <div className="flex gap-3 mt-5">
          <Button fullWidth onClick={saveService}>
            {editingId !== null ? "Update Service" : "Save Service"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowAdd(false);
              setEditingId(null);
              setForm(emptyForm);
              setError("");
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </VLayout>
  );
}

export function VendorProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [subIndustryId, setSubIndustryId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const emptyForm = {
    name: "",
    short_description: "",
    description: "",
    regular_price: "",
    sale_price: "",
    stock_quantity: "0",
    stock_status: "in_stock",
    status: "active",
  };

  const [form, setForm] = useState(emptyForm);

  
const loadProducts = async () => {
  setLoading(true);
  setError("");

  try {
    const dashboard = await apiFetch("/vendor/dashboard");
    const id = dashboard?.vendor?.id;

    if (!id) {
      throw new Error("Unable to identify the logged-in vendor.");
    }

    setVendorId(id);
    setSubIndustryId(
  dashboard?.vendor?.sub_industry_id
    ? Number(dashboard.vendor.sub_industry_id)
    : null
);

    const response = await apiFetch(`/products/vendor/${id}`);

    const data = Array.isArray(response)
      ? response
      : Array.isArray(response?.products)
        ? response.products
        : Array.isArray(response?.data)
          ? response.data
          : [];

    setProducts(data);
  } catch (err: any) {
    setError(err?.message || "Unable to load products.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadProducts();
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowAdd(false);
    setError("");
  };

  const editProduct = (product: any) => {
    setEditingId(product.id);
    setForm({
      name: product.name ?? "",
      short_description: product.short_description ?? "",
      description: product.description ?? "",
      regular_price: String(product.regular_price ?? ""),
      sale_price: product.sale_price == null ? "" : String(product.sale_price),
      stock_quantity: String(product.stock_quantity ?? 0),
      stock_status: product.stock_status ?? "in_stock",
      status: product.status ?? "active",
    });
    setError("");
    setMessage("");
    setShowAdd(true);
  };

  const saveProduct = async () => {
    setError("");
    setMessage("");

    if (!form.name.trim() || form.regular_price === "") {
      setError("Enter the product name and regular price.");
      return;
    }
    if (!vendorId) {
  setError("Vendor information is still loading. Please try again.");
  return;
}
    const payload = {
      ...form,
      vendor_id: vendorId,
      sub_industry_id: subIndustryId,
      regular_price: Number(form.regular_price),
      sale_price: form.sale_price === "" ? null : Number(form.sale_price),
      stock_quantity: Number(form.stock_quantity),
    };

    try {
  setError("");
  setMessage("");

  if (editingId !== null) {
    await apiFetch(`/products/${editingId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    setMessage("Product updated successfully.");
  } else {
    await apiFetch("/products", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setMessage("Product added successfully.");
  }

  resetForm();
  await loadProducts();
} catch (err: any) {
  setMessage("");
  setError(err?.message || "Unable to save product.");
}
  };

  const deleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiFetch(`/products/${id}`, { method: "DELETE" });
      setMessage("Product deleted successfully.");
      await loadProducts();
    } catch (err: any) {
      setError(err?.message || "Unable to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    String(product.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <VLayout
      title="Products"
      breadcrumbs={[
        { label: "Dashboard", href: "/vendor/dashboard" },
        { label: "Products" },
      ]}
    >
      {error && (
  <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
    {error}
  </div>
)}

      {message && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          {message}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-brand-500" />
          <span className="font-semibold text-slate-700">
            {products.length} Products
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <Button
            size="sm"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setError("");
              setMessage("");
              setShowAdd(true);
            }}
          >
            <Plus size={14} /> Add Product
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="p-6">
          <p className="text-sm text-slate-500">Loading products...</p>
        </Card>
      ) : filteredProducts.length === 0 ? (
        <Card className="p-6">
          <EmptyState
  icon={<Package size={24} />}
  title="No products found"
  description="Add a product or try another search."
/>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  <Package size={19} className="text-brand-500" />
                </div>
                <StatusBadge status={product.status} />
              </div>

              <h3 className="font-bold text-slate-700">
                {product.name}
              </h3>

              <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                {product.short_description || product.description || "No description"}
              </p>

              <div className="mt-4">
                <span className="text-lg font-bold text-brand-600">
                  ₹{Number(product.sale_price ?? product.regular_price ?? 0).toLocaleString("en-IN")}
                </span>
                {product.sale_price != null && (
                  <span className="ml-2 text-sm text-slate-400 line-through">
                    ₹{Number(product.regular_price ?? 0).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Stock: {product.stock_quantity ?? 0} ·{" "}
                {String(product.stock_status ?? "in_stock").replace(/_/g, " ")}
              </p>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editProduct(product)}
                >
                  <Edit2 size={13} /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  <Trash2 size={13} /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
  isOpen={showAdd}
  onClose={resetForm}
  title={editingId !== null ? "Edit Product" : "Add Product"}
  size="lg"
>
  <div className="space-y-4">
    {error && (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
        {error}
      </div>
    )}
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={form.name}
            onChange={(value) => updateField("name", value)}
            required
          />

          <Input
            label="Short Description"
            placeholder="Brief product description"
            value={form.short_description}
            onChange={(value) => updateField("short_description", value)}
          />

          <Textarea
            label="Description"
            placeholder="Describe your product"
            value={form.description}
            onChange={(value) => updateField("description", value)}
            rows={3}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="Regular Price (₹)"
              type="number"
              value={form.regular_price}
              onChange={(value) => updateField("regular_price", value)}
              required
            />

            <Input
              label="Sale Price (₹)"
              type="number"
              value={form.sale_price}
              onChange={(value) => updateField("sale_price", value)}
            />

            <Input
              label="Stock Quantity"
              type="number"
              value={form.stock_quantity}
              onChange={(value) => updateField("stock_quantity", value)}
            />

            <Select
              label="Stock Status"
              value={form.stock_status}
              onChange={(value) => updateField("stock_status", value)}
              options={[
                { value: "in_stock", label: "In Stock" },
                { value: "out_of_stock", label: "Out of Stock" },
                { value: "on_backorder", label: "On Backorder" },
              ]}
            />

            <Select
              label="Product Status"
              value={form.status}
              onChange={(value) => updateField("status", value)}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "draft", label: "Draft" },
              ]}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button fullWidth onClick={saveProduct}>
              {editingId !== null ? "Update Product" : "Save Product"}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
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
      {plan === "free" && <div className="mb-5">
  <UsageCounter used={1} max={1} label="Job Postings (Free Plan)" />
</div>}

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
     {plan === "free" && (
  <div className="mb-5">
    <UsageCounter
      used={vendorStats.leads}
      max={5}
      label="Leads (Free Plan)"
    />
  </div>
)}

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
      {saved && <div className="mb-5">
  <Alert
    type="success"
    message="Settings saved successfully!"
    onClose={() => setSaved(false)}
    />
  </div>}

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
      {saved && <div className="mb-5">
  <Alert
    type="success"
    message="..."
    onClose={() => setSaved(false)}
  />
</div>}

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
