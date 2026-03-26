"use client";

import * as React from "react";
import { format, parse } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MonthYearPickerProps {
  /** Value in "MMM yyyy" format, e.g. "Apr 2024" */
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseMonthYear(str?: string): Date | undefined {
  if (!str) return undefined;
  try {
    return parse(str, "MMM yyyy", new Date());
  } catch {
    return undefined;
  }
}

export function MonthYearPicker({
  value,
  onChange,
  placeholder = "Pilih bulan & tahun",
  className,
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false);
  const parsed = parseMonthYear(value);
  const [viewYear, setViewYear] = React.useState(
    parsed?.getFullYear() ?? new Date().getFullYear()
  );

  const handleSelect = (monthIdx: number) => {
    const date = new Date(viewYear, monthIdx, 1);
    onChange(format(date, "MMM yyyy"));
    setOpen(false);
  };

  const selectedMonth = parsed?.getMonth();
  const selectedYear = parsed?.getFullYear();
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-normal text-left cursor-pointer select-none",
              "bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors",
              !value && "text-white/40",
              className
            )}
          />
        }
      >
        <CalendarIcon className="h-4 w-4 text-[#EB8DB5] shrink-0" />
        <span>{value ?? placeholder}</span>
      </PopoverTrigger>

      <PopoverContent
        className="w-64 p-0 bg-[#1a1a1a] border border-white/10 shadow-2xl"
        align="start"
      >
        {/* Year navigation */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <button
            type="button"
            onClick={() => setViewYear((y) => y - 1)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-white font-semibold text-sm">{viewYear}</span>
          <button
            type="button"
            onClick={() => setViewYear((y) => y + 1)}
            disabled={viewYear >= nowYear}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {MONTHS.map((month, idx) => {
            const isSelected = selectedMonth === idx && selectedYear === viewYear;
            const isFuture =
              viewYear > nowYear ||
              (viewYear === nowYear && idx > nowMonth);

            return (
              <button
                key={month}
                type="button"
                onClick={() => !isFuture && handleSelect(idx)}
                disabled={isFuture}
                className={cn(
                  "py-2 px-1 rounded-xl text-sm font-medium transition-all duration-150",
                  isSelected
                    ? "bg-gradient-to-r from-[#EB8DB5] to-[#D4A3C4] text-white shadow-md"
                    : isFuture
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {month}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
