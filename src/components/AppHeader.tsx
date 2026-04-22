import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  rightSlot?: ReactNode;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
}

export const AppHeader = ({ rightSlot, className, containerClassName, logoClassName }: AppHeaderProps) => {
  return (
    <header className={cn("border-b border-border bg-card/80 backdrop-blur-sm", className)}>
      <div className={cn("container mx-auto flex items-center justify-between h-16 px-4", containerClassName)}>
        <Link to="/" className={cn("font-heading text-xl font-bold text-foreground", logoClassName)}>
          B-<span className="text-primary">TECH</span>
        </Link>
        {rightSlot ? <div className="flex items-center gap-2">{rightSlot}</div> : null}
      </div>
    </header>
  );
};
