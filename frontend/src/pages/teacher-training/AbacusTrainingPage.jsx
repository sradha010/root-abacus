import { useState } from "react";
import CallbackModal from "../../components/forms/CallbackModal";
import MessageButton from "../../components/ui/MessageButton";
import {
  Monitor,
  GraduationCap,
  Globe,
  UserCheck,
  Briefcase,
  Users,
  Home,
  BookOpen,
  Building,
  School,
  ShieldCheck,
  Heart,
  IndianRupee,
  Clock,
  Zap,
  Video,
  FileText,
  Smartphone,
  Award,
  Timer,
  Calendar,
  Brain,
  Rocket,
  BarChart2,
  Headphones,
  MapPin,
  CheckCircle,
  Info,
  Lock,
} from "lucide-react";

// ── data ────────────────────────────────────────────────────────────────────
const highlights = [
  {
    feature: "Training Fees",
    detail: null,
    custom: (
      <div>
        <p className="line-through text-gray-400 text-sm">
          INR 45000 (56% Off)
        </p>
        <p className="text-[#E87722] font-bold">
          Effective Price: INR 19900 / USD 275
        </p>
        <p className="text-gray-400 text-xs italic">
          Inclusive of taxes – Limited Period Offer
        </p>
      </div>
    ),
  },
  { feature: "Duration", detail: "Self-paced. Finish in as little as 40 days" },
  { feature: "Levels Covered", detail: "8 Levels" },
  {
    feature: "Method of Training",
    detail: "Easy-to-follow online abacus training video modules",
  },
  { feature: "Practice Method", detail: "Software-based online practice" },
  { feature: "Support", detail: "Phone, WhatsApp & Email" },
  { feature: "Certification", detail: "Awarded upon course completion" },
  { feature: "Performance Monitoring", detail: "Via online dashboard" },
  { feature: "Performance Reporting", detail: "Automated email updates" },
  { feature: "Examination", detail: "Online" },
];

const otherBenefits = [
  "Marketing training support",
  "Home delivery of training material & kits",
  "Kids' online software (optional)",
  "Student management panel (optional)",
  "Local student enquiries",
  "Regular student competitions",
  "Automated performance updates to parents & trainers (optional)",
];

const whoShouldEnroll = [
  {
    icon: Home,
    title: "Educated Homemakers",
    desc: "Turn spare time into income",
  },
  {
    icon: BookOpen,
    title: "Tutors & Coaching Institutes",
    desc: "Add a trending course",
  },
  { icon: School, title: "School Teachers", desc: "Start your weekend center" },
  {
    icon: Briefcase,
    title: "Career Seekers",
    desc: "Build a flexible and fulfilling profession",
  },
  { icon: Users, title: "Parents", desc: "Teach your own children and others" },
];

const whereTeach = [
  "From your home (10–12 students)",
  "Offer Premium Home Tuitions",
  "Launch your own center/franchise",
  "In schools (as a certified trainer)",
  "Add Abacus to Your Coaching Business",
];

const whyTrainersLove = [
  "Work-Life Balance – Just 1 class/week",
  "Teach Your Own Child – Give them a lifelong skill",
  "Steady Income – 2-year student commitment",
  "Low Effort, High Return – No daily prep like other subjects",
  "Self-Growth – Fulfillment of helping children grow",
  "Freedom – Be your own boss",
];

const whyChooseRoots = [
  "ISO 9001:2015 Certified",
  "1000+ Trainers Trained Globally",
  "Lowest training fees with no franchise cost",
  "Easy, Step-by-Step Online Videos",
  "24/7 Access – Learn Anytime, Anywhere",
  "Free software to track student performance",
  "Full support system for your journey",
  "Marketing & Local Student Support",
  "Doorstep delivery of study materials",
  "Regular trainer interaction and guidance",
  "Regular Competitions & Parental Updates",
];

const whyOnline = [
  { icon: BarChart2, label: "Automatic monitoring of speed and accuracy" },
  { icon: Zap, label: "Unlimited online practice with instant feedback" },
  { icon: Clock, label: "Learn and teach at your convenience" },
  { icon: Monitor, label: "Save time, money, and effort on commuting" },
  { icon: Video, label: "Watch any video lesson again, anytime" },
  { icon: Headphones, label: "Customer Support Always Available" },
];

const howItWorks = [
  {
    n: 1,
    title: "Video-Based Learning",
    desc: "Simple videos for every concept",
  },
  { n: 2, title: "Practice Worksheets", desc: "Auto-evaluated, repeatable" },
  {
    n: 3,
    title: "Flexible Timing",
    desc: "Just 30 mins/day to complete in 40 days",
  },
  {
    n: 4,
    title: "Topics Covered",
    desc: "Addition, Subtraction, Multiplication, Division, on Abacus and Mentally",
  },
  {
    n: 5,
    title: "100% Online | Mobile Friendly",
    desc: "No Tech Skills Required",
  },
];

