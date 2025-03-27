import React from 'react'

const LocationSearchPanel = (props,idx) => {
  console.log(props)
  const locations=['Near buds cafe, NIT silchar','24S sadar bazar,jaipur','old rajiv hawan palace,jawai bikaner','clc  hawan palace, sikar','New rajiv hawan palace,jawai bikaner']
  return (
    <div className='Location_panel'>
      {/* //just sample data for options */}
    
      <div className="locations">
        {
          locations.map((location)=>{
            return  <div key={idx}  onClick={()=>{
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }} className="near-location">
            <h2><i class="ri-user-location-line"></i></h2>
            <h4>{location}</h4>
          </div>
          })
        }
      </div>
      
    </div>


  )
}

export default LocationSearchPanel
