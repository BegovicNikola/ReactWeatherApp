import React from "react";

class Weather extends React.Component{
  render(){
    return(
      <div>
        {this.props.city && this.props.region && <p>{this.props.city}, {this.props.region}</p>}
        {this.props.country && <p>{this.props.country}</p>}
        {this.props.cond && <p>{this.props.cond}</p>}
        {this.props.temp && <p>{this.props.temp}</p>}
        {this.props.humid && <p>{this.props.humid}</p>}
        {this.props.wind && <p>{this.props.wind}</p>}
        {this.props.pres && <p>{this.props.pres}</p>}
        {this.props.error && <p>{this.props.error}</p>}
      </div>
    );
  }
}

export default Weather;