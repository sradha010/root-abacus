import { useState } from 'react'
import CallbackModal from '../forms/CallbackModal'

const CTASection = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <section className="text-center py-20 px-6 bg-orange-100">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Ready to Start Your Journey?</h2>
        <p className="text-gray-700 mb-10 max-w-3xl mx-auto">
          Whether you're a parent looking to boost your child's math skills with online abacus classes or an adult wanting to become a certified trainer, we're here to help you succeed. Join thousands of families and educators already seeing results.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-orange-600 border-2 border-[#E87722] px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition"
        >
          Request a Callback
        </button>
      </section>

      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default CTASection