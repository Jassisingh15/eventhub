import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import EventCard from "../components/EventCard";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCompass,
  FaMapMarkerAlt,
  FaMinus,
  FaPalette,
  FaPlus,
  FaSearch,
  FaTicketAlt,
  FaUsers,
} from "react-icons/fa";

const categories = [
  { name: "Music", icon: FaTicketAlt },
  { name: "Technology", icon: FaCompass },
  { name: "Business", icon: FaUsers },
  { name: "Sports", icon: FaCalendarAlt },
  { name: "Workshops", icon: FaPalette },
  { name: "Art & Culture", icon: FaMapMarkerAlt },
];

const faqs = [
  [
    "How do I book an event?",
    "Browse the events, open the event you like, and follow the booking steps to reserve your spot.",
  ],
  [
    "Can I cancel my booking?",
    "Yes, you can cancel your booking from your dashboard when cancellation is available.",
  ],
  [
    "How do I find events by category?",
    "Select a category such as Music, Technology, Business, Sports, Workshops, or Art & Culture to filter related events.",
  ],
  [
    "How do I know if my booking is confirmed?",
    'Your booking status is shown in your dashboard. A confirmed booking will be marked as "confirmed".',
  ],
  ["Can I book free events?", "Yes. Free events can be booked without making a payment."],
  [
    "Where can I see my upcoming events?",
    "Open your User Dashboard to view your bookings and upcoming events.",
  ],
  [
    "Can admins create events?",
    "Yes. Admin users can access the Admin Dashboard and create/manage events.",
  ],
];

