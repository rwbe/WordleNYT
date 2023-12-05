import { useEffect, useState } from 'react'
import { fetchWords } from '../service/request'

export default function useFetchWords (wordLength: number) {
  const [words, setWords] = useState<string[]>([])

  const getWordsArray = async () => {
    try {
      const data = await fetchWords() as string[]
      if (data.length > 0) {
        const wordsFilteredByLength = data.filter(item => item.length === wordLength)
        const wordsWithoutAccent = wordsFilteredByLength.map(item => item.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        setWords(wordsWithoutAccent)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    void getWordsArray()
  }, [])

  return { words }
}