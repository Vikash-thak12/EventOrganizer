import React from 'react'

const SlugPage = ({slug}) => {
  console.log("Slug", slug)
  return (
    <div>
      <h1>Slug: {slug}</h1>
    </div>
  )
}

export default SlugPage
