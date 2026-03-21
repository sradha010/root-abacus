import { Globe, PenLine, TrendingUp, Smartphone, IndianRupee, Clock, Headphones, Star, Medal, LayoutDashboard } from 'lucide-react'

const features = [
  { icon: Globe, title: 'ISO-Certified & Trusted Worldwide', desc: 'A globally trusted platform with students and trainers from multiple countries.' },
  { icon: PenLine, title: 'Expert-Curated Curriculum', desc: 'Thoughtfully designed by industry experts to be simple, engaging, and effective.' },
  { icon: TrendingUp, title: 'Proven Methods That Work', desc: 'Our unique system combines worksheets with software for better learning outcomes.' },
  { icon: Smartphone, title: 'Fully Online & Device-Friendly', desc: 'Learn on any device — mobile, tablet, or laptop — at your own pace and convenience.' },
  { icon: IndianRupee, title: 'Franchisees Earning ₹1 Lakh+ Per Month', desc: 'Many of our certified trainers have built thriving careers and centers with our support.' },
  { icon: Clock, title: 'No Time Limit to Complete Courses', desc: 'Self-paced structure ensures zero stress and better flexibility.' },
  { icon: Headphones, title: 'Strong Support System', desc: 'Continuous help for parents, trainers, and students via phone, chat, and email.' },
  { icon: Star, title: 'Kids Love It', desc: 'Fun sessions and challenges keep students coming back.' },
  { icon: Medal, title: 'High Success Rate', desc: 'Our students regularly show significant brain development, academic gains, and confidence.' },
  { icon: LayoutDashboard, title: 'Online Dashboard to Track Progress', desc: "Parents and trainers can easily monitor each child's development and milestones." },
]

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#fef4ea' }}>
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Why Choose Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A unique blend of quality education, global presence, and proven success — designed for the curious learner and passionate educator.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-lg text-[#E87722]">
              <f.icon size={32} strokeWidth={1.5} color="#E87722" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800">{f.title}</h3>
            <p className="text-sm text-gray-600 max-w-xs">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs