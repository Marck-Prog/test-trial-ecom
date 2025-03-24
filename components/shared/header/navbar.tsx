'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavIcons from './nav-icons'
import MobileMenu from './mobile-menu'
import DropdownMenu from './dropdown'
import TopBar from './topbar'

interface DropdownCategory {
  category: string
  items: string[]
}

interface DropdownItems {
  threads: DropdownCategory[]
  accessories: DropdownCategory[]
  collabs: DropdownCategory[]
  themes: DropdownCategory[]
  custom: DropdownCategory[]
  whatsNew: DropdownCategory[]
}

interface Site {
  logo: string
  name: string
}

interface NavbarProps {
  site: Site
  dropdownItems: DropdownItems
}

export default function Navbar({ site, dropdownItems }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        className={`transition-all duration-100 ${isScrolled ? '-top-10 opacity-0' : 'top-0 opacity-100'}`}
      >
        <TopBar />
      </div>

      <nav
        className={`py-3 px-4 bg-white 4xl:px-80 2xl:px-20 xl:px-10 lg:px-10 md:px-8 sm:px-8 xs:px-4 flex items-center justify-between transition-all  ${
          isScrolled
            ? 'fixed top-0 left-0 right-0 bg-white duration-100 shadow-md z-40'
            : 'relative bg-transparent duration-100 mt-10'
        }`}
      >
        <MobileMenu />

        <div className='relative flex-1 flex justify-center xl:hidden'>
          <div className='text-3xl lg:text-4xl xs:ml-1 lg:ml-8'>
            <Link href='/'>
              <Image
                src={site.logo}
                alt={`${site.name} logo`}
                width={150}
                height={50}
              />
            </Link>
          </div>
        </div>

        <div className='text-4xl mr-6 tracking-wider hidden xl:block'>
          <Link href='/'>
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={150}
              height={70}
            />
          </Link>
        </div>

        <div className='hidden xl:flex flex-1 space-x-6 text-black'>
          <DropdownMenu label='Threads' items={dropdownItems.threads} />
          <DropdownMenu label='Accessories' items={dropdownItems.accessories} />
          <DropdownMenu label='Collabs' items={dropdownItems.collabs} />
          <DropdownMenu label='Themes' items={dropdownItems.themes} />
          <DropdownMenu label='Custom' items={dropdownItems.custom} />
        </div>

        <div className='flex items-center'>
          <NavIcons />
        </div>
      </nav>
    </>
  )
}
