"use client"

import { notFound, useParams, useRouter } from "next/navigation"
import { CATEGORIES } from "../../../../lib/data";
import { parseLocationSlug } from "../../../../lib/location-utils";
import { useConvexQuery } from "../../../../hooks/use-convex-query";
import { api } from "../../../../convex/_generated/api";
import Loader from "../../../../components/Loader";
import EventCard from "../../../../components/event-card";
import { Badge } from "../../../../@/components/ui/badge";
import { MapPin } from "lucide-react";

const SlugPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;


  // checking if it is a valid category: tech, music, sports
  const categoryInfo = CATEGORIES.find((cat) => cat.id === slug);
  // console.log("CategoryInfo", categoryInfo)


  // !! is a double negation that converts any value into a boolean (true or false).
  // If categoryInfo has a value (object, string, number → anything truthy), !!categoryInfo becomes true
  // If categoryInfo is null or undefined (falsy), !!categoryInfo becomes false
  const isCategory = !!categoryInfo;

  // if not category, then check if it's a valid city or state 
  const { city, state, isValid } = !isCategory ? parseLocationSlug(slug) : { city: null, state: null, isValid: false };
  // console.log(city, state, isValid); 

  if (!isCategory && !isValid) {
    notFound();
  }


  // here calling api 
  // const {} = useConvexQuery(api.events.getEventsByCategory, {category: slug, limit: 4}); 
  // const {} = useConvexQuery(api.events.getEventsByLocation, {city: city, state: state, limit: 4}); 

  const { data: events, isLoading } = useConvexQuery(
    isCategory ? api.events.getEventsByCategory : api.events.getEventsByLocation, isCategory ? { category: slug, limit: 4 } : city && state ? { city: city, state: state, limit: 4 } : "skip"
  );
  console.log("Events", events)

  const handleEventClick = (slug) => {
    router.push(`/events/${slug}`);
  }


  if (isLoading) {
    return <Loader />
  }


  if (isCategory) {
    return <>
      <main className="mt-8">
        <div className="flex items-center">
          <h1 className="text-6xl">{categoryInfo.icon}</h1>
          <div className="flex items-start flex-col">
            <span className="font-bold text-3xl">{categoryInfo.label}</span>
            <span className="text-muted-foreground">{categoryInfo.description}</span>
          </div>
        </div>

        {events && events.length > 0 && (
          <div className="text-muted-foreground mt-2">
            {events.length} Event{events.length !== 1 ? "s" : ""} found.
          </div>
        )}


        {
          events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {events.map((event) => (
                <EventCard
                  event={event}
                  key={event._id}
                  className="bg-default text-white"
                  onClick={() => handleEventClick(event.slug)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No Events found in this category.
            </p>
          )
        }
      </main>
    </>
  }

  return (
    <>
      <div className="pb-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-6xl">📍</div>
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Events in {city}</h1>
            <p className="text-lg text-muted-foreground mt-2">{state}, India</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-2">
            <MapPin className="w-3 h-3" />
            {city}, {state}
          </Badge>
          {events && events.length > 0 && (
            <p className="text-muted-foreground">
              {events.length} event{events.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </div>

      {
        events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                className="bg-default text-white"
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No events in {city}, {state} yet.
          </p>
        )
      }
    </>
  )
}

export default SlugPage
