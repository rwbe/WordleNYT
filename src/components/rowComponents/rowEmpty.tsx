import { type SetStateAction } from 'react'
import styles from './row.module.css'
import Box from '../Box/box'
export default function RowEmpty () {
  return (
        <div className={styles.row}>
            {
                Array.from(Array(5)).map((_, i) => (
                    <Box key={i} value="" status={'empty'} setKeyboardStatus={function (_value: SetStateAction<Array<{ letter: string, status: string }>>): void {
                      throw new Error('Function not implemented.')
                    } }/>
                ))
            }
        </div>
  )
}
