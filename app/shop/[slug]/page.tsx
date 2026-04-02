import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArrangement, getAllSlugs, getSiteSettings, SHIPPING_FEE } from "@/lib/arrangements";
import ImageGallery from "@/components/ImageGallery";

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const arrangement = await getArrangement(slug);
  if (!arrangement) return {};
  return {
    title: arrangement.name,
    description: arrangement.description,
    openGraph: {
      title: arrangement.name,
      description: arrangement.description,
      images: arrangement.images[0] ? [arrangement.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((a) => ({ slug: a.slug }));
}

export default async function ArrangementPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const [arrangement, settings] = await Promise.all([getArrangement(slug), getSiteSettings()]);

  if (!arrangement) notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-pink-500 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-600">{arrangement.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ImageGallery images={arrangement.images} name={arrangement.name} />

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {/* Material badge */}
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  arrangement.material === "artificial"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {arrangement.material === "artificial" ? "Artificial · Ships available" : "Natural · Local pickup only"}
              </span>
              {arrangement.occasion.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">{arrangement.name}</h1>
            <p className="text-3xl text-pink-500 font-bold mt-2">${arrangement.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{arrangement.description}</p>

          {/* Fulfillment info */}
          <div className="bg-pink-50 rounded-2xl p-5 text-sm text-gray-600 leading-relaxed flex flex-col gap-1">
            <p className="font-medium text-gray-800">Made to order</p>
            {arrangement.material === "artificial" ? (
              <p>
                This arrangement can be <strong>shipped within the US</strong> (+${arrangement.shippingFee ?? SHIPPING_FEE}, arrives in 4–5 business days) or
                picked up locally within 24 hours. You&apos;ll choose at checkout.
              </p>
            ) : (
              <p>
                This is a <strong>fresh floral arrangement</strong> available for{" "}
                <strong>local pickup or delivery</strong> within 24 hours. We&apos;ll reach out to coordinate.
              </p>
            )}
          </div>

          {/* Order Button */}
          {settings.acceptingOrders && arrangement.available !== false ? (
            <Link
              href={`/order/checkout?slug=${arrangement.slug}`}
              className="bg-pink-500 text-white text-center px-8 py-4 rounded-full font-medium hover:bg-pink-600 transition-colors"
            >
              Order This Arrangement — ${arrangement.price}
            </Link>
          ) : (
            <div className="bg-gray-100 text-gray-500 text-center px-8 py-4 rounded-full font-medium cursor-not-allowed">
              {!settings.acceptingOrders ? settings.unavailableMessage : "This arrangement is currently unavailable."}
            </div>
          )}

          <Link
            href="/order/custom"
            className="text-center text-sm text-green-600 hover:underline"
          >
            Want something custom? Send an inquiry →
          </Link>
        </div>
      </div>
    </div>
  );
}
