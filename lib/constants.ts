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
  email: "contact@knowitafrica.com.ng",
  secondaryEmail: "knowitafrica@gmail.com",
  website: "www.knowitafrica.com.ng",
  social: "@Knowitafrica",
  facebook: "https://www.facebook.com/share/1ERDzRU2ge/",
  x: "https://x.com/Knowitafrica",
  venue: "Venue announced per event",
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
    venue: "Venue announced per event",
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

];

export const upcomingEvents = events.filter((event) => event.category === "upcoming");
export const pastEvents = events.filter((event) => event.category === "past");
export const futureEvents = events.filter((event) => event.category === "future");
export const registrationEvents = events.filter((event) => event.registrationOpen);

export const registrationSteps = [
  "Choose the event you want to attend",
  "Fill in the learner and guardian details",
  "Continue to secure online payment",
  "Receive your registration ID after checkout",
  "Our team confirms access and sends next steps privately",
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
  ["Choose", "Select the event or bootcamp you want to join"],
  ["Register", "Share learner and guardian details"],
  ["Pay", "Complete payment securely online"],
  ["Confirm", "Receive your registration ID"],
  ["Access", "Get private joining instructions after confirmation"],
];

export const decorativeIcons = { Sparkles };
