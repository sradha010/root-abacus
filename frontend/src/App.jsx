import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageWrapper from './components/layout/PageWrapper'
import AbacusKidsPage from './pages/courses/AbacusKidsPage'
import VedicMathsPage from './pages/courses/VedicMathsPage'
import VedicMathsTrainingPage from './pages/teacher-training/VedicMathsTrainingPage'
import AbacusTrainingPage from './pages/teacher-training/AbacusTrainingPage'
import FranchisePage from './pages/FranchisePage'
import VirtualAbacusPage from './pages/resources/VirtualAbacusPage'
import TimesTablesPage from './pages/resources/TimesTablesPage'
import SquareCubePage from './pages/resources/SquareCubePage'
import SquareRootPage from './pages/resources/SquareRootPage'
import ReviewsPage from './pages/ReviewsPage'
import JobsPage from './pages/JobsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <PageWrapper>
      <div className="relative overflow-x-hidden">
        <ScrollToTop />  {/* ✅ Resets scroll on every route change */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/abacus-kids" element={<AbacusKidsPage />} />
          <Route path="/courses/vedic-maths" element={<VedicMathsPage />} />
          <Route path="/teacher-training/abacus" element={<AbacusTrainingPage />} />
          <Route path="/teacher-training/vedic-maths" element={<VedicMathsTrainingPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/resources/virtual-abacus" element={<VirtualAbacusPage />} />
          <Route path="/resources/times-tables" element={<TimesTablesPage />} />
          <Route path="/resources/squares-cubes" element={<SquareCubePage />} />
          <Route path="/resources/square-roots" element={<SquareRootPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default App