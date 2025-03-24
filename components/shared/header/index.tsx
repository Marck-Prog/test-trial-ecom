import { getSetting } from '@/lib/actions/setting.actions'
import Navbar from './navbar'

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
      <Navbar site={site} dropdownItems={dropdownItems} />
    </header>
  )
}
