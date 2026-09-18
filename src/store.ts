// ─── SHARED FRONTEND STATE ────────────────────────────────────────────────────
// This module holds all cross-module state so that actions in one page
// are immediately reflected in related pages (enquiry→lead, apply→candidate, etc.)

export type UserRole = "user" | "vendor" | "admin";
export type VendorPlan = "free" | "premium" | "expired";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface Enquiry {
  id: string;
  userId: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  vendorId: number;
  vendorName: string;
  vendorSlug: string;
  serviceId?: number;
  serviceName?: string;
  productId?: number;
  productName?: string;
  message: string;
  date: string;
  status: "new" | "pending" | "responded" | "closed";
}

export interface JobApplication {
  id: string;
  jobId: number;
  jobTitle: string;
  vendorId: number;
  vendorName: string;
  userId: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
  resumeFileName?: string;
  appliedDate: string;
  status: "applied" | "reviewing" | "shortlisted" | "rejected" | "selected";
}

export interface EventBooking {
  id: string;
  eventId: number;
  eventName: string;
  vendorId: number;
  vendorName: string;
  userId: number;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  attendeeCount: number;
  bookingDate: string;
  status: "confirmed" | "pending" | "cancelled";
}

export interface WishlistItem {
  type: "vendor" | "service" | "product";
  id: number;
  name: string;
  image?: string;
  slug?: string;
  category?: string;
  price?: string;
  vendorId?: number;
  vendorName?: string;
}

export interface VisitorEvent {
  id: string;
  vendorId: number;
  visitorId?: number;
  visitorName?: string;
  isLoggedIn: boolean;
  pageType: "profile" | "service" | "product";
  pageId?: number;
  city?: string;
  source?: string;
  timestamp: string;
}

// ─── MOCK PRE-SEEDED DATA ─────────────────────────────────────────────────────

const mockUsers: AuthUser[] = [
  { id: 1, name: "Ramesh Kumar", email: "user@demo.com", phone: "+91 98765 43210", role: "user" },
  { id: 2, name: "Murugan Pillai", email: "vendor@demo.com", phone: "+91 94455 12345", role: "vendor" },
  { id: 3, name: "Admin User", email: "admin@demo.com", phone: "+91 90000 00001", role: "admin" },
];

const seedEnquiries: Enquiry[] = [
  {
    id: "ENQ-001", userId: 1, userName: "Ramesh Kumar", userPhone: "+91 98765 43210", userEmail: "ramesh@gmail.com",
    vendorId: 1, vendorName: "Sri Murugan Mess", vendorSlug: "sri-murugan-mess",
    serviceId: 1, serviceName: "Chettinad Catering",
    message: "Interested in catering for a 200-person wedding function.", date: "2024-01-20", status: "responded"
  },
  {
    id: "ENQ-002", userId: 1, userName: "Ramesh Kumar", userPhone: "+91 98765 43210", userEmail: "ramesh@gmail.com",
    vendorId: 4, vendorName: "Vetri Honda", vendorSlug: "vetri-honda",
    serviceId: 2, serviceName: "Two-Wheeler Service",
    message: "Need to book service appointment for Activa.", date: "2024-01-18", status: "pending"
  },
  {
    id: "ENQ-003", userId: 1, userName: "Ramesh Kumar", userPhone: "+91 98765 43210", userEmail: "ramesh@gmail.com",
    vendorId: 6, vendorName: "City Multi Speciality Hospital", vendorSlug: "city-hospital",
    serviceId: 4, serviceName: "Corporate Health Checkup",
    message: "Looking for group health checkup packages for 50 employees.", date: "2024-01-15", status: "new"
  },
];

const seedApplications: JobApplication[] = [
  {
    id: "APP-001", jobId: 1, jobTitle: "Restaurant Supervisor", vendorId: 1, vendorName: "Sri Murugan Mess",
    userId: 1, applicantName: "Ramesh Kumar", applicantEmail: "ramesh@gmail.com", applicantPhone: "+91 98765 43210",
    coverLetter: "I have 5 years of restaurant management experience.", resumeFileName: "ramesh_resume.pdf",
    appliedDate: "2024-01-15", status: "reviewing"
  },
  {
    id: "APP-002", jobId: 2, jobTitle: "Automobile Service Technician", vendorId: 4, vendorName: "Vetri Honda",
    userId: 1, applicantName: "Ramesh Kumar", applicantEmail: "ramesh@gmail.com", applicantPhone: "+91 98765 43210",
    coverLetter: "ITI certified with 3 years Honda service experience.", resumeFileName: "ramesh_resume.pdf",
    appliedDate: "2024-01-12", status: "applied"
  },
];

