import styles from './header.module.css'
import DisplayModeSvg from '../Svg/displayMode'
import QuestionSvg from '../Svg/questions'
import StatisticSvg from '../Svg/statistics'
import { useContext, memo } from 'react'
import { ThemeContext } from '../../context/themeContext'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line react/display-name
export const Header = memo(({ setShowStatistics, setShowInstructions }: Props) => {
  const { isDarkmode, toggleMode } = useContext(ThemeContext)

  const handleShowStatistics = () => { setShowStatistics(item => !item) }
  const handleShowInstructions = () => { setShowInstructions(item => !item) }

  return (
        <div className={isDarkmode ? styles.headerContainerStyle : styles.headerContainerLightStyle}>
            <ul className={styles.ulStyle}>
                <li style={{ paddingRight: '65px' }}>
                  <button onClick={handleShowInstructions}>
                    <QuestionSvg width='27' isDarkmode={isDarkmode}/>
                  </button>
                </li>

                <li className={`${styles.wordleTextStyle}`}>
                 WORDLE
                </li>

                <li>
                    <button onClick={handleShowStatistics}>
                      <StatisticSvg width='32' height='30' isDarkmode={isDarkmode}/>
                    </button>
                    <button onClick={() => { toggleMode() }}>
                      <DisplayModeSvg width={30} height={18} darkMode={isDarkmode}/>
                    </button>
                </li>
            </ul>
        </div>
  )
})
export default Header
