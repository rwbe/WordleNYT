import { type SetKeyboardStatus, type BoxStatus } from '../types.d'
import stylesLight from './boxLight.module.css'
import styles from './box.module.css'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/themeContext'

interface Props {
  value: string
  status: BoxStatus
  setKeyboardStatus: SetKeyboardStatus
}

export default function Box ({ value, status, setKeyboardStatus }: Props) {
  const { isDarkmode } = useContext(ThemeContext)

  useEffect(() => {
    if (status === 'absent' || status === 'present' || status === 'correct') {
      setKeyboardStatus(keys => {
        const newKeys = keys.map(key => {
          if (key.letter === value) {
            return { letter: key.letter, status }
          }
          return key
        })
        return [...newKeys]
      })
    }
  }, [status])

  return <div className={isDarkmode ? styles[status] : stylesLight[status]}>{value}</div>
}
