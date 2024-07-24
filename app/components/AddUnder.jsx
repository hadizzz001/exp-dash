"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Dropzone from './Dropzone'



const AddPost = () => {

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [active, setActive] = useState(false)
  const [imgs, setImgs] = useState([''])












  useEffect(() => {
    setInputs((prevState) => ({ ...prevState, img: imgs }));
  }, [imgs])







  const handleSubmit = (e) => {
    e.preventDefault();

    if (imgs.includes("")) {
      alert("Please select item image");
    }
    else {
      setActive(true)
      axios
        .post("/api/under", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false);
          setActive(false)
          window.location.replace("/addUnder");
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value, img: localStorage.getItem("sharedValue") }));
  };







  const handleImgChange = (url) => {
    if (url) {
      setImgs(url);
    }
  }





  return (
    <div>

      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#c01907" }}
      >
        Add
      </button>


      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>

        <form className="w-full mt-3" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full p-2"
            value={inputs.title || ""}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Sub-title"
            name="sub"
            className="w-full p-2 my-3"
            value={inputs.sub || ""}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Description"
            name="description"
            className="w-full p-2 my-3"
            value={inputs.description || ""}
            onChange={handleChange}
            required
          />


          <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16' />
          <p style={{ color: 'red' }}>Note: images should be no more 1MB and size of 400 * 200 px</p>


          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n.uploadcare--widget__button_type_open { \n    background-color: #c01907 !important;\n}\n"
            }}
          />

          <style
            dangerouslySetInnerHTML={{
              __html:
                "   \n\n.uploadcare--button_size_big { \n    background-color: #c01907 !important;\n}\n"
            }}
          />



          <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#c01907" }} disabled={active}>
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddPost;
