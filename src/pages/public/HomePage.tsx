import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, MapPin, Star, Heart, ArrowRight, Building2, Briefcase, Package, Globe, Utensils, Car, GraduationCap, Wrench, Hotel, ChevronRight } from "lucide-react";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicFooter from "../../components/layout/PublicFooter";
import { businesses, jobs, tourismPlaces } from "../../data/mockData";
import { apiFetch } from "../../api";
import { Badge, Button } from "../../components/ui";

export default function HomePage() {
  const navigate = useNavigate();

  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {

    apiFetch("/industries")
      .then((data) => {
        setIndustries(data.industries || []);
      })
      .catch((error) => {
        console.error("Failed to load industries:", error);
      });
  }, []);

  useEffect(() => {
  apiFetch("/services")
    .then((data) => {
      setServices(data.services || []);
    })
    .catch((error) => {
      console.error("Failed to load services:", error);
    });
}, []);

useEffect(() => {
  apiFetch("/products")
    .then((data) => {
      setProducts(data.products || []);
    })
    .catch((error) => {
      console.error("Failed to load products:", error);
    });
}, []);

useEffect(() => {
  apiFetch("/job-postings")
    .then((data) => {
      setJobPostings(data.job_postings || []);
    })
    .catch((error) => {
      console.error("Failed to load job postings:", error);
    });
}, []);


