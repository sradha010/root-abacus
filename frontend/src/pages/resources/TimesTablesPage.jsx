import { useState } from "react";
import CallbackModal from "../../components/forms/CallbackModal";
import MessageButton from "../../components/ui/MessageButton";

const TimesTablesPage = () => {
  const [showModal, setShowModal] = useState(false);

const tables = [
  {
    label: "Times Tables: 1 to 10",
    img: "https://abacusclassesonline.com/images2/times_tables_1_10_corrected.webp",
    download: "https://abacusclassesonline.com/images2/times_tables_1_10_corrected.webp",
    filename: "times-tables-1-to-10.webp",
  },
  {
    label: "Times Tables: 11 to 20",
    img: "https://abacusclassesonline.com/images2/times_tables_11_20.webp",
    download: "https://abacusclassesonline.com/images2/times_tables_11_20.webp",
    filename: "times-tables-11-to-20.webp",
  },
]

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-r from-orange-50 via-white to-gray-100 py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Master the Times Tables with Ease
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Practice and memorize multiplication tables from 1 to 20 with our
            printable charts.
          </p>
          <p className="text-sm text-gray-500 italic">
            Free Resource | Roots Abacus Learning School
          </p>
        </div>
      </section>

      {/* ── TABLES ── */}
      <section className="max-w-5xl mx-auto py-10 px-6 space-y-12">
        {tables.map((table, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-200"
          >
            {/* Header */}
            <div className="flex items-center gap-4 bg-orange-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {table.label}
              </h2>

              <a
                href={table.download}
                download={table.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E87722] hover:text-orange-800 text-sm font-medium inline-flex items-center gap-1 ml-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>
            </div>
            {/* Image */}
            <img
              src={table.img}
              alt={table.label}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </section>

      {/* ── TIPS ── */}
      <section className="py-12 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Tips to Memorize Times Tables Faster
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Start Small",
                desc: "Master tables 1–5 first before moving to larger numbers.",
              },
              {
                step: "2",
                title: "Practice Daily",
                desc: "Spend just 10 minutes a day reciting tables out loud.",
              },
              {
                step: "3",
                title: "Use Patterns",
                desc: "Notice patterns like the 9s trick or even number tables.",
              },
              {
                step: "4",
                title: "Write It Out",
                desc: "Writing tables repeatedly strengthens memory retention.",
              },
              {
                step: "5",
                title: "Use Abacus",
                desc: "Combine table practice with abacus for faster calculation.",
              },
              {
                step: "6",
                title: "Quiz Yourself",
                desc: "Test yourself randomly to build instant recall speed.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-[#E87722] text-white flex items-center justify-center font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-12 px-6 text-center"
        style={{ backgroundColor: "#fef4ea" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Want to Learn Maths the Smart Way?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our Abacus and Vedic Maths classes and see your child's
          calculation speed soar!
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition shadow-lg"
        >
          Book Free Counselling
        </button>
        <p className="text-gray-500 mt-4 text-sm">
          or Call/WhatsApp us at +91 9871151911
        </p>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default TimesTablesPage;
