import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, MapPin, Heart, Star, Briefcase, Calendar, Clock, ChevronDown, Building2, Package } from "lucide-react";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicFooter from "../../components/layout/PublicFooter";
import { services, products, jobs, tourismPlaces, businesses } from "../../data/mockData";
import { Badge, SearchBar, Select, StatusBadge, Pagination, SkeletonCard, EmptyState, Button } from "../../components/ui";

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
export function ServicesPage() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filtered = services.filter((s) =>
    (!q || s.title.toLowerCase().includes(q.toLowerCase()) || s.vendor.toLowerCase().includes(q.toLowerCase())) &&
    (!industry || s.category === industry)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Services in Dindigul</h1>
          <p className="text-slate-500 text-sm mt-1">{filtered.length} services found</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <SearchBar placeholder="Search services..." value={q} onChange={setQ} className="flex-1" />
          <Select
            options={[{ value: "Catering", label: "Catering" }, { value: "Vehicle Service", label: "Vehicle Service" }, { value: "Tutoring", label: "Tutoring" }, { value: "Healthcare", label: "Healthcare" }, { value: "Security", label: "Security" }]}
            placeholder="All Categories"
            value={industry}
            onChange={setIndustry}
            className="w-48"
          />
          <Select
            options={[{ value: "asc", label: "Price: Low to High" }, { value: "desc", label: "Price: High to Low" }, { value: "rating", label: "Top Rated" }]}
            placeholder="Sort by"
            className="w-44"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Package size={48} />} title="No services found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((s) => (
                <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="relative h-44">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setWishlist((prev) => prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id])}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                    >
                      <Heart size={14} fill={wishlist.includes(s.id) ? "#f97316" : "none"} className={wishlist.includes(s.id) ? "text-brand-500" : "text-slate-400"} />
                    </button>
                    <Badge variant="info" className="absolute bottom-3 left-3">{s.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{s.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">{s.vendor}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5"><MapPin size={10} />{s.location}</div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-brand-600">{s.price}</p>
                        <Link to={`/vendor/${s.vendorId}`} className="text-xs text-brand-600 hover:underline font-medium">View →</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Pagination page={page} total={filtered.length * 4} perPage={6} onChange={setPage} />
            </div>
          </>
        )}
      </div>
      <PublicFooter />
    </div>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
export function ProductsPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filtered = products.filter((p) =>
    !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.vendor.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Products in Dindigul</h1>
          <p className="text-slate-500 text-sm mt-1">{filtered.length} products found</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <SearchBar placeholder="Search products..." value={q} onChange={setQ} className="flex-1" />
          <Select options={[{ value: "food", label: "Food Products" }, { value: "vehicles", label: "Vehicles" }, { value: "education", label: "Education" }, { value: "security", label: "Security" }]} placeholder="All Categories" className="w-44" />
          <Select options={[{ value: "asc", label: "Price: Low to High" }, { value: "desc", label: "Price: High to Low" }]} placeholder="Sort by" className="w-44" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Package size={48} />} title="No products found" description="Try different search terms." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="relative h-44">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setWishlist((prev) => prev.includes(p.id) ? prev.filter((x) => x !== x) : [...prev, p.id])}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                  >
                    <Heart size={14} fill={wishlist.includes(p.id) ? "#f97316" : "none"} className={wishlist.includes(p.id) ? "text-brand-500" : "text-slate-400"} />
                  </button>
                </div>
                <div className="p-4">
                  <Badge variant="info" className="mb-2">{p.category}</Badge>
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2 mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{p.vendor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-brand-600">{p.price}</span>
                    <Badge variant={p.availability === "In Stock" ? "success" : "warning"}>{p.availability}</Badge>
                  </div>
                  <button className="w-full mt-3 py-2 text-xs font-semibold text-brand-600 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <PublicFooter />
    </div>
  );
}

