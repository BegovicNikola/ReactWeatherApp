import React from "react";

import Title from "./components/title";
import Form from "./components/form";
import Weather from "./components/weather";

class App extends React.Component{
  state = {
    temp: undefined,
    city: undefined,
    region: undefined,
    country: undefined,
    cond: undefined,
    humid: undefined,
    wind: undefined,
    pres: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const apiCall = await fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`);
    const data = await apiCall.json();
    
    if(city){
      this.setState({
        temp: Math.round((Number(data.query.results.channel.item.condition.temp) - 32) * 5 / 9),
        city: data.query.results.channel.location.city,
        region: data.query.results.channel.location.region,
        country: data.query.results.channel.location.country,
        cond: data.query.results.channel.item.condition.text,
        humid: data.query.results.channel.atmosphere.humidity,
        wind: Math.round(Number(data.query.results.channel.wind.speed) * 0.44704),
        pres: data.query.results.channel.atmosphere.pressure,
        error: ""
      });
    }else{
      this.setState({
        temp: undefined,
        city: undefined,
        region: undefined,
        country: undefined,
        cond: undefined,
        humid: undefined,
        wind: undefined,
        pres: undefined,
        error: "Please enter a city..."
      });
    }
  }

  render(){
    return(
      <div>
        <Title />
        <Form getWeather={this.getWeather}/>
        <Weather 
          temp={this.state.temp}
          city={this.state.city}
          region={this.state.region}
          country={this.state.country}
          cond={this.state.cond}
          humid={this.state.humid}
          wind={this.state.wind}
          pres={this.state.pres}
          error={this.state.error}
        />
      </div>
    );
  }
};

export default App;