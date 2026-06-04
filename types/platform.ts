export type EventStatus = "draft" | "published" | "registration_open" | "registration_closed" | "completed" | "archived";

export type EventRecord = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  category: string | null;
  status: EventStatus;
  price: number;
  currency: string;
  start_date: string | null;
  end_date: string | null;
  registration_deadline: string | null;
  venue: string | null;
  delivery_mode: string | null;
  whatsapp_group_note: string | null;
  certificate_available: boolean;
  featured: boolean;
  max_students: number | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type EventModuleRecord = {
  id: string;
  event_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  activity: string | null;
  created_at: string;
};

export type TestimonialRecord = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  image_url: string | null;
  rating: number;
  status: string;
  created_at: string;
};

export type PartnerRecord = {
  id: string;
  name: string;
  type: string | null;
  logo_url: string | null;
  website_url: string | null;
  status: string;
  created_at: string;
};

export type ActivityLogRecord = {
  id: string;
  admin_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};
