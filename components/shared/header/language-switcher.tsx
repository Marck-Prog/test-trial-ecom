'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useSettingStore from '@/hooks/use-setting-store'
import { i18n } from '@/i18n-config'
import { Link, usePathname } from '@/i18n/routing'
import { setCurrencyOnServer } from '@/lib/actions/setting.actions'
import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const [isRotated, setIsRotated] = useState(false)
  const { locales } = i18n
  const locale = useLocale()
  const pathname = usePathname()

  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore()

  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency)
    setCurrency(newCurrency)
  }

  const handleClick = () => {
    setIsRotated(!isRotated)
  }

  // Get the currently selected currency object with a fallback
  const currentCurrency =
    availableCurrencies.find((c) => c.code === currency) ||
    availableCurrencies[0]

  // Debug missing flag
  if (!currentCurrency?.flag || currentCurrency.flag === '') {
    console.warn('Missing or empty flag for currency:', currentCurrency)
  }

  return (
    <>
      {/* Currency/Language - Hidden on small screens */}
      <div className='hidden xl:flex items-center space-x-1'>
        {currentCurrency?.flag && currentCurrency.flag !== '' ? (
          <Image
            src={currentCurrency.flag}
            alt={`${currentCurrency.name} Flag`}
            width={19}
            height={20}
            className=''
          />
        ) : (
          <span>🏳️</span> // Fallback emoji if flag is missing
        )}
        <span className='text-black font-bold mr-2'>
          {currentCurrency.symbol}
        </span>
        <span className='text-black font-bold'>{currentCurrency.code}</span>
      </div>
      <div className='ml-5 hidden lg:flex hover:bg-white'>
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <div className='flex items-center gap-1 mb-1'>
              <span className='text-xl'>
                {locales.find((l) => l.code === locale)?.icon}
              </span>
              <ChevronDownIcon
                className={`transition-transform duration-300 ${isRotated ? 'rotate-180' : ''} mt-1`}
                style={{ width: '18px', height: '18px' }}
                onClick={handleClick}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 mt-[5px] rounded-none border-none'>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={locale}>
              {locales.map((c) => (
                <DropdownMenuRadioItem key={c.name} value={c.code}>
                  <Link
                    className='w-full flex items-center gap-1'
                    href={pathname}
                    locale={c.code}
                  >
                    <span className='text-lg'>{c.icon}</span> {c.name}
                  </Link>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Currency</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={currency}
              onValueChange={handleCurrencyChange}
            >
              {availableCurrencies.map((c) => (
                <DropdownMenuRadioItem key={c.name} value={c.code}>
                  <div className='flex items-center gap-2'>
                    {c.flag && c.flag !== '' ? (
                      <Image
                        src={c.flag}
                        alt={`${c.name} Flag`}
                        width={19}
                        height={20}
                      />
                    ) : (
                      <span>🏳️</span> // Fallback emoji
                    )}
                    <span>
                      {c.symbol} {c.code}
                    </span>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
