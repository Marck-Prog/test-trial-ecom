'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, UserRound } from 'lucide-react'
import LanguageSwitcher from './language-switcher'
import { Search } from 'lucide-react'

const NavIcons = () => {
  return (
    <>
      {/* Language switcher */}
      {/* <Button
        variant='ghost'
        size='icon'
        className='focus:outline-none ml-5 hidden lg:flex hover:bg-white'
      > */}
      <LanguageSwitcher />
      {/* </Button> */}
      {/* Search */}
      <Button
        variant='ghost'
        size='icon'
        className='focus:outline-none hidden lg:flex ml-2 hover:bg-white'
      >
        <Search className='h-5 w-5' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='flex focus:outline-none items-center justify-center w-10 h-10 relative hover:bg-white'
      >
        <UserRound className='h-5 w-5' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='flex focus:outline-none items-center justify-center w-10 h-10 relative hover:bg-white'
      >
        <ShoppingCart className='h-5 w-5' />
        <Badge className='absolute -top-0.5 left-5 h-5 w-5 flex items-center justify-center p-0 rounded-full'>
          6
        </Badge>
      </Button>
    </>
  )
}

export default NavIcons
