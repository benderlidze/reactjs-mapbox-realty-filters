import React from 'react'
import PropTypes from 'prop-types'

export default class Tooltip extends React.Component {

  static propTypes = {
    features: PropTypes.string.isRequired
  };

  render() {

    const { features } = this.props;
    // const renderFeature = (feature, i) => {
    //   return (
    //     <div key={i}>
    //       <strong className='mr3'>{feature.layer['source-layer']}:</strong>
    //       <span className='color-gray-light'>{feature.layer.id}</span>
    //     </div>
    //   )
    // };

    return (
      <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom " style={{marginBottom:5}}>
        <div style={{backgroundColor:"#ccc",width:240+"px",padding:10}}>
          {/*features.map(renderFeature)*/}
          {features}
        </div>
        <span className="flex-child color-gray-dark triangle triangle--d"></span>
      </div>
    );
  }
}