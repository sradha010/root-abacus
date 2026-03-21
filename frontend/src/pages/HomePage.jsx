import HeroSection from '../components/home/HeroSection'
import CoursesSection from '../components/home/CoursesSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OurStory from '../components/home/OurStory'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CTASection from '../components/home/CTASection'
import MessageButton from '../components/ui/MessageButton'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <WhyChooseUs />
      <OurStory />
      <TestimonialsSection />
      <CTASection />
      <MessageButton />
    </>
  )
}

export default HomePage