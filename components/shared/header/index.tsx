import { getSetting } from '@/lib/actions/setting.actions'
import Navbar from './navbar'
import Menu from './menu'
// import Menu from './menu'

export default async function Header() {
  // Data for dropdowns (can be fetched from an API or CMS in a real app)
  const dropdownItems = {
    threads: [
      {
        category: 'SHIRTS',
        items: [
          'Classic Tees',
          'Oversized Tees',
          'Wash Tees',
          'Kids Tees',
          'Baby Crop',
          'Tanks',
          'Crop Tees',
          'Long Sleeves',
        ],
      },
      { category: 'SWEATS', items: ['Hoodies', 'Sweatshirts', 'Tracksuit'] },
    ],
    accessories: [],
    collabs: [],
    themes: [],
    custom: [],
    whatsNew: [],
  }

  const { site } = await getSetting()

  return (
    <header className='sticky top-0 z-50'>
      {/* <div className='flex justify-between'> */}
      <Navbar site={site} dropdownItems={dropdownItems} />
      {/* <Menu /> */}
      {/* </div> */}
    </header>
  )
}
