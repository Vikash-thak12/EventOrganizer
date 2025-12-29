"use client"
import { Button } from '../../components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const ExploreLayout = ({ children }) => {
  const pathname = usePathname();
  const isMainPath = pathname === "/explore";
  const router = useRouter();
  return (
    <div>
      <div className='max-w-7xl mx-auto p-5'>
        {
          (!isMainPath &&
            <Button
              onClick={() => router.push("/explore")}
              className='cursor-pointer my-2 flex items-center justify-center'
              variant='mine'>
              <ArrowLeft />
              Back to Explore page
            </Button>)
        }
        {children}
      </div>
    </div>
  )
}

export default ExploreLayout
