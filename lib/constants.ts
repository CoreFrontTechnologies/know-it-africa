import {
  Bot,
  BriefcaseBusiness,
  Building2,
  Code2,
  Cpu,
  GraduationCap,
  Handshake,
  Lightbulb,
  LucideIcon,
  Medal,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const siteConfig = {
  name: "Know It Africa",
  motto: "Positioning Africans for global relevance.",
  whatsapp: "https://wa.me/2349033222589",
  whatsappDisplay: "+234 903 322 2589",
  email: "info@knowitafrica.com",
  website: "www.knowitafrica.com",
  social: "@knowitafrica",
  venue: "Dependable International School, Dakwa",
  phone: "09033222589 / 08076741457",
  programTitle: "AI & Software Development Bootcamp",
  programFee: "₦10,000",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Bootcamp", href: "#bootcamp" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Contact", href: "#contact" },
];

export type IconCard = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const values: IconCard[] = [
  { title: "Innovation", text: "We help learners think creatively with technology.", icon: Lightbulb },
  { title: "Integrity", text: "We build trust through transparent education and ethical leadership.", icon: ShieldCheck },
  { title: "Excellence", text: "We aim for world-class standards in learning and delivery.", icon: Medal },
  { title: "Inclusion", text: "We open doors for Africans from different backgrounds.", icon: Users },
];

export const programs: IconCard[] = [
  {
    title: "AI Literacy Bootcamp",
    text: "Beginner-friendly AI training for students, young professionals, business owners, and out-of-school learners.",
    icon: Bot,
  },
  {
    title: "Software Development",
    text: "Practical coding foundations that help learners move from technology consumers to creators.",
    icon: Code2,
  },
  {
    title: "Robotics & Emerging Tech",
    text: "Exposure to modern technologies shaping the future of education, innovation, and work.",
    icon: Cpu,
  },
  {
    title: "AI for Business Growth",
    text: "Training for entrepreneurs on using AI for productivity, marketing, content, and operations.",
    icon: BriefcaseBusiness,
  },
];

export const audience = [
  {
    title: "For Students",
    text: "Build confidence with AI, coding, digital creativity, and innovation through beginner-friendly practical training.",
    bullets: ["AI literacy", "Coding foundation", "Practical projects", "Certificate"],
    icon: GraduationCap,
  },
  {
    title: "For Schools",
    text: "Bring AI literacy, software development, and digital transformation programs directly into your school community.",
    bullets: ["School bootcamps", "Student training", "Teacher support", "Digital transformation"],
    icon: School,
  },
  {
    title: "For Businesses",
    text: "Train teams and entrepreneurs to use AI for productivity, marketing, content creation, and business operations.",
    bullets: ["AI productivity", "Business automation", "Marketing support", "Content creation"],
    icon: Building2,
  },
];

export const bootcampTopics = [
  "Introduction to Artificial Intelligence",
  "Getting Started with AI Tools",
  "Prompt Engineering for Beginners",
  "Software Development Foundations",
  "Content Creation with AI",
  "AI for Business and Productivity",
  "No-Code Tools and Automation",
  "Final Practical Project + Certificate",
];

export const registrationSteps = [
  "Student fills the registration form on /registration",
  "Details are saved securely in the database",
  "Student is redirected to Flutterwave checkout",
  "Payment is verified automatically",
  "Admin confirms and sends WhatsApp group access privately",
];

export const partnerTypes = [
  { label: "Schools", icon: School },
  { label: "NGOs", icon: Handshake },
  { label: "Government Agencies", icon: Building2 },
  { label: "Community Groups", icon: Users },
  { label: "Businesses", icon: BriefcaseBusiness },
  { label: "Innovation Hubs", icon: Rocket },
];

export const heroStats = [
  { value: "5 Weeks", label: "Practical Training" },
  { value: "AI + Code", label: "Future Skills" },
  { value: "Certificate", label: "After Completion" },
];

export const registrationFlowCards = [
  ["Page", "/registration standalone page"],
  ["Database", "Supabase registrations table"],
  ["Payment", "Flutterwave checkout"],
  ["Verification", "Server-side transaction verification"],
  ["After Payment", "Success page with WhatsApp confirmation button"],
];

export const decorativeIcons = { Sparkles };
