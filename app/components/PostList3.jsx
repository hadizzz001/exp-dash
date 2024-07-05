import Post3 from './Post3'
 
const PostList = ({ posts }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 place-items-start'>
      {
        posts?.map(post => (
          <Post3 key={post.id} post={post} />
        )) 
      }
    </div>
  )
}

export default PostList