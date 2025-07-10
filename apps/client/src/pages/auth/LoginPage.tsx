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
import { Sparkles, Loader2 } from 'lucide-react';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
          <Sparkles className="w-40 h-40 mb-8 text-purple animate-in spin-in-180 duration-700" />
          <blockquote className="text-lg font-medium text-[var(--color-sidebar-muted-foreground)] text-center max-w-md">
            &ldquo;This platform will completely transforme how you manage your business operations.&rdquo;
            <footer className="mt-4 text-sm text-[var(--color-sidebar-muted)]"></footer>
          </blockquote>
        </div>
      </div>
      {/* Main form area */}
      <div className="flex flex-1 items-center justify-center bg-[var(--color-background)]">
        <div className="w-full max-w-md mx-auto p-6">
          <Card className="border-0 bg-[var(--color-cream)]/80 shadow-2xl backdrop-blur-md group animate-in fade-in zoom-in duration-700">
            <CardHeader className="flex flex-col items-center gap-2">
              <CardTitle className="text-3xl font-bold text-[var(--color-sidebar)]">Login</CardTitle>
              <CardDescription className="text-[var(--color-muted-foreground)] text-base mt-1 text-center">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--color-sidebar)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-white/60 border-[var(--color-muted)] focus:border-[var(--color-sidebar-muted)] text-[var(--color-sidebar)] placeholder:text-[var(--color-muted-foreground)] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={isLoading}
                    className="bg-white/60 border-[var(--color-muted)] focus:border-[var(--color-sidebar-muted)] text-[var(--color-sidebar)] placeholder:text-[var(--color-muted-foreground)] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)] font-medium shadow-xl hover:bg-[var(--color-sidebar-muted)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
                <p className="px-8 text-center text-sm text-[var(--color-muted-foreground)]">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="underline underline-offset-4 hover:text-[var(--color-sidebar-muted)]">
                    Register
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