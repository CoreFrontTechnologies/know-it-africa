"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { createRegistration, type CreateRegistrationResult } from "@/app/registration/actions";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { siteConfig } from "@/lib/constants";
import {
  areaOfInterestOptions,
  classCategoryOptions,
  deviceOwnershipOptions,
  genderOptions,
  internetAccessOptions,
  preferredClassOptions,
  preferredContactOptions,
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validators/registration";

const defaultValues: RegistrationFormValues = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  homeAddress: "",
  schoolName: "",
  classCategory: "",
  stateOfOrigin: "",
  lga: "",
  studentPhone: "",
  guardianName: "",
  guardianOccupation: "",
  guardianPhone: "",
  guardianEmail: "",
  preferredContactChannel: "",
  preferredClassCategory: "",
  areaOfInterest: "",
  deviceOwnership: "",
  internetAccess: "",
  reasonForJoining: "",
};

function FormSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-royal">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function RegistrationForm() {
  const [registrationResult, setRegistrationResult] = useState<Extract<CreateRegistrationResult, { ok: true }> | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: RegistrationFormValues) {
    setRegistrationResult(null);
    setServerError(null);

    const result = await createRegistration(values);

    if (!result.ok) {
      setServerError(result.message);

      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          if (message) {
            setError(field as keyof RegistrationFormValues, { type: "server", message });
          }
        });
      }

      return;
    }

    setRegistrationResult(result);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection eyebrow="Student Information" title="Tell us about the learner">
          <Input label="Full Name" placeholder="Enter student full name" error={errors.fullName?.message} {...register("fullName")} />
          <Input
            label="Date of Birth"
            type="date"
            max={today}
            error={errors.dateOfBirth?.message}
            {...register("dateOfBirth")}
          />
          <Select label="Gender" options={genderOptions} error={errors.gender?.message} {...register("gender")} />
          <Input label="School Name" placeholder="Enter school or institution" error={errors.schoolName?.message} {...register("schoolName")} />
          <Select
            label="Class / Intake Category"
            options={classCategoryOptions}
            error={errors.classCategory?.message}
            {...register("classCategory")}
          />
          <Input label="State of Origin" placeholder="e.g. FCT" error={errors.stateOfOrigin?.message} {...register("stateOfOrigin")} />
          <Input label="Local Government Area" placeholder="Enter LGA" error={errors.lga?.message} {...register("lga")} />
          <div className="md:col-span-2">
            <Input
              label="Home Address"
              placeholder="Enter home address"
              error={errors.homeAddress?.message}
              {...register("homeAddress")}
            />
          </div>
        </FormSection>

        <FormSection eyebrow="Contact Information" title="Parent, guardian, and contact details">
          <Input
            label="Student Phone Number"
            type="tel"
            placeholder="e.g. 09033222589"
            error={errors.studentPhone?.message}
            {...register("studentPhone")}
          />
          <Input
            label="Parent / Guardian Full Name"
            placeholder="Enter parent or guardian name"
            error={errors.guardianName?.message}
            {...register("guardianName")}
          />
          <Input
            label="Parent / Guardian Occupation"
            placeholder="Enter occupation"
            error={errors.guardianOccupation?.message}
            {...register("guardianOccupation")}
          />
          <Input
            label="Parent / Guardian Phone Number"
            type="tel"
            placeholder="e.g. 08076741457"
            error={errors.guardianPhone?.message}
            {...register("guardianPhone")}
          />
          <Input
            label="Parent / Guardian Email"
            type="email"
            placeholder="guardian@example.com"
            error={errors.guardianEmail?.message}
            {...register("guardianEmail")}
          />
          <Select
            label="Preferred Contact Channel"
            options={preferredContactOptions}
            error={errors.preferredContactChannel?.message}
            {...register("preferredContactChannel")}
          />
        </FormSection>

        <FormSection eyebrow="Program Details" title="Choose the best learning fit">
          <Select
            label="Preferred Class Category"
            options={preferredClassOptions}
            error={errors.preferredClassCategory?.message}
            {...register("preferredClassCategory")}
          />
          <Select
            label="Area of Interest"
            options={areaOfInterestOptions}
            error={errors.areaOfInterest?.message}
            {...register("areaOfInterest")}
          />
          <Select
            label="Device Ownership"
            options={deviceOwnershipOptions}
            error={errors.deviceOwnership?.message}
            {...register("deviceOwnership")}
          />
          <Select
            label="Internet Access at Home"
            options={internetAccessOptions}
            error={errors.internetAccess?.message}
            {...register("internetAccess")}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Why are you interested in this program?"
              placeholder="Tell us what you hope to learn or build with AI and software development."
              error={errors.reasonForJoining?.message}
              {...register("reasonForJoining")}
            />
          </div>
        </FormSection>

        {serverError ? (
          <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm font-semibold leading-7 text-red-700">
            <div className="mb-2 flex items-center gap-2 text-base font-black text-red-700">
              <AlertCircle className="h-5 w-5" /> Registration could not be saved
            </div>
            <p>{serverError}</p>
          </div>
        ) : null}

        {registrationResult ? (
          <div className="rounded-[1.5rem] border border-success/20 bg-success/10 p-5 text-sm font-semibold leading-7 text-royal">
            <div className="mb-2 flex items-center gap-2 text-base font-black text-royal">
              <CheckCircle2 className="h-5 w-5 text-success" /> Registration saved successfully
            </div>
            <p>
              Thanks, {registrationResult.studentName}. Your registration has been saved with payment status set to pending.
            </p>
            <div className="mt-4 rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Registration ID</p>
              <p className="mt-1 text-2xl font-black text-royal">{registrationResult.registrationId}</p>
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-black text-royal shadow-gold transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
          {isSubmitting ? "Saving Registration..." : "Save Registration"}
        </button>
      </form>

      <aside className="space-y-5 lg:sticky lg:top-28">
        <div className="rounded-[2rem] bg-royal p-6 text-white shadow-luxury pattern-grid">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">Program Fee</p>
          <p className="mt-3 text-5xl font-black">{siteConfig.programFee}</p>
          <p className="mt-4 text-sm leading-7 text-white/72">
            Covers practical training access, project guidance, certificate processing, and post-payment WhatsApp confirmation.
          </p>
        </div>
        <div className="rounded-[2rem] border border-royal/10 bg-white p-6 shadow-luxury">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-royal">Payment security note</h3>
          <p className="mt-3 text-sm leading-7 text-muted-text">
            Your registration is saved first with payment status set to pending. Flutterwave checkout will be connected in the next phase.
          </p>
        </div>
        <div className="rounded-[2rem] border border-gold/20 bg-gold/10 p-6">
          <p className="text-sm font-black text-primary-blue">Need help?</p>
          <p className="mt-2 text-sm leading-7 text-muted-text">
            Contact Know It Africa on WhatsApp if you need support with registration details.
          </p>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-black text-primary-blue underline decoration-gold decoration-2 underline-offset-4"
          >
            Chat with us
          </a>
        </div>
      </aside>
    </div>
  );
}
