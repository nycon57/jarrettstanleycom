"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month,
  defaultMonth,
  onMonthChange,
  ...props
}: CalendarProps) {
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(
    month || defaultMonth || new Date()
  );

  // Generate years from 1940 to current year
  const years = Array.from({ length: new Date().getFullYear() - 1940 + 1 }, (_, i) => 1940 + i).reverse();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
    onMonthChange?.(date);
  };

  const handleMonthSelect = (monthName: string) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(months.indexOf(monthName));
    handleMonthChange(newDate);
  };

  const handleYearSelect = (year: string) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(parseInt(year));
    handleMonthChange(newDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2 items-center">
        <Select
          value={months[selectedMonth.getMonth()]}
          onValueChange={handleMonthSelect}
        >
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-40">
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <Select
          value={selectedMonth.getFullYear().toString()}
          onValueChange={handleYearSelect}
        >
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-40">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
      <DayPicker
        month={selectedMonth}
        onMonthChange={handleMonthChange}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium hidden",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
