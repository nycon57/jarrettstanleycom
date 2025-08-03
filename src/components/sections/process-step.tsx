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
        <div className="hidden md:block absolute top-16 left-1/2 w-full h-px bg-gradient-to-r from-[#9D7AD6]/50 to-transparent" />
      )}
      
      <div className="relative z-10 text-center">
        {/* Icon Circle */}
        <div className="mx-auto mb-6 relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9D7AD6] to-[#4F518C] flex items-center justify-center">
            {icon}
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-[#9D7AD6] flex items-center justify-center">
            <span className="text-sm font-bold text-[#9D7AD6]">{number}</span>
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-signal mb-3">{title}</h3>
        <p className="text-gray-300 max-w-xs mx-auto">{description}</p>
      </div>
    </div>
  );
}