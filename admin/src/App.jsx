import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import CoursesPage from './pages/CoursesPage'
import TeacherTrainingPage from './pages/TeacherTrainingPage'
import AbacusTrainingPage from './pages/AbacusTrainingPage'
import VedicTrainingPage from './pages/VedicTrainingPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ReviewsPage from './pages/ReviewsPage'
import JobsPage from './pages/JobsPage'
import ContactPage from './pages/ContactPage'
import EnquiriesPage from './pages/EnquiriesPage'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/teacher-training" element={<TeacherTrainingPage />} />
              <Route path="/teacher-training/abacus" element={<AbacusTrainingPage />} />
              <Route path="/teacher-training/vedic" element={<VedicTrainingPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/enquiries" element={<EnquiriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App