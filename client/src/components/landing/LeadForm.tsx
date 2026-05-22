import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send } from "../ui/icons";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import { api } from "../../lib/api";
import {
  platforms,
  revenueRanges,
  serviceInterests,
  type LeadPayload,
  type Platform,
  type RevenueRange,
  type ServiceInterest
} from "../../types";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  website: string;
  platform: Platform | "";
  revenue_range: RevenueRange | "";
  service_interest: ServiceInterest | "";
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type LeadFormProps = {
  compact?: boolean;
  className?: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  website: "",
  platform: "",
  revenue_range: "",
  service_interest: "",
  message: ""
};

function validate(values: FormValues) {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!/^\d{10}$/.test(values.phone.trim())) errors.phone = "Phone must be exactly 10 digits.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid work email.";
  if (!values.website.trim()) errors.website = "Add your website or marketplace link.";
  if (!values.platform) errors.platform = "Select a primary platform.";
  if (!values.revenue_range) errors.revenue_range = "Select monthly revenue range.";
  if (!values.service_interest) errors.service_interest = "Select your main growth need.";
  if (values.message.length > 600) errors.message = "Message must be under 600 characters.";

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          className="overflow-hidden text-xs font-semibold text-destructive"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function LeadForm({ compact = false, className }: LeadFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: LeadPayload = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        website: values.website.trim(),
        platform: values.platform as Platform,
        revenue_range: values.revenue_range as RevenueRange,
        service_interest: values.service_interest as ServiceInterest,
        message: values.message.trim()
      };

      await api.createLead(payload);
      window.dispatchEvent(new CustomEvent("sellerrocket:lead-created"));
      toast.success("Growth audit requested", {
        description: "Seller Rocket has received the enquiry."
      });
      setValues(initialValues);
    } catch (error) {
      toast.error("Could not submit audit request", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      id="lead-form"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className={className}
    >
      <Card className="relative overflow-hidden rounded-[1.75rem] border-brand-line bg-white shadow-brand-lift">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-deep via-brand-gold to-brand-navy" />
        <CardHeader className={cn("pb-4", compact && "p-5 pb-4")}>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-mutedGold">
              Free growth audit
            </span>
            <span className="text-xs font-semibold text-slate-500">Reviewed within 24 hours</span>
          </div>
          <CardTitle className={cn("text-brand-deep", compact ? "text-2xl" : "text-3xl md:text-4xl")}>
            Request a focused ecommerce audit
          </CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7">
            Share the essentials so Seller Rocket can review your marketplace, storefront, ads, and conversion priorities.
          </CardDescription>
        </CardHeader>
        <CardContent className={cn(compact && "p-5 pt-0")}>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(event) => updateValue("name", event.target.value)}
                  placeholder="Ravi Kumar"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <FieldError id="name-error" message={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(event) => updateValue("email", event.target.value)}
                  placeholder="founder@brand.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={values.phone}
                  onChange={(event) => updateValue("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9944331949"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                <FieldError id="phone-error" message={errors.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Brand website / marketplace link</Label>
                <Input
                  id="website"
                  value={values.website}
                  onChange={(event) => updateValue("website", event.target.value)}
                  placeholder="https://yourbrand.com"
                  autoComplete="url"
                  aria-invalid={Boolean(errors.website)}
                  aria-describedby={errors.website ? "website-error" : undefined}
                />
                <FieldError id="website-error" message={errors.website} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="platform">Primary platform</Label>
                <Select value={values.platform} onValueChange={(value) => updateValue("platform", value as Platform)}>
                  <SelectTrigger id="platform" aria-invalid={Boolean(errors.platform)} aria-describedby={errors.platform ? "platform-error" : undefined}>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="platform-error" message={errors.platform} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue_range">Monthly revenue</Label>
                <Select value={values.revenue_range} onValueChange={(value) => updateValue("revenue_range", value as RevenueRange)}>
                  <SelectTrigger id="revenue_range" aria-invalid={Boolean(errors.revenue_range)} aria-describedby={errors.revenue_range ? "revenue-error" : undefined}>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="revenue-error" message={errors.revenue_range} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_interest">Primary growth need</Label>
                <Select value={values.service_interest} onValueChange={(value) => updateValue("service_interest", value as ServiceInterest)}>
                  <SelectTrigger id="service_interest" aria-invalid={Boolean(errors.service_interest)} aria-describedby={errors.service_interest ? "service-error" : undefined}>
                    <SelectValue placeholder="Select need" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceInterests.map((interest) => (
                      <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="service-error" message={errors.service_interest} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={values.message}
                onChange={(event) => updateValue("message", event.target.value)}
                placeholder="Example: Amazon sales are flat, Shopify conversion is weak, or reporting across marketplaces is unclear."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={compact ? "min-h-[92px]" : "min-h-[118px]"}
              />
              <div className="flex items-center justify-between gap-3">
                <FieldError id="message-error" message={errors.message} />
                <p className="ml-auto text-xs text-slate-500">{values.message.length}/600</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" variant="gold" size="lg" className="rounded-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {isSubmitting ? "Sending request..." : "Request Growth Audit"}
              </Button>
              <p className="text-xs leading-5 text-slate-500">
                No spam. Your details stay inside the Seller Rocket lead system.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
