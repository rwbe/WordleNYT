import React from 'react'
import { AiOutlineClose, AiFillGithub, AiFillLinkedin, AiFillTwitterSquare } from 'react-icons/ai'
import { IoMdPerson, IoMdMail } from 'react-icons/io'
import { Vite, Typescript, Css3 } from 'styled-icons/simple-icons'
import stylesLight from './infoModalLight.module.css'

interface InfoModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
}

const AppInfo: React.FC = () => (
    <section>
      <h3 className="app-info-title">Wordle Clone</h3>
      <p className="app-info-description">
      Inspirado no famoso jogo Wordle, esta aplicação desafia você a adivinhar uma palavra de cinco letras.
      Cada tentativa é marcada para indicar se a letra está correta e na posição certa, buscando desvendar a palavra secreta com o menor número de tentativas.

      Mantemos a empolgação e diversão do jogo original. No entanto, é importante notar que as palavras a serem adivinhadas nesta aplicação são em inglês. Desafie-se a decifrar a palavra secreta e teste suas habilidades em inglês com o Wordle Clone.

      Sinta-se à vontade para mergulhar nessa experiência linguística e aproveite o desafio!
      </p>
    </section>
)

const TechInfo: React.FC = () => (
    <section>
      <h3>Linguagens Utilizadas</h3>
      <div className={stylesLight.techIcons}>
        <div>
          <Vite size={24} />
        </div>
        <div>
          <Typescript size={24} />
        </div>
        <div>
          <Css3 size={24} />
        </div>
      </div>
    </section>
)

const SocialInfo: React.FC = () => (
  <section>
    <h3>Redes Sociais</h3>
    <div className={stylesLight.socialIcons}>
      <a href="https://github.com/rwbe" target="_blank" rel="noopener noreferrer">
        <AiFillGithub size={24} />
      </a>
      <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer">
        <AiFillLinkedin size={24} />
      </a>
      <a href="https://twitter.com/rwbemiliano" target="_blank" rel="noopener noreferrer">
        <AiFillTwitterSquare size={24} />
      </a>
    </div>
  </section>
)

const DeveloperInfo: React.FC = () => (
  <section>
    <h3 className={stylesLight.sectionTitle}>Desenvolvedor</h3>
    <p>
      <IoMdPerson className={stylesLight.icon} /> Ricardo Willian
    </p>
    <p>
      <IoMdMail className={stylesLight.icon} /> rwbemiliano@gmail.com
    </p>
  </section>
)

const InfoModal: React.FC<InfoModalProps> = ({ showModal, setShowModal, onClose }) => {
  const handleCloseModal = () => {
    setShowModal(false)
    onClose()
  }

  return (
    <>
      {showModal && (
        <div className={stylesLight.modalViewContainer}>
          <div className={stylesLight.modalContainer}>
            <button className={stylesLight.closeButton} onClick={handleCloseModal}>
              <AiOutlineClose size={24} />
            </button>

            {/* Informações do aplicativo */}
            <AppInfo />

            {/* Informações sobre as linguagens utilizadas */}
            <TechInfo />

            {/* Links para redes sociais */}
            <SocialInfo />

            {/* Informações do desenvolvedor */}
            <DeveloperInfo />
          </div>
        </div>
      )}
    </>
  )
}

export { AppInfo, TechInfo, SocialInfo, DeveloperInfo, InfoModal }
