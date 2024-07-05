"use client";

import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import Dropzone from './Dropzone'
import { useState, useEffect } from "react";

const Post = ({ post }) => {
  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [active, setActive] = useState(false) 
  const [imgs, setImgs] = useState([''])
 

  const handleEditSubmit = (e) => {
    e.preventDefault(); 

    setActive(true)
    axios
      .patch(`/api/deal/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        setActive(false)
        window.location.replace("/addDeal");
      });

  };

  const handleChange = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

 


  const handleImgChange = (url) => {
    if (url) {
      setImgs(url);
    }
  }


 
 

  useEffect(() => { 
    if (!(imgs.includes(""))){ 
      setPostToEdit((prevState) => ({ ...prevState, img: imgs }));
    } 
  }, [imgs])


 
















  return (
    <div className="bg-slate-200 p-3 min-h-full min-w-full" key={post.id}>
      <h1 className="text-2xl font-bold">Title : {post.title}</h1>  
      <p style={{ width: "150px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.description}</p><br />

      <img src={post.img[0]} width={50} />

      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>


        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>



          <form className="w-full mt-3" onSubmit={handleEditSubmit}>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={postToEdit.title || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 my-3"
              value={postToEdit.description || ""}
              onChange={handleChange}
              required
            />

             
            <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16' />
            <p style={{color:'red'}}>Note: images should be no more 1MB and size of 1000 * 500 px</p>

            <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#c01907" }} disabled={active}>
              Submit
            </button>
          </form>
        </Modal>

        







      </div>
    </div>
  );
};

export default Post;
