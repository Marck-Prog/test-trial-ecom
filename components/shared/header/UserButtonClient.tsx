'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserRound } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function UserButtonClient() {
  const { data: session, status } = useSession()
  const t = useTranslations('Header')

  if (status === 'loading') {
    return (
      <Button
        variant='ghost'
        size='icon'
        className='flex items-center justify-center w-10 h-10 hover:bg-white focus:outline-none'
      >
        <UserRound className='h-5 w-5' />
      </Button>
    )
  }

  const userImage = session?.user?.image

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='flex items-center justify-center w-10 h-10 hover:bg-white bg:white focus:outline-none rounded-full'
        >
          {userImage ? (
            <Image
              src={userImage}
              alt='Profile'
              width={20}
              height={20}
              className='rounded-full'
            />
          ) : (
            <UserRound className='h-5 w-5' />
          )}
        </Button>
      </DropdownMenuTrigger>
      {session ? (
        <DropdownMenuContent
          className='w-56 border-t border-none rounded-none'
          align='end'
        >
          <DropdownMenuSeparator />
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {session.user.name ?? 'User'}{' '}
                {/* Fallback if name is undefined */}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {session.user.email ?? 'No email'}{' '}
                {/* Fallback if email is undefined */}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/account'>{t('Your account')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/account/orders'>{t('Your orders')}</Link>
            </DropdownMenuItem>
            {session.user.role === 'Admin' && (
              <DropdownMenuItem asChild>
                <Link href='/admin/overview'>{t('Admin')}</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuItem className='p-0'>
            <Button
              variant='ghost'
              className='w-full h-auto py-2 px-2 text-left'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              {t('Sign out')}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/sign-in'>
                <Button variant='ghost' className='w-full text-left'>
                  {t('Sign in')}
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuLabel className='font-normal'>
            {t('New Customer')}?{' '}
            <Link href='/sign-up' className='text-blue-600 hover:underline'>
              {t('Sign up')}
            </Link>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
