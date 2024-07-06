import React from "react";
import Link from "next/link";
// Get booking by id
async function getBookingById(id: number) {
  const res = await fetch(`http://host.docker.internal:5000/booking/${id}`, {
    cache: "no-store",
    mode: "no-cors",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch booking with id: ${id}`);
  }

  return res.json();
}

// Component that shows a booking
const Booking = async ({ params }) => {
  const booking = await getBookingById(params.Id);
  return (
    <div className="flex flex-col items-center mt-8">
      <p className="text-xl">
        This Booking is with {booking.doctor_name} For {booking.service} and it
        ends on {booking.end_time}
      </p>
      <Link href="/">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Booking;
