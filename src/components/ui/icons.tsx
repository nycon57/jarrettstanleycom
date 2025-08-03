"use client";

import { Bot, Mic, StopCircle, Loader2, type LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  bot: Bot,
  mic: Mic,
  stop: StopCircle,
  spinner: Loader2,
} as const;
