// Importando os estilos específicos de tema
import styles from './instruction.module.css'
import stylesLight from './instructionLight.module.css'
import boxStylesLight from '../Box/boxLight.module.css'
import boxStyles from '../Box/box.module.css'
import { type BoxStatus } from '../types.d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

interface Props {
  isDarkmode: boolean // Adicionando a propriedade isDarkmode como uma propriedade
}

export default function Instructions ({ isDarkmode }: Props) {
  const createArrayBox = (word: string, solution: string, status: BoxStatus, statusAbsent = false) => {
    function checkLetter (letter: string, pos: number): BoxStatus {
      if (solution.includes(letter)) {
        if (solution[pos] === letter) {
          return statusAbsent ? 'absent' : 'correct'
        } else {
          return 'present'
        }
      } else {
        return status
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          gap: '7px'
        }}
      >
        {Array.from(Array(5)).map((_, i) => (
          <div
            key={i}
            style={{
              width: '45px',
              height: '45px'
            }}
            className={isDarkmode ? boxStyles[checkLetter(word[i], i)] : boxStylesLight[checkLetter(word[i], i)]}
          >
            {word[i]}
          </div>
        ))}
      </div>
    )
  }

  const resume = [
    'Guess the Wordle in 5 tries. Each guess must be a valid 5-letter word.',
    'The color of the tiles will change to show how close your guess was to the word.'
  ]

  const examples = [
    {
      case: 'The letter D is in the word and in the correct position',
      example: createArrayBox('DISCO', 'DREAM', 'empty')
    },
    {
      case: 'The letter R is in the word but in the wrong position',
      example: createArrayBox('TIGER', 'CURLY', 'empty')
    },
    {
      case: 'The letter O is not in the word',
      example: createArrayBox('CRANE', '----O', 'empty', true)
    }
  ]

  return (
    <section className={isDarkmode ? styles.container : stylesLight.container}>
      <h2>
        <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: '10px' }} />
        How to Play
      </h2>
      <div>
        {resume.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div>
        <h3>Examples</h3>
        {examples.map((item, i) => (
          <div key={i}>
            <div>{item.example}</div>
            <p>{item.case}</p>
          </div>
        ))}
      </div>
      <div>
        <p>There may be repeated letters. The clues are independent for each letter</p>
      </div>
    </section>
  )
}
