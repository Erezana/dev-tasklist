import Link from "next/link";
import BookingList from "./AllBookings";
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
const Home: React.FC = async () => {
  const bookings = await getBookings();
  return (
    <div className="flex text-center justify-center items-center h-screen ">
      <div className="w-1/2 border bg-gray-50 shadow-2xl border-gray-300 rounded-lg p-4">
        <h1 className="mt-8 text-xl">Current booking count: {bookings.length}</h1>
        <BookingList />
        <Link href="addBooking">
          <button className="bg-gray-500 hover:bg-gray-600 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Book here</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
