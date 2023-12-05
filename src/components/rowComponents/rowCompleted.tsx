import { type BoxStatus, type SetKeyboardStatus } from '../types.d'
import styles from './row.module.css'
import Box from '../Box/box'

interface Props {
  word: string
  solution: string
  setKeyboardStatus: SetKeyboardStatus
}

export default function RowCompleted ({ word, solution, setKeyboardStatus }: Props) {
  function checkLetter (letter: string, pos: number): BoxStatus {
    if (solution.includes(letter)) {
      if (solution[pos] === letter) {
        return 'correct'
      } else {
        return 'present'
      }
    } else {
      return 'absent'
    }
  }

  return (
    <div className={styles.row}>
        {
            Array.from(Array(5)).map((_, i) => (
                <Box
                key={i}
                value={word[i]}
                status={checkLetter(word[i], i)}
                setKeyboardStatus={setKeyboardStatus}
                />
            ))
        }
    </div>
  )
}
