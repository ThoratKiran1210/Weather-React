import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect} from 'react';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';


const API_KEY = "2a5151ae480950cf2657a26a34ee70a9";


export default function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  
  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    try{
      const respose = await fetch(API); 
      if(respose.status == 200) {
        const data = await respose.json();
        setWeatherData(data);
      }else{
        setWeatherData(null);
      }
      setLoaded(true);

    }catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('Mumbai');
    console.log(weatherData);
  },[])

  if(!loaded){
    return(
      <View style={styles.container}>
        <ActivityIndicator color='gray' size={38}/>
      </View>
    )
  }

   else if(weatherData === null){
    return(
    <View>
      <SearchBar fetchWeatherData={fetchWeatherData}/>
      <Text style={styles.primaryText}>City not found! TRy Again</Text>
    </View>)
  }

  return (
    <View style={styles.container}>
      <Weather weatherData= {weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText:{
    margin: 20,
    fontSize: 28,

  }
});
