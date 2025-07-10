import { Link } from "react-router-dom";
import { Button } from "@saas-app/ui";
import { LayoutDashboard, Users, FileText, Key, Sparkles, PanelLeftClose, PanelLeft } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "@saas-app/ui";

interface SidebarProps {
  onCollapse?: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  };

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-muted/10 px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple" />
          <span className={cn(
            "font-bold text-xl text-sidebar-foreground whitespace-nowrap transition-all duration-300",
            isCollapsed && "opacity-0 w-0 overflow-hidden"
          )}>
            Admin Panel
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-sidebar-foreground hover:bg-sidebar-muted/10"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 p-2">
        <Link to="/">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-muted/10",
              isCollapsed && "justify-center"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className={cn("transition-all duration-300", isCollapsed && "hidden")}>
              Dashboard
            </span>
          </Button>
        </Link>
        <Link to="/customers">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-muted/10",
              isCollapsed && "justify-center"
            )}
          >
            <Users className="h-5 w-5" />
            <span className={cn("transition-all duration-300", isCollapsed && "hidden")}>
              Customers
            </span>
          </Button>
        </Link>
        <Link to="/invoices">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-muted/10",
              isCollapsed && "justify-center"
            )}
          >
            <FileText className="h-5 w-5" />
            <span className={cn("transition-all duration-300", isCollapsed && "hidden")}>
              Invoices
            </span>
          </Button>
        </Link>
        <Link to="/licenses">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-muted/10",
              isCollapsed && "justify-center"
            )}
          >
            <Key className="h-5 w-5" />
            <span className={cn("transition-all duration-300", isCollapsed && "hidden")}>
              Licenses
            </span>
          </Button>
        </Link>
      </div>

      {/* Upgrade Banner */}
      {/* <div className={cn("p-4 transition-all duration-300", isCollapsed && "hidden")}>
        <div className="rounded-lg bg-sidebar-muted p-4">
          <div className="flex items-center gap-4">
            <Sparkles className="h-8 w-8 text-sidebar-muted-foreground" />
            <div>
              <h3 className="font-medium text-sidebar-foreground">Upgrade to Pro</h3>
              <p className="text-sm text-sidebar-muted-foreground">
                Get more features and benefits
              </p>
            </div>
          </div>
          <Button className="mt-4 w-full bg-sidebar-muted-foreground text-sidebar hover:bg-sidebar-muted-foreground/90">
            Upgrade Now
          </Button>
        </div>
      </div> */}
    </div>
  );
} 