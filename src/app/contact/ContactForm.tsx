"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Banner from "@/components/ui/Banner";
import { CheckCircleIcon } from "@/components/ui/icons";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/5 p-8 text-center">
        <CheckCircleIcon className="mx-auto h-8 w-8 text-teal" />
        <p className="mt-3 text-lg font-medium text-ink">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Input id="fullName" name="fullName" label="Full Name" required />
      <Input id="email" name="email" type="email" label="Registered Email" required />
      <Input id="whatsappNumber" name="whatsappNumber" label="WhatsApp Number (optional)" />
      <Textarea id="message" name="message" label="Message" required rows={5} />

      {state.status === "error" && (
        <Banner variant="error">{state.message}</Banner>
      )}

      <Button type="submit" variant="primary" size="lg" isLoading={pending} className="w-full">
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
