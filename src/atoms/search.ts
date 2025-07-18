import { atom } from 'jotai'

export const filterProductAtom = atom<{
  search: string
  category: null | number
}>({
  search: '',
  category: null,
})
