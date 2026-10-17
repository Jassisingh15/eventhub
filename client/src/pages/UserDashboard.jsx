import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaTicketAlt,
  FaTimesCircle,
} from "react-icons/fa";
const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [user, navigate]);
  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };
  const cancelBooking = async (bookingId) => {
    if (
      window.confirm("Are you sure you want to cancel this booking request?")
    ) {
      try {
        await api.delete(`/bookings/${bookingId}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };
  if (loading)
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  const confirmedBookingCount = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;
  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-[2rem] bg-[#182335] p-7 text-white sm:p-10">
        <p className="eyebrow !text-[#ff9a85]">Your Eventora space</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl">
              Hello, {user?.name?.split(" ")[0]}.
            </h1>
            <p className="mt-3 text-white/65">
              Your plans, tickets, and good ideas—together in one place.
            </p>
          </div>
          <Link to="/" className="button-primary !bg-[#ea6249]">
            Discover events <FaArrowRight />
          </Link>
        </div>
      </section>
      <div className="my-7 grid gap-4 sm:grid-cols-3">
        <div className="surface p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#182335]/45">
            All bookings
          </p>
          <p className="mt-2 font-serif text-4xl">{bookings.length}</p>
        </div>
        <div className="surface p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#182335]/45">
            Confirmed
          </p>
          <p className="mt-2 font-serif text-4xl text-[#ea6249]">
            {confirmedBookingCount}
          </p>
        </div>
        <div className="surface p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#182335]/45">
            Upcoming
          </p>
          <p className="mt-2 font-serif text-4xl">
            {
              bookings.filter(
                (booking) =>
                  booking.eventId && new Date(booking.eventId.date) >= new Date(),
              ).length
            }
          </p>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Your calendar</p>
          <h2 className="section-heading mt-2">Upcoming bookings</h2>
        </div>
      </div>
      {bookings.length === 0 ? (
        <div className="surface mt-7 p-12 text-center">
          <FaTicketAlt className="mx-auto text-4xl text-[#ea6249]" />
          <p className="mt-4 text-lg text-[#182335]/60">
            You haven’t booked any events yet.
          </p>
          <Link to="/" className="button-primary mt-6">
            Browse events
          </Link>
        </div>
      ) : (
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {bookings.map((booking) => (
            <article key={booking._id} className="surface p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${booking.status === "confirmed" ? "bg-[#dce8e4] text-[#182335]" : booking.status === "cancelled" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}
                  >
                    {booking.status}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">
                    {booking.eventId?.title || "Event unavailable"}
                  </h3>
                </div>
                <FaTicketAlt className="text-xl text-[#ea6249]" />
              </div>
              {booking.eventId && (
                <div className="mt-5 space-y-2 text-sm text-[#182335]/65">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#ea6249]" />
                    {new Date(booking.eventId.date).toLocaleDateString()}
                  </p>
                  <p>
                    Amount:{" "}
                    <b className="text-[#182335]">
                      {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
                    </b>
                  </p>
                </div>
              )}
              <div className="mt-6 flex items-center justify-between border-t border-[#182335]/10 pt-4">
                {booking.eventId && booking.status !== "cancelled" ? (
                  <>
                    <Link
                      to={`/events/${booking.eventId._id}`}
                      className="text-sm font-bold text-[#182335] hover:text-[#ea6249]"
                    >
                      View event
                    </Link>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="flex items-center gap-1 text-sm font-bold text-red-500"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-[#182335]/50">Booking cancelled</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
export default UserDashboard;
