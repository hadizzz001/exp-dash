import Post2 from './Post2'
 
const PostList = ({ posts }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 place-items-start'>
      {
        posts?.map(post => (
          <Post2 key={post.id} post={post} />
        )) 
      }
    </div>
  )
}

export default PostList