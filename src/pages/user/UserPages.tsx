import { useState } from "react";
import { Link } from "react-router";
import { MessageSquare, ShoppingBag, Briefcase, Calendar, Heart, User, LayoutDashboard, Eye, Trash2, Building2 } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { StatCard, Card, Badge, StatusBadge, Table, Td, EmptyState, Button, Breadcrumb, Avatar, Input, Textarea } from "../../components/ui";
import { userEnquiries, userOrders, jobs, businesses, tourismPlaces } from "../../data/mockData";

function UserLayout({ children, title, breadcrumbs }: { children: React.ReactNode; title: string; breadcrumbs?: { label: string; href?: string }[] }) {
  return (
    <DashboardLayout type="user" userName="Ramesh Kumar">
      <div className="mb-5">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-2" />}
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>
      {children}
    </DashboardLayout>
  );
}

// ─── USER DASHBOARD ───────────────────────────────────────────────────────────
export function UserDashboard() {
  return (
    <UserLayout title="My Dashboard" breadcrumbs={[{ label: "User Panel" }, { label: "Dashboard" }]}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard label="Enquiries" value="4" icon={<MessageSquare size={18} />} color="brand" />
        <StatCard label="Orders" value="3" icon={<ShoppingBag size={18} />} color="emerald" />
        <StatCard label="Jobs Applied" value="2" icon={<Briefcase size={18} />} color="sky" />
        <StatCard label="Events Booked" value="1" icon={<Calendar size={18} />} color="amber" />
        <StatCard label="Wishlist" value="5" icon={<Heart size={18} />} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Recent Enquiries</h3>
            <Link to="/user/enquiries" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {userEnquiries.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquare size={15} className="text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{e.vendor}</p>
                  <p className="text-xs text-slate-500 truncate">{e.service}</p>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Recent Orders</h3>
            <Link to="/user/orders" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {userOrders.map((o) => (
              <div key={o.id} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingBag size={15} className="text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{o.items}</p>
                  <p className="text-xs text-slate-500">{o.vendor} · {o.amount}</p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Saved Businesses */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Saved Businesses</h3>
            <Link to="/user/wishlist" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {businesses.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <img src={b.logo} alt={b.name} className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{b.name}</p>
                  <p className="text-xs text-slate-500">{b.category}</p>
                </div>
                <Heart size={14} className="text-brand-500" fill="#f97316" />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-700 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Building2, label: "Find Businesses", to: "/" },
              { icon: Briefcase, label: "Browse Jobs", to: "/jobs" },
              { icon: Calendar, label: "View Events", to: "/" },
              { icon: Heart, label: "My Wishlist", to: "/user/wishlist" },
            ].map((a) => (
              <Link key={a.label} to={a.to} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-brand-50 hover:border-brand-200 border border-transparent transition-all">
                <a.icon size={20} className="text-brand-500" />
                <span className="text-xs font-medium text-slate-600 text-center">{a.label}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

// ─── USER ENQUIRIES ───────────────────────────────────────────────────────────
export function UserEnquiries() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <UserLayout title="My Enquiries" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Enquiries" }]}>
      {userEnquiries.length === 0 ? (
        <EmptyState icon={<MessageSquare size={48} />} title="No enquiries yet" description="Your enquiries to businesses will appear here." />
      ) : (
        <Table headers={["Vendor", "Service", "Date", "Status", "Actions"]}>
          {userEnquiries.map((e) => (
            <tr key={e.id} className="hover:bg-slate-50">
              <Td className="font-medium">{e.vendor}</Td>
              <Td className="text-slate-500">{e.service}</Td>
              <Td className="text-slate-500 text-xs">{e.date}</Td>
              <Td><StatusBadge status={e.status} /></Td>
              <Td>
                <button onClick={() => setSelected(e.id)} className="text-xs text-brand-600 hover:underline font-medium flex items-center gap-1">
                  <Eye size={12} /> View
                </button>
              </Td>
            </tr>
          ))}
        </Table>
      )}

      {/* Detail modal */}
      {selected && (() => {
        const e = userEnquiries.find((x) => x.id === selected)!;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <h3 className="font-bold text-xl text-slate-800 mb-4">Enquiry Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Vendor</span><span className="font-medium">{e.vendor}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-medium">{e.service}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium">{e.date}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Status</span><StatusBadge status={e.status} /></div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-slate-500 mb-1">Message</p>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">{e.message}</p>
                </div>
              </div>
              <Button fullWidth onClick={() => setSelected(null)} variant="outline" className="mt-5">Close</Button>
            </div>
          </div>
        );
      })()}
    </UserLayout>
  );
}

// ─── USER ORDERS ─────────────────────────────────────────────────────────────
export function UserOrders() {
  return (
    <UserLayout title="My Orders" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Orders" }]}>
      <Table headers={["Order ID", "Vendor", "Items", "Date", "Amount", "Status", "Actions"]}>
        {userOrders.map((o) => (
          <tr key={o.id} className="hover:bg-slate-50">
            <Td className="font-mono text-xs">{o.id}</Td>
            <Td className="font-medium">{o.vendor}</Td>
            <Td className="text-slate-500 text-xs">{o.items}</Td>
            <Td className="text-slate-500 text-xs">{o.date}</Td>
            <Td className="font-semibold text-slate-700">{o.amount}</Td>
            <Td><StatusBadge status={o.status} /></Td>
            <Td><button className="text-xs text-brand-600 hover:underline font-medium">View</button></Td>
          </tr>
        ))}
      </Table>
    </UserLayout>
  );
}

// ─── USER JOBS ────────────────────────────────────────────────────────────────
export function UserJobs() {
  const appliedJobs = [
    { ...jobs[0], appliedDate: "2024-01-15", applicationStatus: "reviewing" },
    { ...jobs[1], appliedDate: "2024-01-12", applicationStatus: "applied" },
  ];

  return (
    <UserLayout title="Jobs Applied" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Jobs Applied" }]}>
      {appliedJobs.length === 0 ? (
        <EmptyState icon={<Briefcase size={48} />} title="No job applications" description="Apply to jobs to see them here." action={<Link to="/jobs"><Button>Browse Jobs</Button></Link>} />
      ) : (
        <Table headers={["Job Title", "Company", "Location", "Applied Date", "Status", "Actions"]}>
          {appliedJobs.map((j) => (
            <tr key={j.id} className="hover:bg-slate-50">
              <Td className="font-medium">{j.title}</Td>
              <Td className="text-slate-500">{j.company}</Td>
              <Td className="text-slate-500 text-xs">{j.location}</Td>
              <Td className="text-slate-500 text-xs">{j.appliedDate}</Td>
              <Td><StatusBadge status={j.applicationStatus} /></Td>
              <Td><button className="text-xs text-brand-600 hover:underline font-medium">View</button></Td>
            </tr>
          ))}
        </Table>
      )}
    </UserLayout>
  );
}

// ─── USER EVENTS ──────────────────────────────────────────────────────────────
export function UserEvents() {
  const bookedEvents = [
    { id: 1, name: "Dindigul Business Expo 2024", vendor: "City Multi Speciality Hospital", date: "2024-02-15", location: "Dindigul", status: "confirmed" },
  ];

  return (
    <UserLayout title="Events Booked" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Events Booked" }]}>
      {bookedEvents.length === 0 ? (
        <EmptyState icon={<Calendar size={48} />} title="No events booked" description="Events you register for will appear here." />
      ) : (
        <Table headers={["Event", "Organiser", "Date", "Location", "Status", "Actions"]}>
          {bookedEvents.map((e) => (
            <tr key={e.id} className="hover:bg-slate-50">
              <Td className="font-medium">{e.name}</Td>
              <Td className="text-slate-500">{e.vendor}</Td>
              <Td className="text-slate-500 text-xs">{e.date}</Td>
              <Td className="text-slate-500 text-xs">{e.location}</Td>
              <Td><StatusBadge status={e.status} /></Td>
              <Td><button className="text-xs text-brand-600 hover:underline font-medium">View</button></Td>
            </tr>
          ))}
        </Table>
      )}
    </UserLayout>
  );
}

// ─── USER WISHLIST ────────────────────────────────────────────────────────────
export function UserWishlist() {
  const [items, setItems] = useState(businesses.slice(0, 4));

  const remove = (id: number) => setItems((prev) => prev.filter((b) => b.id !== id));

  return (
    <UserLayout title="My Wishlist" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Wishlist" }]}>
      {items.length === 0 ? (
        <EmptyState icon={<Heart size={48} />} title="Wishlist is empty" description="Save businesses and services to find them quickly." action={<Link to="/"><Button>Explore Businesses</Button></Link>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((b) => (
            <Card key={b.id} className="overflow-hidden">
              <div className="relative h-36">
                <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                <button onClick={() => remove(b.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white">
                  <Trash2 size={14} className="text-rose-500" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={b.logo} alt={b.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-700 text-sm">{b.name}</h3>
                    <p className="text-xs text-brand-600">{b.category}</p>
                  </div>
                </div>
                <Link to={`/vendor/${b.slug}`} className="block text-center text-xs font-semibold text-brand-600 bg-brand-50 py-2 rounded-lg hover:bg-brand-100 transition-colors">
                  View Profile →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </UserLayout>
  );
}

// ─── USER PROFILE ─────────────────────────────────────────────────────────────
export function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Ramesh Kumar");
  const [email, setEmail] = useState("ramesh@gmail.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <UserLayout title="My Profile" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Profile" }]}>
      {saved && (
        <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
          ✓ Profile updated successfully!
        </div>
      )}
      <div className="max-w-xl">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="relative">
              <Avatar name={name} size="lg" />
              {editing && (
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                  <User size={12} />
                </button>
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{name}</h3>
              <p className="text-slate-500 text-sm">User Account</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input label="Full Name" value={name} onChange={setName} disabled={!editing} required />
            <Input label="Email Address" value={email} onChange={setEmail} type="email" disabled={!editing} required />
            <Input label="Phone Number" value={phone} onChange={setPhone} disabled={!editing} required />
          </div>

          <div className="flex gap-3 mt-6">
            {editing ? (
              <>
                <Button onClick={save}>Save Changes</Button>
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

// ─── RESET PASSWORD ───────────────────────────────────────────────────────────
export function UserResetPassword() {
  const [success, setSuccess] = useState(false);

  return (
    <UserLayout title="Reset Password" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Reset Password" }]}>
      {success && (
        <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
          ✓ Password changed successfully!
        </div>
      )}
      <div className="max-w-md">
        <Card className="p-6">
          <div className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" required />
            <Input label="New Password" type="password" placeholder="Min 8 characters" required />
            <Input label="Confirm New Password" type="password" placeholder="Confirm new password" required />
            <Button fullWidth onClick={() => setSuccess(true)}>Update Password</Button>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}
