import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./LoginForm').then(mod => mod.default), { ssr: false });

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}