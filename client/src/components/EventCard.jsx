import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  const availableSeatPercentage = event.totalSeats
    ? Math.max(0, (event.availableSeats / event.totalSeats) * 100)
    : 0;
  return (
    <article className="group surface overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-[#dbe2df]">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-3xl text-[#182335]/40">
            {event.category || "Eventora"}
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#182335] shadow-sm">
          {event.category || "Event"}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-[#182335] px-3 py-1.5 text-sm font-bold text-white">
          {event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`}
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-4 text-xl font-bold leading-snug text-[#182335]">
          {event.title}
        </h3>
        <div className="space-y-2 text-sm text-[#182335]/65">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#ea6249]" />
            {new Date(event.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#ea6249]" />
            {event.location}
          </p>
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-[#182335]/8">
          <div
            className="h-full rounded-full bg-[#ea6249]"
            style={{ width: `${availableSeatPercentage}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-[#182335]/55">
          <span>{event.availableSeats} seats available</span>
          <span>{event.totalSeats} total</span>
        </div>
        <Link
          to={`/events/${event._id}`}
          className="mt-5 flex items-center justify-between border-t border-[#182335]/10 pt-4 text-sm font-bold text-[#182335] transition group-hover:text-[#ea6249]"
        >
          View details <FaArrowRight />
        </Link>
      </div>
    </article>
  );
};

export default EventCard;
