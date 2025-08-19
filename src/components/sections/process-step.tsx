import { cn } from "@/lib/utils";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

export function ProcessStep({
  number,
  title,
  description,
  icon,
  isLast = false,
  className,
}: ProcessStepProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Connection line */}
      {!isLast && (
        <div className="hidden md:block absolute top-20 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-lilac/50 to-lilac/20" />
      )}
      
      <div className="relative z-10 text-center">
        {/* Number badge above icon */}
        <div className="mx-auto mb-4 w-8 h-8 rounded-full border-2 border-lilac/50 bg-background flex items-center justify-center">
          <span className="text-sm font-bold text-lilac">{number}</span>
        </div>
        
        {/* Icon Circle */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-lilac/80 to-orchid/80 flex items-center justify-center shadow-lg">
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-signal mb-3 uppercase tracking-wide">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm max-w-xs mx-auto">{description}</p>
      </div>
    </div>
  );
}