import { useEffect, useState } from 'react'

export default function useTimerInMinutes (time: number) {
  const [timer, setTimer] = useState(time * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1
        } else {
          clearInterval(interval)
          return time * 60
        }
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  return { timer }
}
