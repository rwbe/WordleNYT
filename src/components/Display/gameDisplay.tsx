import { memo } from 'react'
import RowCompleted from '../rowComponents/rowCompleted'
import RowCurrent from '../rowComponents/rowCurrent'
import RowEmpty from '../rowComponents/rowEmpty'
import { GameStatus } from '../types.d'
import styles from '../../pages/Game/wordle.module.css'

interface GameBoxProps {
  completedWords: string[]
  gameStatus: GameStatus
  randomWord: string
  setKeyboardStatus: React.Dispatch<React.SetStateAction<Array<{
    letter: string
    status: string
  }>>>
  currentWord: string
  turn: number
}

const GameBox = memo(({
  completedWords,
  gameStatus,
  randomWord,
  setKeyboardStatus,
  currentWord,
  turn
}: GameBoxProps) => <div className={styles.mainContainer}>
  {
    completedWords.map((word, i) => (
      <RowCompleted
      key={i}
      word={word}
      solution={randomWord}
      setKeyboardStatus={setKeyboardStatus}/>
    ))
  }
  {
    gameStatus === GameStatus.Playing
      ? <RowCurrent word={currentWord}/>
      : null
  }
  {
    Array.from(Array(5 - turn)).map((_, i) => (
      <RowEmpty key={i}/>
    ))
  }
  </div>
)

export default GameBox
