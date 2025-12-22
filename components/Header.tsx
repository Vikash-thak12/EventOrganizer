import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <nav className='flex items-center justify-between px-10 py-5 w-full bg-background/10 z-10'>
                <div>
                    <Link href={"/"} className='cursor-pointer'>
                        <Image src={"/spott.png"} alt='Logo Image' height={100} width={100} />
                        {/* Pro Badge */}
                    </Link>
                </div>

                <div>
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton>
                            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </>
    )
}

export default Header
