import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GameStatus } from '../../components/types.d'
import { useWindow } from '../../hooks/useWindow'
import { KEYS } from '../../components/constants'
import Keyboard from '../../components/Keyboard/keyboard'
import Header from '../../components/Header/header'
import Statistics from '../../components/Statistics/statistics'
import Instructions from '../../components/Instructions/instructionsModal'
import GameBox from '../../components/Display/gameDisplay'
import styles from '../../pages/Game/wordle.module.css'
import { ThemeContext } from '../../context/themeContext'

interface Props {
  words: string[]
}

export default function Wordle ({ words }: Props) {
  const { isDarkmode } = useContext(ThemeContext)
  const [toastBlocked, setToastBlocked] = useState(false)
  const [randomWord, setRandomWord] = useState<string>('')
  const [turn, setTurn] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing)
  const [keyboardStatus, setKeyboardStatus] = useState(KEYS.map(key => ({ letter: key, status: '' })))

  const [winCounter, setWinCounter] = useState(0)
  const [amountOfGames, setAmountOfGames] = useState(0)

  const [showStatistics, setShowStatistics] = useState<boolean>(false)
  const [showInstructions, setShowInstructions] = useState<boolean>(true)

  const [dictionary, setDictionary] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (gameStatus === GameStatus.Won) {
      setWinCounter(winCounter + 1)
    }

    if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) {
      setShowStatistics(true)
      setAmountOfGames(amountOfGames + 1)
    }
  }, [gameStatus])

  useEffect(() => {
    if (words.length > 0) {
      setRandomWord(words[Math.floor(Math.random() * words.length)].toUpperCase())
    }

    // Carrega o conteúdo do arquivo words.txt no componente montado
    const loadDictionary = async () => {
      try {
        const response = await fetch('dictionary/words.txt')
        const text = await response.text()
        const wordsArray = text.split('\n').map((word) => word.trim().toLowerCase())
        setDictionary(new Set(wordsArray))
      } catch (error) {
        console.error('Erro ao carregar o dicionário:', error)
      }
    }

    loadDictionary().catch((error) => {
      console.error('Erro ao carregar o dicionário:', error)
    })
  }, [words])

  const onInput = (letter: string) => {
    const newWord = currentWord + letter
    setCurrentWord(newWord)
  }

  const onDelete = () => {
    const newWord = currentWord.slice(0, -1)
    setCurrentWord(newWord)
  }

  const onEnter = () => {
    if (currentWord === randomWord) {
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Won)
      return undefined
    }
    if (turn === 5) {
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Lost)
      return undefined
    }
    // Verifica se a palavra está no dicionário
    if (dictionary.has(currentWord.toLowerCase())) {
      setCompletedWords([...completedWords, currentWord])
      setTurn(turn + 1)
      setCurrentWord('')
    } else {
      if (!toastBlocked) {
        console.log('Palavra não encontrada no dicionário!')
        toast.error('Palavra não encontrada no dicionário!', { position: toast.POSITION.TOP_CENTER })
        setToastBlocked(true)
        setTimeout(() => {
          setToastBlocked(false)
        }, 3000)
      }
    }
  }

  const onKeyPressed = (key: string) => {
    if (gameStatus !== GameStatus.Playing) {
      return undefined
    }

    if (key === 'BACKSPACE' && currentWord.length > 0) {
      onDelete()
      return undefined
    }

    if (key === 'ENTER' && currentWord.length === 5 && turn <= 5) {
      onEnter()
      return undefined
    }

    if (currentWord.length >= 5) return undefined

    if (KEYS.includes(key)) {
      onInput(key)
      return undefined
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase()
    onKeyPressed(key)
  }

  useWindow('keydown', handleKeyDown)

  return (
    <div className={isDarkmode ? styles.wordleMainContainer : styles.wordleMainContainerLight}>
      <div className={styles.wordleContainer}>
        <Header setShowStatistics={setShowStatistics} setShowInstructions={setShowInstructions} />
        <Instructions showModal={showInstructions} setShowModal={setShowInstructions} />
        {gameStatus === GameStatus.Playing && showStatistics && (
          <Statistics
            statusGame="won"
            winCounter={winCounter}
            amountOfGames={amountOfGames}
            solution={randomWord}
            showModal={showStatistics}
            setShowModal={setShowStatistics}
          />
        )}
        {gameStatus === GameStatus.Won && (
          <Statistics
            statusGame="won"
            winCounter={winCounter}
            amountOfGames={amountOfGames}
            solution={randomWord}
            showModal={showStatistics}
            setShowModal={setShowStatistics}
          />
        )}
        {gameStatus === GameStatus.Lost && (
          <Statistics
            statusGame="lost"
            winCounter={winCounter}
            amountOfGames={amountOfGames}
            solution={randomWord}
            showModal={showStatistics}
            setShowModal={setShowStatistics}
          />
        )}
        <GameBox
          completedWords={completedWords}
          gameStatus={gameStatus}
          randomWord={randomWord}
          setKeyboardStatus={setKeyboardStatus}
          currentWord={currentWord}
          turn={turn}
        />
        <Keyboard keys={keyboardStatus} onKeyPressed={onKeyPressed} />
      </div>
      <ToastContainer />
    </div>
  )
}