const seedBookings: EventBooking[] = [
  {
    id: "BKG-001", eventId: 1, eventName: "Grand Opening Celebration", vendorId: 1, vendorName: "Sri Murugan Mess",
    userId: 1, attendeeName: "Ramesh Kumar", attendeeEmail: "ramesh@gmail.com", attendeePhone: "+91 98765 43210",
    attendeeCount: 2, bookingDate: "2024-01-18", status: "confirmed"
  },
];

const seedWishlist: WishlistItem[] = [
  { type: "vendor", id: 1, name: "Sri Murugan Mess", image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=400&h=300&fit=crop&auto=format", slug: "sri-murugan-mess", category: "Restaurants & Food" },
  { type: "vendor", id: 2, name: "Dindigul Thalapakatti", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop&auto=format", slug: "dindigul-thalapakatti", category: "Restaurants & Food" },
  { type: "service", id: 1, name: "Chettinad Catering Services", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format", category: "Catering", price: "₹350 per plate", vendorId: 1, vendorName: "Sri Murugan Mess" },
  { type: "product", id: 2, name: "Honda Activa 6G", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop&auto=format", price: "₹74,900", vendorId: 4, vendorName: "Vetri Honda" },
];

const seedVisitors: VisitorEvent[] = [
  { id: "VIS-001", vendorId: 1, visitorId: 1, visitorName: "Ramesh Kumar", isLoggedIn: true, pageType: "profile", city: "Dindigul", source: "Direct", timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: "VIS-002", vendorId: 1, isLoggedIn: false, pageType: "service", pageId: 1, city: "Madurai", source: "Search", timestamp: new Date(Date.now() - 900000).toISOString() },
  { id: "VIS-003", vendorId: 1, visitorId: 2, visitorName: "Priya Selvam", isLoggedIn: true, pageType: "product", city: "Dindigul", source: "Referral", timestamp: new Date(Date.now() - 1920000).toISOString() },
];

// ─── GLOBAL SINGLETON STATE ────────────────────────────────────────────────────
// Using a module-level singleton so all components share the same state
// without requiring React context (simpler for this prototype scale)

interface AppState {
  currentUser: AuthUser | null;
  vendorPlan: VendorPlan;
  enquiries: Enquiry[];
  applications: JobApplication[];
  bookings: EventBooking[];
  wishlist: WishlistItem[];
  visitors: VisitorEvent[];
  subscribers: Array<() => void>;
}

const state: AppState = {
  currentUser: null,
  vendorPlan: "free",
  enquiries: [...seedEnquiries],
  applications: [...seedApplications],
  bookings: [...seedBookings],
  wishlist: [...seedWishlist],
  visitors: [...seedVisitors],
  subscribers: [],
};

function notify() {
  state.subscribers.forEach((cb) => cb());
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export function login(email: string, _password: string): AuthUser | null {
  const found = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    state.currentUser = found;
    notify();
    return found;
  }
  return null;
}

export function logout() {
  state.currentUser = null;
  notify();
}

export function getCurrentUser() {
  return state.currentUser;
}

export function setCurrentUser(user: AuthUser | null) {
  state.currentUser = user;
  notify();
}

// ─── VENDOR PLAN ──────────────────────────────────────────────────────────────
export function getVendorPlan() {
  return state.vendorPlan;
}

export function setVendorPlan(plan: VendorPlan) {
  state.vendorPlan = plan;
  notify();
}

// ─── ENQUIRIES ────────────────────────────────────────────────────────────────
export function getEnquiries() {
  return state.enquiries;
}

export function getUserEnquiries(userId: number) {
  return state.enquiries.filter((e) => e.userId === userId);
}

export function getVendorLeads(vendorId: number) {
  return state.enquiries.filter((e) => e.vendorId === vendorId);
}

export function addEnquiry(enq: Omit<Enquiry, "id" | "date" | "status">) {
  const newEnq: Enquiry = {
    ...enq,
    id: `ENQ-${String(Date.now()).slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    status: "new",
  };
  state.enquiries = [newEnq, ...state.enquiries];
  notify();
  return newEnq;
}

// ─── JOB APPLICATIONS ────────────────────────────────────────────────────────
export function getApplications() {
  return state.applications;
}

export function getUserApplications(userId: number) {
  return state.applications.filter((a) => a.userId === userId);
}

export function getVendorApplications(vendorId: number) {
  return state.applications.filter((a) => a.vendorId === vendorId);
}

export function getJobApplications(jobId: number) {
  return state.applications.filter((a) => a.jobId === jobId);
}

export function addApplication(app: Omit<JobApplication, "id" | "appliedDate" | "status">) {
  const newApp: JobApplication = {
    ...app,
    id: `APP-${String(Date.now()).slice(-6)}`,
    appliedDate: new Date().toISOString().split("T")[0],
    status: "applied",
  };
  state.applications = [newApp, ...state.applications];
  notify();
  return newApp;
}

export function updateApplicationStatus(id: string, status: JobApplication["status"]) {
  state.applications = state.applications.map((a) => a.id === id ? { ...a, status } : a);
  notify();
}

// ─── EVENT BOOKINGS ───────────────────────────────────────────────────────────
export function getBookings() {
  return state.bookings;
}

export function getUserBookings(userId: number) {
  return state.bookings.filter((b) => b.userId === userId);
}

export function getVendorBookings(vendorId: number) {
  return state.bookings.filter((b) => b.vendorId === vendorId);
}

export function getEventBookings(eventId: number) {
  return state.bookings.filter((b) => b.eventId === eventId);
}

export function addBooking(booking: Omit<EventBooking, "id" | "bookingDate" | "status">) {
  const newBooking: EventBooking = {
    ...booking,
    id: `BKG-${String(Date.now()).slice(-6)}`,
    bookingDate: new Date().toISOString().split("T")[0],
    status: "confirmed",
  };
  state.bookings = [newBooking, ...state.bookings];
  notify();
  return newBooking;
}

// ─── WISHLIST ─────────────────────────────────────────────────────────────────
export function getWishlist() {
  return state.wishlist;
}

export function isWishlisted(type: WishlistItem["type"], id: number) {
  return state.wishlist.some((w) => w.type === type && w.id === id);
}

export function toggleWishlist(item: WishlistItem) {
  const exists = state.wishlist.some((w) => w.type === item.type && w.id === item.id);
  if (exists) {
    state.wishlist = state.wishlist.filter((w) => !(w.type === item.type && w.id === item.id));
  } else {
    state.wishlist = [...state.wishlist, item];
  }
  notify();
  return !exists;
}

export function removeWishlistItem(type: WishlistItem["type"], id: number) {
  state.wishlist = state.wishlist.filter((w) => !(w.type === type && w.id === id));
  notify();
}

// ─── VISITORS ─────────────────────────────────────────────────────────────────
export function getVisitors(vendorId: number) {
  return state.visitors.filter((v) => v.vendorId === vendorId);
}

export function recordVisitor(event: Omit<VisitorEvent, "id" | "timestamp">) {
  const v: VisitorEvent = {
    ...event,
    id: `VIS-${String(Date.now()).slice(-6)}`,
    timestamp: new Date().toISOString(),
  };
  state.visitors = [v, ...state.visitors];
  notify();
}

// ─── SUBSCRIPTION ─────────────────────────────────────────────────────────────
export function subscribe(cb: () => void) {
  state.subscribers.push(cb);
  return () => {
    state.subscribers = state.subscribers.filter((s) => s !== cb);
  };
}

// ─── REACT HOOK ───────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useStore() {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    return subscribe(() => forceUpdate((n) => n + 1));
  }, []);
  return {
    currentUser: state.currentUser,
    vendorPlan: state.vendorPlan,
    enquiries: state.enquiries,
    applications: state.applications,
    bookings: state.bookings,
    wishlist: state.wishlist,
    visitors: state.visitors,
  };
}
