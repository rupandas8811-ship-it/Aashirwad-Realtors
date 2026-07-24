import { Phone, Mail, MapPin, CheckCircle, ArrowRight, FileText, Video, Play, Star, Shield, TrendingUp, Building2, Users, Download, ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Builders', href: '/builders' },
  { label: 'Readiness Test', href: '/readiness-test' },
  { label: 'Subscription', href: '/subscription' },
  { label: 'Contact', href: '/contact' },
];

export const BUILDER_PARTNERS = [
  "The House Of Abhinandan Lodha", "Puravankara", "Provident Housing", "Birla Estates", "Godrej Properties",
  "Sobha Limited", "Shriram Properties", "DNR Group", "Prestige Group",
  "Brigade Group", "Assetz Property Group", "Lodha", "Salarpuria Sattva",
  "Mahindra Lifespaces", "Embassy Group", "Century Real Estate",
  "Total Environment", "Casagrand", "Nambiar Builders", "Arvind SmartSpaces"
];

export const PROPERTY_CATEGORIES = [
  "Economy Apartments", "Premium Apartments", "Luxury Apartments",
  "Ultra Luxury Apartments", "Villas", "Gated Communities",
  "Investment Properties", "Rental Yield Projects"
];

export const TRUST_REASONS = [
  { title: "RERA Registered", desc: "Ethical and transparent property transactions." },
  { title: "Top Builders", desc: "Verified options across reputed developers." },
  { title: "Personalized", desc: "Based on requirements—not sales targets." },
  { title: "Honest Advice", desc: "Understand advantages and limitations." },
  { title: "Investment Focus", desc: "Evaluate appreciation, rental income, connectivity." },
  { title: "End-to-End", desc: "Support from enquiry to possession." },
  { title: "Prompt Response", desc: "Timely communication and booking assistance." },
  { title: "Long-Term", desc: "Building trust beyond the transaction." },
];
