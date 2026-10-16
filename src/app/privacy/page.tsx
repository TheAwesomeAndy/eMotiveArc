import type { Metadata } from "next";
import Link from "next/link";
import { DraftNotice, PageHeader, Prose } from "@/components/page-header";
import { Container } from "@/components/ui";
import { analytics, getLeadDeliveryMode, publicContactEmail } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How the EmotiveArc website handles the information you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const analyticsOn = Boolean(analytics.provider);
  // While no delivery provider is configured, the form neither sends nor stores
  // anything, so this page must not tell readers to rely on it.
  const formDelivers = getLeadDeliveryMode() !== "preview";
  return (
    <>
      <PageHeader eyebrow="Policies" title="Website privacy notice" />
      <Container className="py-14 sm:py-16">
        <DraftNotice>
          This notice is a preliminary draft for founder and legal review. It describes how this
          website is built today. It isn&apos;t a contract and may change before launch.
        </DraftNotice>
        <div className="mt-10">
          <Prose>
            <h2>Who we are</h2>
            <p>
              EmotiveArc provides evaluation services for AI characters and conversational agents.
              Formal company and contact details will be added here before this site is published.
            </p>

            <h2>What we collect through this website</h2>
            <p>
              <strong>Inquiry form.</strong> If you send an inquiry, we receive what you type: your
              name, work email, company, product website, your description, and your preferred
              next step. We also record the page you submitted from and the time.
            </p>
            {formDelivers ? null : (
              <p data-testid="privacy-form-preview">
                <strong>While this site is in preview,</strong> the inquiry form doesn&apos;t send
                or store anything. Submissions are discarded after you see a notice saying so, and
                we receive none of what you type.
              </p>
            )}
            <p>
              <strong>Technical data.</strong> Like most websites, our hosting provider may keep
              short-lived server logs, such as IP address, browser type, and pages requested. We
              use your IP address briefly to limit repeated form submissions.
            </p>
            <p>
              <strong>Analytics.</strong>{" "}
              {analyticsOn
                ? "We use a privacy-focused analytics service that counts visits without setting cookies."
                : "This site doesn't currently use analytics, advertising trackers, or tracking cookies."}
            </p>
            <p>
              Please don&apos;t send API keys, private user transcripts, confidential system
              prompts, or other sensitive information through the form.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To reply to your inquiry and discuss a possible engagement.</li>
              <li>To keep the website secure and protect the form from spam.</li>
            </ul>
            <p>We don&apos;t sell your information or use it for advertising.</p>

            <h2>Who we share it with</h2>
            <p>
              We use service providers to run this site and deliver inquiries to us, such as our
              hosting provider and an email or form-delivery service. They process information on
              our behalf. The specific providers will be listed here once they&apos;re confirmed.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep inquiry messages for as long as needed to respond and to follow up on a
              possible engagement. A specific retention period will be set before launch.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct, or delete the information you sent us. Depending
              on where you live, you may have additional rights under local privacy law.
            </p>

            <h2>Contact</h2>
            <p>
              {publicContactEmail ? (
                <>
                  Questions about this notice can go to{" "}
                  <a href={`mailto:${publicContactEmail}`}>{publicContactEmail}</a>.
                </>
              ) : (
                <>
                  A monitored privacy contact address will be listed here before launch.{" "}
                  {formDelivers ? (
                    <>
                      Until then, you can reach us through the{" "}
                      <Link href="/contact">contact form</Link>.
                    </>
                  ) : (
                    <>
                      There isn&apos;t a working way to contact us through this website yet: the
                      contact form is in preview mode and doesn&apos;t deliver messages.
                    </>
                  )}
                </>
              )}
            </p>
            <p>
              Client audit data is covered separately. See{" "}
              <Link href="/data-handling">client data handling</Link>.
            </p>
          </Prose>
        </div>
      </Container>
    </>
  );
}
