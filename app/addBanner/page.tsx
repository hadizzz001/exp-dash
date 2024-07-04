"use client"

import AddBanner from '../components/AddBanner' 
import PostList1 from '../components/PostList1' 
import { fetchTemp4 } from '../utils'
import { useState, useEffect } from "react";

 

const dashboard = () => {
  const [allTemp, setTemp] = useState<any>() 

  const a = async () => { 
      const b = await fetchTemp4() 
      setTemp(b)  
  }
  useEffect(() => {
      a()
  }, []) 
 
   


  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'> 

        <AddBanner /> 
      </div>  
      {
      allTemp && allTemp?.length > 0 ? (
      <PostList1 posts={allTemp} />
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