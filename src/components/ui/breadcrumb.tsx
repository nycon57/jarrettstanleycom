"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";function Breadcrumb(




{ ref, ...props }: React.HTMLAttributes<HTMLElement> & {ref?: React.Ref<HTMLElement>;}) {return <nav ref={ref} aria-label="breadcrumb" {...props} />;}
Breadcrumb.displayName = "Breadcrumb";function BreadcrumbList(




{ className, ref, ...props }: React.OlHTMLAttributes<HTMLOListElement> & {ref?: React.Ref<HTMLOListElement>;}) {return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
        className
      )}
      {...props} />);}


BreadcrumbList.displayName = "BreadcrumbList";function BreadcrumbItem(




{ className, ref, ...props }: React.LiHTMLAttributes<HTMLLIElement> & {ref?: React.Ref<HTMLLIElement>;}) {return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props} />);}


BreadcrumbItem.displayName = "BreadcrumbItem";function BreadcrumbLink(




{ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof Link> & {ref?: React.Ref<HTMLAnchorElement>;}) {return (
    <Link
      ref={ref}
      className={cn("hover:text-foreground", className)}
      {...props} />);}


BreadcrumbLink.displayName = "BreadcrumbLink";function BreadcrumbPage(




{ className, ref, ...props }: React.HTMLAttributes<HTMLSpanElement> & {ref?: React.Ref<HTMLSpanElement>;}) {return (
    <span
      ref={ref}
      role="link"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props} />);}


BreadcrumbPage.displayName = "BreadcrumbPage";function BreadcrumbSeparator(




{ className, ref, ...props }: React.HTMLAttributes<HTMLSpanElement> & {ref?: React.Ref<HTMLSpanElement>;}) {return (
    <span
      ref={ref}
      role="presentation"
      className={cn("opacity-50", className)}
      {...props}>

    <ChevronRight className="size-4" />
  </span>);}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator };
