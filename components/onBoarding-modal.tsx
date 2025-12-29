"use client"


import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../@/components/ui/dialog'
import { Button } from '../@/components/ui/button'
import { useState } from 'react'
import { Progress } from '../@/components/ui/progress'
import { Heart,  MapPin } from 'lucide-react'

const OnBoardingModal = ({ isOpen, onClose, onComplete}) => {
// const OnBoardingModal = () => {
    const [step, setStep] = useState(1);

    const progress = (step / 2) * 100;
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-gray-200 border border-purple-500/40 rounded-xl shadow-2xl">
                        <DialogHeader className='pt-4'>
                            <Progress value={progress} />
                            <DialogTitle className={"flex items-center gap-2 text-xl"}>
                                {
                                    step == 1 ? (
                                        <>
                                            <Heart className='h-6 w-5 text-purple-500' />
                                            What interests you ?
                                        </>
                                    ) : (
                                        <>
                                            <MapPin className='h-6 w-5 text-purple-500' />
                                            Where are you Located ?
                                        </>
                                    )
                                }
                            </DialogTitle>
                            <DialogDescription>
                                {
                                    step === 1 ? "Select at least 3 categories to personalize your experience." : "We will show you events happening near you."
                                }
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
            </Dialog>
        </div>
    )
}

export default OnBoardingModal; 
