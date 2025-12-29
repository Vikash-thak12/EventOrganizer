"use client"
import { SignInButton,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Authenticated, Unauthenticated } from 'convex/react'
import { BarLoader } from 'react-spinners'
import { useStoreUser } from '../hooks/useStoreUser'
import { Building, Plus, Ticket } from 'lucide-react'
import { useState } from 'react'
import OnBoardingModal from './onBoarding-modal'

const Header = () => {
    const { isLoading } = useStoreUser();
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {/* <nav className='flex sticky items-center justify-between px-10 py-5 w-full bg-background/10 z-10'> */}
            <nav className="sticky top-0 z-50 min-h-20 flex items-center justify-between md:px-10 px-2 py-2 w-full bg-black/90">
                <div>
                    <Link href={"/"} className='cursor-pointer'>
                        <Image src={"/spott.png"} alt='Logo Image' height={100} width={100} />
                        {/* Pro Badge */}
                    </Link>
                </div>

                <div className='flex items-center justify-center gap-2'>

                    <div className='flex items-center justify-center gap-2'>
                        <Button className='cursor-pointer' variant='mine' size='sm'>
                            Price
                        </Button>
                        <Button className='cursor-pointer' variant='mine' size='sm' asChild>
                            <Link href={"/explore"}>
                                Explore
                            </Link>
                        </Button>
                    </div>

                    <Authenticated>
                        <Button className='cursor-pointer' variant='mine' size='sm' onClick={() => setShowModal(true)}>
                            <Plus />
                            <span className='hidden sm:inline'>Create Event</span>
                        </Button>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="My Tickets"
                                    labelIcon={<Ticket size={16} />}
                                    href="/my-tickets"
                                />
                                <UserButton.Link
                                    label="My Events"
                                    labelIcon={<Building size={16} />}
                                    href="/my-events"
                                />
                                <UserButton.Action label="manageAccount" />
                            </UserButton.MenuItems>
                        </UserButton>
                    </Authenticated>
                    <Unauthenticated>
                        <SignInButton mode='modal'>
                            <Button variant='mine' className='cursor-pointer' size='sm'>Sign In</Button>
                        </SignInButton>
                    </Unauthenticated>
                </div>

                {/* loader */}
                {
                    isLoading &&
                    <div className='absolute bottom-0 left-0 w-full'>
                        <BarLoader width={"100%"} color='#a855f7' />
                    </div>
                }


                {/* modal */}
                <OnBoardingModal />
            </nav>



        </>
    )
}

export default Header
