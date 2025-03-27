import CartButton from './cart-button'
import LanguageSwitcher from './language-switcher'
import UserButton from './user-button'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
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
