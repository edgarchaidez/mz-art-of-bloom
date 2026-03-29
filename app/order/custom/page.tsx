import CustomOrderForm from "./CustomOrderForm";

export default function CustomOrderPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="font-script text-6xl text-pink-500 mb-3">Custom Order</h1>
        <p className="text-gray-500">
          Tell us about your vision and we&apos;ll create something beautiful just for you.
          We&apos;ll follow up within 24 hours to confirm details.
        </p>
      </div>
      <CustomOrderForm />
    </div>
  );
}
