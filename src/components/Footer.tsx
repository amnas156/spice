import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal py-14 text-white/72">
      <div className="container-page">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.7fr_1fr]">
          <div className="space-y-5">
            <a href="#home" className="inline-flex">
              <Image
                src="/images/jadeed-logo-light.svg"
                alt={`${siteConfig.name} home`}
                width={134}
                height={42}
                className="h-10 w-auto"
              />
            </a>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold">
              Pure • Natural • Authentic
            </p>
            <p className="max-w-sm text-sm leading-7 text-white/55">
              Premium Kerala spices and coconut oil crafted for homes that value real taste,
              purity, and tradition.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Navigation</h2>
            <ul className="mt-5 grid gap-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Contact Store</h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/35">Address</dt>
                <dd className="mt-1 leading-6 text-white/58">{siteConfig.address}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/35">Phone</dt>
                <dd className="mt-1 text-white/58">{siteConfig.phone}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/35">Email</dt>
                <dd className="mt-1 text-white/58">{siteConfig.email}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs font-semibold uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
