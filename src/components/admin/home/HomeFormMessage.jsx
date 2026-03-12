export default function HomeFormMessage({ message }) {
  if (!message) return null;
  const isSuccess = message === 'Saved successfully.';
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-900/20 dark:text-green-300'
          : 'border-red-200 bg-red-50 text-red-800 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-300'
      }`}
    >
      {message}
    </div>
  );
}
