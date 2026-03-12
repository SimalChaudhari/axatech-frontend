export default function HomeLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-[60vh] py-8 px-8">
      <div
        className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"
        aria-hidden
      />
      <p className="text-gray-500 mt-0 animate-[home-fadeInUp_0.5s_ease-out_0.3s_both]">
        Loading...
      </p>
    </div>
  );
}
