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

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault(); 

    setActive(true)
    axios
      .patch(`/api/banner/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        setActive(false)
        window.location.replace("/addBanner");
      });

  };

 

  const handleDeletePost = (id) => {
    axios
      .delete(`/api/banner/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        window.location.replace("/addBanner");
      });
  }


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
      <p style={{ width: "150px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.description}</p><br />

      <img src={post.img[0]} width={350} />

      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>


        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>



          <form className="w-full mt-3" onSubmit={handleEditSubmit}> 
            <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16' />
            <p style={{color:'red'}}>Note: images should be no more 1MB and size of 500 * 1200 px</p>

            <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#c01907" }} disabled={active}>
              Submit
            </button>
          </form>
        </Modal>

        <button onClick={() => setOpenModalDelete(true)} className="text-red-700 mr-3">Delete</button>

        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1 className="text-2xl pb-3">
            Are you sure, You want to delete this post?
          </h1>

          <div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              YES
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
              className="text-red-700 font-bold mr-5"
            >
              No
            </button>
          </div>
        </Modal>







      </div>
    </div>
  );
};

export default Post;
