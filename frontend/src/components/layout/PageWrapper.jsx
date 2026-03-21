import { useEffect, useState } from 'react'

const PageWrapper = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {children}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-50 bg-orange-600 text-white w-10 h-10 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition flex items-center justify-center"
        >
          ↑
        </button>
      )}
    </>
  )
}

export default PageWrapper