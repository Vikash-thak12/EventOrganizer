"use client"

import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import { useConvexQuery } from "./use-convex-query";
import { usePathname, useRouter } from "next/navigation";

const ATTENDEE_PAGES = ["/explore", "/events", "/my-tickets", "/profile"];

export function useBoarding() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { data: currentUser, isLoading } =
        useConvexQuery(api.users.getCurrentUser, {});

    useEffect(() => {
        if (isLoading || !currentUser) return;

        if (!currentUser.hasCompletedOnboarding) {
            const requiresBoarding = ATTENDEE_PAGES.some((page) =>
                pathname.startsWith(page)
            );

            if (requiresBoarding) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setShowOnboarding(true);
            }
        }
    }, [currentUser, isLoading, pathname]);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        router.refresh();
    };

    const handleOnboardingSkip = () => {
        setShowOnboarding(false);
        router.push("/");
    };

    return {
        showOnboarding,
        handleOnboardingComplete,
        handleOnboardingSkip,
        needsOnboarding: !!currentUser && !currentUser.hasCompletedOnboarding,
    };
}


// export function useBoarding() {

//     const [showOnboarding, setShowOnboarding] = useState(false);
//     const pathname = usePathname();
//     const router = useRouter();




//     const { data: currentUser, isLoading } = useConvexQuery(api.users.getCurrentUser, {});

//     useEffect(() => {
//         if (isLoading || !currentUser) {
//             return;
//         }

//         if (!currentUser.hasCompletedOnboarding) {
//             const requiresBoarding = ATTENDEE_PAGES.some((page) => {
//                 pathname.startsWith(page);
//             })

//             if (requiresBoarding) {
//                 // eslint-disable-next-line react-hooks/set-state-in-effect
//                 setShowOnboarding(true);
//             }
//         }
//     }, [currentUser, isLoading, pathname]);


//     const handleOnboardingComplete = () => {
//         setShowOnboarding(false);
//         router.refresh();
//     }

//     const handleOnboardingSkip = () => {
//         setShowOnboarding(false);
//         router.push("/")
//     }

//     return {
//         showOnboarding,
//         setShowOnboarding,
//         handleOnboardingComplete,
//         handleOnboardingSkip,
//         needsOnboarding: currentUser && !currentUser.hasCompletedOnboarding,
//     };
// }
