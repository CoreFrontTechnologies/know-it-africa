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
  phonePrimary: "09033222589",
  phoneSecondary: "08067265901",
  email: "support@knowitafrica.com.ng",
  website: "www.knowitafrica.com.ng",
  social: "@Knowitafrica",
  facebook: "https://www.facebook.com/share/1ERDzRU2ge/",
  x: "https://x.com/Knowitafrica",
  venue: "Dependable International School, Dakwa",
  phone: "09033222589 / 08067265901",
  programTitle: "AI & Software Development Bootcamp",
  programFee: "₦10,000",
};

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Bootcamp", href: "/#bootcamp" },
  { label: "Events", href: "/events" },
  { label: "Partnerships", href: "/#partnerships" },
  { label: "Contact", href: "/contact" },
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

export type EventItem = {
  slug: string;
  category: "upcoming" | "past" | "future";
  status: string;
  title: string;
  audience: string;
  summary: string;
  date: string;
  time: string;
  venue: string;
  slots: string;
  priceNotes: string[];
  benefits: string[];
  tone: "blue" | "red" | "navy";
  registrationOpen: boolean;
};

export const events: EventItem[] = [
  {
    slug: "intensive-ai-software-development-youths-2026",
    category: "upcoming",
    status: "Registration Open",
    title: "Intensive AI Software Development Bootcamp",
    audience: "For youths in 5 weeks",
    summary: "A youth-centered AI and software development bootcamp featuring scholarship support, machine learning, agentic AI, content creation, and certification.",
    date: "Starts 13th June, 2026",
    time: "9:00pm Prompt",
    venue: "LEA Primary School, Angwan Fulani",
    slots: "Only 50 slots available",
    priceNotes: ["70% scholarship available"],
    benefits: ["How to create your AI", "Web and app development with AI", "Content creation with AI", "Machine learning", "Agentic AI", "Certificate"],
    tone: "navy",
    registrationOpen: true,
  },
  {
    slug: "intensive-ai-software-development-students-2025",
    category: "past",
    status: "Past Event",
    title: "Intensive AI Software Development Bootcamp",
    audience: "For students in 5 weeks",
    summary: "A student-focused AI and software development bootcamp promoted with a 50-slot cohort, practical benefits, and an early-bird access offer.",
    date: "October 18th, 2025",
    time: "9:00pm Prompt",
    venue: "Dependable International School, Dakwa",
    slots: "Only 50 slots available",
    priceNotes: ["Actual price: ₦50,000", "Early bird: ₦20,000"],
    benefits: ["Certification", "Practical Thinking", "Product Design Skills", "Career Leverage"],
    tone: "blue",
    registrationOpen: false,
  },
  {
    slug: "artificial-intelligence-class-for-kids-dutse",
    category: "past",
    status: "Program Archive",
    title: "Artificial Intelligence Class for Kids",
    audience: "Saturdays only",
    summary: "An intensive software development class for kids designed to empower Africa’s next leaders through practical AI exposure and product skills.",
    date: "5th July – August 2nd",
    time: "Saturdays, 9am",
    venue: "GDSS Dutse",
    slots: "Kids cohort",
    priceNotes: ["Early fee: ₦25,000"],
    benefits: ["Certification", "Practical training", "Product design skills", "Career leverage"],
    tone: "red",
    registrationOpen: false,
  },
  {
    slug: "school-ai-literacy-clubs",
    category: "future",
    status: "In Planning",
    title: "School AI Literacy Clubs",
    audience: "For schools and student communities",
    summary: "A structured termly AI literacy and digital creativity club model for schools that want continuous student exposure beyond one-off bootcamps.",
    date: "Future cohort to be announced",
    time: "School-managed schedule",
    venue: "Partner schools and innovation spaces",
    slots: "School partnership cohorts",
    priceNotes: ["Custom school partnership pricing"],
    benefits: ["AI literacy", "Teacher support", "Student projects", "Innovation culture"],
    tone: "blue",
    registrationOpen: false,
  },
  {
    slug: "ai-for-business-growth-workshop",
    category: "future",
    status: "Coming Soon",
    title: "AI for Business Growth Workshop",
    audience: "For entrepreneurs and business teams",
    summary: "A practical workshop for business owners who want to use AI for productivity, marketing, customer support, content, and operations.",
    date: "Future date to be announced",
    time: "Weekend intensive",
    venue: "Hybrid / partner venue",
    slots: "Limited business cohort",
    priceNotes: ["Corporate and SME pricing to be announced"],
    benefits: ["AI productivity", "Marketing workflows", "Automation", "Content systems"],
    tone: "navy",
    registrationOpen: false,
  },
];

export const upcomingEvents = events.filter((event) => event.category === "upcoming");
export const pastEvents = events.filter((event) => event.category === "past");
export const futureEvents = events.filter((event) => event.category === "future");
export const registrationEvents = events.filter((event) => event.registrationOpen);

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
