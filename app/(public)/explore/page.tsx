"use client"
import { Calendar, MapPin, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../../@/components/ui/carousel';
// import { useQuery } from 'convex/react'
// import React from 'react'
import { api } from '../../../convex/_generated/api'
import { useConvexQuery } from '../../../hooks/use-convex-query'
import Image from 'next/image';
import { Badge } from '../../../@/components/ui/badge';
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from 'next/navigation';
import { format } from "date-fns";


const ExplorePage = () => {
  const router = useRouter();


  // getting current user for showing their local events according to their location 
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  // console.log("User", currentUser)


  // here i'm calling Featured events which is being shown in carousel 
  const { data: FeaturedEvents, isLoading: loadingFeatures } = useConvexQuery(api.events.getFeaturedEvents, { limit: 3 });
  // console.log("Datas", FeaturedEvents);


  // {} is required because Convex queries with args must receive an args object
  // const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(api.events.getPopularEvents, { limit: 5 });



  // const { data: EventsbyLocation, isLoading: loadingLocalEvents } = useConvexQuery(api.events.getEventsByLocation, {
  //   city: currentUser?.location?.city || "Bengaluru",
  //   state: currentUser?.location?.state || "Karnataka",
  //   limit: 5
  // })




  // const { data: categoryCounts } = useConvexQuery(api.events.getCategoryCounts)



  // functions for the below code 
  const handleEventClick = (slug) => {
    router.push(`/explore/${slug}`);
  }

  return (

    <>


      {/* title section  */}
      <div className="pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          events across India
        </p>
      </div>


      
      {/* Featured Carousel */}
      {FeaturedEvents && FeaturedEvents.length > 0 && (
        <div>
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 5000,
              })
            ]}
          >
            <CarouselContent>
              {FeaturedEvents.map((event) => (
                <CarouselItem key={event._id}>
                  <div
                    className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => handleEventClick(event.slug)}
                  >
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: event.themeColor }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                    <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                      <Badge className="w-fit mb-4" variant="secondary">
                        {event.city}, {event.state || event.country}
                      </Badge>
                      <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                        {event.title}
                      </h2>
                      <p className="text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {format(event.startDate, "PPP")}
                            234
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {event.registrationCount} registered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      {/* Local Events */}
      {/* Browse by category */}
      {/* popular events across country  */}
    </>
  )
}

export default ExplorePage
