"use client";

import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";

const Post = ({ post }) => {
  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [active, setActive] = useState(false)  
 

  const handleEditSubmit = (e) => {
    e.preventDefault(); 

    setActive(true)
    axios
      .patch(`/api/title/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        setActive(false)
        window.location.replace("/addTitle");
      });

  };

 
 


  const handleChange = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };













  return (
    <div className="bg-slate-200 p-3 min-h-full min-w-full" key={post.id}> 
      <p style={{ width: "150px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.title}</p><br />

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
