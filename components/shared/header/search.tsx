'use client'

import { useState, useEffect, useRef } from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

export default function Search({ categories, siteName, translations }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  return (
    <div className='relative'>
      {/* Search Button */}
      <button
        type='button'
        onClick={() => setIsSearchOpen(true)}
        className='bg-primary text-primary-foreground rounded-e-md h-10 px-3 py-2'
      >
        <SearchIcon className='w-6 h-6' />
      </button>

      {/* Animated Search Form */}
      <form
        ref={searchRef}
        action='/search'
        method='GET'
        className={`flex items-stretch h-10 transition-all duration-500 ease-in-out ${
          isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <Select name='category'>
          <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md'>
            <SelectValue placeholder={translations['Header.All']} />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='all'>{translations['Header.All']}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
          placeholder={translations['Header.Search Site']?.replace(
            '{name}',
            siteName
          )}
          name='q'
          type='search'
        />
        <button
          type='submit'
          className='bg-primary text-primary-foreground rounded-s-none rounded-e-md h-full px-3 py-2'
        >
          <SearchIcon className='w-6 h-6' />
        </button>
      </form>
    </div>
  )
}
