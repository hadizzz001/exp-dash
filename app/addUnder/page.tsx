"use client"

import AddUnder from '../components/AddUnder'
import PostList2 from '../components/PostList2'
import { fetchTemp5 } from '../utils'
import { useState, useEffect } from "react";



const dashboard = () => {
  const [allTemp, setTemp] = useState<any>()

  const a = async () => {
    const b = await fetchTemp5()
    setTemp(b)
  }
  useEffect(() => {
    a()
  }, [])




  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'>
 

      </div>
      {
        allTemp && allTemp?.length > 0 ? (
          <>
            <PostList2 posts={allTemp} />
          </>
        ) : (
          <div className='home___error-container'>
            <h2 className='text-black text-xl dont-bold'>...</h2>

          </div>
        )
      }
    </div>
  )
}

export default dashboard