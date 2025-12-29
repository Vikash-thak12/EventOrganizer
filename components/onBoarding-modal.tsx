import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../@/components/ui/dialog'
import { Button } from '../@/components/ui/button'
import { Input } from '../@/components/ui/input'
import { Label } from '../@/components/ui/label'
import { useState } from 'react'
import { Progress } from '../@/components/ui/progress'

const OnBoardingModal = () => {
    const [step, setStep] = useState(1);

    const progress = (step / 2) * 100;
    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-gray-200 border border-purple-500/40 rounded-xl shadow-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <Progress
                                value={progress}
                            />
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            content
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default OnBoardingModal; 
