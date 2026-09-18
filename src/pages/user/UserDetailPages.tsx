import { useParams, Link } from "react-router";
import { ArrowLeft, Briefcase, Calendar, ShoppingBag, MessageSquare, MapPin, CheckCircle } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Breadcrumb, Card, StatusBadge, Badge, Button } from "../../components/ui";
import { userOrders } from "../../data/mockData";
import { getUserApplications, getUserBookings, getUserEnquiries } from "../../store";

function UserLayout({ children, title, breadcrumbs }: { children: React.ReactNode; title: string; breadcrumbs?: { label: string; href?: string }[] }) {
  return (
    <DashboardLayout type="user" userName="Ramesh Kumar">
      <div className="mb-5">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <h1 className="text-xl font-bold text-slate-800 mt-1">{title}</h1>
      </div>
      {children}
    </DashboardLayout>
  );
}

// ─── ENQUIRY DETAIL PAGE ──────────────────────────────────────────────────────
export function UserEnquiryDetail() {
  const { id } = useParams<{ id: string }>();
  const enquiries = getUserEnquiries(1); // logged-in user id=1
  const enquiry = enquiries.find((e) => e.id === id);

  if (!enquiry) {
    return (
      <UserLayout title="Enquiry Not Found" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Enquiries", href: "/user/enquiries" }, { label: "Not Found" }]}>
        <div className="text-center py-16">
          <MessageSquare size={48} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">Enquiry not found.</p>
          <Link to="/user/enquiries"><Button className="mt-4" variant="outline">← Back to Enquiries</Button></Link>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Enquiry Details" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Enquiries", href: "/user/enquiries" }, { label: enquiry.id }]}>
      <div className="max-w-2xl">
        <Link to="/user/enquiries" className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 mb-5 transition-colors"><ArrowLeft size={14} /> Back to Enquiries</Link>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center"><MessageSquare size={18} className="text-brand-500" /></div>
              <div>
                <p className="font-bold text-slate-800">{enquiry.id}</p>
                <p className="text-xs text-slate-500">{enquiry.date}</p>
              </div>
            </div>
            <StatusBadge status={enquiry.status} />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Vendor</p>
                <p className="font-semibold text-slate-700 text-sm">{enquiry.vendorName}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">{enquiry.serviceName ? "Service" : "Product"}</p>
                <p className="font-semibold text-slate-700 text-sm">{enquiry.serviceName || enquiry.productName || "—"}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-2">Your Message</p>
              <p className="text-slate-700 text-sm leading-relaxed">{enquiry.message}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500">Your Name: </span><span className="font-medium">{enquiry.userName}</span></div>
              <div><span className="text-slate-500">Phone: </span><span className="font-medium">{enquiry.userPhone || "—"}</span></div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100 flex gap-3">
            <Link to={`/vendor/${enquiry.vendorSlug}`}><Button variant="outline" size="sm">View Vendor</Button></Link>
            <Link to="/user/enquiries"><Button variant="ghost" size="sm">← Back</Button></Link>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