const Home = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(fetchEvents, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const sectionId = location.hash.replace("#", "");

    if (!sectionId) return;

    const timeoutId = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.hash]);

  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events?search=${search}`);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    setTimeout(() => {
      document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const filteredEvents = events.filter((event) => {
    if (!selectedCategory) return true;

    const category = event.category?.toLowerCase() || "";
    const selected = selectedCategory.toLowerCase();

    // Art & Culture => both Art and Culture
    if (selected === "art & culture") {
      return category.includes("art") || category.includes("culture");
    }

    // Technology => tech / technology
    if (selected === "technology") {
      return category.includes("tech") || category.includes("technology");
    }

    // Workshops
    if (selected === "workshops") {
      return category.includes("workshop");
    }

    return category.includes(selected);
  });

  return (
    <div className="w-full">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-10 sm:px-14 lg:px-16">
        <section className="relative flex min-h-[640px] items-center overflow-hidden pb-16 pt-28 sm:min-h-[680px] sm:pb-20 sm:pt-32 lg:min-h-[720px]">
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-7 lg:grid-cols-2 lg:px-0">
            {/* ================= LEFT CONTENT ================= */}

            <div>
              <p className="eyebrow !text-[#397565]">
                Discover · Connect · Experience
              </p>

              <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.04] text-[#18352D] sm:text-6xl lg:text-7xl">
                Moments worth{" "}
                <em className="font-normal text-[#397565]">showing up</em> for.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-[#18352D]/70">
                Discover experiences, connect with people, and book events that
                leave a mark.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {/* Explore Events */}
                <Link
                  to="/#events"
                  onClick={scrollToEvents}
                  className="button-primary !bg-[#397565] !text-white hover:!bg-[#2E6254]"
                >
                  Explore events
                  <FaArrowRight />
                </Link>

                {/* ADMIN ONLY */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="button-secondary !border-[#18352D]/20 !bg-white/60 !text-[#18352D] hover:!border-[#397565] hover:!text-[#397565]"
                  >
                    Create event
                  </Link>
                )}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <img
                className="h-[350px] w-full rounded-[2rem] object-cover shadow-xl sm:h-[420px]"
                src="https://plus.unsplash.com/premium_photo-1663051210654-0c8a835dad1f?q=80&w=1170&auto=format&fit=crop"
                alt="People enjoying an event"
              />

              <div className="absolute -left-4 top-8 rounded-2xl bg-white/90 px-4 py-3 text-[#18352D] shadow-lg backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#397565]">
                  This week
                </p>

                <p className="mt-1 font-serif text-lg">Find your people</p>
              </div>

              <div className="absolute -bottom-5 right-5 rounded-2xl bg-[#397565] px-4 py-3 text-white shadow-lg">
                <FaTicketAlt className="mb-1" />

                <p className="text-xs font-bold">Your story starts here</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <section id="categories" className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Browse your way</p>

              <h2 className="section-heading mt-3">Start with a feeling.</h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#18352D]/60">
              Explore events by category and find something that matches your
              interests.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => handleCategoryClick(name)}
                className={`group rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                  selectedCategory === name
                    ? "border-[#397565] bg-[#397565] text-white shadow-lg"
                    : "border-[#18352D]/10 bg-white/80 text-[#18352D] backdrop-blur hover:border-[#397565]"
                }`}
              >
                <Icon
                  className={`text-xl ${
                    selectedCategory === name ? "text-white" : "text-[#397565]"
                  }`}
                />

                <p
                  className={`mt-8 text-sm font-bold ${
                    selectedCategory === name ? "text-white" : "text-[#18352D]"
                  }`}
                >
                  {name}
                </p>
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#18352D]/95 px-5 py-3 text-sm text-white backdrop-blur">
              <span>
                Showing events in <strong>{selectedCategory}</strong>
                {selectedCategory === "Art & Culture" && (
                  <span className="ml-1 text-white/60">(Art + Culture)</span>
                )}
              </span>

              <button
                onClick={() => setSelectedCategory("")}
                className="font-bold text-[#BFDCD2] hover:text-white"
              >
                Clear filter
              </button>
            </div>
          )}
        </section>

        {/* =====================================================
            EVENTS
        ====================================================== */}

        <section id="events" className="scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#18352D]/10 pb-6">
            <div>
              <p className="eyebrow">Hand-picked experiences</p>

              <h2 className="section-heading mt-3">Events worth your time.</h2>

              {selectedCategory && (
                <p className="mt-2 text-sm text-[#18352D]/55">
                  Category:{" "}
                  <span className="font-bold text-[#397565]">
                    {selectedCategory}
                  </span>
                </p>
              )}
            </div>

            {/* LOWER SEARCH BAR - KEEP */}
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#397565]" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field !pl-11"
                placeholder="Search by title"
              />
            </div>
          </div>

          {loading ? (
            <p className="py-16 text-center text-[#18352D]/60">
              Loading events...
            </p>
          ) : filteredEvents.length === 0 ? (
            <div className="py-16 text-center">
              <FaCompass className="mx-auto text-4xl text-[#397565]" />

              <p className="mt-4 text-[#18352D]/60">
                {selectedCategory
                  ? `No ${selectedCategory} events found.`
                  : "No events found matching your search."}
              </p>

              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory("")}
                  className="mt-4 font-bold text-[#397565]"
                >
                  View all events
                </button>
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* =====================================================
            ABOUT
        ====================================================== */}

        <section
          id="about"
          className="my-24 border-y border-white/70 bg-white/20 px-6 py-16 backdrop-blur-sm sm:px-10 sm:py-20 lg:px-14"
        >
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:pt-6">
              <p className="eyebrow !text-[#8A6A4A]">How Eventora works</p>

              <h2 className="section-heading mt-3 max-w-md">
              Why Eventora?
              </h2>

              <p className="mt-5 max-w-sm font-serif text-2xl leading-tight text-[#18352D] sm:text-3xl">
                Less planning. More living.
              </p>

              <div className="mt-10 w-full max-w-sm snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2">
                <div className="flex min-w-max gap-3 pr-3">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop"
                    alt="People connecting at an event"
                    className="h-56 w-72 snap-start rounded-3xl object-cover shadow-lg shadow-[#18352D]/10 sm:h-64 sm:w-80"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000&auto=format&fit=crop"
                    alt="Friends enjoying an event"
                    className="h-56 w-72 snap-start rounded-3xl object-cover shadow-lg shadow-[#18352D]/10 sm:h-64 sm:w-80"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
                    alt="People sharing a memorable experience"
                    className="h-56 w-72 snap-start rounded-3xl object-cover shadow-lg shadow-[#18352D]/10 sm:h-64 sm:w-80"
                  />
                </div>
              </div>
            </div>

            <div className="border-l border-[#397565]/25 pl-6 sm:pl-10">
              <div className="space-y-1">
              {[
                ["01", "Discover", "Find events that feel made for you.", FaCompass],
                ["02", "Book", "Reserve your place in a few simple steps.", FaTicketAlt],
                [
                  "03",
                  "Experience",
                  "Show up, meet people, make it memorable.",
                  FaUsers,
                ],
              ].map(([number, title, text, Icon]) => (
                <div key={number} className="group py-6 first:pt-0 last:pb-0 transition duration-300 hover:translate-x-1">
                  <div className="flex items-start gap-5">
                    <span className="font-serif text-5xl leading-none text-[#397565]/80">{number}</span>

                    <div className="pt-1">
                      <div className="flex items-center gap-3">
                        <Icon className="text-[#8A6A4A]" />
                        <h3 className="text-lg font-bold text-[#18352D]">{title}</h3>
                      </div>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-[#18352D]/65">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-[#397565]/15 pt-7">
            <p className="max-w-xl border-l-2 border-[#8A6A4A] pl-4 font-serif text-2xl leading-tight text-[#18352D] sm:text-3xl">
              “The best plans are the ones you actually make.”
            </p>

            <Link
              to="/#events"
              onClick={scrollToEvents}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#397565] transition hover:text-[#18352D]"
            >
              See what’s on
              <FaArrowRight />
            </Link>
          </div>
          </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="my-24 border-y border-white/70 bg-white/25 px-6 py-16 backdrop-blur-sm sm:px-10 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow !text-[#8A6A4A]">Frequently asked questions</p>
              <h2 className="section-heading mt-3">Everything you need to know.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#18352D]/65">
                A few helpful answers to make finding and booking your next event simple.
              </p>
            </div>

            <div className="mt-12 border-t border-[#397565]/20">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={question} className="border-b border-[#397565]/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-bold text-[#18352D] transition hover:text-[#397565] sm:text-lg"
                    >
                      {question}
                      {isOpen ? (
                        <FaMinus className="shrink-0 text-sm text-[#397565]" />
                      ) : (
                        <FaPlus className="shrink-0 text-sm text-[#397565]" />
                      )}
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-sm leading-6 text-[#18352D]/65">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="mb-10 flex flex-col gap-8 rounded-[2rem] bg-[#18352D] px-8 py-12 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
          <p className="eyebrow !text-[#BFDCD2]">Make room for something new</p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Your next great experience is waiting.
          </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6 lg:shrink-0">
            <Link
              to="/#events"
              onClick={scrollToEvents}
              className="button-primary !bg-[#397565] !text-white hover:!bg-white hover:!text-[#18352D]"
            >
              Explore events
            </Link>

            {/* ADMIN ONLY */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm font-bold text-white underline underline-offset-8 transition hover:text-[#BFDCD2]"
              >
                Create event
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
