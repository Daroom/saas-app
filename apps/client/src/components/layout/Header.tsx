import { Link } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@saas-app/ui';
import { LogOut, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in fade-in slide-in-from-top duration-500">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2 transition-colors hover:opacity-90">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <span className="hidden font-bold text-xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent sm:inline-block animate-in fade-in duration-700">
              SaaS App
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary-100 transition-all hover:ring-primary-200">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary-100 text-primary-900">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 animate-in zoom-in-90 duration-200" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4 text-primary-500" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive-500 focus:text-destructive-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 animate-in fade-in duration-500">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 