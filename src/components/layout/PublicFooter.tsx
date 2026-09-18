import { Link } from "react-router";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Building2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                My<span className="text-brand-400">Dindigul</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-slate-500">
              Discover and connect with the best local businesses, services, and opportunities in Dindigul.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2"><MapPin size={12} />Dindigul, Tamil Nadu 624001</div>
              <div className="flex items-center gap-2"><Phone size={12} />+91 94455 00000</div>
              <div className="flex items-center gap-2"><Mail size={12} />hello@mydindigul.com</div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Services", to: "/services" },
                { label: "Products", to: "/products" },
                { label: "Jobs", to: "/jobs" },
                { label: "Tourism", to: "/tourism" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Business</h4>
            <ul className="space-y-2.5">
              {[
                { label: "List Your Business", to: "/businessregister" },
                { label: "Login", to: "/login" },
                { label: "Register", to: "/register" },
                { label: "Vendor Dashboard", to: "/vendor/dashboard" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", to: "/" },
                { label: "Privacy Policy", to: "/" },
                { label: "Terms of Service", to: "/" },
                { label: "Contact", to: "/" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© 2024 MyDindigul. All rights reserved.</p>
          <p>Made with ❤️ for Dindigul</p>
        </div>
      </div>
    </footer>
  );
}
