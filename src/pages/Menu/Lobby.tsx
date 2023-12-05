import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInfoCircle, FaCalendarAlt } from 'react-icons/fa'
import { InfoModal } from '../../components/Info/infoModal'
import './Lobby.css'

const Lobby: React.FC = () => {
  const navigate = useNavigate()
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)

  const handleButtonClick = () => {
    navigate('/wordle')
  }

  const handleInfoClick = () => {
    setIsPulsing(false)
    setShowInfoModal(true)
  }

  const handleCloseInfoModal = () => {
    setIsPulsing(true)
    setShowInfoModal(false)
  }

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const currentDate = new Date()
    return currentDate.toLocaleDateString('en-US', options)
  }

  return (
    <div className="lobby-container">
     <div className={`info-icon ${isPulsing ? 'pulsing' : ''}`} onClick={handleInfoClick}>
        <FaInfoCircle />
      </div>
      <div className="logo-image">
        <img src="/Wordle.png" alt="Logo" className="logo-image" />
      </div>
      <div className="title-container">
        <h1>Wordle</h1>
      </div>
      <div className="subtitle-container">
        <h2>Get 5 chances to guess <br /> a 5-letter word.</h2>
      </div>
      <div className="button-container">
        <button onClick={handleButtonClick}>Play</button>
      </div>
      <div className="date-container">
        <FaCalendarAlt />
        <p>{getFormattedDate()}</p>
      </div>
      {showInfoModal && <InfoModal showModal={showInfoModal} setShowModal={setShowInfoModal} onClose={handleCloseInfoModal} />}
    </div>
  )
}

export default Lobby
