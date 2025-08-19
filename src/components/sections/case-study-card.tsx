import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  title: string;
  company: string;
  description: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  services: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  className?: string;
}

export function CaseStudyCard({
  title,
  company,
  description,
  results,
  services,
  testimonial,
  className,
}: CaseStudyCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-2xl",
      "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-lilac/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-2xl font-signal mb-2">{title}</CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-400">{company}</CardDescription>
          </div>
          <ArrowUpRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-lilac transition-colors" />
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {services.map((service, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="border-lilac/30 text-gray-700 dark:text-gray-300"
            >
              {service}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6">
        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-2xl font-bold text-lilac">{result.value}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{result.metric}</p>
              <p className="text-xs text-green-500">{result.improvement}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        {testimonial && (
          <div className="border-t border-white/10 pt-6">
            <blockquote className="italic text-gray-700 dark:text-gray-300 mb-4">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lilac to-orchid" />
              <div>
                <p className="font-medium text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}