// ─── ORDER DETAIL PAGE ────────────────────────────────────────────────────────
export function UserOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = userOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <UserLayout title="Order Not Found" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Orders", href: "/user/orders" }, { label: "Not Found" }]}>
        <div className="text-center py-16">
          <ShoppingBag size={48} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">Order not found.</p>
          <Link to="/user/orders"><Button className="mt-4" variant="outline">← Back to Orders</Button></Link>
        </div>
      </UserLayout>
    );
  }

  const statusSteps = ["processing", "confirmed", "shipped", "delivered"];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <UserLayout title="Order Details" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Orders", href: "/user/orders" }, { label: order.id }]}>
      <div className="max-w-2xl">
        <Link to="/user/orders" className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 mb-5 transition-colors"><ArrowLeft size={14} /> Back to Orders</Link>
        <Card className="p-6 mb-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-slate-500">Order ID</p>
              <p className="font-bold text-slate-800 text-lg font-mono">{order.id}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Order status track */}
          <div className="mb-6">
            <div className="flex items-center gap-0">
              {statusSteps.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${i <= currentStep ? "bg-brand-500 border-brand-500 text-white" : "border-slate-300 text-slate-400"}`}>
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  {i < statusSteps.length - 1 && <div className={`flex-1 h-0.5 ${i < currentStep ? "bg-brand-500" : "bg-slate-200"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {statusSteps.map((s) => <p key={s} className="text-xs text-slate-400 capitalize flex-1 text-center">{s}</p>)}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-2 font-medium">Order Items</p>
              <p className="text-slate-700 font-semibold">{order.items}</p>
              <p className="text-xl font-bold text-brand-600 mt-1">{order.amount}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Vendor</p>
                <p className="font-semibold text-slate-700 text-sm">{order.vendor}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Order Date</p>
                <p className="font-semibold text-slate-700 text-sm">{order.date}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Delivery Address</p>
              <p className="font-semibold text-slate-700 text-sm">{(order as any).address || "12, Anna Nagar, Dindigul - 624003"}</p>
            </div>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

// ─── JOB APPLICATION DETAIL ───────────────────────────────────────────────────
export function UserJobDetail() {
  const { id } = useParams<{ id: string }>();
  const applications = getUserApplications(1);
  const app = applications.find((a) => a.id === id) || applications[Number(id) - 1];

  if (!app) {
    return (
      <UserLayout title="Application Not Found" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Jobs Applied", href: "/user/jobs" }, { label: "Not Found" }]}>
        <div className="text-center py-16">
          <Briefcase size={48} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">Application not found.</p>
          <Link to="/user/jobs"><Button className="mt-4" variant="outline">← Back to Jobs</Button></Link>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Application Details" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Jobs Applied", href: "/user/jobs" }, { label: app.id }]}>
      <div className="max-w-2xl">
        <Link to="/user/jobs" className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 mb-5 transition-colors"><ArrowLeft size={14} /> Back to Jobs Applied</Link>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                <Briefcase size={20} className="text-brand-500" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">{app.jobTitle}</h2>
                <p className="text-sm text-slate-600">{app.vendorName}</p>
              </div>
            </div>
            <StatusBadge status={app.status} />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Applied Date</p>
                <p className="font-semibold text-slate-700 text-sm">{app.appliedDate}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Application ID</p>
                <p className="font-semibold text-slate-700 text-sm font-mono">{app.id}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-2">Applicant Information</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-slate-500">Name: </span><span className="font-medium">{app.applicantName}</span></p>
                <p><span className="text-slate-500">Email: </span><span className="font-medium">{app.applicantEmail}</span></p>
                <p><span className="text-slate-500">Phone: </span><span className="font-medium">{app.applicantPhone}</span></p>
              </div>
            </div>
            {app.resumeFileName && (
              <div className="p-3 bg-emerald-50 rounded-xl flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-500">Resume Uploaded</p>
                  <p className="text-sm font-medium text-slate-700">{app.resumeFileName}</p>
                </div>
              </div>
            )}
            {app.coverLetter && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-2">Cover Letter</p>
                <p className="text-sm text-slate-600 leading-relaxed">{app.coverLetter}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}

// ─── EVENT BOOKING DETAIL ─────────────────────────────────────────────────────
export function UserEventDetail() {
  const { id } = useParams<{ id: string }>();
  const bookings = getUserBookings(1);
  const booking = bookings.find((b) => b.id === id) || bookings[Number(id) - 1];

  if (!booking) {
    return (
      <UserLayout title="Booking Not Found" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Events Booked", href: "/user/events" }, { label: "Not Found" }]}>
        <div className="text-center py-16">
          <Calendar size={48} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">Booking not found.</p>
          <Link to="/user/events"><Button className="mt-4" variant="outline">← Back to Events</Button></Link>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Booking Details" breadcrumbs={[{ label: "Dashboard", href: "/user/dashboard" }, { label: "Events Booked", href: "/user/events" }, { label: booking.id }]}>
      <div className="max-w-2xl">
        <Link to="/user/events" className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 mb-5 transition-colors"><ArrowLeft size={14} /> Back to Events Booked</Link>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Calendar size={20} className="text-amber-500" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">{booking.eventName}</h2>
                <p className="text-sm text-slate-600">{booking.vendorName}</p>
              </div>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Booking ID</p>
                <p className="font-semibold text-slate-700 text-sm font-mono">{booking.id}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Booking Date</p>
                <p className="font-semibold text-slate-700 text-sm">{booking.bookingDate}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-2">Attendee Details</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-slate-500">Name: </span><span className="font-medium">{booking.attendeeName}</span></p>
                <p><span className="text-slate-500">Email: </span><span className="font-medium">{booking.attendeeEmail}</span></p>
                <p><span className="text-slate-500">Phone: </span><span className="font-medium">{booking.attendeePhone}</span></p>
                <p><span className="text-slate-500">Attendees: </span><span className="font-medium">{booking.attendeeCount} person(s)</span></p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}
