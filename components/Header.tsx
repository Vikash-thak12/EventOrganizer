"use client"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Authenticated, Unauthenticated } from 'convex/react'
import { BarLoader } from 'react-spinners'

const Header = () => {
    return (
        <>
            {/* <nav className='flex sticky items-center justify-between px-10 py-5 w-full bg-background/10 z-10'> */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-2 w-full bg-background/10">
                <div>
                    <Link href={"/"} className='cursor-pointer'>
                        <Image src={"/spott.png"} alt='Logo Image' height={100} width={100} />
                        {/* Pro Badge */}
                    </Link>
                </div>

                <div>
                    <Authenticated>
                        <UserButton />
                    </Authenticated>
                    <Unauthenticated>
                        <SignInButton mode='modal'>
                            <Button>Sign In</Button>
                        </SignInButton>
                    </Unauthenticated>
                </div>

                {/* loader */}
                <div className='absolute bottom-0 left-0 w-full'>
                    <BarLoader width={"100%"} color='#a855f7' />
                </div>
            </nav>
        </>
    )
}

export default Header
