'use client'
import { useState } from 'react';
import InputField from './modalComponents/InputField';
import { signIn } from '../_lib/auth/authService';

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/invalid-email': 'Invalid email.',
  'auth/too-many-requests': 'Too many attempts. Try again later.',
  'auth/network-request-failed': 'Could not reach the server.',
};

export default function LoginForm() {
  const [ error, setError ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const email: string = event.target['login-email'].value.trim();
    const password: string = event.target['login-password'].value;

    if (!email || !password) {
      setError('Enter email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
    } catch (err: any) {
      setError(ERROR_MESSAGES[err?.code] || 'Could not sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="uppercase font-semibold text-4xl">References</h1>
      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm mt-8 space-y-2">
        <InputField typeTag="email" nameTag="login-email" placeholderTag="Email" />
        <InputField typeTag="password" nameTag="login-password" placeholderTag="Password" />
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <button type="submit" disabled={loading}
          className="border border-pale-800 w-10/12 h-10 rounded self-center
          text-lg text-pale-200 bg-pale-800 disabled:opacity-60"
        >{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </main>
  );
}
