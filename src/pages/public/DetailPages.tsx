import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { MapPin, Heart, Star, ArrowLeft, Briefcase, Clock, ChevronLeft, ChevronRight, Package, CheckCircle, Building2, Calendar } from "lucide-react";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicFooter from "../../components/layout/PublicFooter";
import { services, products, jobs, tourismPlaces, businesses } from "../../data/mockData";
import { Badge, Button, StatusBadge, Modal } from "../../components/ui";
import { isWishlisted, toggleWishlist, addEnquiry, addApplication, addBooking, getCurrentUser } from "../../store";

// ─── SERVICE DETAIL PAGE ──────────────────────────────────────────────────────
export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === Number(id));
  const [wishlisted, setWishlisted] = useState(() => isWishlisted("service", Number(id)));
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [enquiryDone, setEnquiryDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Service Not Found</h1>
          <p className="text-slate-500 mb-6">This service doesn't exist or has been removed.</p>
          <Link to="/services"><Button>Browse All Services</Button></Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const vendor = businesses.find((b) => b.id === service.vendorId);
  const relatedServices = services.filter((s) => s.id !== service.id && (s.category === service.category || s.vendorId === service.vendorId)).slice(0, 3);

  const handleWishlist = () => {
    const added = toggleWishlist({ type: "service", id: service.id, name: service.title, image: service.image, category: service.category, price: service.price, vendorId: service.vendorId, vendorName: service.vendor });
    setWishlisted(added);
  };

  const validateEnquiry = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEnquiry = () => {
    if (!validateEnquiry()) return;
    setSubmitting(true);
    const currentUser = getCurrentUser();
    setTimeout(() => {
      addEnquiry({
        userId: currentUser?.id || 99,
        userName: form.name,
        userPhone: form.phone,
        userEmail: form.email,
        vendorId: service.vendorId,
        vendorName: service.vendor,
        vendorSlug: service.vendorSlug || "",
        serviceId: service.id,
        serviceName: service.title,
        message: form.message,
      });
      setSubmitting(false);
      setEnquiryDone(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/services" className="hover:text-brand-600 transition-colors flex items-center gap-1"><ArrowLeft size={14} /> Services</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{service.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden h-72">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <button
                onClick={handleWishlist}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Heart size={18} fill={wishlisted ? "#f97316" : "none"} className={wishlisted ? "text-brand-500" : "text-slate-400"} />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Badge variant="info">{service.category}</Badge>
                <StatusBadge status={service.status || "active"} />
              </div>
            </div>

            {/* Title & Meta */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{service.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1"><MapPin size={14} />{service.location}</span>
                <span className="text-brand-600 font-bold text-base">{service.price}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Related Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedServices.map((s) => (
                    <Link key={s.id} to={`/services/${s.id}`} className="flex gap-3 p-3 bg-slate-50 rounded-xl hover:bg-brand-50 transition-colors">
                      <img src={s.image} alt={s.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-700 line-clamp-1">{s.title}</p>
                        <p className="text-xs text-slate-500">{s.vendor}</p>
                        <p className="text-sm font-bold text-brand-600 mt-0.5">{s.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Vendor card */}
            {vendor && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Service Provider</h3>
                <div className="flex items-center gap-3 mb-3">
                  <img src={vendor.logo} alt={vendor.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{vendor.name}</p>
                    <p className="text-xs text-brand-600">{vendor.category}</p>
                    {vendor.plan === "premium" && <Badge variant="premium" className="mt-0.5">⭐ Premium</Badge>}
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                  <p className="flex items-center gap-1"><MapPin size={11} />{vendor.location}</p>
                  <p>📞 {vendor.phone}</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(vendor.rating) ? "#f97316" : "none"} className={i < Math.floor(vendor.rating) ? "text-brand-500" : "text-slate-300"} />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">{vendor.rating} ({vendor.reviewCount})</span>
                </div>
                <Link to={`/vendor/${vendor.slug}`} className="block text-center text-xs font-semibold text-brand-600 bg-brand-50 py-2 rounded-lg hover:bg-brand-100 transition-colors">
                  View Full Profile →
                </Link>
              </div>
            )}

            {/* Enquiry card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-700 mb-3">Interested?</h3>
              <p className="text-sm text-slate-500 mb-4">Send an enquiry to get pricing and availability details.</p>
              <Button fullWidth onClick={() => setEnquiryModal(true)}>Send Enquiry</Button>
              <button onClick={handleWishlist} className="w-full mt-2 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Heart size={14} fill={wishlisted ? "#f97316" : "none"} className={wishlisted ? "text-brand-500" : "text-slate-400"} />
                {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <Modal isOpen={enquiryModal} onClose={() => { setEnquiryModal(false); setEnquiryDone(false); setForm({ name: "", phone: "", email: "", message: "" }); }} title="Send Enquiry">
        {!enquiryDone ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 -mt-2">For: <strong>{service.title}</strong> · {service.vendor}</p>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Full Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${errors.name ? "border-rose-400" : "border-slate-300"}`} />
              {errors.name && <p className="text-xs text-rose-500 mt-0.5">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Phone *</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9XXXXXXXXX" className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${errors.phone ? "border-rose-400" : "border-slate-300"}`} />
              {errors.phone && <p className="text-xs text-rose-500 mt-0.5">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="you@example.com" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Message *</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Describe your requirement..." className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none ${errors.message ? "border-rose-400" : "border-slate-300"}`} />
              {errors.message && <p className="text-xs text-rose-500 mt-0.5">{errors.message}</p>}
            </div>
            <Button fullWidth loading={submitting} onClick={handleEnquiry}>Send Enquiry</Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-emerald-500" /></div>
            <h3 className="font-bold text-slate-800 text-xl mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm mb-4">The vendor will contact you soon. Check My Enquiries for updates.</p>
            <div className="flex gap-3">
              <Link to="/user/enquiries" className="flex-1"><Button fullWidth variant="outline">View Enquiries</Button></Link>
              <Button fullWidth onClick={() => { setEnquiryModal(false); setEnquiryDone(false); }}>Done</Button>
            </div>
          </div>
        )}
      </Modal>

      <PublicFooter />
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const [wishlisted, setWishlisted] = useState(() => isWishlisted("product", Number(id)));
  const [activeImg, setActiveImg] = useState(0);
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [enquiryDone, setEnquiryDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Product Not Found</h1>
          <Link to="/products"><Button>Browse All Products</Button></Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const vendor = businesses.find((b) => b.id === product.vendorId);
  const relatedProducts = products.filter((p) => p.id !== product.id && (p.category === product.category || p.vendorId === product.vendorId)).slice(0, 4);
  const images = (product as any).images || [product.image];

  const handleWishlist = () => {
    const added = toggleWishlist({ type: "product", id: product.id, name: product.name, image: product.image, category: product.category, price: product.price, vendorId: product.vendorId, vendorName: product.vendor });
    setWishlisted(added);
  };

  const handleEnquiry = () => {
    setSubmitting(true);
    const currentUser = getCurrentUser();
    setTimeout(() => {
      addEnquiry({
        userId: currentUser?.id || 99,
        userName: form.name || "Guest",
        userPhone: form.phone || "",
        userEmail: form.email || "",
        vendorId: product.vendorId,
        vendorName: product.vendor,
        vendorSlug: (product as any).vendorSlug || "",
        productId: product.id,
        productName: product.name,
        message: form.message || `Interested in ${product.name}`,
      });
      setSubmitting(false);
      setEnquiryDone(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/products" className="hover:text-brand-600 flex items-center gap-1"><ArrowLeft size={14} /> Products</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden h-80">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Heart size={18} fill={wishlisted ? "#f97316" : "none"} className={wishlisted ? "text-brand-500" : "text-slate-400"} />
              </button>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-brand-400" : "border-slate-200"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <Badge variant="info" className="mb-2">{product.category}</Badge>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{product.name}</h1>
              <p className="text-sm text-slate-500">by <Link to={`/vendor/${(product as any).vendorSlug}`} className="text-brand-600 hover:underline font-medium">{product.vendor}</Link></p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-brand-600">{product.price}</p>
              <Badge variant={product.availability === "In Stock" ? "success" : "warning"}>{product.availability}</Badge>
            </div>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
            <div className="flex gap-3">
              <Button fullWidth onClick={() => setEnquiryModal(true)}>Enquire Now</Button>
              <button onClick={handleWishlist} aria-label="Toggle wishlist" className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Heart size={18} fill={wishlisted ? "#f97316" : "none"} className={wishlisted ? "text-brand-500" : "text-slate-400"} />
              </button>
            </div>
            {vendor && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <img src={vendor.logo} alt={vendor.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">{vendor.name}</p>
                    <p className="text-xs text-slate-500">{vendor.location}</p>
                  </div>
                </div>
                <Link to={`/vendor/${vendor.slug}`} className="text-xs font-semibold text-brand-600 hover:underline">View Store →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Related Products</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="group block">
                  <div className="h-36 rounded-xl overflow-hidden mb-2">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="font-semibold text-sm text-slate-700 line-clamp-2">{p.name}</p>
                  <p className="text-sm font-bold text-brand-600 mt-0.5">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={enquiryModal} onClose={() => { setEnquiryModal(false); setEnquiryDone(false); }} title="Product Enquiry">
        {!enquiryDone ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 -mt-2"><strong>{product.name}</strong> · {product.price}</p>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name *" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number *" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Your message..." className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none" />
            <Button fullWidth loading={submitting} onClick={handleEnquiry}>Send Enquiry</Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg mb-2">Enquiry Sent!</h3>
            <p className="text-slate-500 text-sm mb-4">The vendor will contact you soon.</p>
            <Button fullWidth onClick={() => { setEnquiryModal(false); setEnquiryDone(false); }}>Done</Button>
          </div>
        )}
      </Modal>

      <PublicFooter />
    </div>
  );
}

// ─── JOB DETAIL PAGE ──────────────────────────────────────────────────────────
export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === Number(id));
  const [applyModal, setApplyModal] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Job Not Found</h1>
          <Link to="/jobs"><Button>Browse All Jobs</Button></Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const vendor = businesses.find((b) => b.id === job.companyId);
  const relatedJobs = jobs.filter((j) => j.id !== job.id && (j.industry === job.industry || j.companyId === job.companyId)).slice(0, 3);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.length < 10) e.phone = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApply = () => {
    if (!resumeFile) { setErrors({ resume: "Please upload your resume" }); return; }
    setSubmitting(true);
    const currentUser = getCurrentUser();
    setTimeout(() => {
      addApplication({
        jobId: job.id,
        jobTitle: job.title,
        vendorId: job.companyId,
        vendorName: job.company,
        userId: currentUser?.id || 99,
        applicantName: form.name || currentUser?.name || "Applicant",
        applicantEmail: form.email || currentUser?.email || "",
        applicantPhone: form.phone || currentUser?.phone || "",
        coverLetter: form.coverLetter,
        resumeFileName: resumeFile.name,
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/jobs" className="hover:text-brand-600 flex items-center gap-1"><ArrowLeft size={14} /> Jobs</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{job.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <Briefcase size={24} className="text-brand-500" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-800">{job.title}</h1>
                  <p className="text-slate-600 mt-0.5">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={11} />{job.location}</span>
                    <StatusBadge status={job.type} />
                    <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={11} />Posted {job.postedDate}</span>
                  </div>
                </div>
              </div>
              <div className="bg-brand-50 rounded-xl p-4">
                <p className="text-brand-700 font-bold text-lg">{job.salary}</p>
                <p className="text-brand-600 text-xs mt-0.5">Salary Range</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <div>
                <h2 className="font-bold text-slate-700 mb-2">About the Role</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{job.description}</p>
              </div>
              <div>
                <h2 className="font-bold text-slate-700 mb-2">Requirements</h2>
                <ul className="space-y-1.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-slate-700 mb-2">Responsibilities</h2>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-slate-700 mb-2">How to Apply</h2>
                <p className="text-slate-600 text-sm">{job.applicationInfo}</p>
              </div>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Related Jobs</h3>
                <div className="space-y-3">
                  {relatedJobs.map((j) => (
                    <Link key={j.id} to={`/jobs/${j.id}`} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-brand-50 transition-colors">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                        <Briefcase size={16} className="text-brand-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-700 text-sm">{j.title}</p>
                        <p className="text-xs text-slate-500">{j.company} · {j.location}</p>
                      </div>
                      <p className="text-xs font-semibold text-brand-600 shrink-0">{j.salary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-20">
              <Button fullWidth size="lg" onClick={() => setApplyModal(true)}>Apply Now</Button>
              {vendor && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="font-semibold text-slate-700 text-sm mb-3">About the Company</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <img src={vendor.logo} alt={vendor.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">{vendor.name}</p>
                      <p className="text-xs text-slate-500">{vendor.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-3 mb-2">{vendor.description}</p>
                  <Link to={`/vendor/${vendor.slug}`} className="text-xs font-semibold text-brand-600 hover:underline">View Company Profile →</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal isOpen={applyModal} onClose={() => { setApplyModal(false); setStep(1); setSubmitted(false); }} title={`Apply for ${job.title}`} size="md">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-emerald-500" /></div>
            <h3 className="font-bold text-slate-800 text-xl mb-2">Application Submitted!</h3>
            <p className="text-slate-500 text-sm mb-4">Your application for <strong>{job.title}</strong> has been submitted. Check My Jobs for status.</p>
            <div className="flex gap-3">
              <Link to="/user/jobs" className="flex-1"><Button fullWidth variant="outline">View Applications</Button></Link>
              <Button fullWidth onClick={() => { setApplyModal(false); setStep(1); setSubmitted(false); }}>Done</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-1 mb-5">
              {[1, 2].map((s) => (<div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? "bg-brand-500" : "bg-slate-200"}`} />))}
            </div>
            {step === 1 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-700">Personal Details</h4>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${errors.name ? "border-rose-400" : "border-slate-300"}`} />
                {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email Address *" className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${errors.email ? "border-rose-400" : "border-slate-300"}`} />
                {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number *" className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${errors.phone ? "border-rose-400" : "border-slate-300"}`} />
                {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                <Button fullWidth onClick={() => { if (validateStep1()) { setErrors({}); setStep(2); } }}>Continue</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-700">Resume & Cover Letter</h4>
                <div>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" id="resume-upload" onChange={(e) => { setResumeFile(e.target.files?.[0] || null); setErrors({}); }} />
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${resumeFile ? "border-emerald-400 bg-emerald-50" : errors.resume ? "border-rose-400 bg-rose-50" : "border-slate-300 hover:border-brand-300"}`}
                  >
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle size={20} className="text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-700">{resumeFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Briefcase size={32} className="text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 mb-2">Click to upload resume</p>
                        <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 5MB</p>
                      </>
                    )}
                  </div>
                  {errors.resume && <p className="text-xs text-rose-500 mt-1">{errors.resume}</p>}
                  {resumeFile && <button onClick={() => setResumeFile(null)} className="text-xs text-slate-400 hover:text-rose-500 mt-1">Remove file</button>}
                </div>
                <textarea value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} rows={3} placeholder="Cover letter / Why are you a good fit? (optional)" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none" />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                  <Button fullWidth loading={submitting} onClick={handleApply}>Submit Application</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <PublicFooter />
    </div>
  );
}

// ─── TOURISM DETAIL PAGE ──────────────────────────────────────────────────────
export function TourismDetailPage() {
  const { id } = useParams<{ id: string }>();
  const place = tourismPlaces.find((p) => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);

  if (!place) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Place Not Found</h1>
          <Link to="/tourism"><Button>Browse Tourism</Button></Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const relatedPlaces = tourismPlaces.filter((p) => p.id !== place.id).slice(0, 3);
  const gallery = (place as any).gallery || [place.image];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src={gallery[activeImg]} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-slate-900/10" />
        <div className="absolute bottom-6 left-6 right-6">
          <Badge variant="info" className="mb-2">{place.category}</Badge>
          <h1 className="text-3xl font-bold text-white">{place.name}</h1>
          <div className="flex items-center gap-1 mt-1 text-white/80 text-sm"><MapPin size={14} />{place.location}</div>
        </div>
        <Link to="/tourism" className="absolute top-4 left-4 flex items-center gap-1 text-white/90 hover:text-white text-sm bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors">
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gallery.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${i === activeImg ? "border-brand-400" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-bold text-slate-800 text-lg mb-3">About {place.name}</h2>
              <p className="text-slate-600 leading-relaxed mb-3">{place.description}</p>
              {(place as any).longDescription && (
                <p className="text-slate-600 leading-relaxed text-sm">{(place as any).longDescription}</p>
              )}
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-3">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {place.highlights.map((h) => (
                  <span key={h} className="px-3 py-1.5 bg-brand-50 text-brand-600 rounded-full text-sm font-medium">✓ {h}</span>
                ))}
              </div>
            </div>

            {/* Related Places */}
            {relatedPlaces.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Nearby Attractions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedPlaces.map((p) => (
                    <Link key={p.id} to={`/tourism/${p.id}`} className="group block">
                      <div className="h-32 rounded-xl overflow-hidden mb-2">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <p className="font-semibold text-sm text-slate-700">{p.name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin size={10} />{p.location}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info card */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-700 mb-4">Travel Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-0.5">Entry Fee</p>
                  <p className="font-semibold text-slate-700">{(place as any).entryFee || "Contact for details"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-0.5">Best Time to Visit</p>
                  <p className="font-semibold text-slate-700">{(place as any).bestTime || "All year"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-0.5">How to Reach</p>
                  <p className="text-slate-600">{(place as any).howToReach || "Accessible from Dindigul"}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(place.rating) ? "#f97316" : "none"} className={i < Math.floor(place.rating) ? "text-brand-500" : "text-slate-300"} />
                  ))}
                  <span className="text-sm font-bold text-slate-700 ml-1">{place.rating}/5</span>
                </div>
              </div>
            </div>

            <Link to="/tourism" className="block">
              <Button fullWidth variant="outline">← Back to All Places</Button>
            </Link>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
