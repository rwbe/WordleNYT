import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext'
import { FaTimes } from 'react-icons/fa'
import styles from '../modal.module.css'
import stylesLight from '../modalLight.module.css'
import Instructions from './instructions'

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const InstructionsModal = ({ showModal, setShowModal }: Props) => {
  const { isDarkmode } = useContext(ThemeContext)

  const handleCloseModal = () => {
    setShowModal(false) // Feche o modal definindo showModal como false
  }

  return (
    <>
      {showModal && (
        <div className={isDarkmode ? styles.modalViewContainer : stylesLight.modalViewContainer}>
          <div className={isDarkmode ? styles.modalContainerInstructions : stylesLight.modalContainerInstructions}>
            <button className={isDarkmode ? styles.closeButton : stylesLight.closeButton} onClick={handleCloseModal}>
             <FaTimes />
            </button>
            <Instructions isDarkmode={isDarkmode} />
            <section>
            </section>
          </div>
        </div>
      )}
    </>
  )
}
export default InstructionsModal
