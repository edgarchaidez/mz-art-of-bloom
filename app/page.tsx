import Link from "next/link";
import Image from "next/image";
import { getFeaturedArrangements } from "@/lib/arrangements";


export default async function Home() {
  const featured = await getFeaturedArrangements();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-pink-50 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center gap-4" style={{ zIndex: 1 }}>
          <Image src="/logos/logo1.png" alt="Mz Art of Bloom" width={958} height={866} style={{ height: '260px', width: 'auto' }} priority />
          <p className="max-w-xl text-gray-600 text-lg leading-relaxed">
            Beautiful floral arrangements for birthdays, anniversaries, and every
            moment worth remembering. Each piece is made to order — just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/shop"
              className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
            >
              Browse Arrangements
            </Link>
            <Link
              href="/order/custom"
              className="border border-green-500 text-green-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
            >
              Request Custom Order
            </Link>
          </div>

        </div>

        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 sm:w-80 sm:h-80 rounded-full bg-pink-200 opacity-35" style={{ zIndex: 0 }} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-green-200 opacity-35" style={{ zIndex: 0 }} />

        {/* Contact strip */}
        <div className="w-full py-4" style={{ zIndex: 1, position: 'relative' }}>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/>
                  </svg>
                ),
                id: "location",
                label: <>Phoenix, AZ<br className="hidden sm:block" /> (19th Ave & Southern)</>,
                href: undefined,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
                  </svg>
                ),
                id: "phone",
                label: "(480)-749-8548",
                href: "tel:4807498548",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                ),
                id: "email",
                label: "mzartofbloom@gmail.com",
                href: "mailto:mzartofbloom@gmail.com",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.667.072 4.947.085 1.856.601 3.698 1.942 5.039 1.341 1.341 3.183 1.857 5.039 1.942C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.856-.085 3.698-.601 5.039-1.942 1.341-1.341 1.857-3.183 1.942-5.039.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.085-1.856-.601-3.698-1.942-5.039C20.645.673 18.803.157 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                ),
                id: "instagram",
                label: "mzartofbloom_florist",
                href: "https://instagram.com/mzartofbloom_florist",
                target: "_blank",
              },
            ].map(({ icon, label, href, target, id }) => {
              const inner = (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              );
              return href ? (
                <Link key={id} href={href} target={target} className="hover:opacity-80 transition-opacity">
                  {inner}
                </Link>
              ) : (
                <div key={id}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Arrangements */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-script text-5xl text-pink-500 mb-3">Featured Arrangements</h2>
          <p className="text-gray-500 text-sm">
            A glimpse of what we can create for you
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {featured.map((arrangement) => (
            <Link
              key={arrangement.slug}
              href={`/shop/${arrangement.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-pink-50 w-72"
            >
              <div className="relative aspect-square bg-pink-100 overflow-hidden">
                <Image
                  src={arrangement.images[0]}
                  alt={arrangement.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
                    {arrangement.name}
                  </h3>
                  <span className="text-pink-500 font-semibold whitespace-nowrap">
                    ${arrangement.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {arrangement.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {arrangement.occasion.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="border border-green-500 text-green-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
          >
            View All Arrangements
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-script text-5xl text-pink-500 mb-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "01",
                title: "Browse or Request",
                desc: "Choose from our catalog or send a custom inquiry with your vision.",
              },
              {
                step: "02",
                title: "Place Your Order",
                desc: "Secure your arrangement with an easy online checkout.",
              },
              {
                step: "03",
                title: "Receive with Love",
                desc: "Your arrangement is handcrafted and ready for pickup or delivery.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                  {step}
                </span>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-pink-500 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <h2 className="font-script text-5xl text-white">Have something special in mind?</h2>
          <p className="text-pink-100 text-sm">
            We love bringing your floral visions to life. Tell us about your occasion
            and we&apos;ll create something just for you.
          </p>
          <Link
            href="/order/custom"
            className="bg-white text-pink-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
          >
            Request a Custom Order
          </Link>
        </div>
      </section>
    </>
  );
}
