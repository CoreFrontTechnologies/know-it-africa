import type { RegistrationFormValues } from "@/lib/validators/registration";

export type PaymentStatus = "pending" | "paid" | "failed" | "manually_confirmed";

export type RegistrationRecord = {
  id: string;
  registration_id: string;
  event_title: string | null;
  event_slug: string | null;
  full_name: string;
  date_of_birth: string | null;
  gender: string | null;
  home_address: string | null;
  school_name: string | null;
  class_category: string | null;
  state_of_origin: string | null;
  lga: string | null;
  student_phone: string | null;
  guardian_name: string | null;
  guardian_occupation: string | null;
  guardian_phone: string | null;
  guardian_email: string | null;
  preferred_contact_channel: string | null;
  preferred_class_category: string | null;
  area_of_interest: string | null;
  device_ownership: string | null;
  internet_access: string | null;
  reason_for_joining: string | null;
  payment_status: PaymentStatus;
  payment_reference: string | null;
  flutterwave_transaction_id: string | null;
  amount: number;
  created_at: string;
  updated_at: string;
};

export type RegistrationPreview = RegistrationFormValues & {
  registrationId: string;
  programFee: string;
  paymentStatus: PaymentStatus;
};
