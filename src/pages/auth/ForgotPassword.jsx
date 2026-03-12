import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import api from '../../api';
import { Input, Button } from '../../components/common';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({ email: '' });

    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      const flatter = parsed.error.flatten();
      setFieldErrors({ email: flatter.fieldErrors.email?.[0] ?? '' });
      return;
    }

    setLoading(true);
    try {
      await api.auth.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Forgot password - Axatech</title></Helmet>
      <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 bg-gray-100 dark:bg-gray-900/80">
        <div className="w-full max-w-[440px]">
          <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Forgot password
              </h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your email and we’ll send you a link to reset your password
              </p>
            </div>

            {sent ? (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 px-4 py-3 text-sm text-green-700 dark:text-green-300 text-center">
                Check your email for a link to reset your password. If it doesn’t appear, check your spam folder.
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 px-4 py-3 text-sm text-red-700 dark:text-red-300" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate autoComplete="off" className="space-y-5">
                  <Input
                    label="Email"
                    type="email"
                    id="forgot-email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    schema={schema.shape.email}
                    error={fieldErrors.email}
                    autoComplete="off"
                  />
                  <Button type="submit" loading={loading} loadingLabel="Sending...">
                    Send reset link
                  </Button>
                </form>
              </>
            )}

            <p className="mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
              Remember your password?{' '}
              <Link to="/login" className="font-semibold text-primary dark:text-secondary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
