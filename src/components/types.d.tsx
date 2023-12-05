export type BoxStatus = 'absent' | 'present' | 'correct' | 'empty' | 'edit'

export const enum GameStatus {
  Playing,
  Won,
  Lost,
}

export type SetKeyboardStatus = React.Dispatch<React.SetStateAction<Array<{
  letter: string
  status: string
}>>>
