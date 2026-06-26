"use client";

import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isBefore,
  startOfDay,
} from "date-fns";
import { id } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Txt } from "../atoms/text";

interface InteractiveCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  minDate?: Date;
}

// Available time slots (e.g. 08:00 to 16:00 per hour)
const AVAILABLE_TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  minDate = new Date(),
}) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(minDate));

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Txt variant="h4" weight="bold" className="text-gray-800">
          {format(currentMonth, "MMMM yyyy", { locale: id })}
        </Txt>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 }); // Start on Monday

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-sm text-gray-500 py-2">
          {format(addDays(startDate, i), dateFormat, { locale: id }).substring(0, 3)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isDisabled = isBefore(day, startOfDay(minDate));
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`p-1 flex justify-center items-center h-12 cursor-pointer transition-all ${
              !isCurrentMonth ? "text-gray-300" : isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50 rounded-lg"
            }`}
            onClick={() => {
              if (!isDisabled && isCurrentMonth) {
                onSelectDate(cloneDay);
                // Reset time when date changes
                if (selectedDate && !isSameDay(cloneDay, selectedDate)) {
                  onSelectTime("");
                }
              }
            }}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                isSelected
                  ? "bg-red-primary text-white font-bold shadow-md shadow-red-primary/30"
                  : ""
              }`}
            >
              {formattedDate}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-6">{rows}</div>;
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    return (
      <div className="mt-6 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-red-primary" />
          <Txt variant="h5" weight="bold" className="text-gray-800">
            Pilih Waktu
          </Txt>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {AVAILABLE_TIMES.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-red-primary text-white shadow-md shadow-red-primary/30 border-transparent"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-red-primary hover:text-red-primary"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderTimeSlots()}
    </div>
  );
};
