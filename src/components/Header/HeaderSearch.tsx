'use client'

import { OutlinedInput } from '@mui/material'
import { useSetAtom } from 'jotai'
import { filterProductAtom } from '@/atoms/search'
import { useState } from 'react'

export default function HeaderSearch() {
  const setSearch = useSetAtom(filterProductAtom)

  const [value, setValue] = useState('')

  return (
    <OutlinedInput
      size="small"
      placeholder="Search"
      sx={{
        width: {
          xs: '100%',
          md: 300,
        },
        borderRadius: 100,
      }}
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          setSearch(prev => ({
            ...prev,
            search: value,
          }))
        }
      }}
    />
  )
}
