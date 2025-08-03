"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ResourceDownloadData, resourceDownloadSchema } from "@/lib/validations/contact";
import { downloadResource } from "@/app/actions/email";
import { Download, Loader2, FileText } from "lucide-react";

interface ResourceDownloadFormProps {
  resourceId: string;
  resourceTitle: string;
  resourceDescription?: string;
  className?: string;
}

export function ResourceDownloadForm({ 
  resourceId, 
  resourceTitle, 
  resourceDescription, 
  className = "" 
}: ResourceDownloadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResourceDownloadData>({
    resolver: zodResolver(resourceDownloadSchema),
    defaultValues: {
      resourceId,
    },
  });

  const onSubmit = async (data: ResourceDownloadData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName || '');
      formData.append('company', data.company || '');
      formData.append('resourceId', resourceId);
      
      // Add tracking data
      formData.append('userAgent', navigator.userAgent);
      formData.append('referrer', document.referrer);
      formData.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

      const result = await downloadResource(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Download link sent to your email!");
        setIsDownloaded(true);
        
        // Open download link if available
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank');
        }
        
        reset();
      }
    } catch (error) {
      console.error("Error downloading resource:", error);
      toast.error("Failed to process download. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDownloaded) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Download Sent!</h3>
        <p className="text-green-700 text-sm mb-4">
          Check your email for the download link to "{resourceTitle}"
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsDownloaded(false)}
        >
          Download Another Resource
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg p-6 shadow-lg border border-lilac/10 ${className}`}>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-lilac/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download className="w-6 h-6 text-lilac" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Download: {resourceTitle}</h3>
        {resourceDescription && (
          <p className="text-sm text-muted-foreground">{resourceDescription}</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="John"
              className="bg-background"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Doe"
              className="bg-background"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@company.com"
            className="bg-background"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            {...register("company")}
            placeholder="Your company name"
            className="bg-background"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-lilac hover:bg-lilac/90" 
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Resource
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          By downloading, you agree to receive occasional emails with valuable AI marketing insights. 
          You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}