import Card from "@/components/ui/Card";

const STEPS = [
  {
    step: 1,
    title: "Choose a plan and pay once through Paddle",
    description:
      "Paddle is our secure merchant of record. Your total price is shown before you pay, and no card details are stored on our servers.",
  },
  {
    step: 2,
    title: "Your plan is active immediately",
    description:
      "Your account is credited with the full daily allowance for your chosen period right away. There's no recurring billing and no auto-renewal.",
  },
  {
    step: 3,
    title: "Reminder email before it ends — you keep your documents",
    description:
      "We email you before your period finishes. If you don't renew, your account returns to Free (2 updates/day) and every saved document stays in your account.",
  },
];

export default function PricingPaymentSteps() {
  return (
    <section aria-labelledby="payment-process-heading" className="space-y-6">
      <div className="text-center">
        <h2 id="payment-process-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
          How payment works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
          Simple one-time purchases — no hidden recurring charges.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {STEPS.map((step) => (
          <Card key={step.step} padding="md" className="flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-paper-soft px-2.5 py-1 text-xs font-mono font-bold text-ink-soft">
              Step 0{step.step}
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
