"use client"
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
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
import { Button } from '../../../components/ui/button';
import { createLocationSlug } from '../../../lib/location-utils';
import Loader from '../../../components/Loader';
import EventCard from '../../../components/event-card';
import { CATEGORIES } from '../../../lib/data';
import { Card, CardContent } from '../../../@/components/ui/card';


const ExplorePage = () => {
  const router = useRouter();


  // getting current user for showing their local events according to their location 
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  // console.log("User", currentUser)


  // here i'm calling Featured events which is being shown in carousel 
  const { data: FeaturedEvents, isLoading: loadingFeatures } = useConvexQuery(api.events.getFeaturedEvents, { limit: 3 });
  // console.log("Datas", FeaturedEvents);




  const { data: EventsbyLocation, isLoading: loadingLocalEvents } = useConvexQuery(api.events.getEventsByLocation, {
    city: currentUser?.location?.city || "haryana",
    state: currentUser?.location?.state || "gurugram",
    limit: 4
  })

  // console.log("Location", EventsbyLocation);


  // {} is required because Convex queries with args must receive an args object
  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(api.events.getPopularEvents, { limit: 5 });






  const { data: categoryCounts } = useConvexQuery(api.events.getCategoryCounts)
  console.log("category", categoryCounts)
  const countCategories = CATEGORIES.map((cat) => {
    return {
      ...cat,
      count: categoryCounts?.[cat.id] || 0
    }
  })

  console.log("Categories", countCategories)



  // functions for the below code 
  const handleEventClick = (slug) => {
    router.push(`/events/${slug}`);
  }


  const handleviewlocalEvents = () => {
    const city = currentUser?.location?.city;
    const state = currentUser?.location?.state;

    const slug = createLocationSlug(city, state);
    router.push(`/events/${slug}`);

  }


  const handleDelete = () => {

  }



  const handleCategoryClick = (category) => {
    router.push(`/events/${category}`);
  }



  const isloading = loadingFeatures || loadingLocalEvents || loadingPopular;
  if (isloading) {
    return <Loader />
  }

  return (

    <main className='mt-12'>


      {/* title section  */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          events across India
        </p>
      </div>



      {/* Featured Carousel */}
      {FeaturedEvents && FeaturedEvents.length > 0 && (
        <div className='mt-4'>
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
      {
        EventsbyLocation && EventsbyLocation.length > 0 && (
          <div className='mt-12'>
            <div className='flex items-center justify-between'>
              <div>
                <h2>Events near you</h2>
                <span>
                  Happening in {currentUser?.location?.city.toUpperCase() || "your area"} !
                </span>
              </div>

              <Button
                variant='mine'
                className='cursor-pointer'
                onClick={handleviewlocalEvents}
              >
                Explore More <ArrowRight />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {EventsbyLocation.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  variant="grid"
                  onClick={() => handleEventClick(event.slug)}
                  onDelete={handleDelete}
                  className='bg-default text-white'
                />
              ))}
            </div>
          </div>
        )
      }



      {/* Browse by category */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {countCategories.map((category) => (
            <Card
              key={category.id}
              className="py-2 group bg-default text-white cursor-pointer hover:shadow-lg transition-all hover:border-purple-500/50"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="px-3 sm:p-6 flex items-center gap-3">
                <div className="text-3xl sm:text-4xl">{category.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Event{category.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>



      {/* popular events across country  */}
      {popularEvents && popularEvents.length > 0 && (
        <div className="mt-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-1">Popular Across India</h2>
            <p className="text-muted-foreground">Trending events nationwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                variant="list"
                onClick={() => handleEventClick(event.slug)}
                className='bg-default text-white'
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default ExplorePage
