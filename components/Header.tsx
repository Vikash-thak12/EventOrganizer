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
            </nav>
        </>
    )
}

export default Header
