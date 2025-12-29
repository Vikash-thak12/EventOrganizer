"use client"

import { useParams, useRouter } from "next/navigation"
import { CATEGORIES } from "../../../../lib/data";
import { parseLocationSlug } from "../../../../lib/location-utils";

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
  const { city, state, isValid } = !isCategory ? parseLocationSlug(slug) : {city: null, state: null, isValid: false}; 


  return (
    <div className=''>
      <h1>Slug: {slug}</h1>
    </div>
  )
}

export default SlugPage
