import React from "react";
import Link from "next/link";

type Booking = {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
};

// Get all the bookings first, in order to be able to display them
async function getBookings() {
  const res = await fetch("http://host.docker.internal:5000/api/bookings", {
    cache: "no-store",
    mode: "no-cors",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// Component that shows all the bookings
const BookingList: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="text-3xl	font-bold text-center mt-16">All Bookings</h1>
      {
        <div className=" flex flex-col items-center mt-8 ">
          {bookings.map((booking: Booking) => (
            <div
              key={booking.id}
              className="shadow-lg border-4 p-3 items-center transform transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/booking/${booking.id}`}>
                <p>
                  Booking on {booking.date} starting at {booking.start_time}
                </p>
              </Link>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default BookingList;
