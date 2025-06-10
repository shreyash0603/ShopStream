import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login | ShopStream',
  description: 'Login to your ShopStream account.',
};

// This component ensures client-side redirection logic works correctly after login
function LoginPageClientBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


export default function LoginPage() {
  return (
    <LoginPageClientBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
        <Suspense fallback={<div className="text-center">Loading login form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </LoginPageClientBoundary>
  );
}
