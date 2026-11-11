'use client'
import { useAuth } from '../_lib/auth/AuthProvider';
import LoginForm from './LoginForm';

// Renders the app only for a signed-in user, so no data is requested
// before authentication.
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <LoginForm />;

  return <>{children}</>;
}
