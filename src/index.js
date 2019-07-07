import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/map.js'
import Controls from './components/controls.js'
import data from './data/data.js'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {debounce} from 'lodash'

const Slider = (props) => {

  const [range,setRanges] = React.useState([0,0]);

  console.log("!!!!!",props)

  return (
    <div>
      <div>
        <div style={{float:"left"}}>{range[0]}</div>
        <div style={{float:"right"}}>{range[1]}</div>
        <div style={{clear:"both"}}></div>
      </div>
      <Nouislider
        range={{
        min: 0,
        max: 1000000
      }}
        step={1000}
        start={props.range}
        
        onSlide={(e)=>setRanges(e)}
        onChange={props.onSlide}
        connect/>
    </div>
  )

};

const App = () => {

  const [center,
    setCenter] = React.useState([-77.10926073028928, 38.91320762326171])
  const [range,
    setRange] = React.useState([10000, 900000])

  React.useEffect(() => {
    console.log("COMPONENET INIT", center)
  }, [])

  // const setRangeInterval = debounce((e) => {
  //   console.log("debounce", e);
  //   setRange(e)
  // }, 200)

  return (
    <div id="container">
      <div className="col-side" id="col1">
        <Controls name={"Lviv"} action={() => setCenter([24, 49])}></Controls>
        <Controls name="Toronto" action={() => setCenter([-79.38, 43.65])}></Controls>
        <Controls name="Washington" action={() => setCenter([-77.10926073028928, 38.91320762326171])}></Controls>
        <Controls name="Get range" action={() => console.log(range)}></Controls>
        <Slider onSlide={(e) => setRange(e)} range={range}></Slider>
      </div>
      <div className="col" id="col2">
        <Map center={center} zoom={10} range={range} mainData={data}/>
      </div>
    </div>
  )

};

ReactDOM.render(
  <App/>, document.getElementById("app"));
