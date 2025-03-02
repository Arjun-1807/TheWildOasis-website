"use client";

import { useReservation } from "./ReservationContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      {/* Side-by-Side Date Pickers */}
      <div className="flex flex-row justify-center gap-6 py-6">
        <div>
          <p className="text-center font-semibold text-lg mb-2">Start Date</p>
          <DatePicker
            selected={range.from}
            onChange={(date) => setRange({ from: date, to: range.to })}
            selectsStart
            startDate={range.from}
            endDate={range.to}
            minDate={new Date()}
            inline
          />
        </div>
        <div>
          <p className="text-center font-semibold text-lg mb-2">End Date</p>
          <DatePicker
            selected={range.to}
            onChange={(date) => setRange({ from: range.from, to: date })}
            selectsEnd
            startDate={range.from}
            endDate={range.to}
            minDate={range.from}
            maxDate={new Date().setFullYear(new Date().getFullYear() + 5)}
            inline
          />
        </div>
      </div>

      {/* PRICING INFO */}
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
