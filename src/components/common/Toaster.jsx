import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '../../context/ThemeContext';

/**
 * App-wide toast container (Minimals-style snackbar UI).
 * Clean bordered card, subtle shadow. Supports default, success, error, warning, info, and promise (loading → success/error).
 */
const baseToast =
  'rounded-[10px] border bg-white shadow-[0_2px_12px_rgba(18,62,115,0.08)] dark:bg-gray-800 dark:shadow-lg';

export default function Toaster() {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      position="top-right"
      theme={theme === 'dark' ? 'dark' : 'light'}
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: `${baseToast} border-border dark:border-gray-600`,
          title: 'text-text dark:text-gray-200 font-medium',
          description: 'text-text-muted dark:text-gray-400 text-sm',
          success: `${baseToast} border-success/60`,
          error: `${baseToast} border-error/60`,
          warning: `${baseToast} border-warning/60`,
          info: `${baseToast} border-info/60`,
          loading: `${baseToast} border-border dark:border-gray-500`,
        },
      }}
    />
  );
}
