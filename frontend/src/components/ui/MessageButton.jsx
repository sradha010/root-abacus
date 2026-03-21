import { useState } from 'react'
import CallbackModal from '../forms/CallbackModal'

const MessageButton = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-4 z-40 bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm shadow-lg hover:bg-orange-600 transition"
      >
        MESSAGE US NOW
      </button>
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default MessageButton