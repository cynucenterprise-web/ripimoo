"use server";

// Showcase build: the real server action writes to Supabase and is
// private backend code — this is a harmless stub, not a working submit.
export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  _formData: FormData
): Promise<ContactFormState> {
  return {
    status: "error",
    message: "This is a showcase build — form submission is disabled here. Backend code is private.",
  };
}
