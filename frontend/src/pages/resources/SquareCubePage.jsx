import { Download } from 'lucide-react'
import MessageButton from '../../components/ui/MessageButton'

const squaresData = Array.from({ length: 50 }, (_, i) => ({
  n: i + 1,
  value: (i + 1) ** 2,
}))

const cubesData = Array.from({ length: 50 }, (_, i) => ({
  n: i + 1,
  value: (i + 1) ** 3,
}))

const TableSection = ({ title, data, downloadHref }) => {
  const columns = []
  for (let col = 0; col < 5; col++) {
    columns.push(data.slice(col * 10, col * 10 + 10))
  }

  const superscript = title === 'SQUARES' ? '2' : '3'

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-200">
      {/* Header Bar */}
      <div className="flex items-center gap-4 bg-orange-100 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {title === 'SQUARES' ? 'Squares' : 'Cubes'}: 1 to 50
        </h2>
        <a
          href={downloadHref}
          download
          className="text-orange-600 hover:text-orange-800 text-sm font-medium inline-flex items-center gap-1 ml-auto"
        >
          <Download size={16} />
          Download
        </a>
      </div>

      {/* Table Card */}
      <div className="p-6">
        <div className="border-2 border-orange-400 rounded-xl p-6">
          <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-wide">
            {title}
          </h3>

          <div className="grid grid-cols-5 gap-x-4 gap-y-0">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1">
                {col.map(({ n, value }) => (
                  <div
                    key={n}
                    className="flex items-baseline gap-1 text-sm sm:text-base text-gray-800"
                  >
                    <span className="font-semibold min-w-[2ch] text-right">
                      {n}
                      <sup className="text-[0.6em]">{superscript}</sup>
                    </span>
                    <span className="text-gray-500 mx-1">=</span>
                    <span className="font-semibold">{value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const SquareCubePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 via-white to-gray-100 py-8 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          Understanding Squares &amp; Cubes
        </h1>
        <p className="text-gray-500 text-base">
          Quick lookup table for squares and cubes of numbers.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto py-10 px-6 space-y-12">
        <TableSection
          title="SQUARES"
          data={squaresData}
          downloadHref="/images2/squares.webp"
        />
        <TableSection
          title="CUBES"
          data={cubesData}
          downloadHref="/images2/cubes.webp"
        />
      </section>

      <MessageButton />
    </>
  )
}

export default SquareCubePage