const APIWords = 'dictionary/words.txt'

export const fetchWords = async () => {
  try {
    const response = await fetch(APIWords)
    if (!response.ok) {
      throw new Error('Error loading file')
    }
    const data = await response.text()
    const wordsArray = data.split(/\s+/)
    return wordsArray
  } catch (error) {
    console.log('Error loading file:', error)
  }
}