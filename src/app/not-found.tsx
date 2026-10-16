import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-28 sm:py-36">
      <BrandMark className="size-12" />
      <p className="mt-8 font-mono text-xs tracking-[0.16em] text-arc uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl text-ink">This path didn&apos;t continue.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you were looking for doesn&apos;t exist or has moved.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
        <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
    </Container>
  );
}
