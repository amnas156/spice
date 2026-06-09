import { Award, Flame, Leaf, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    title: "Direct Sourcing",
    description:
      "We work with growers in Wayanad and Idukki so the freshest crop reaches your kitchen with fewer middle steps.",
    icon: Leaf,
  },
  {
    title: "Zero Adulteration",
    description:
      "No fillers, artificial colors, starches, or mineral oils. Every pack is built around clean, honest ingredients.",
    icon: ShieldCheck,
  },
  {
    title: "Cool Grinding",
    description:
      "Controlled milling protects color, aroma, curcumin, and volatile oils that high-heat grinding can destroy.",
    icon: Flame,
  },
  {
    title: "Traditional Oil",
    description:
      "Cold-pressed coconut oil keeps its natural aroma and purity without refining agents or shortcuts.",
    icon: Award,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-cream py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Purity You Can Feel & Taste"
          description="A premium product starts with disciplined sourcing, careful processing, and simple promises kept well."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="surface p-6">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-medium text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/65">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
