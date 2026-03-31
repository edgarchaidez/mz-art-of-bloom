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
              className="border border-pink-400 text-pink-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
            >
              Request Custom Order
            </Link>
          </div>

        </div>

        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 sm:w-80 sm:h-80 rounded-full bg-pink-200 opacity-35" style={{ zIndex: 0 }} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-green-200 opacity-35" style={{ zIndex: 0 }} />

        {/* Contact strip */}
        <div className="w-full py-3" style={{ zIndex: 1, position: 'relative' }}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">📍 Phoenix, AZ</span>
            <span className="flex items-center gap-1.5">📞 480-749-8548</span>
            <span className="flex items-center gap-1.5">📧 mzartofbloom@gmail.com</span>
            <Link href="https://instagram.com/mzartofbloom" target="_blank" className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">📸 Instagram</Link>
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
            className="border border-pink-400 text-pink-600 px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
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
                <span className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">
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
