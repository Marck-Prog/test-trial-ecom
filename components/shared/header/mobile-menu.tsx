'use client'

import Link from 'next/link'
import { useState } from 'react'

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className=''>
        {/* Hamburger Menu Button */}
        <div className='xl:hidden lg:mr-20 xs:mr-10 flex items-center'>
          <button
            onClick={toggleMenu}
            className='focus:outline-none text-gray-700 relative w-5 h-4 mb-0.5'
          >
            <span className='sr-only'>Toggle menu</span>
            <div className='absolute top-1/2 left-0 w-full transform -translate-y-1/2'>
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>

          {/* Search Icon on small Screen */}
          {/* <Button
            variant='ghost'
            size='icon'
            className='focus:outline-none lg:hidden xs:ml-1 md:ml-3 hover:bg-white'
          >
            <Search className='h-5 w-5' />
          </Button> */}
        </div>

        {/* Mobile Drawer Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-yellow-400 z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='relative'>
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className='absolute top-4 right-4 focus:outline-none'
            >
              <svg
                className='w-6 h-6 text-black'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              <span className='sr-only'>Close menu</span>
            </button>

            <div className='pt-16 px-4'>
              <Link
                href='/threads'
                className='block py-2 text-black hover:underline'
                onClick={toggleMenu}
              >
                Threads
              </Link>
              <Link
                href='/accessories'
                className='block py-2 text-black hover:underline'
                onClick={toggleMenu}
              >
                Accessories
              </Link>
              <Link
                href='/collabs'
                className='block py-2 text-black hover:underline'
                onClick={toggleMenu}
              >
                Collabs
              </Link>
              <Link
                href='/themes'
                className='block py-2 text-black hover:underline'
                onClick={toggleMenu}
              >
                Themes
              </Link>
              <Link
                href='/custom'
                className='block py-2 text-black hover:underline'
                onClick={toggleMenu}
              >
                Custom
              </Link>
              <Link
                href='/whats-new'
                className='block py-2 text-black hover:underline'
                onClick={toggleMenu}
              >
                What`&rsquo;s New?
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay when menu is open */}
        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm py-4 px-4 z-40 2xl:hidden'
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </>
  )
}

export default MobileMenu
