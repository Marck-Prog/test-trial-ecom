'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, UserRound, ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'

const NavIcons = () => {
  return (
    <>
      {/* Currency/Language - Hidden on small screens */}
      <div className='hidden xl:flex items-center space-x-1'>
        <Image
          src='/images/philippine-flag.png'
          alt='Philippine Flag'
          width={19}
          height={20}
          className=''
        />
        <span className='text-black font-bold'>PHP ₱</span>
      </div>

      {/* Icons */}
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
        className='focus:outline-none hidden lg:flex hover:bg-white'
      >
        <UserRound className='h-5 w-5' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='flex focus:outline-none items-center justify-center w-10 h-10 relative hover:bg-white'
      >
        <Heart className='h-5 w-5' />
        <Badge className='absolute -top-0.5 left-5 h-5 w-5 flex items-center justify-center p-0 rounded-full'>
          3
        </Badge>
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
