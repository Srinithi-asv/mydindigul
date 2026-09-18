import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Menu, X, Building2, ChevronDown, User, LogIn } from "lucide-react";

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const navigate = useNavigate();

  const navLinks = [
    { label: "Services", to: "/services" },
    { label: "Products", to: "/products" },
    { label: "Jobs", to: "/jobs" },
    { label: "Tourism", to: "/tourism" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg leading-tight">
              My<span className="text-brand-500">Dindigul</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs items-center gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/services?q=${searchQ}`)}
                placeholder="Search businesses..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 text-slate-700"
              />
            </div>
          </div>

          {/* Auth Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/login" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
              <LogIn size={15} />
              Login
            </Link>
            <Link to="/register" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <User size={15} />
              Register
            </Link>
            <Link to="/businessregister" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-sm">
              <Building2 size={15} />
              List Business
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <div className="relative mb-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search businesses..."
                className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none"
              />
            </div>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Register</Link>
            <Link to="/businessregister" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-semibold bg-brand-500 text-white rounded-lg text-center mt-1">
              List Your Business
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
