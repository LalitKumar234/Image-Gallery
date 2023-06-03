import React, { useEffect, useState } from 'react'
import './style.css'
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImagePopup from './ImagePopup';

const Home = () => {
    const [data, setData] = useState([])
    const [imageLink, setImageLink] = useState('');
    const [showImage, setShowImage] = useState(false)
    const baseURL = `http://localhost:8000/getall`

    const getAllImage = async () => {
        try {
            const res = await axios.get(baseURL)
            console.log(res.data)
            setData(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllImage()
    }, [])
    const navigate = useNavigate()
    return (
        <>
            {showImage && <ImagePopup imageLink={imageLink} setShowImage={setShowImage} />}
            <div className='homeContainer'>
                <div className="topNav">
                    <button onClick={() => {
                        navigate('/upload')
                    }}><IoMdAdd size={20} />Upload</button>
                </div>
                <div className="gallery">
                    <div className="headings">
                        <h1>Photo Gallery</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sunt quasi sequi quae accusantium itaque impedit quibusdam, reprehenderit id in.</p>
                    </div>
                    <div className="imageGrid">
                        {
                            data && data.map((img) => {
                                return <div className="imageCard">
                                    <img src={img.imageUrl} alt={img.name}
                                        onClick={() => {
                                            setImageLink(img.imageUrl)
                                            setShowImage(true)
                                        }}
                                    /></div>
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home