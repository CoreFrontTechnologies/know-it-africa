import type { RegistrationFormValues } from "@/lib/validators/registration";

export type RegistrationPreview = RegistrationFormValues & {
  programFee: string;
  paymentStatus: "not_connected";
};
