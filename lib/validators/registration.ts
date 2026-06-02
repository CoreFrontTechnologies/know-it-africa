import { z } from "zod";

const requiredText = (label: string, min = 2) =>
  z.string().trim().min(min, `${label} is required.`);

const requiredSelect = (label: string) =>
  z.string().trim().min(1, `Please select ${label.toLowerCase()}.`);

export const genderOptions = ["Male", "Female"] as const;
export const classCategoryOptions = [
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SS 1",
  "SS 2",
  "SS 3",
  "Undergraduate",
  "Graduate",
  "Working Professional",
  "Business Owner",
  "Out of School",
] as const;
export const preferredContactOptions = ["WhatsApp", "SMS", "Email"] as const;
export const preferredClassOptions = ["Beginner", "Intermediate", "Advanced"] as const;
export const areaOfInterestOptions = [
  "Artificial Intelligence",
  "Software Development",
  "Robotics",
  "Content Creation with AI",
  "No-Code Business Tools",
] as const;
export const deviceOwnershipOptions = ["Laptop", "Tablet", "Phone", "None"] as const;
export const internetAccessOptions = ["Yes", "No"] as const;

export const registrationSchema = z.object({
  fullName: requiredText("Full name", 3),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date of birth."),
  gender: requiredSelect("gender"),
  homeAddress: requiredText("Home address", 5),
  schoolName: requiredText("School name", 2),
  classCategory: requiredSelect("class / intake category"),
  stateOfOrigin: requiredText("State of origin", 2),
  lga: requiredText("Local Government Area", 2),
  studentPhone: requiredText("Student phone number", 7).regex(
    /^[+\d][\d\s-]{6,18}$/,
    "Enter a valid student phone number.",
  ),
  guardianName: requiredText("Parent / guardian full name", 3),
  guardianOccupation: requiredText("Parent / guardian occupation", 2),
  guardianPhone: requiredText("Parent / guardian phone number", 7).regex(
    /^[+\d][\d\s-]{6,18}$/,
    "Enter a valid parent / guardian phone number.",
  ),
  guardianEmail: z
    .string()
    .trim()
    .min(1, "Parent / guardian email is required.")
    .email("Enter a valid parent / guardian email address."),
  preferredContactChannel: requiredSelect("preferred contact channel"),
  preferredClassCategory: requiredSelect("preferred class category"),
  areaOfInterest: requiredSelect("area of interest"),
  deviceOwnership: requiredSelect("device ownership"),
  internetAccess: requiredSelect("internet access at home"),
  reasonForJoining: requiredText("Reason for joining", 12),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
