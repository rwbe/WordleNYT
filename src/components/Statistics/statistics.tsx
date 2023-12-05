import React, { useContext } from 'react'
import styles from './statistics.module.css'
import stylesLight from './statisticsLight.module.css'
import { ThemeContext } from '../../context/themeContext'
import { FaShareAlt, FaTimes, FaTrophy } from 'react-icons/fa'
import { FaGamepad } from 'react-icons/fa6'

interface Props {
  statusGame: 'won' | 'lost'
  winCounter: number
  amountOfGames: number
  solution: string
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const StatisticsModal = ({
  statusGame,
  winCounter,
  amountOfGames,
  solution,
  showModal,
  setShowModal
}: Props) => {
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const { isDarkmode } = useContext(ThemeContext)

  return (
    <>
      {showModal && (
        <div className={isDarkmode ? styles.modalViewContainer : stylesLight.modalViewContainer}>
          <div className={isDarkmode ? styles.modalContainer : stylesLight.modalContainer}>
            <button
              className={isDarkmode ? styles.closeButton : stylesLight.closeButton}
              onClick={handleCloseModal}
            >
              <FaTimes />
            </button>

            <div className={isDarkmode ? styles.statsContainer : stylesLight.statsContainer}>
              <h2 className={isDarkmode ? styles.statsTitle : stylesLight.statsTitle}>Game Stats</h2>

              <div className={isDarkmode ? styles.statsInfo : stylesLight.statsInfo}>
                <div className={isDarkmode ? styles.statsItem : stylesLight.statsItem}>
                  <h3>{amountOfGames}</h3>
                   <FaGamepad />
                </div>

                <div className={isDarkmode ? styles.statsItem : stylesLight.statsItem}>
                  <h3>{winCounter}</h3>
                   <FaTrophy />
                </div>
              </div>
            </div>

            {statusGame === 'lost' && (
              <section className={`wordWasSection ${isDarkmode ? styles.wordWasDark : styles.wordWasLight}`}>
                <p className={isDarkmode ? styles.wordWasText : stylesLight.wordWasText}>
                  The word was: {solution}
                </p>
              </section>
            )}

            <div className={isDarkmode ? styles.shareContainer : stylesLight.shareContainer}>
              <button
                className={isDarkmode ? styles.shareButton : stylesLight.shareButton}
              >
                Share
                <FaShareAlt className={isDarkmode ? styles.shareIcon : stylesLight.shareIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StatisticsModal
