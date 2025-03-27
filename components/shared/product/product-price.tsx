'use client'
import { cn, round2 } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const ProductPrice = ({
  price,
  currency,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number
  currency?: { code: string; symbol: string; convertRate: number }
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
}) => {
  const t = useTranslations()

  // Validate inputs
  if (price < 0 || listPrice < 0) {
    throw new Error('Price and listPrice must be non-negative')
  }

  // Fallback currency
  const safeCurrency = currency || { code: 'USD', symbol: '$', convertRate: 1 }

  const convertedPrice = price
  const convertedListPrice = round2(listPrice * safeCurrency.convertRate)

  const discountPercent =
    convertedListPrice > 0
      ? Math.round(100 - (convertedPrice / convertedListPrice) * 100)
      : 0

  const stringValue = convertedPrice.toString()
  const [intValue, floatValue] = stringValue.includes('.')
    ? stringValue.split('.')
    : [stringValue, '']

  return plain ? (
    `${safeCurrency.symbol}${convertedPrice.toFixed(2)}`
  ) : convertedListPrice == 0 ? (
    <div className={cn('text-3xl', className)}>
      <span className='text-xs align-super'>{safeCurrency.symbol}</span>
      {intValue}
      <span className='text-xs align-super'>{floatValue}</span>
    </div>
  ) : isDeal ? (
    <div className='space-y-2'>
      <div className='flex justify-center items-center gap-2'>
        <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
          {discountPercent}% {t('Product.Off')}
        </span>
        <span className='text-red-700 text-xs font-bold'>
          {t('Product.Limited time deal')}
        </span>
      </div>
      <div
        className={`flex ${forListing && 'justify-center'} items-center gap-2`}
      >
        <div className={cn('text-3xl', className)}>
          <span className='text-xs align-super'>{safeCurrency.symbol}</span>
          {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
        <div className='text-muted-foreground text-xs py-2'>
          {t('Product.Was')}:{' '}
          <span className='line-through'>
            {`${safeCurrency.symbol}${convertedListPrice.toFixed(2)}`}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='flex justify-center gap-3'>
        <div className='text-3xl text-orange-700'>-{discountPercent}%</div>
        <div className={cn('text-3xl', className)}>
          <span className='text-xs align-super'>{safeCurrency.symbol}</span>
          {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
      </div>
      <div className='text-muted-foreground text-xs py-2'>
        {t('Product.List price')}:{' '}
        <span className='line-through'>
          {`${safeCurrency.symbol}${convertedListPrice.toFixed(2)}`}
        </span>
      </div>
    </div>
  )
}

export default ProductPrice
