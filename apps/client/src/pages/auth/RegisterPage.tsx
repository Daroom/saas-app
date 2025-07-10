import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
} from '@saas-app/ui';
import { useAuth } from '../../hooks/useAuth';
import { Sparkles } from 'lucide-react';

export function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    await register(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-background)]">
      {/* Side panel (image/brand) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)] p-12 relative">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <Sparkles className="h-8 w-8 text-[var(--color-sidebar-muted)]" />
          SaaS App
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <Sparkles className="w-32 h-32 mb-8 text-purple animate-in spin-in-180 duration-700" />
          <blockquote className="text-lg font-medium text-[var(--color-sidebar-muted-foreground)] text-center max-w-md">
            &ldquo;Join thousands of businesses that trust our platform for their operations.&rdquo;
            <footer className="mt-4 text-sm text-[var(--color-sidebar-muted)]">John Smith</footer>
          </blockquote>
        </div>
      </div>
      {/* Main form area */}
      <div className="flex flex-1 items-center justify-center bg-[var(--color-background)]">
        <div className="w-full max-w-md mx-auto p-6">
          <Card className="border-0 bg-[var(--color-cream)]/80 shadow-2xl backdrop-blur-md group animate-in fade-in zoom-in duration-700">
            <CardHeader className="flex flex-col items-center gap-2">
              <CardTitle className="text-3xl font-bold text-[var(--color-sidebar)]">Create an account</CardTitle>
              <CardDescription className="text-[var(--color-muted-foreground)] text-base mt-1 text-center">
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--color-sidebar)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/60 border-[var(--color-muted)] focus:border-[var(--color-sidebar-muted)] text-[var(--color-sidebar)] placeholder:text-[var(--color-muted-foreground)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[var(--color-sidebar)]">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/60 border-[var(--color-muted)] focus:border-[var(--color-sidebar-muted)] text-[var(--color-sidebar)] placeholder:text-[var(--color-muted-foreground)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[var(--color-sidebar)]">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white/60 border-[var(--color-muted)] focus:border-[var(--color-sidebar-muted)] text-[var(--color-sidebar)] placeholder:text-[var(--color-muted-foreground)]"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)] font-medium shadow-xl hover:bg-[var(--color-sidebar-muted)] transition-all duration-300" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Register'}
                </Button>
                <p className="px-8 text-center text-sm text-[var(--color-muted-foreground)]">
                  Already have an account?{' '}
                  <Link to="/login" className="underline underline-offset-4 hover:text-[var(--color-sidebar-muted)]">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
} 