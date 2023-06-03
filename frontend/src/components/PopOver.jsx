import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const Loader = ({ status }) => {
  const navigate = useNavigate()
  return (
    <div className='loader-container'>
      {
        status ? <div className='message-box'>
          <div className="icon">
            {
              status === 200 ? <AiOutlineCheckCircle size={80} color='green' /> : <MdCancel size={80} color='red' />
            }
          </div>
          <h4>{status === 200 ? 'Upload complete' : 'Upload incomplete'}</h4>
          <p>{status === 200 ? 'Congrats! Your upload successfully done' : 'Sorry! Something went wrong'}</p>
          <button style={{ backgroundColor: `${status === 200 ? 'green' : 'red'}` }} onClick={() => navigate('/')}>Ok</button>
        </div> : <LoaderAnimation />
      }
    </div>
  )
}

export default Loader


const LoaderAnimation = () => (
  <svg
    id="L3"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 0 0"
    xmlSpace="preserve"
  >
    <circle
      fill="none"
      stroke="#fff"
      strokeWidth={7}
      cx={50}
      cy={50}
      r={44}
      style={{
        opacity: 0.5,
      }}
    />
    <circle fill="#fff" stroke="#5e55ff" strokeWidth={5} cx={8} cy={54} r={6}>
      <animateTransform
        attributeName="transform"
        dur="2s"
        type="rotate"
        from="0 50 48"
        to="360 50 52"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);