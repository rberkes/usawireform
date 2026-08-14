import { cx } from "@/lib/cx";
import { Container } from "./ui";

const testimonials = [
  {
    quote:
      "USA Wire Form delivered exactly what we needed — seat frames that met our tolerances on the first run. Their CNC precision saved us two rounds of tooling revisions.",
    author: "Manufacturing Engineer",
    company: "Tier 1 Automotive Supplier",
    industry: "Automotive",
  },
  {
    quote:
      "We switched to USA Wire Form for our cable tray production. The 3D CNC capability means complex paths that used to require manual assembly now come off the machine ready to weld.",
    author: "Operations Director",
    company: "Data Center Infrastructure Co.",
    industry: "Data Centers",
  },
  {
    quote:
      "Their pricing is genuinely competitive. We got quotes from three shops — USA Wire Form beat them all, and the quality has been consistent across six production runs.",
    author: "Purchasing Manager",
    company: "Industrial Equipment Manufacturer",
    industry: "Manufacturing",
  },
];

const stats = [
  { value: "50+", label: "Years of industry experience" },
  { value: "100+", label: "Wire form products in catalog" },
  { value: "16", label: "Industries served" },
  { value: "4–14mm", label: "Diameter capability range" },
];

const certifications = [
  { name: "ISO 9001:2015", description: "Quality Management" },
  { name: "ITAR Registered", description: "Defense & Aerospace" },
  { name: "RoHS Compliant", description: "Environmental Standards" },
];

export function SocialProof({ className }: { className?: string }) {
  return (
    <section className={cx("border-y border-line bg-inset", className)}>
      <Container className="py-16 sm:py-24">
        <div className="text-center">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Trusted by manufacturers
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            50+ years forming wire for American industry
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            From automotive seat frames to data center cable trays — precision
            CNC wire forming backed by decades of expertise.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-3xl text-copper sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative border border-line bg-background p-6"
            >
              <QuoteIcon className="absolute right-4 top-4 h-8 w-8 text-line" />
              <p className="relative text-sm leading-7 text-muted">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="font-medium text-foreground">
                  {testimonial.author}
                </p>
                <p className="mt-1 text-sm text-muted">{testimonial.company}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-copper">
                  {testimonial.industry}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-line pt-12">
          {certifications.map((cert) => (
            <div key={cert.name} className="text-center">
              <p className="font-mono text-sm font-medium text-foreground">
                {cert.name}
              </p>
              <p className="mt-1 text-xs text-muted">{cert.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection({ className }: { className?: string }) {
  return (
    <section className={cx("mt-16", className)}>
      <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
        What customers say
      </p>
      <h2 className="mt-3 text-2xl tracking-tight">
        Trusted by manufacturers across industries
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.author}
            className="border border-line p-5"
          >
            <p className="text-sm leading-6 text-muted">
              "{testimonial.quote}"
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="text-xs text-muted">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 32 32"
      aria-hidden
    >
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  );
}
