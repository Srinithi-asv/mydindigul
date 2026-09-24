import { useState } from "react";
import { apiFetch } from "../../api";
import { Link, useNavigate } from "react-router";
import { Building2, Eye, EyeOff, ArrowLeft, Phone, Mail, CheckCircle } from "lucide-react";
import { Input, Button, Alert } from "../../components/ui";

function AuthCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">My<span className="text-brand-500">Dindigul</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({
  identifier: email,
  password,
}),
    });

    localStorage.setItem("auth_token", data.token);

    if (data.user?.role === "vendor") {
      navigate("/vendor/dashboard");
    } else if (data.user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  } catch (error: any) {
    setError(error.message || "Login failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthCard title="Welcome Back" subtitle="Login to your MyDindigul account">
      {error && (
  <div className="mb-4">
    <Alert
      type="error"
      message={error}
      onClose={() => setError("")}
    />
  </div>
)}

      <div className="space-y-4">
        <Input label="Email or Phone" placeholder="you@example.com" value={email} onChange={setEmail} type="email" required />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Password <span className="text-rose-500">*</span></label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 pr-10"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-slate-300" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-brand-600 hover:underline font-medium">Forgot password?</Link>
        </div>

        <Button fullWidth loading={loading} onClick={handleLogin} size="lg">Login</Button>

        <div className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-600 font-semibold hover:underline">Register</Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-3">Are you a business owner?</p>
          <Link to="/businessregister" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border-2 border-brand-200 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors">
            <Building2 size={16} />
            Register Your Business
          </Link>
        </div>
      </div>

      {/* Demo login hints */}
      <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-xs font-semibold text-slate-600 mb-2">Demo logins:</p>
        <div className="space-y-1 text-xs text-slate-500">
          <p><span className="font-medium">User:</span> user@demo.com → User Panel</p>
          <p><span className="font-medium">Vendor:</span> vendor@demo.com → Vendor Panel</p>
          <p><span className="font-medium">Admin:</span> admin@demo.com → Admin Panel</p>
        </div>
      </div>
    </AuthCard>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(60);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name) e.name = "Name is required";
    if (!phone || phone.length < 10) e.phone = "Valid phone required";
    if (!email.includes("@")) e.email = "Valid email required";
    if (pwd.length < 8) e.pwd = "Min 8 characters";
    if (pwd !== confirmPwd) e.confirmPwd = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (validate()) setStep("otp");
  };

  const handleOtp = () => {
    if (otp.join("").length === 6) setStep("success");
  };

  if (step === "success") {
    return (
      <AuthCard title="Account Created!" subtitle="">
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="font-bold text-slate-800 text-2xl mb-2">Welcome, {name}!</h2>
          <p className="text-slate-500 text-sm mb-6">Your account has been created successfully. Start exploring Dindigul's best businesses.</p>
          <Button fullWidth size="lg" onClick={() => navigate("/user/dashboard")}>Go to Dashboard</Button>
        </div>
      </AuthCard>
    );
  }

  if (step === "otp") {
    return (
      <AuthCard title="Verify Phone" subtitle={`OTP sent to +91 ${phone}`}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Phone size={24} className="text-brand-600" />
          </div>
        </div>
        <div className="flex gap-2 justify-center mb-6">
          {otp.map((d, i) => (
            <input
              key={i}
              maxLength={1}
              value={d}
              onChange={(e) => {
                const v = [...otp];
                v[i] = e.target.value;
                setOtp(v);
                if (e.target.value && i < 5) (document.querySelectorAll(".otp-input")[i + 1] as HTMLInputElement)?.focus();
              }}
              className="otp-input w-11 h-12 text-center text-lg font-bold border-2 border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none transition-colors"
            />
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mb-4">
          {timer > 0 ? `Resend OTP in ${timer}s` : <button className="text-brand-600 font-semibold" onClick={() => setTimer(60)}>Resend OTP</button>}
        </p>
        <Button fullWidth size="lg" onClick={handleOtp} disabled={otp.join("").length !== 6}>Verify OTP</Button>
        <button onClick={() => setStep("form")} className="w-full mt-3 text-sm text-slate-500 hover:text-brand-600 transition-colors">
          ← Change phone number
        </button>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create Account" subtitle="Join MyDindigul's growing community">
      <div className="space-y-4">
        <Input label="Full Name" placeholder="Your full name" value={name} onChange={setName} required error={errors.name} />
        <Input label="Phone Number" placeholder="+91 9XXXXXXXXX" value={phone} onChange={setPhone} type="tel" required error={errors.phone} />
        <Input label="Email Address" placeholder="you@example.com" value={email} onChange={setEmail} type="email" required error={errors.email} />
        <div className="relative">
          <Input label="Password" placeholder="Min 8 characters" value={pwd} onChange={setPwd} type="password" required error={errors.pwd} />
        </div>
        <Input label="Confirm Password" placeholder="Confirm your password" value={confirmPwd} onChange={setConfirmPwd} type="password" required error={errors.confirmPwd} />
        <Button fullWidth size="lg" onClick={handleRegister}>Create Account & Verify</Button>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </AuthCard>
  );
}

// ─── BUSINESS REGISTER ────────────────────────────────────────────────────────
export function BusinessRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">My<span className="text-brand-500">Dindigul</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Register Your Business</h1>
          <p className="text-slate-500 text-sm mt-1">Step {step} of {totalSteps}</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < step ? "bg-brand-500" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-bold text-slate-700 text-lg">Business Details</h2>
              <Input label="Business Name" placeholder="e.g. Sri Murugan Mess" required />
              <Input label="Owner Name" placeholder="Your full name" required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Phone" placeholder="+91 9XXXXXXXXX" type="tel" required />
                <Input label="Email" placeholder="business@example.com" type="email" required />
              </div>
              <Button fullWidth size="lg" onClick={() => setStep(2)}>Next: Location & Industry →</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bold text-slate-700 text-lg">Location & Industry</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Industry <span className="text-rose-500">*</span></label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200">
                    <option value="">Select Industry</option>
                    <option>Restaurants & Food</option>
                    <option>Healthcare</option>
                    <option>Automobile</option>
                    <option>Education</option>
                    <option>Retail</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Sub-Industry</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200">
                    <option>Select Sub-Industry</option>
                  </select>
                </div>
              </div>
              <Input label="Address" placeholder="Street address" required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="City" placeholder="Dindigul" required />
                <Input label="Pincode" placeholder="624001" required />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                <Button fullWidth onClick={() => setStep(3)}>Next: Description & Files →</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bold text-slate-700 text-lg">Business Profile</h2>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Business Description <span className="text-rose-500">*</span></label>
                <textarea rows={3} placeholder="Describe your business..." className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Business Logo</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
                    <p className="text-xs text-slate-400">Click to upload logo</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Cover Image</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
                    <p className="text-xs text-slate-400">Click to upload cover</p>
                  </div>
                </div>
              </div>
              <div>
                <Input label="Set Password" placeholder="Create a strong password" type="password" required />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
                <Button fullWidth onClick={() => navigate("/vendor/dashboard")}>Register Business 🎉</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"choose" | "email" | "otp" | "newpwd" | "success">("choose");
  const [method, setMethod] = useState<"email" | "phone">("email");

  return (
    <AuthCard title="Reset Password" subtitle="We'll help you get back in">
      {step === "choose" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">How would you like to reset your password?</p>
          <div className="space-y-3">
            {([{ type: "email", icon: Mail, label: "Via Email", desc: "Reset link sent to your email" }, { type: "phone", icon: Phone, label: "Via Phone OTP", desc: "OTP sent to your mobile number" }] as const).map((m) => (
              <label key={m.type} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${method === m.type ? "border-brand-400 bg-brand-50" : "border-slate-200 hover:border-slate-300"}`}>
                <input type="radio" checked={method === m.type} onChange={() => setMethod(m.type)} className="sr-only" />
                <div className={`p-2 rounded-lg ${method === m.type ? "bg-brand-100" : "bg-slate-100"}`}>
                  <m.icon size={18} className={method === m.type ? "text-brand-600" : "text-slate-500"} />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{m.label}</p>
                  <p className="text-xs text-slate-500">{m.desc}</p>
                </div>
              </label>
            ))}
          </div>
          <Button fullWidth size="lg" onClick={() => setStep(method === "email" ? "email" : "otp")}>Continue</Button>
          <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      )}

      {step === "email" && (
        <div className="space-y-4">
          <Input label="Email Address" placeholder="you@example.com" type="email" required />
          <Button fullWidth size="lg" onClick={() => setStep("success")}>Send Reset Link</Button>
          <button onClick={() => setStep("choose")} className="w-full text-sm text-slate-500 hover:text-brand-600 flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-4">
          <Input label="Phone Number" placeholder="+91 9XXXXXXXXX" type="tel" required />
          <Button fullWidth onClick={() => setStep("newpwd")} size="lg">Send OTP</Button>
        </div>
      )}

      {step === "newpwd" && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700">Create New Password</h3>
          <Input label="New Password" placeholder="Min 8 characters" type="password" required />
          <Input label="Confirm Password" placeholder="Confirm new password" type="password" required />
          <Button fullWidth size="lg" onClick={() => setStep("success")}>Update Password</Button>
        </div>
      )}

      {step === "success" && (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h3 className="font-bold text-slate-800 text-xl mb-2">Password Reset!</h3>
          <p className="text-slate-500 text-sm mb-6">Your password has been updated successfully.</p>
          <Button fullWidth size="lg" onClick={() => navigate("/login")}>Back to Login</Button>
        </div>
      )}
    </AuthCard>
  );
}