const abacusCourse = [
  {
    icon: Timer,
    title: "Duration",
    desc: "2 Years | Levels: 8 (3 months each)",
  },
  { icon: Calendar, title: "Class Timing", desc: "Weekly 2 hours" },
  { icon: Brain, title: "Daily Practice", desc: "15 mins (manual or online)" },
  {
    icon: Rocket,
    title: "Objective",
    desc: "Fast, accurate mental maths without pen & paper",
  },
  { icon: UserCheck, title: "Ideal Age", desc: "5–12 years" },
  {
    icon: Award,
    title: "Benefits",
    desc: "Focus, memory, observation & calculation power",
  },
];

const trainerTestimonials = [
  {
    quote:
      "I've been working as a trainer with Root Abacus for 2 months now, and it's been a really good experience. The software they provide is amazing — it's full of fun games that make it super easy for kids to learn and stay interested. It's clear a lot of thought went into designing the training process too. Overall, I'm happy to be part of Root Abacus and excited for what's ahead!",
    name: "Pranali Dorlikar",
  },
  {
    quote:
      "I am SowbarnikaDevi Devaraj, trainer in ROOTS ABACUS LEARNING SCHOOL. I feel happy and proud to be a part of ROOTS. As a trainer, I could see this is the first ever software based abacus classes. All my students find this type of method to be easy and they get more interested too. Parents are more happy, to see their kids showing interest towards the calculations. Thank you ROOTS, for giving me a great opportunity to take a franchise in Maryland, US.",
    name: "Sowbarnika Devi",
  },
  {
    quote:
      "Hello everyone was working in IT but due to some priorities I stepped out from my job, by staying at home being full time mom for almost 5 years, always missed the feeling of independency then I got the platform Roots Abacus Learing School, it gave an opportunity to explore totally life changing thing, Abacus (Mental Maths). Highly recommend Roots and their staff members are so supportive and helpful.",
    name: "Priya Verma",
  },
];

const faqs = [
  {
    q: "Do I need to be good at maths to join this course?",
    a: "Not at all! Our course is designed for beginners. We start from the very basics and our step-by-step video modules make it easy for anyone to learn abacus teaching, regardless of their maths background.",
  },
  {
    q: "Can I teach alongside a job or business?",
    a: "Absolutely! Our training is fully self-paced and online. You can learn at your own convenience and teach just 1 class per week, making it perfect to do alongside your existing job or business.",
  },
  {
    q: "What support will I get after the course?",
    a: "After completing the course, you'll receive marketing support, local student enquiries, access to our student management panel, regular competitions, and continuous guidance from our support team.",
  },
];

// ── FAQ accordion ────────────────────────────────────────────────────────────
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left text-gray-800 font-medium hover:text-[#E87722] transition"
      >
        <span>{q}</span>
        <span className="text-[#E87722] text-xl font-bold">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-gray-600 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
};

