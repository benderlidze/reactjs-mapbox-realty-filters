import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/map.js'
import Controls from './components/controls.js'
import data from './data/data.js'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {debounce} from 'lodash'

const Slider = (props) =>{
  
  return (<Nouislider range={{
    min: 0,
    max: 1000000
  }} step={2} start={props.range} onSlide={props.onSlide} connect/>)

};


const App = () => {

  const [center, setCenter] = React.useState([-77.10926073028928, 38.91320762326171])
  const [range, setRange] = React.useState([10,900000])
    
  React.useEffect(() => {
    console.log("COMPONENET INIT", center)
  }, [])

  const setRangeInterval = debounce((e)=>{
      console.log("debounce", e);
      setRange(e)
    }, 700)
  

  return (
    <div id="container">
      <div className="col-side" id="col1">
        <Controls name={"Lviv"} action={() => setCenter([24, 49])}></Controls>
        <Controls name="Toronto" action={() => setCenter([-79.38, 43.65])}></Controls>
        <Controls
          name="Washington"
          action={() => setCenter([-77.10926073028928, 38.91320762326171])}></Controls>
        <Controls
          name="Get range"
          action={() => console.log(range) }></Controls>

        <Slider onSlide={(e)=>setRangeInterval(e)} range={range}></Slider>
      </div>
      <div className="col" id="col2">
        <Map center={center} zoom={10} range={range} mainData={data} />
      </div>
    </div>
  )


};

ReactDOM.render(
  <App/>, document.getElementById("app"));
