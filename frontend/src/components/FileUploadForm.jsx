import React, { useRef, useState } from 'react';
import axios from 'axios';
import { FaFileImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from './PopOver';

const FileUploadForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const [data, setData] = useState({
    title: '',
    description: '',
    image: ''
  })

  const navigate = useNavigate()
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files[0])
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]))
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      console.log(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
      setData({ ...data, image: e.target.files[0] })
    }
  };
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const baseURL = `http://localhost:8000/upload`

  const uploadImage = async () => {
    setIsLoading(true)
    let formData = new FormData();
    formData.append('image', data.image);
    formData.append('name', data.title);
    formData.append('description', data.description);
    try {
      const res = await axios.post(baseURL, formData)
      setStatus(res.status)
      console.log(res.status)
    }
    catch (error) {
      console.log(error)
      setStatus(error.response.status)
    }
  }

  return (
    <>
      {isLoading && <Loader status={status} />}
      <div className='homeContainer'>
        <div className="topNav">
          <button onClick={uploadImage}>Share</button>
          <button onClick={() => {
            navigate('/')
          }}>Cancel</button>
        </div>
        <div className="gallery">
          <div className="headings">
            <h1>What would you like to Upload?</h1>
          </div>
        </div>
        <div className="upload">
          <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
            {preview && <input type="text" className='input-box' placeholder='Give a name' value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} autoFocus />}
            {
              preview ? <img src={preview} className="image-thumbnail" alt="" /> :
                <>
                  <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                  <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    <div className='drag-text'>
                      <FaFileImage size={45} />
                      <h3>Drag and drop an image, or <button className="upload-button" onClick={onButtonClick}>Browse</button></h3>
                      <p>Minimum 1600px width recommended. Max 10MB each (20MB for videos)</p>
                    </div>
                  </label>
                  {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                </>
            }
            {preview && <input type="text" className='input-box desc' value={data.description} placeholder='Describe your Image' onChange={(e) => setData({ ...data, description: e.target.value })} />}
          </form>
        </div>
      </div>
    </>

  );
};

export default FileUploadForm;

