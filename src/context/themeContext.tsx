import { createContext, useState } from 'react'

interface ThemeContextType {
  isDarkmode: boolean
  toggleMode: () => void
}

const InitialState: ThemeContextType = {
  isDarkmode: true,
  toggleMode: function (): void {
    throw new Error('Function not implemented.')
  }
}

const ThemeContext = createContext(InitialState)

interface Props {
  children: JSX.Element
}

const ThemeProvider = ({ children }: Props) => {
  const [isDarkmode, setIsDarkmode] = useState(true)
  const toggleMode = () => {
    setIsDarkmode(!isDarkmode)
  }

  return (
    <ThemeContext.Provider value={{ isDarkmode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
