"use client";

import * as React from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  toDate?: Date;
  fromDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pilih tanggal",
  className,
  toDate,
  fromDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left cursor-pointer select-none",
              "bg-white/5 border border-white/10 hover:bg-white/10 transition-colors",
              value ? "text-white" : "text-white/40",
              className
            )}
          />
        }
      >
        <CalendarIcon className="h-4 w-4 text-[#EB8DB5] shrink-0" />
        <span>
          {value ? format(value, "d MMMM yyyy", { locale: localeId }) : placeholder}
        </span>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 bg-[#1a1a1a] border border-white/10 shadow-2xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => { onChange(d); setOpen(false); }}
          toDate={toDate}
          fromDate={fromDate}
          className="rounded-2xl text-white"
          classNames={{
            months: "flex flex-col",
            month: "space-y-2",
            caption: "flex justify-center pt-1 relative items-center text-white",
            caption_label: "text-sm font-medium text-white",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse",
            head_row: "flex",
            head_cell: "text-white/40 rounded-md w-9 font-normal text-xs",
            row: "flex w-full mt-1",
            cell: "h-9 w-9 text-center text-sm p-0 relative",
            day: "h-9 w-9 p-0 font-normal text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all",
            day_selected: "bg-gradient-to-br from-[#EB8DB5] to-[#D4A3C4] text-white hover:from-[#EB8DB5] hover:to-[#D4A3C4]",
            day_today: "border border-[#A8D1E7]/50 text-[#A8D1E7]",
            day_outside: "text-white/20",
            day_disabled: "text-white/20 cursor-not-allowed",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
