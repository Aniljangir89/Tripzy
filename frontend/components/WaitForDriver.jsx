import React from 'react'

const WaitForDriver = (props) => {
  return (
    <div className=' waiting_driver_container'>
      <i className="ri-arrow-down-wide-line" onClick={() => {
        props.setWaitingForDriver(false);
      }}></i>
      <div className="confirmation-img">
        <div className="driver_img">
          <img src="https://www.pngall.com/wp-content/uploads/2016/04/Happy-Person.png" alt="" />
          <div className="driver_info">
            <h2>Sahil verma</h2>
            <h4>RJ 07 XL 0009</h4>
            <p> Alto 800</p>
          </div>
        </div>
        <div className="confirmation-info">
          <div className="confirm-data">
            <i class="ri-map-pin-time-fill"></i>
            <div className="confirmation-data2">
              <h3>565/A11</h3>
              <p>1'st Flor bombay street</p>
            </div>
          </div>

          <div className="confirm-data">
            <i class="ri-bank-card-2-fill"></i>
            <div className="confirmation-data2">
              <h3>$19.79</h3>
              <p>Cash/Online</p>
            </div>
          </div>
          <div className="confirm-data m_for_driver">
            <input type="text" className='message-to-driver' placeholder='Send Message' />
             <input type="button" value="Send" className='send_to_driver' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitForDriver
