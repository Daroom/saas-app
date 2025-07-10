import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:shadow-glow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow hover:shadow-glow hover:bg-destructive/90",
        outline:
          "border-2 border-muted bg-transparent shadow hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow hover:shadow-glow hover:bg-secondary/90",
        ghost: 
          "hover:bg-primary/5 hover:text-primary",
        link: 
          "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-primary text-white shadow hover:shadow-glow hover:opacity-90",
        glass:
          "bg-background/80 backdrop-blur-sm border border-muted/20 text-foreground shadow hover:shadow-glow hover:bg-background/90",
        soft:
          "bg-primary/10 text-primary hover:bg-primary/20",
        glow:
          "bg-primary/20 text-primary shadow-glow hover:shadow-glow-secondary hover:bg-primary/30",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        bounce: "animate-in fade-in zoom-in duration-300 hover:scale-105",
        slide: "animate-in fade-in slide-in-from-bottom-2 duration-300",
        fade: "animate-in fade-in duration-300",
        glow: "animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 