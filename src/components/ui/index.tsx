import { ReactNode, useState } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, ChevronDown, Search, Lock, Crown, Loader2 } from "lucide-react";

// ─── BUTTON ──────────────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  locked?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  loading,
  locked,
  className = "",
  type = "button",
  fullWidth,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100",
    ghost: "text-slate-600 hover:bg-slate-100 active:bg-slate-200",
    danger: "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 shadow-sm",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-sm",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading || locked}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {locked && <Lock size={12} />}
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

// ─── BADGE ───────────────────────────────────────────────────────────────────
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "premium" | "free" | "new";

export function Badge({ variant = "default", children, className = "" }: { variant?: BadgeVariant; children: ReactNode; className?: string }) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-600",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    info: "bg-sky-100 text-sky-700",
    premium: "bg-violet-100 text-violet-700",
    free: "bg-slate-100 text-slate-500",
    new: "bg-brand-100 text-brand-700",
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 shadow-sm ${onClick ? "cursor-pointer hover:shadow-md hover:border-slate-300 transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── INPUT ───────────────────────────────────────────────────────────────────
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export function Input({ label, placeholder, type = "text", value, onChange, error, required, disabled, className = "", icon }: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg border text-sm py-2.5 px-3 bg-white placeholder-slate-400 text-slate-800 transition-colors
            ${icon ? "pl-9" : ""}
            ${error ? "border-rose-400 focus:ring-rose-300" : "border-slate-300 focus:border-brand-400 focus:ring-brand-200"}
            focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed`}
        />
      </div>
      {error && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ─── SELECT ──────────────────────────────────────────────────────────────────
interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function Select({ label, options, value, onChange, placeholder, required, error, className = "" }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full appearance-none rounded-lg border text-sm py-2.5 px-3 bg-white text-slate-800 transition-colors pr-9
            ${error ? "border-rose-400" : "border-slate-300 focus:border-brand-400 focus:ring-brand-200"}
            focus:outline-none focus:ring-2`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ─── TEXTAREA ────────────────────────────────────────────────────────────────
export function Textarea({ label, placeholder, value, onChange, rows = 4, required, error, className = "" }: { label?: string; placeholder?: string; value?: string; onChange?: (v: string) => void; rows?: number; required?: boolean; error?: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-lg border text-sm py-2.5 px-3 bg-white placeholder-slate-400 text-slate-800 resize-none
          ${error ? "border-rose-400" : "border-slate-300 focus:border-brand-400 focus:ring-brand-200"}
          focus:outline-none focus:ring-2`}
      />
      {error && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ─── SEARCH BAR ──────────────────────────────────────────────────────────────
export function SearchBar({ placeholder = "Search...", value, onChange, className = "" }: { placeholder?: string; value?: string; onChange?: (v: string) => void; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 text-slate-800 placeholder-slate-400"
      />
    </div>
  );
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, children, size = "md" }: { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; size?: "sm" | "md" | "lg" | "xl" }) {
  if (!isOpen) return null;

  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-lg">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── ALERT ───────────────────────────────────────────────────────────────────
type AlertType = "success" | "warning" | "error" | "info";

export function Alert({ type, title, message, onClose }: { type: AlertType; title?: string; message: string; onClose?: () => void }) {
  const configs: Record<AlertType, { bg: string; icon: ReactNode }> = {
    success: { bg: "bg-emerald-50 border-emerald-200 text-emerald-800", icon: <CheckCircle size={16} className="text-emerald-600" /> },
    warning: { bg: "bg-amber-50 border-amber-200 text-amber-800", icon: <AlertTriangle size={16} className="text-amber-600" /> },
    error: { bg: "bg-rose-50 border-rose-200 text-rose-800", icon: <AlertCircle size={16} className="text-rose-600" /> },
    info: { bg: "bg-sky-50 border-sky-200 text-sky-800", icon: <Info size={16} className="text-sky-600" /> },
  };
  const { bg, icon } = configs[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${bg}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm">{title}</p>}
        <p className="text-sm mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-current opacity-60 hover:opacity-100 shrink-0">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, trend, color = "brand" }: { label: string; value: string | number; icon: ReactNode; trend?: string; color?: string }) {
  const colors: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    emerald: "bg-emerald-50 text-emerald-600",
    sky: "bg-sky-50 text-sky-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          {trend && <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>}
        </div>
        <div className={`p-2.5 rounded-xl ${colors[color] || colors.brand}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-slate-300 mb-4">{icon}</div>
      <h3 className="font-semibold text-slate-600 text-base mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-400 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ─── SKELETON ────────────────────────────────────────────────────────────────
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function SkeletonCard() {
  return (
    <Card className="p-4">
      <Skeleton className="h-40 w-full mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </Card>
  );
}

// ─── LOADING SPINNER ─────────────────────────────────────────────────────────
export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return <Loader2 size={size} className="animate-spin text-brand-500" />;
}

// ─── UPGRADE BANNER ──────────────────────────────────────────────────────────
export function UpgradeBanner({ onUpgrade }: { onUpgrade?: () => void }) {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-brand-500 rounded-xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <Crown size={28} className="shrink-0 text-yellow-300" />
        <div>
          <p className="font-bold text-base">You're on the Free Plan</p>
          <p className="text-sm text-white/80 mt-0.5">Upgrade to Premium for unlimited features, full analytics & more.</p>
        </div>
      </div>
      <button
        onClick={onUpgrade}
        className="shrink-0 bg-white text-violet-700 font-semibold text-sm px-5 py-2 rounded-lg hover:bg-violet-50 transition-colors"
      >
        Upgrade Now
      </button>
    </div>
  );
}

// ─── LOCKED MODULE ───────────────────────────────────────────────────────────
export function LockedModule({ feature, onUpgrade }: { feature: string; onUpgrade?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mb-4">
        <Lock size={24} className="text-violet-500" />
      </div>
      <h3 className="font-bold text-slate-700 text-xl mb-2">Premium Feature</h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">
        {feature} is available on the Premium plan. Upgrade to unlock full access.
      </p>
      <button
        onClick={onUpgrade}
        className="bg-violet-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-violet-700 transition-colors inline-flex items-center gap-2"
      >
        <Crown size={16} />
        Upgrade to Premium
      </button>
    </div>
  );
}

// ─── USAGE COUNTER ───────────────────────────────────────────────────────────
export function UsageCounter({ used, max, label }: { used: number; max: number; label: string }) {
  const pct = (used / max) * 100;
  const full = used >= max;

  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className={`text-sm font-bold ${full ? "text-rose-600" : "text-slate-700"}`}>{used}/{max}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${full ? "bg-rose-500" : pct > 80 ? "bg-amber-500" : "bg-brand-500"}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      {full && <p className="text-xs text-rose-600 mt-2 font-medium">Limit reached. Upgrade for more.</p>}
    </div>
  );
}

// ─── TABS ────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${active === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── PAGINATION ──────────────────────────────────────────────────────────────
export function Pagination({ page, total, perPage = 10, onChange }: { page: number; total: number; perPage?: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
      <p className="text-sm text-slate-500">
        Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
        >
          Prev
        </button>
        {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 text-sm rounded-lg transition-colors font-medium ${p === page ? "bg-brand-500 text-white" : "hover:bg-slate-50 text-slate-600"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === pages}
          className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ─── TABLE ───────────────────────────────────────────────────────────────────
export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {headers.map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-slate-700 ${className}`}>{children}</td>;
}

// ─── CONFIRM DIALOG ──────────────────────────────────────────────────────────
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirm", type = "danger" }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmLabel?: string; type?: "danger" | "warning" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-slate-600 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant={type === "danger" ? "danger" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
let toastCallbacks: ((msg: string, type: AlertType) => void)[] = [];

export function toast(msg: string, type: AlertType = "success") {
  toastCallbacks.forEach((cb) => cb(msg, type));
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: AlertType }[]>([]);

  const add = (msg: string, type: AlertType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  // Register callback
  toastCallbacks = [add];

  const icons: Record<AlertType, ReactNode> = {
    success: <CheckCircle size={16} />,
    warning: <AlertTriangle size={16} />,
    error: <AlertCircle size={16} />,
    info: <Info size={16} />,
  };

  const colors: Record<AlertType, string> = {
    success: "bg-emerald-600",
    warning: "bg-amber-500",
    error: "bg-rose-600",
    info: "bg-sky-600",
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-enter flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[t.type]}`}>
          {icons[t.type]}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── BREADCRUMB ──────────────────────────────────────────────────────────────
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-slate-300">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-brand-600 transition-colors">{item.label}</a>
          ) : (
            <span className="text-slate-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
export function Avatar({ name, src, size = "md" }: { name: string; src?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (src) {
    return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`} />;
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center ring-2 ring-white`}>
      {initials}
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-500",
    blocked: "bg-rose-100 text-rose-700",
    pending: "bg-amber-100 text-amber-700",
    premium: "bg-violet-100 text-violet-700",
    free: "bg-slate-100 text-slate-500",
    new: "bg-sky-100 text-sky-700",
    responded: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-100 text-slate-500",
    delivered: "bg-emerald-100 text-emerald-700",
    processing: "bg-amber-100 text-amber-700",
    confirmed: "bg-sky-100 text-sky-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
    contacted: "bg-sky-100 text-sky-700",
    converted: "bg-emerald-100 text-emerald-700",
    applied: "bg-sky-100 text-sky-700",
    reviewing: "bg-amber-100 text-amber-700",
    shortlisted: "bg-violet-100 text-violet-700",
    rejected: "bg-rose-100 text-rose-700",
    selected: "bg-emerald-100 text-emerald-700",
    "full-time": "bg-sky-100 text-sky-700",
    "part-time": "bg-violet-100 text-violet-700",
  };
  const cls = colorMap[status.toLowerCase()] || "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${cls}`}>
      {status}
    </span>
  );
}
