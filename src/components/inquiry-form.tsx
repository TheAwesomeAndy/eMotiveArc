"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Construction, Loader2 } from "lucide-react";
import Link from "next/link";
import { submitInquiry } from "@/app/actions";
import { buttonClass } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  LIMITS,
  NEXT_STEPS,
  initialInquiryState,
  isFreeMail,
  looksLikeSecret,
  validateInquiry,
  type InquiryErrors,
  type InquiryFields,
  type NextStep,
} from "@/lib/inquiry";
import type { LeadDeliveryMode } from "@/lib/config";
import { trackEvent } from "@/lib/track";

const empty: InquiryFields = {
  name: "",
  email: "",
  company: "",
  website: "",
  message: "",
  nextStep: "audit",
};

const noopSubscribe = () => () => {};
const readNextParam = () => {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next in NEXT_STEPS ? next : null;
};

const ORDER: (keyof InquiryFields)[] = ["name", "email", "company", "website", "message", "nextStep"];

export function InquiryForm({
  deliveryMode,
  sourcePath,
  discoveryCallUrl,
}: {
  deliveryMode: LeadDeliveryMode;
  sourcePath: string;
  discoveryCallUrl?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
  const [values, setValues] = useState<InquiryFields>(empty);
  const [clientErrors, setClientErrors] = useState<InquiryErrors>({});
  const [seenState, setSeenState] = useState(state);
  const [chosenStep, setChosenStep] = useState<string | null>(null);
  const startedAtRef = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Preselect the next step from CTA links like /contact?next=discovery.
  const urlStep = useSyncExternalStore(noopSubscribe, readNextParam, () => null);
  const nextStep = chosenStep ?? urlStep ?? "audit";

  // Server validation errors replace client ones when a new result arrives.
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "invalid") setClientErrors(state.errors);
  }

  // Timing check for anti-spam: record when the visitor started.
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // Move focus to the result so screen reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "sent") trackEvent("Inquiry Sent");
    if (state.status === "invalid") {
      const first = ORDER.find((k) => state.errors[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    statusRef.current?.focus();
  }, [state]);

  const errors = clientErrors;

  const set = (key: keyof InquiryFields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (clientErrors[key]) setClientErrors((e) => ({ ...e, [key]: undefined }));
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateInquiry({ ...values, nextStep });
    setClientErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const data = new FormData(event.currentTarget);
    if (startedAtRef.current) data.set("startedAt", String(startedAtRef.current));
    startTransition(() => formAction(data));
  }

  if (state.status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl border border-arc/30 bg-arc-soft/60 p-8 outline-none"
      >
        <CheckCircle2 className="size-7 text-arc" aria-hidden />
        <h3 className="mt-4 font-display text-2xl text-ink">Inquiry received</h3>
        <p className="mt-2 leading-relaxed text-ink-3">{state.message}</p>
        <Link href="/sample-report" className={buttonClass("secondary", "mt-6")}>
          Read about the sample report
        </Link>
      </div>
    );
  }

  const showFreeMailHint =
    !errors.email && values.email.includes("@") && isFreeMail(values.email);
  const showSecretWarning = looksLikeSecret(values.message);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={deliveryMode === "preview" ? `${uid}-preview` : undefined}
      className="space-y-6"
    >
      {deliveryMode === "preview" ? (
        <div
          id={`${uid}-preview`}
          className="flex gap-3 rounded-2xl border border-signal/30 bg-signal-soft/50 p-4 text-sm leading-relaxed text-ink-3"
        >
          <Construction className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
          <p>
            <strong className="font-medium text-ink">Preview mode.</strong> This form works, but
            our inbox isn&apos;t connected yet, so submissions aren&apos;t delivered. You&apos;ll
            see a clear notice after you submit, and your text won&apos;t be cleared.
          </p>
        </div>
      ) : null}

      <fieldset>
        <legend className="text-sm font-medium text-ink">What would you like to do?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(Object.keys(NEXT_STEPS) as NextStep[]).map((key) => (
            <label
              key={key}
              className={cn(
                "flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors",
                nextStep === key
                  ? "border-ink bg-paper shadow-[0_0_0_1px_var(--color-ink)]"
                  : "border-line bg-paper/60 hover:border-ink/40",
              )}
            >
              <input
                type="radio"
                name="nextStep"
                value={key}
                checked={nextStep === key}
                onChange={(e) => setChosenStep(e.target.value)}
                className="mt-1 accent-[var(--color-ink)]"
              />
              <span>
                <span className="block text-[0.95rem] font-medium text-ink">
                  {key === "audit" ? "Request an audit" : "Have a discovery conversation"}
                </span>
                <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted">
                  {key === "audit"
                    ? "Founding-client audit, $750 fixed fee."
                    : "An introductory call about your character and goals."}
                </span>
              </span>
            </label>
          ))}
        </div>
        <FieldError id={`${uid}-nextStep`} message={errors.nextStep} />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Name"
          name="name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
          maxLength={LIMITS.name}
          required
        />
        <Field
          id={`${uid}-email`}
          label="Work email"
          name="email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          maxLength={LIMITS.email}
          required
          hint={
            showFreeMailHint
              ? "A work address helps us understand your product, but this is fine too."
              : undefined
          }
        />
        <Field
          id={`${uid}-company`}
          label="Company"
          name="company"
          value={values.company}
          onChange={set("company")}
          error={errors.company}
          autoComplete="organization"
          maxLength={LIMITS.company}
          optional
        />
        <Field
          id={`${uid}-website`}
          label="Product website"
          name="website"
          type="text"
          inputMode="url"
          placeholder="example.com"
          value={values.website}
          onChange={set("website")}
          error={errors.website}
          autoComplete="url"
          maxLength={LIMITS.website}
          optional
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={`${uid}-message`} className="text-sm font-medium text-ink">
            Your character or continuity problem
          </label>
          <span
            className={cn(
              "font-mono text-[0.7rem]",
              values.message.length > LIMITS.message ? "text-signal" : "text-faint",
            )}
            aria-live="polite"
          >
            {values.message.length}/{LIMITS.message}
          </span>
        </div>
        <p id={`${uid}-message-help`} className="mt-1 text-[0.82rem] leading-snug text-muted">
          A few sentences is plenty. What is the character, and what have you noticed? Please
          don&apos;t include API keys, private transcripts, or confidential system prompts.
        </p>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          maxLength={LIMITS.message + 200}
          required
          aria-required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={cn(
            `${uid}-message-help`,
            errors.message && `${uid}-message-error`,
            showSecretWarning && `${uid}-message-secret`,
          ) || undefined}
          className={inputClass(Boolean(errors.message), "mt-2 resize-y")}
        />
        {showSecretWarning ? (
          <p
            id={`${uid}-message-secret`}
            className="mt-2 flex items-center gap-2 text-[0.82rem] text-signal"
          >
            <AlertTriangle className="size-4" aria-hidden />
            This looks like it may contain an API key. Please remove it before sending.
          </p>
        ) : null}
        <FieldError id={`${uid}-message-error`} message={errors.message} />
      </div>

      {/* Anti-spam: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-fax`}>Leave this field empty</label>
        <input id={`${uid}-fax`} type="text" name="fax_number" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="sourcePath" value={sourcePath} />

      {state.status === "preview" || state.status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className={cn(
            "flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed outline-none",
            state.status === "preview"
              ? "border-signal/40 bg-signal-soft/70 text-ink"
              : "border-red-300 bg-red-50 text-red-900",
          )}
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>{state.message}</p>
        </div>
      ) : null}
      {state.status === "invalid" ? (
        <p role="alert" className="text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className={buttonClass("primary", "px-6 py-3.5 disabled:opacity-70")}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              {nextStep === "discovery" ? "Request a conversation" : "Send audit inquiry"}
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
        <p className="text-[0.78rem] leading-snug text-muted sm:max-w-xs sm:text-right">
          We use your details only to reply to this inquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>

      {discoveryCallUrl ? (
        <p className="text-sm text-muted">
          Prefer to pick a time?{" "}
          <a href={discoveryCallUrl} className="text-ink underline underline-offset-4" target="_blank" rel="noopener">
            Book a discovery call
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

function inputClass(invalid: boolean, extra?: string) {
  return cn(
    "block w-full rounded-xl border bg-paper px-4 py-3 text-[0.97rem] text-ink placeholder:text-faint",
    "transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15",
    invalid ? "border-red-400" : "border-line hover:border-ink/30",
    extra,
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.82rem] text-red-800">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  name,
  value,
  onChange,
  error,
  hint,
  optional,
  required,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  name: keyof InquiryFields;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  inputMode?: "url" | "email" | "text";
}) {
  const describedBy = cn(error && `${id}-error`, hint ? `${id}-hint` : null) || undefined;
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional ? <span className="text-xs font-normal text-faint">Optional</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputClass(Boolean(error), "mt-2")}
        {...rest}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.8rem] text-muted">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
