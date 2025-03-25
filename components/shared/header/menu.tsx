import { EllipsisVertical } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import CartButton from './cart-button'
import UserButton from './user-button'
import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'
import { useTranslations } from 'next-intl'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
  const t = useTranslations()

  return (
    <>
      {/* Desktop Menu (Inline with Navbar) */}
      <div className=''>
        <LanguageSwitcher />
        <UserButton />
        {!forAdmin && <CartButton />}
      </div>

      {/* Mobile Menu (Sheet) */}
      {/* <div className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle header-button'>
            <EllipsisVertical className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent className='bg-black text-white flex flex-col items-start'>
            <SheetHeader className='w-full'>
              <div className='flex items-center justify-between'>
                <SheetTitle>{t('Header.Site Menu')}</SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </SheetContent>
        </Sheet>
      </div> */}
    </>
  )
}

export default Menu
