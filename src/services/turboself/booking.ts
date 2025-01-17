import type { TurboselfAccount } from "@/stores/account/types";
import type { BookingDay, BookingTerminal } from "../shared/Booking";

export const getBookingWeek = async (account: TurboselfAccount, weekNumber?: number): Promise<BookingTerminal[]> => {
  const bookings = await account.authentication.session.getBookings(weekNumber);

  return bookings.map((booking) => ({
    account,
    id: booking.id,
    week: booking.week,
    from: booking.from,
    to: booking.to,
    terminalLabel: booking.terminal.name,
    days: booking.days.map((day) => ({
      id: day.id,
      canBook: day.canBook,
      date: day.date,
      message: day.message,
      booked: day.booked,
    })),
  }));
};

export const bookDay = async (account: TurboselfAccount, id: string, date: Date, booked: boolean): Promise<BookingDay> => {
  const bookedDay = await account.authentication.session.bookMeal(id, date.getDay(), booked ? 1 : 0);
  console.log(bookedDay);
  return {
    id: bookedDay.id,
    canBook: bookedDay.canBook,
    date: bookedDay.date,
    message: bookedDay.message,
    booked: bookedDay.booked,
  };
};