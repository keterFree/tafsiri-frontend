import { Suspense } from 'react';
import AuthForm from '../components/authform';

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading login form...</div>}>
        <AuthForm />
      </Suspense>
    </main>
  );
}
