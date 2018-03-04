import React from 'react'



const Home =({checkHandler, stateCheck}) =>{
   

        return(<div>
            <h1>First Step</h1>

<p>CheckBox:</p>
<input type="checkbox" onChange={checkHandler} checked={stateCheck} />

            <MapContainer  />
            </div>)
    
}