useEffect(() => {
  apiFetch("/events")
    .then((data) => {
      setEvents(data.events || []);
    })
    .catch((error) => {
      console.error("Failed to load events:", error);
    });
}, []);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const categoryIcons: Record<string, any> = {
    "Restaurants & Food": Utensils,
    "Hotels & Hospitality": Hotel,
    "Automobile & Vehicles": Car,
    "Education & Training": GraduationCap,
    "Local Services": Wrench,
    "Tourism & Travel": Globe,
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&h=700&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Badge variant="new" className="mb-5 text-sm px-4 py-1.5">
            🏙️ Dindigul's Local Business Platform
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-tight">
            Discover the Best of<br />
            <span className="text-brand-400">Dindigul</span>
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Explore local businesses, find services, browse products, discover jobs, and uncover hidden tourism gems — all in one place.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/services?q=${q}`)}
                placeholder="Search businesses, services, products..."
                className="w-full pl-9 pr-3 py-3 text-sm text-slate-700 focus:outline-none rounded-xl"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-3 px-3 text-sm border-l border-slate-200 text-slate-600 focus:outline-none bg-transparent min-w-[130px]"
            >
              <option>All</option>
              <option>Services</option>
              <option>Products</option>
              <option>Jobs</option>
              <option>Tourism</option>
            </select>
            <div className="relative hidden sm:flex items-center gap-1 px-3 text-sm text-slate-500 border-l border-slate-200">
              <MapPin size={14} className="text-brand-500" />
              <span>Dindigul</span>
            </div>
            <Button onClick={() => navigate(`/services?q=${q}`)} size="lg" className="rounded-xl">
              <Search size={16} />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Category shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Browse by Category</h2>
          <Link to="/services" className="text-sm text-brand-600 hover:underline flex items-center gap-1">View all <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {industries.slice(0, 12).map((ind) => {
            const Icon = categoryIcons[ind.name] || Building2;
            return (
              <Link key={ind.id} to={`/services?industry=${ind.name}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all text-center group">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center group-hover:bg-brand-100 transition-colors text-xl">
                  {ind.icon}
                </div>
                <span className="text-xs font-medium text-slate-600 leading-tight">{ind.name.split(" ")[0]}</span>
                <span className="text-xs text-slate-400">{ind.count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Featured Businesses</h2>
              <p className="text-sm text-slate-500 mt-0.5">Top-rated local businesses in Dindigul</p>
            </div>
            <Link to="/services" className="text-sm text-brand-600 hover:underline flex items-center gap-1">See all <ChevronRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businesses.slice(0, 6).map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button
                    onClick={() => toggleWishlist(b.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    <Heart size={15} fill={wishlist.includes(b.id) ? "#f97316" : "none"} className={wishlist.includes(b.id) ? "text-brand-500" : "text-slate-500"} />
                  </button>
                  {b.plan === "premium" && (
                    <Badge variant="premium" className="absolute top-3 left-3">⭐ Premium</Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <img src={b.logo} alt={b.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-sm truncate">{b.name}</h3>
                      <p className="text-xs text-brand-600 font-medium">{b.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                    <MapPin size={11} />{b.location}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill={i < Math.floor(b.rating) ? "#f97316" : "none"} className={i < Math.floor(b.rating) ? "text-brand-500" : "text-slate-300"} />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{b.rating} ({b.reviewCount})</span>
                  </div>
                  <Link to={`/vendor/${b.slug}`} className="mt-3 block text-center text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 py-2 rounded-lg transition-colors">
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Popular Services</h2>
          <Link to="/services" className="text-sm text-brand-600 hover:underline flex items-center gap-1">Browse all <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.id} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all">
              <img src={s.banner_image_url || "https://images.unsplash.com/photo-1497366811353-6870744d04b2"} alt={s.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <Badge variant="info" className="mb-1.5">{s.sub_industry?.name}</Badge>
                <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-1">{s.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{s.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-brand-600">₹{s.discounted_price || s.price}</span>
                  <Link to="/services" className="text-xs text-brand-600 hover:underline font-medium">View →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products & Jobs side-by-side */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">Popular Products</h2>
                <Link to="/products" className="text-sm text-brand-600 hover:underline flex items-center gap-1">See all <ChevronRight size={14} /></Link>
              </div>
              <div className="space-y-3">
                {products.map((p) => (
                  <div key={p.id} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:shadow-sm transition-all">
                    <img src= {p.thumbnail_url || "https://images.unsplash.com/photo-1558655146-d09347e92766"} alt={p.name}className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-700 text-sm line-clamp-1">{p.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{p.vendor?.business_name}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-sm font-bold text-brand-600">₹{p.sale_price || p.regular_price}</span>
                        <Badge variant={p.stock_status === "in_stock" ? "success" : "warning"}>
  {p.stock_status === "in_stock" ? "In Stock" : "Out of Stock"}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobs */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">Latest Jobs</h2>
                <Link to="/jobs" className="text-sm text-brand-600 hover:underline flex items-center gap-1">Browse all <ChevronRight size={14} /></Link>
              </div>
              <div className="space-y-3">
                {jobPostings.map((j) => (
                  <Link key={j.id} to={`/jobs/${j.id}`} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-200 hover:shadow-sm transition-all block">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                      <Briefcase size={18} className="text-brand-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-700 text-sm">{j.title}</h3>
                      <p className="text-xs text-slate-500">{j.vendor?.business_name}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={10} />{j.location}</span>
                        <Badge variant="info">{j.job_type}</Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-brand-600">₹{j.salary_min}+</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-xl font-bold text-slate-800">Upcoming Events</h2>
      <p className="text-sm text-slate-500 mt-0.5">
        Discover upcoming events in Dindigul
      </p>
    </div>

    <Link
      to="/events"
      className="text-sm text-brand-600 hover:underline flex items-center gap-1"
    >
      See all <ChevronRight size={14} />
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {events.map((event) => (
      <div
        key={event.id}
        className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all"
      >
        <h3 className="font-bold text-slate-800 text-sm">
          {event.title}
        </h3>

        <p className="text-xs text-slate-500 mt-2">
          {event.description}
        </p>

        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
          <MapPin size={12} />
          {event.location}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-bold text-brand-600">
            ₹{event.ticket_price}
          </span>

          <Link
            to={`/events/${event.id}`}
            className="text-xs text-brand-600 hover:underline font-medium"
          >
            View →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Tourism */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Explore Tourism</h2>
            <p className="text-sm text-slate-500 mt-0.5">Discover the beauty around Dindigul</p>
          </div>
          <Link to="/tourism" className="text-sm text-brand-600 hover:underline flex items-center gap-1">See all <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tourismPlaces.map((place) => (
            <Link key={place.id} to={`/tourism/${place.id}`} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-[3/4] relative">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-bold text-sm leading-tight">{place.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{place.location}</p>
                  <Badge variant="info" className="mt-1.5">{place.category}</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA: List Business */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Building2 size={40} className="text-white/80 mx-auto mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
            Grow Your Business in Dindigul
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
            Join 200+ local businesses on MyDindigul. Get discovered by thousands of customers, manage your leads, and grow your presence online.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/businessregister" className="px-8 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-md">
              List Your Business — Free
            </Link>
            <Link to="/login" className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Already registered? Login
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10">
            {[{ label: "Active Businesses", value: "200+" }, { label: "Monthly Visitors", value: "5,000+" }, { label: "Services Listed", value: "450+" }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