// ── main page ────────────────────────────────────────────────────────────────
const AbacusTrainingPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="w-full py-10 px-4 text-center"
        style={{ backgroundColor: "#fef4ea" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Start Your Teaching Career from Home
          </h1>

          <p className="text-gray-600 text-lg mb-4">
            Empower Children. Build Your Future. Learn Abacus with Us.
          </p>

          {/* Features */}
          <div className="flex justify-center gap-6 flex-wrap mb-8">
            <span className="flex items-center gap-2 text-[#E87722] font-semibold">
              <Monitor size={18} strokeWidth={1.5} /> ISO Certified
            </span>
            <span className="flex items-center gap-2 text-[#E87722] font-semibold">
              <Users size={18} strokeWidth={1.5} /> 1000+ Trainers
            </span>
            <span className="flex items-center gap-2 text-[#E87722] font-semibold">
              <Globe size={18} strokeWidth={1.5} /> 15+ Countries
            </span>
          </div>

          {/* Video */}
          <div className="relative w-full max-w-3xl mx-auto pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0"
              title="Abacus Teacher Training Course"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition shadow-lg"
            >
              Register for Free Trial
            </button>

            <a
              href="https://wa.me/919871151911"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border-2 border-[#E87722] text-[#E87722] font-semibold px-8 py-3 rounded-full hover:bg-orange-50 transition"
            >
              <span>💬</span> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY HIGH DEMAND ── */}
      <section className="py-12 px-6 bg-gradient-to-r from-orange-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E87722] mb-4">
            Why is Abacus Teaching in High Demand?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            With growing awareness of the lifelong benefits of Abacus education,
            more parents, schools, and tutors are seeking abacus training and
            certified Abacus trainers. Abacus is not just a maths tool—it's a
            brain development program that builds focus, memory, and mental
            calculation skills.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Abacus trainers enjoy flexible working hours, impressive earnings,
            and the joy of shaping young minds—all from the comfort of their
            home.
          </p>
          <p className="text-[#E87722] text-sm italic font-medium">
            <strong>Fact:</strong> Children start showing improved mental maths
            within just 4 weeks of learning Abacus!
          </p>
        </div>
      </section>

      {/* ── PROGRAM HIGHLIGHTS ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#E87722] mb-8 flex items-center justify-center gap-3">
            <GraduationCap size={32} strokeWidth={1.5} color="#E87722" />
            Abacus Teacher Training Program Highlights (2026 Updated)
          </h2>
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {highlights.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 px-6 py-4 border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <span className="font-medium text-gray-800">{row.feature}</span>
                {row.custom ? (
                  row.custom
                ) : (
                  <span className="text-gray-600">{row.detail}</span>
                )}
              </div>
            ))}
          </div>

          {/* Other Benefits */}
          <div className="mt-6 bg-orange-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#E87722] mb-4">
              Other Benefits After Training Completion
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {otherBenefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle
                    size={16}
                    strokeWidth={1.5}
                    color="#E87722"
                    className="mt-0.5 flex-shrink-0"
                  />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD ENROLL ── */}
      <section className="py-12 px-6 bg-orange-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#E87722] mb-8">
            Who Should Enroll?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {whoShouldEnroll.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition"
              >
                <div className="flex justify-center mb-3">
                  <item.icon size={36} strokeWidth={1.5} color="#E87722" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-2xl p-6 border border-orange-100">
            <h3 className="text-[#E87722] font-bold mb-2 flex items-center gap-2">
              <Info size={18} strokeWidth={1.5} color="#E87722" /> Eligibility
            </h3>
            <p className="text-gray-700 text-sm mb-2">
              Passion for teaching, basic education (preferably graduate), and
              approx. 60 hours of learning commitment.
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Lock size={14} strokeWidth={1.5} color="#E87722" />
              No maths expertise needed! We make it easy and fun to learn.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPLETE ADVANTAGE ── */}
      <section className="relative py-12 px-6 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-orange-100 opacity-50 -translate-x-8 -translate-y-8" />
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-orange-100 opacity-50 translate-x-8 translate-y-8" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#E87722] mb-10">
            The Complete Advantage with Roots16
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Where Can You Teach */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Monitor size={24} strokeWidth={1.5} color="#E87722" />
              </div>
              <h3 className="font-bold text-[#E87722] mb-4">
                Where Can You Teach?
              </h3>
              <ul className="space-y-2">
                {whereTeach.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle
                      size={15}
                      strokeWidth={1.5}
                      color="#E87722"
                      className="mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Trainers Love */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Heart size={24} strokeWidth={1.5} color="#E87722" />
              </div>
              <h3 className="font-bold text-[#E87722] mb-4">
                Why Trainers Love Abacus Teaching?
              </h3>
              <ul className="space-y-2">
                {whyTrainersLove.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle
                      size={15}
                      strokeWidth={1.5}
                      color="#E87722"
                      className="mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Roots */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <ShieldCheck size={24} strokeWidth={1.5} color="#E87722" />
              </div>
              <h3 className="font-bold text-[#E87722] mb-4">
                Why Choose Roots?
              </h3>
              <ul className="space-y-2">
                {whyChooseRoots.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle
                      size={15}
                      strokeWidth={1.5}
                      color="#E87722"
                      className="mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ONLINE LEARNING ── */}
      <section className="py-12 px-6 bg-orange-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#E87722] mb-8">
            Why Online Learning Works Best?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyOnline.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm"
              >
                <item.icon
                  size={22}
                  strokeWidth={1.5}
                  color="#E87722"
                  className="flex-shrink-0"
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TRAINING WORKS ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            How Training Works
          </h2>
          <div className="space-y-6">
            {howItWorks.map((step) => (
              <div key={step.n} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-[#E87722] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.n}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISO CERTIFICATION ── */}
      <section className="py-12 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 flex gap-6 items-start shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Award size={32} strokeWidth={1.5} color="#E87722" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ISO-Certified Certification
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Upon completion, receive an official Roots Abacus Learning
                School Certificate. Our online exams are designed to evaluate
                real understanding and skills.
              </p>
              <ul className="space-y-2">
                {[
                  "Online exam format",
                  "Receive certificate instantly",
                  "Globally recognized",
                  "Share on LinkedIn & resume",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle size={15} strokeWidth={1.5} color="#E87722" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABACUS COURSE FOR KIDS ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#E87722] mb-8">
            Abacus Course for Kids
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {abacusCourse.map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition"
              >
                <div className="flex justify-center mb-3">
                  <item.icon size={36} strokeWidth={1.5} color="#E87722" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINER TESTIMONIALS ── */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            What Our Trainers Say
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainerTestimonials.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-600 italic text-sm mb-4">
                  "{item.quote}"
                </p>
                <h4 className="font-semibold text-gray-800 text-sm">
                  — {item.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-6 text-center bg-orange-50">
        <h2 className="text-3xl font-bold text-[#E87722] mb-3">
          Ready to Start Your New Career?
        </h2>

        <p className="text-gray-600 mb-2">
          Turn your passion into a profession. Inspire children. Grow your
          income.
        </p>

        <p className="text-[#E87722] font-semibold mb-8">
          Become a Certified Abacus Trainer with Roots Today!
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition shadow-lg"
          >
            Register for Free Trial
          </button>

          <a
            href="https://wa.me/919871151911"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border-2 border-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition"
          >
            <span>💬</span> Chat on WhatsApp
          </a>
        </div>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AbacusTrainingPage;
