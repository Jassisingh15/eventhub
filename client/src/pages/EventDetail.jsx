import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChair,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTicketAlt,
} from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);
  const handleBooking = async () => {
    // Visitors must be logged in before they can book
    if (!user) {
      navigate("/login");
      return;
    }
    setBookingLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      // Booking happens in two steps:
      // 1) send-otp  -> the server emails a 6-digit verification code
      // 2) /bookings -> the code is verified and the booking request is created
      if (!showOTP) {
        await api.post("/bookings/send-otp");
        setShowOTP(true);
        setSuccessMsg(
          "OTP sent to your email. Please verify to confirm booking.",
        );
      } else {
        await api.post("/bookings", { eventId: event._id, otp });
        setSuccessMsg("Booking requested! Awaiting admin confirmation.");
        setShowOTP(false);
        setEvent({ ...event, availableSeats: event.availableSeats - 1 });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };
  if (loading)
    return (
      <div className="py-20 text-center text-xl font-semibold">Loading...</div>
    );
  if (error && !event)
    return (
      <div className="py-20 text-center text-xl text-red-500">{error}</div>
    );
  const isSoldOut = event.availableSeats <= 0;
  const details = [
    [
      FaMoneyBillWave,
      "Ticket price",
      event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`,
    ],
    [FaChair, "Availability", `${event.availableSeats} / ${event.totalSeats}`],
    [FaCalendarAlt, "Date", new Date(event.date).toLocaleDateString()],
    [FaMapMarkerAlt, "Location", event.location],
  ];
  return (
    <div className="mx-auto max-w-6xl py-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 text-sm font-bold text-[#182335]/65 hover:text-[#ea6249]"
      >
        <FaArrowLeft /> Back to events
      </button>
      <div className="overflow-hidden rounded-[2rem] border border-[#182335]/10 bg-white">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-72 w-full object-cover sm:h-96"
          />
        ) : (
          <div className="flex h-72 items-center justify-center bg-[#182335] font-serif text-5xl text-white/40">
            {event.category}
          </div>
        )}
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_350px] lg:p-12">
          <div>
            <span className="rounded-full bg-[#dce8e4] px-3 py-1 text-xs font-bold uppercase tracking-wide">
              {event.category}
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-[#182335] sm:text-5xl">
              {event.title}
            </h1>
            <div className="mt-7 grid gap-4 border-y border-[#182335]/10 py-6 sm:grid-cols-2">
              <p className="flex items-center gap-3 text-sm text-[#182335]/70">
                <FaCalendarAlt className="text-[#ea6249]" />
                {new Date(event.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="flex items-center gap-3 text-sm text-[#182335]/70">
                <FaMapMarkerAlt className="text-[#ea6249]" />
                {event.location}
              </p>
            </div>
            <section className="mt-9">
              <p className="eyebrow">About this event</p>
              <h2 className="mt-3 text-2xl font-bold">A little more detail</h2>
              <p className="mt-4 leading-8 text-[#182335]/70">
                {event.description}
              </p>
            </section>
            <section className="mt-9 rounded-2xl bg-transparent p-6">
              <p className="eyebrow">Event information</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#182335]/45">
                    Date
                  </p>
                  <p className="mt-1 font-bold">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#182335]/45">
                    Location
                  </p>
                  <p className="mt-1 font-bold">{event.location}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#182335]/45">
                    Organizer
                  </p>
                  <p className="mt-1 font-bold">
                    {event.organizer?.name || "Eventora organizer"}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <aside className="h-fit rounded-2xl bg-[#182335] p-6 text-white shadow-xl lg:sticky lg:top-24">
            <p className="eyebrow !text-[#ff9a85]">Reserve your place</p>
            <h2 className="mt-2 text-2xl font-bold">Booking details</h2>
            <div className="my-7 space-y-5">
              {details.map(([Icon, label, value]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#ff9a85]">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                      {label}
                    </p>
                    <p className="text-sm font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {showOTP && (
              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold">
                  Enter OTP to confirm
                </label>
                <input
                  type="text"
                  required
                  placeholder="6-digit code"
                  className="field text-center font-bold tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
              </div>
            )}
            <button
              onClick={handleBooking}
              disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
              className={`w-full rounded-xl px-5 py-4 font-bold transition ${isSoldOut || (successMsg && !showOTP) ? "cursor-not-allowed bg-white/15 text-white/50" : "bg-[#ea6249] hover:bg-white hover:text-[#182335]"}`}
            >
              {bookingLoading
                ? "Processing..."
                : showOTP
                  ? "Verify OTP & Confirm"
                  : successMsg && !showOTP
                    ? "Request Sent"
                    : isSoldOut
                      ? "Sold Out"
                      : "Confirm Registration"}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
              <FaTicketAlt /> Email verification protected
            </p>
            {error && (
              <p className="mt-4 rounded-lg bg-red-500/15 p-2 text-center text-sm text-red-200">
                {error}
              </p>
            )}
            {successMsg && (
              <p className="mt-4 rounded-lg bg-green-500/15 p-2 text-center text-sm text-green-200">
                {successMsg}
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
export default EventDetail;
