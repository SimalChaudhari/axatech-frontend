export default function ContactSuccess({ title = 'Thank you', message }) {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-[520px] mx-auto px-5 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 animate-[home-fadeInUp_0.5s_ease-out_0.28s_both]">
          {message || 'Your enquiry has been submitted. We will get back to you soon.'}
        </p>
      </div>
    </section>
  );
}
