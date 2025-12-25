"use client"
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'

const ExplorePage = () => {
  // {} is required because Convex queries with args must receive an args object
  const data = useQuery(api.events.getPopularEvents, {});
  console.log("Datas", data);  
  return (
    <div>
      This is explore page
    </div>
  )
}

export default ExplorePage
