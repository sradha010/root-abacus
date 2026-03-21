import { useEffect, useState } from 'react'
import { Briefcase, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import MessageButton from '../components/ui/MessageButton'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const typeBadgeColor = {
  'full-time':  'bg-green-100 text-green-700',
  'part-time':  'bg-blue-100 text-blue-700',
  'freelance':  'bg-purple-100 text-purple-700',
  'contract':   'bg-yellow-100 text-yellow-700',
}

const BulletList = ({ items }) => {
  if (!items || items.length === 0) return null
  return (
    <ul className="space-y-1.5 mt-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
          <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border-2 border-[#E87722] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

const SectionBlock = ({ title, items, text }) => {
  if ((!items || items.length === 0) && !text) return null
  return (
    <div className="mt-4">
      <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">{title}</h4>
      {text && <p className="text-sm text-gray-600">{text}</p>}
      {items && <BulletList items={items} />}
    </div>
  )
}

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false)

  const hasDetails =
    (job.requirements?.length > 0) ||
    (job.responsibilities?.length > 0) ||
    (job.qualifications?.length > 0) ||
    (job.otherRequirements?.length > 0) ||
    job.language || job.timeType || job.compensation || job.schedule

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">

      {/* ── Card Header ── */}
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Briefcase size={18} strokeWidth={1.5} color="#E87722" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg leading-snug">{job.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadgeColor[job.type] || 'bg-gray-100 text-gray-600'}`}>
                {job.type}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 flex items-center gap-1">
                <MapPin size={11} /> {job.location}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mt-4">{job.description}</p>

        {/* Read More / Show Less */}
        {hasDetails && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-[#E87722] hover:text-orange-700 text-sm font-semibold inline-flex items-center gap-1"
          >
            {expanded ? (
              <><ChevronUp size={16} /> Show Less</>
            ) : (
              <><ChevronDown size={16} /> Read More</>
            )}
          </button>
        )}
      </div>

      {/* ── Expanded Details ── */}
      {expanded && (
        <div className="border-t border-orange-100 px-6 pb-6 pt-4 bg-orange-50/30">

          <SectionBlock title="Requirements"              items={job.requirements}      />
          <SectionBlock title="Responsibilities"          items={job.responsibilities}   />
          <SectionBlock title="Qualifications & Experience" items={job.qualifications}  />
          <SectionBlock title="Other Requirements"        items={job.otherRequirements} />

          {/* Info rows */}
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {job.language && (
              <div className="bg-white rounded-xl p-3 border border-orange-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-0.5">Language</p>
                <p className="text-sm text-gray-700">{job.language}</p>
              </div>
            )}
            {job.timeType && (
              <div className="bg-white rounded-xl p-3 border border-orange-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-0.5">Time Type</p>
                <p className="text-sm text-gray-700">{job.timeType}</p>
              </div>
            )}
            {job.compensation && (
              <div className="bg-white rounded-xl p-3 border border-orange-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-0.5">Compensation</p>
                <p className="text-sm text-gray-700">{job.compensation}</p>
              </div>
            )}
            {job.schedule && (
              <div className="bg-white rounded-xl p-3 border border-orange-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-0.5">Schedule</p>
                <p className="text-sm text-gray-700">{job.schedule}</p>
              </div>
            )}
          </div>

          {/* Apply button */}
          {job.applyLink && (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#E87722] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full text-sm transition shadow"
            >
              Apply Now <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

const JobsPage = () => {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res  = await fetch(`${API_BASE}/jobs`)
        const data = await res.json()
        if (data.success) {
          setJobs(data.data)
        } else {
          setError('Failed to load jobs.')
        }
      } catch (err) {
        setError('Could not connect to server.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-white">
        <div
          className="w-full h-64 md:h-80 bg-cover bg-center relative flex items-center justify-center"
          style={{
            backgroundImage: 'url(https://abacusclassesonline.com/images2/job.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 drop-shadow">
              Join Our Team
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Explore flexible EdTech jobs and career opportunities and be part of our mission-driven team.
            </p>
          </div>
        </div>
      </section>

      {/* ── JOB VACANCIES ── */}
      <section className="py-8 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50 min-h-[300px]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#E87722] mb-2">
              We're Hiring
            </h2>
            <p className="text-gray-500">
              Discover remote job opportunities and on-site jobs, and start your journey with us.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20 text-red-500 font-medium">{error}</div>
          )}

          {/* No jobs */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-lg">
              No open positions at the moment. Check back soon!
            </div>
          )}

          {/* Job Cards */}
          {!loading && !error && jobs.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

        </div>
      </section>

      <MessageButton />
    </>
  )
}

export default JobsPage