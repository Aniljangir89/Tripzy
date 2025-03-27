import React from 'react';

const VehiclePanel = (props) => {
  return (
    <div className='small_ride_option'>
      <i className="ri-arrow-down-wide-line" onClick={() => {
        props.setVehiclePanel(false);
      }}></i>
      <h2>Choose a vehicle</h2>
      <div onClick={() => {
        props.setConfirmRidePanel(true);
      }} className='vehi-options'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFkIK55Dp9N1tnP9XnWm3EsGS38O815Z5yHQ&s" alt="" />
        <div className="rider-info">
          <h4>UberGO <span><i className="ri-user-line"></i></span>9</h4>
          <h5>2mins away</h5>
          <p>Affordable,compact rides</p>
        </div>
        <h2>$193.00</h2>
      </div>

      <div onClick={() => {
        props.setConfirmRidePanel(true);
      }} className='vehi-options'>
        <img src="https://images.jdmagicbox.com/quickquotes/images_main/bajaj-three-wheelers-19-10-2020-004-211003251-wjj99.png" alt="" />
        <div className="rider-info">
          <h4>UberAuto <span><i className="ri-user-line"></i></span>3</h4>
          <h5>20mins away</h5>
          <p>Affordable,compact rides</p>
        </div>
        <h2>$193.00</h2>
      </div>

      <div onClick={() => {
        props.setConfirmRidePanel(true);
      }} className='vehi-options'>
        <img src="https://centralization-images.s3.ap-south-1.amazonaws.com/5_CD_110_Dream_65cca8a415.png" alt="" />
        <div className="rider-info">
          <h4>UberMoto <span><i className="ri-user-line"></i></span>12</h4>
          <h5>15mins away</h5>
          <p>Affordable,compact rides</p>
        </div>
        <h2>$193.00</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
