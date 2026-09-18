import { useState } from "react";
import { Building2, Users, Package, ShoppingBag, Briefcase, Calendar, Tag, TrendingUp, Eye, Edit2, Trash2, CheckCircle, XCircle, Plus, Search } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { StatCard, Card, Badge, StatusBadge, Table, Td, Button, Breadcrumb, ConfirmDialog, Modal, Input, Select, SearchBar, Avatar, Pagination } from "../../components/ui";
import { adminStats, adminVendors, adminUsers, monthlyData } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

function AdminLayout({ children, title, breadcrumbs }: { children: React.ReactNode; title: string; breadcrumbs?: { label: string; href?: string }[] }) {
  return (
    <DashboardLayout type="admin" userName="Admin User">
      <div className="mb-5">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <h1 className="text-xl font-bold text-slate-800 mt-1">{title}</h1>
      </div>
      {children}
    </DashboardLayout>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
export function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard" breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}>
      {/* Today's summary */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Today's Activity</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="New Vendors" value={adminStats.newToday.vendors} icon={<Building2 size={16} />} color="brand" />
          <StatCard label="New Users" value={adminStats.newToday.users} icon={<Users size={16} />} color="sky" />
          <StatCard label="New Services" value={adminStats.newToday.services} icon={<Package size={16} />} color="emerald" />
          <StatCard label="New Products" value={adminStats.newToday.products} icon={<ShoppingBag size={16} />} color="amber" />
          <StatCard label="New Jobs" value={adminStats.newToday.jobs} icon={<Briefcase size={16} />} color="violet" />
          <StatCard label="New Events" value={adminStats.newToday.events} icon={<Calendar size={16} />} color="rose" />
        </div>
      </div>

      {/* Totals */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Platform Overview</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total Vendors" value={adminStats.totalVendors} icon={<Building2 size={16} />} color="brand" trend="+5 today" />
          <StatCard label="Total Users" value={adminStats.totalUsers} icon={<Users size={16} />} color="sky" trend="+34 today" />
          <StatCard label="Total Services" value={adminStats.totalServices} icon={<Package size={16} />} color="emerald" />
          <StatCard label="Total Products" value={adminStats.totalProducts} icon={<ShoppingBag size={16} />} color="amber" />
          <StatCard label="Total Jobs" value={adminStats.totalJobs} icon={<Briefcase size={16} />} color="violet" />
          <StatCard label="Total Events" value={adminStats.totalEvents} icon={<Calendar size={16} />} color="rose" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">User & Vendor Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Users" />
              <Line type="monotone" dataKey="vendors" stroke="#f97316" strokeWidth={2} dot={false} name="Vendors" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Monthly Registrations</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="vendors" fill="#f97316" radius={[4, 4, 0, 0]} name="Vendors" />
              <Bar dataKey="users" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-5">
        <h3 className="font-bold text-slate-700 mb-4">Recent Activity</h3>
        <Table headers={["Action", "Entity", "Name", "Time", "Status"]}>
          {[
            { action: "New Vendor", entity: "Vendor", name: "Dindigul Farms", time: "5 mins ago", status: "pending" },
            { action: "New User", entity: "User", name: "Arun Krishnan", time: "12 mins ago", status: "active" },
            { action: "New Service", entity: "Service", name: "AC Repair Service", time: "25 mins ago", status: "active" },
            { action: "Job Posted", entity: "Job", name: "Software Developer", time: "1 hr ago", status: "active" },
            { action: "New Event", entity: "Event", name: "Dindigul Trade Fair", time: "2 hrs ago", status: "active" },
          ].map((a, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <Td><Badge variant="new">{a.action}</Badge></Td>
              <Td className="text-slate-500 text-xs">{a.entity}</Td>
              <Td className="font-medium text-sm">{a.name}</Td>
              <Td className="text-slate-400 text-xs">{a.time}</Td>
              <Td><StatusBadge status={a.status} /></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </AdminLayout>
  );
}

// ─── ADMIN VENDORS ────────────────────────────────────────────────────────────
export function AdminVendors() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [actionId, setActionId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"activate" | "deactivate" | "block" | null>(null);
  const [page, setPage] = useState(1);

  const filtered = adminVendors.filter((v) =>
    (!q || v.name.toLowerCase().includes(q.toLowerCase()) || v.owner.toLowerCase().includes(q.toLowerCase())) &&
    (!status || v.status === status) &&
    (!plan || v.plan === plan)
  );

  return (
    <AdminLayout title="Vendors" breadcrumbs={[{ label: "Admin" }, { label: "Vendors" }]}>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 flex flex-col sm:flex-row gap-3">
        <SearchBar placeholder="Search vendors..." value={q} onChange={setQ} className="flex-1" />
        <Select options={[{ value: "active", label: "Active" }, { value: "pending", label: "Pending" }, { value: "blocked", label: "Blocked" }]} placeholder="All Status" value={status} onChange={setStatus} className="w-40" />
        <Select options={[{ value: "free", label: "Free" }, { value: "premium", label: "Premium" }]} placeholder="All Plans" value={plan} onChange={setPlan} className="w-40" />
      </div>

      <Table headers={["Business", "Owner", "Industry", "Plan", "Status", "Registered", "Actions"]}>
        {filtered.map((v) => (
          <tr key={v.id} className="hover:bg-slate-50">
            <Td>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-sm font-bold text-brand-600 shrink-0">
                  {v.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{v.name}</p>
                  <p className="text-xs text-slate-400">{v.services} services · {v.products} products</p>
                </div>
              </div>
            </Td>
            <Td className="text-slate-500 text-sm">{v.owner}</Td>
            <Td className="text-slate-500 text-xs">{v.industry}</Td>
            <Td><StatusBadge status={v.plan} /></Td>
            <Td><StatusBadge status={v.status} /></Td>
            <Td className="text-slate-400 text-xs">{v.registered}</Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-500 transition-colors"><Eye size={14} /></button>
                {v.status === "active" ? (
                  <button onClick={() => { setActionId(v.id); setActionType("deactivate"); }} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><XCircle size={14} /></button>
                ) : (
                  <button onClick={() => { setActionId(v.id); setActionType("activate"); }} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors"><CheckCircle size={14} /></button>
                )}
                <button onClick={() => { setActionId(v.id); setActionType("block"); }} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors"><Trash2 size={14} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
      <div className="mt-4">
        <Pagination page={page} total={adminVendors.length} perPage={10} onChange={setPage} />
      </div>

      <ConfirmDialog
        isOpen={actionId !== null}
        onClose={() => { setActionId(null); setActionType(null); }}
        onConfirm={() => { setActionId(null); setActionType(null); }}
        title={`${actionType === "activate" ? "Activate" : actionType === "deactivate" ? "Deactivate" : "Block"} Vendor`}
        message={`Are you sure you want to ${actionType} this vendor? ${actionType === "block" ? "They will not be able to access their account." : ""}`}
        confirmLabel={actionType === "activate" ? "Activate" : actionType === "deactivate" ? "Deactivate" : "Block"}
        type={actionType === "block" ? "danger" : "warning"}
      />
    </AdminLayout>
  );
}

// ─── ADMIN USERS ──────────────────────────────────────────────────────────────
export function AdminUsers() {
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = adminUsers.filter((u) =>
    !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AdminLayout title="Users" breadcrumbs={[{ label: "Admin" }, { label: "Users" }]}>
      <div className="flex items-center justify-between mb-5">
        <SearchBar placeholder="Search users..." value={q} onChange={setQ} className="w-72" />
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add User</Button>
      </div>

      <Table headers={["User", "Email", "Phone", "Status", "Registered", "Orders", "Actions"]}>
        {filtered.map((u) => (
          <tr key={u.id} className="hover:bg-slate-50">
            <Td>
              <div className="flex items-center gap-2">
                <Avatar name={u.name} size="sm" />
                <span className="font-medium text-sm">{u.name}</span>
              </div>
            </Td>
            <Td className="text-slate-500 text-sm">{u.email}</Td>
            <Td className="font-mono text-xs text-slate-500">{u.phone}</Td>
            <Td><StatusBadge status={u.status} /></Td>
            <Td className="text-slate-400 text-xs">{u.registered}</Td>
            <Td className="text-center text-slate-600 text-sm">{u.orders}</Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-500"><Eye size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><Edit2 size={14} /></button>
                <button onClick={() => setDeleteId(u.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-400"><Trash2 size={14} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add User">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="User's name" required />
          <Input label="Email" placeholder="email@example.com" type="email" required />
          <Input label="Phone" placeholder="+91 9XXXXXXXXX" required />
          <Select label="Status" options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} value="active" />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAdd(false)}>Add User</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => setDeleteId(null)}
        title="Delete User"
        message="Are you sure you want to delete this user account? All their data will be removed."
        confirmLabel="Delete"
      />
    </AdminLayout>
  );
}

// ─── ADMIN SERVICES ───────────────────────────────────────────────────────────
export function AdminServices() {
  const [q, setQ] = useState("");
  const services = [
    { id: 1, name: "Chettinad Catering Services", vendor: "Sri Murugan Mess", category: "Catering", status: "active", date: "2024-01-10", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=40&h=40&fit=crop" },
    { id: 2, name: "Two-Wheeler Service & Repair", vendor: "Vetri Honda", category: "Vehicle Service", status: "active", date: "2024-01-08", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop" },
    { id: 3, name: "Home Tuition – Maths & Science", vendor: "Rainbow English School", category: "Tutoring", status: "active", date: "2024-01-05", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=40&h=40&fit=crop" },
    { id: 4, name: "Corporate Health Checkup", vendor: "City Multi Speciality Hospital", category: "Healthcare", status: "active", date: "2023-12-20", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=40&h=40&fit=crop" },
  ];

  const filtered = services.filter((s) => !q || s.name.toLowerCase().includes(q.toLowerCase()) || s.vendor.toLowerCase().includes(q.toLowerCase()));

  return (
    <AdminLayout title="Services" breadcrumbs={[{ label: "Admin" }, { label: "Services" }]}>
      <div className="flex items-center gap-3 mb-5">
        <SearchBar placeholder="Search services..." value={q} onChange={setQ} className="flex-1 max-w-sm" />
        <Select options={[{ value: "catering", label: "Catering" }, { value: "vehicle", label: "Vehicle" }]} placeholder="All Categories" className="w-44" />
      </div>

      <Table headers={["Service", "Vendor", "Category", "Status", "Created", "Actions"]}>
        {filtered.map((s) => (
          <tr key={s.id} className="hover:bg-slate-50">
            <Td>
              <div className="flex items-center gap-3">
                <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover" />
                <span className="font-medium text-sm">{s.name}</span>
              </div>
            </Td>
            <Td className="text-slate-500 text-sm">{s.vendor}</Td>
            <Td><Badge variant="info">{s.category}</Badge></Td>
            <Td><StatusBadge status={s.status} /></Td>
            <Td className="text-slate-400 text-xs">{s.date}</Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-500"><Eye size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><Edit2 size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-400"><Trash2 size={14} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </AdminLayout>
  );
}

// ─── ADMIN INDUSTRIES ─────────────────────────────────────────────────────────
export function AdminIndustries() {
  const [showAdd, setShowAdd] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const industries = [
    { id: 1, name: "Restaurants & Food", icon: "🍽️", vendors: 48, subs: 8, status: "active" },
    { id: 2, name: "Healthcare & Medical", icon: "🏥", vendors: 41, subs: 12, status: "active" },
    { id: 3, name: "Automobile & Vehicles", icon: "🚗", vendors: 29, subs: 6, status: "active" },
    { id: 4, name: "Education & Training", icon: "📚", vendors: 35, subs: 7, status: "active" },
    { id: 5, name: "Local Services", icon: "🔧", vendors: 44, subs: 10, status: "active" },
    { id: 6, name: "Tourism & Travel", icon: "🗺️", vendors: 16, subs: 4, status: "active" },
  ];

  return (
    <AdminLayout title="Industries" breadcrumbs={[{ label: "Admin" }, { label: "Industries" }]}>
      <div className="flex justify-end mb-5">
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Industry</Button>
      </div>

      <Table headers={["Industry", "Vendors", "Sub-Industries", "Status", "Actions"]}>
        {industries.map((ind) => (
          <tr key={ind.id} className="hover:bg-slate-50">
            <Td>
              <div className="flex items-center gap-2">
                <span className="text-xl">{ind.icon}</span>
                <span className="font-medium text-sm">{ind.name}</span>
              </div>
            </Td>
            <Td className="text-slate-600 text-sm">{ind.vendors}</Td>
            <Td className="text-slate-600 text-sm">{ind.subs}</Td>
            <Td><StatusBadge status={ind.status} /></Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" onClick={() => setShowSub(true)}>Manage Sub-Industries</Button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><Edit2 size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-400"><Trash2 size={14} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Industry">
        <div className="space-y-4">
          <Input label="Industry Name" placeholder="e.g. Healthcare" required />
          <Input label="Icon / Emoji" placeholder="e.g. 🏥" />
          <Select label="Status" options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} value="active" />
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setShowAdd(false)}>Add Industry</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSub} onClose={() => setShowSub(false)} title="Manage Sub-Industries" size="lg">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-slate-500">Restaurants & Food sub-industries</p>
          <Button size="sm"><Plus size={12} /> Add Sub</Button>
        </div>
        <div className="space-y-2">
          {["Fine Dining", "Fast Food", "Catering", "Tiffin Service", "Bakery", "Street Food", "Ice Cream", "Juice & Beverages"].map((sub) => (
            <div key={sub} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">{sub}</span>
              <div className="flex gap-2">
                <button className="text-xs text-brand-600 hover:underline"><Edit2 size={12} /></button>
                <button className="text-xs text-rose-500 hover:underline"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </AdminLayout>
  );
}

// ─── ADMIN JOBS ───────────────────────────────────────────────────────────────
export function AdminJobs() {
  const [q, setQ] = useState("");

  return (
    <AdminLayout title="Jobs" breadcrumbs={[{ label: "Admin" }, { label: "Jobs" }]}>
      <SearchBar placeholder="Search jobs..." value={q} onChange={setQ} className="max-w-sm mb-5" />

      <Table headers={["Job Title", "Vendor", "Location", "Type", "Salary", "Status", "Posted", "Actions"]}>
        {[
          { title: "Restaurant Supervisor", vendor: "Sri Murugan Mess", location: "Dindigul", type: "Full-time", salary: "₹18k–22k", status: "active", posted: "2024-01-15", applicants: 8 },
          { title: "Automobile Technician", vendor: "Vetri Honda", location: "Dindigul", type: "Full-time", salary: "₹15k–20k", status: "active", posted: "2024-01-12", applicants: 12 },
          { title: "Primary School Teacher", vendor: "Rainbow English School", location: "Dindigul", type: "Full-time", salary: "₹12k–16k", status: "active", posted: "2024-01-10", applicants: 5 },
          { title: "Staff Nurse – ICU", vendor: "City Hospital", location: "Dindigul", type: "Full-time", salary: "₹20k–28k", status: "active", posted: "2024-01-08", applicants: 17 },
        ].filter((j) => !q || j.title.toLowerCase().includes(q.toLowerCase())).map((j, i) => (
          <tr key={i} className="hover:bg-slate-50">
            <Td className="font-medium text-sm">{j.title}</Td>
            <Td className="text-slate-500 text-xs">{j.vendor}</Td>
            <Td className="text-slate-500 text-xs">{j.location}</Td>
            <Td><StatusBadge status={j.type} /></Td>
            <Td className="text-slate-600 text-xs font-mono">{j.salary}</Td>
            <Td><StatusBadge status={j.status} /></Td>
            <Td className="text-slate-400 text-xs">{j.posted}</Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm">{j.applicants} Applicants</Button>
                <button className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-400"><Trash2 size={13} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </AdminLayout>
  );
}

// ─── ADMIN EVENTS ─────────────────────────────────────────────────────────────
export function AdminEvents() {
  const [q, setQ] = useState("");

  return (
    <AdminLayout title="Events" breadcrumbs={[{ label: "Admin" }, { label: "Events" }]}>
      <SearchBar placeholder="Search events..." value={q} onChange={setQ} className="max-w-sm mb-5" />

      <Table headers={["Event", "Vendor", "Date", "Location", "Capacity", "Bookings", "Status", "Actions"]}>
        {[
          { name: "Grand Opening Celebration", vendor: "Sri Murugan Mess", date: "2024-02-10", location: "Dindigul", capacity: 100, bookings: 42, status: "upcoming" },
          { name: "Free Health Camp", vendor: "City Hospital", date: "2024-02-20", location: "Dindigul Fort Campus", capacity: 500, bookings: 287, status: "upcoming" },
          { name: "Career Fair 2024", vendor: "Rainbow English School", date: "2024-03-05", location: "Dindigul", capacity: 200, bookings: 156, status: "upcoming" },
        ].filter((e) => !q || e.name.toLowerCase().includes(q.toLowerCase())).map((e, i) => (
          <tr key={i} className="hover:bg-slate-50">
            <Td className="font-medium text-sm">{e.name}</Td>
            <Td className="text-slate-500 text-xs">{e.vendor}</Td>
            <Td className="text-slate-500 text-xs">{e.date}</Td>
            <Td className="text-slate-500 text-xs">{e.location}</Td>
            <Td className="text-slate-600 text-sm">{e.capacity}</Td>
            <Td className="text-brand-600 font-semibold text-sm">{e.bookings}</Td>
            <Td><StatusBadge status={e.status} /></Td>
            <Td>
              <div className="flex gap-1.5">
                <button className="p-1.5 hover:bg-brand-50 rounded-lg text-brand-500"><Eye size={13} /></button>
                <button className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-400"><Trash2 size={13} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </AdminLayout>
  );
}

// ─── ADMIN PRODUCTS ───────────────────────────────────────────────────────────
export function AdminProducts() {
  const [q, setQ] = useState("");
  const products = [
    { id: 1, name: "Dindigul Biryani Masala Pack", vendor: "Sri Murugan Mess", category: "Food Products", price: "₹150", status: "active", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=40&h=40&fit=crop" },
    { id: 2, name: "Honda Activa 6G", vendor: "Vetri Honda", category: "Two Wheelers", price: "₹74,900", status: "active", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=40&h=40&fit=crop" },
    { id: 3, name: "CBSE Study Material Kit", vendor: "Rainbow English School", category: "Education", price: "₹1,200", status: "active", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=40&h=40&fit=crop" },
    { id: 4, name: "Digital Door Lock", vendor: "KP Lock & Key Works", category: "Security", price: "₹4,500", status: "active", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop" },
  ];

  const filtered = products.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AdminLayout title="Products" breadcrumbs={[{ label: "Admin" }, { label: "Products" }]}>
      <SearchBar placeholder="Search products..." value={q} onChange={setQ} className="max-w-sm mb-5" />
      <Table headers={["Product", "Vendor", "Category", "Price", "Status", "Actions"]}>
        {filtered.map((p) => (
          <tr key={p.id} className="hover:bg-slate-50">
            <Td>
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <span className="font-medium text-sm">{p.name}</span>
              </div>
            </Td>
            <Td className="text-slate-500 text-sm">{p.vendor}</Td>
            <Td><Badge variant="info">{p.category}</Badge></Td>
            <Td className="font-semibold text-brand-600 text-sm">{p.price}</Td>
            <Td><StatusBadge status={p.status} /></Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-500"><Eye size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><Edit2 size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-400"><Trash2 size={14} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </AdminLayout>
  );
}