// ─── JOBS PAGE ────────────────────────────────────────────────────────────────
export function JobsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [applyModal, setApplyModal] = useState(false);
  const [applyStep, setApplyStep] = useState(1);

  const filtered = jobs.filter((j) =>
    (!q || j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase())) &&
    (!type || j.type === type)
  );

  const selectedJob = jobs.find((j) => j.id === selected) || jobs[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Jobs in Dindigul</h1>
          <p className="text-slate-500 text-sm mt-1">{filtered.length} active positions</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <SearchBar placeholder="Search jobs, companies..." value={q} onChange={setQ} className="flex-1" />
          <Select options={[{ value: "Full-time", label: "Full-time" }, { value: "Part-time", label: "Part-time" }]} placeholder="Job Type" value={type} onChange={setType} className="w-40" />
          <Select options={[{ value: "date", label: "Newest First" }, { value: "salary", label: "Highest Salary" }]} placeholder="Sort by" className="w-40" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Job list */}
          <div className="space-y-3">
            {filtered.map((j) => (
              <div
                key={j.id}
                onClick={() => setSelected(j.id)}
                className={`p-5 bg-white rounded-xl border cursor-pointer transition-all hover:shadow-md ${selected === j.id ? "border-brand-400 shadow-md bg-brand-50/30" : "border-slate-200"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                    <Briefcase size={20} className="text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800">{j.title}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">{j.company}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={11} />{j.location}</span>
                      <StatusBadge status={j.type} />
                      <span className="text-xs text-slate-500"><Clock size={10} className="inline mr-1" />{j.postedDate}</span>
                    </div>
                    <p className="text-sm font-semibold text-brand-600 mt-2">{j.salary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Job detail */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <Briefcase size={24} className="text-brand-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{selectedJob.title}</h2>
                  <p className="text-slate-600">{selectedJob.company}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={10} />{selectedJob.location}</span>
                    <StatusBadge status={selectedJob.type} />
                  </div>
                </div>
              </div>

              <div className="bg-brand-50 rounded-xl p-4 mb-5">
                <p className="text-sm font-bold text-brand-700">{selectedJob.salary}</p>
                <p className="text-xs text-brand-600 mt-0.5">Salary Range</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm mb-2">About the Role</h4>
                  <p className="text-sm text-slate-600">{selectedJob.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {selectedJob.requirements.map((r, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full shrink-0" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button fullWidth onClick={() => setApplyModal(true)}>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setApplyModal(false); setApplyStep(1); }} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Apply for {selectedJob.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{selectedJob.company}</p>
            </div>
            <div className="p-6">
              {applyStep === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= applyStep ? "bg-brand-500" : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <h4 className="font-semibold text-slate-700">Personal Details</h4>
                  <div className="space-y-3">
                    <input placeholder="Full Name" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
                    <input placeholder="Email Address" type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
                    <input placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
                  </div>
                  <Button fullWidth onClick={() => setApplyStep(2)}>Continue</Button>
                </div>
              )}
              {applyStep === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3].map((s) => (<div key={s} className={`flex-1 h-1.5 rounded-full ${s <= applyStep ? "bg-brand-500" : "bg-slate-200"}`} />))}
                  </div>
                  <h4 className="font-semibold text-slate-700">Upload Resume</h4>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                    <Briefcase size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 mb-3">Drag & drop your resume here</p>
                    <button className="px-4 py-2 text-sm font-medium text-brand-600 border border-brand-200 rounded-lg hover:bg-brand-50">Browse File</button>
                    <p className="text-xs text-slate-400 mt-2">PDF, DOC up to 5MB</p>
                  </div>
                  <textarea placeholder="Cover letter / message (optional)" rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none" />
                  <Button fullWidth onClick={() => setApplyStep(3)}>Submit Application</Button>
                </div>
              )}
              {applyStep === 3 && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-800 text-xl mb-2">Application Submitted!</h3>
                  <p className="text-slate-500 text-sm mb-4">Your application for {selectedJob.title} has been received. We'll notify you of any updates.</p>
                  <Button onClick={() => { setApplyModal(false); setApplyStep(1); }} fullWidth>Done</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}

// ─── TOURISM PAGE ─────────────────────────────────────────────────────────────
export function TourismPage() {
  const [q, setQ] = useState("");

  const filtered = tourismPlaces.filter((p) =>
    !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.location.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=500&fit=crop&auto=format"
          alt="Dindigul Tourism"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-slate-900/20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">Explore Dindigul & Nearby</h1>
            <p className="text-white/80 text-sm">Discover stunning destinations around Dindigul</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8 flex gap-3">
          <SearchBar placeholder="Search places..." value={q} onChange={setQ} className="flex-1" />
          <Select options={[{ value: "hill", label: "Hill Stations" }, { value: "heritage", label: "Heritage" }, { value: "nature", label: "Nature" }, { value: "dam", label: "Dams" }]} placeholder="Category" className="w-44" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((place) => (
            <Link key={place.id} to={`/tourism/${place.id}`} className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="relative h-52">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge variant="info" className="absolute top-3 left-3">{place.category}</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-1">{place.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-2"><MapPin size={11} />{place.location}</div>
                <p className="text-xs text-slate-500 line-clamp-2">{place.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {place.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">{h}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}

// ─── VENDOR STOREFRONT ────────────────────────────────────────────────────────
export function VendorStorefront() {
  const vendor = businesses[0];
  const [activeTab, setActiveTab] = useState("about");
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const tabs = ["about", "services", "products", "jobs", "offers"];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      {/* Cover */}
      <div className="relative h-52 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=1200&h=400&fit=crop&auto=format"
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Business Info Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm -mt-16 relative z-10 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <img src={vendor.logo} alt={vendor.name} className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-md shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-2 mb-1">
                <h1 className="text-2xl font-bold text-slate-800">{vendor.name}</h1>
                {vendor.plan === "premium" && <Badge variant="premium">⭐ Premium</Badge>}
                {vendor.verified && <Badge variant="success">✓ Verified</Badge>}
              </div>
              <p className="text-brand-600 font-medium text-sm">{vendor.category}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={13} />{vendor.location}</span>
                <span>{vendor.phone}</span>
                <span>{vendor.email}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(vendor.rating) ? "#f97316" : "none"} className={i < Math.floor(vendor.rating) ? "text-brand-500" : "text-slate-300"} />
                ))}
                <span className="text-sm text-slate-500 ml-1">{vendor.rating} ({vendor.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setWishlist(!wishlist)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Heart size={18} fill={wishlist ? "#f97316" : "none"} className={wishlist ? "text-brand-500" : "text-slate-400"} />
              </button>
              <Button onClick={() => setEnquiryModal(true)}>Send Enquiry</Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto bg-white rounded-xl border border-slate-200 p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap capitalize ${activeTab === tab ? "bg-brand-500 text-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
          {activeTab === "about" && (
            <div>
              <h2 className="font-bold text-slate-800 text-lg mb-3">About Us</h2>
              <p className="text-slate-600 leading-relaxed">{vendor.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-700 text-sm mb-2">Contact Information</h4>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <p>📍 {vendor.address}</p>
                    <p>📞 {vendor.phone}</p>
                    <p>✉️ {vendor.email}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-700 text-sm mb-2">Business Info</h4>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <p><span className="font-medium">Category:</span> {vendor.category}</p>
                    <p><span className="font-medium">Plan:</span> <Badge variant={vendor.plan === "premium" ? "premium" : "default"}>{vendor.plan}</Badge></p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "services" && (
            <div>
              <h2 className="font-bold text-slate-800 text-lg mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.filter((s) => s.vendorId === vendor.id).map((s) => (
                  <div key={s.id} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
                    <img src={s.image} alt={s.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-700 text-sm">{s.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{s.description}</p>
                      <p className="text-sm font-bold text-brand-600 mt-1">{s.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "products" && (
            <div>
              <h2 className="font-bold text-slate-800 text-lg mb-4">Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.filter((p) => p.vendorId === vendor.id).map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl">
                    <img src={p.image} alt={p.name} className="w-full h-28 rounded-lg object-cover mb-2" />
                    <h3 className="font-semibold text-slate-700 text-xs line-clamp-2 mb-1">{p.name}</h3>
                    <p className="text-sm font-bold text-brand-600">{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(activeTab === "jobs" || activeTab === "offers") && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">{activeTab === "jobs" ? "💼" : "🎁"}</div>
              <p className="text-slate-500">No {activeTab} posted currently.</p>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setEnquiryModal(false); setEnquirySubmitted(false); }} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {!enquirySubmitted ? (
              <>
                <h3 className="font-bold text-slate-800 text-xl mb-1">Send Enquiry</h3>
                <p className="text-sm text-slate-500 mb-5">To: {vendor.name}</p>
                <div className="space-y-3">
                  <input placeholder="Your Name" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
                  <input placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
                  <input placeholder="Email Address" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
                  <textarea placeholder="Your message..." rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none" />
                  <Button fullWidth onClick={() => setEnquirySubmitted(true)}>Send Enquiry</Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-xl mb-2">Enquiry Sent!</h3>
                <p className="text-slate-500 text-sm mb-4">Your enquiry has been sent to {vendor.name}. They will contact you soon.</p>
                <p className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-1.5 rounded-lg inline-block mb-4">ENQ-2024-0045</p>
                <Button onClick={() => { setEnquiryModal(false); setEnquirySubmitted(false); }} fullWidth>Done</Button>
              </div>
            )}
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
