"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Toast } from "@/components/ui/Toast";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "submitting" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const missingField = Object.entries(formData).find(([, value]) => !value.trim());
    if (missingField) {
      setError("Please fill in every field before sending your enquiry.");
      setStatus("error");
      return;
    }

    const text = `Hi JADEED Spices, I have a contact enquiry:
Name: ${formData.name.trim()}
Email: ${formData.email.trim()}
Phone: ${formData.phone.trim()}
Subject: ${formData.subject.trim()}
Message: ${formData.message.trim()}`;

    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setFormData(initialForm);
    setStatus("success");
    window.setTimeout(() => setStatus("idle"), 3200);
  };

  return (
    <section id="contact" className="bg-paper py-16 sm:py-24">
      {status === "success" ? <Toast message="Your enquiry is ready in WhatsApp." /> : null}
      {status === "error" ? <Toast message={error} tone="error" /> : null}

      <div className="container-page">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Orders, Wholesale & Support"
          description="Send a quick enquiry, ask about bulk orders, or reach the store directly through WhatsApp."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="surface overflow-hidden">
            <iframe
              title="JADEED Rice and Flour Mill map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.117180126588!2d76.20487741481504!3d11.234335391997236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63a48ab459219%3A0x3f865860de7e8960!2sJADEED%20RICE%20AND%20FLOUR%20MILL!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
              className="h-[24rem] w-full border-0 grayscale-[15%] lg:h-[36rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="space-y-5">
            <form onSubmit={handleSubmit} className="surface grid gap-5 p-5 sm:p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" value={formData.name} onChange={(value) => updateField("name", value)} autoComplete="name" />
                <Field label="Email Address" type="email" value={formData.email} onChange={(value) => updateField("email", value)} autoComplete="email" />
                <Field label="Phone Number" type="tel" value={formData.phone} onChange={(value) => updateField("phone", value)} autoComplete="tel" />
                <Field label="Subject" value={formData.subject} onChange={(value) => updateField("subject", value)} />
              </div>
              <label className="grid gap-2">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-charcoal/50">
                  Message
                </span>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className="min-h-32 resize-y border border-charcoal/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Tell us what you need..."
                />
              </label>
              <Button type="submit" disabled={status === "submitting"} className="w-full">
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === "submitting" ? "Preparing Message" : "Send Message"}
              </Button>
              <p className="flex items-start gap-2 text-xs leading-6 text-charcoal/55">
                {status === "error" ? (
                  <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
                ) : (
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                )}
                We open WhatsApp with your message prefilled so you can review it before sending.
              </p>
            </form>

            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={Phone} label="Phone" value={siteConfig.phone} />
              <ContactCard icon={Mail} label="Email" value={siteConfig.email} />
              <ContactCard icon={MapPin} label="Address" value={siteConfig.address} helper={siteConfig.mapCoordinates} />
              <ContactCard icon={Clock} label="Working Hours" value={siteConfig.hours} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-charcoal/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="min-h-11 border border-charcoal/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </label>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="surface flex gap-4 p-5">
      <div className="grid h-10 w-10 shrink-0 place-items-center bg-gold/10 text-gold">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-charcoal/45">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold leading-6 text-charcoal">{value}</p>
        {helper ? <p className="mt-1 text-xs text-gold">{helper}</p> : null}
      </div>
    </div>
  );
}
