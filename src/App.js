import React from 'react';
import { Cards,Charts,CountryPicker } from './components';
import India from './components/India/India';
import styles from './App.module.css';
import { fetchData } from './api';
import { fetchDataIndia } from './api';
import coronaImage from './images/image.png'


class App extends React.Component{  
    state ={
        world:{},
        india:{}, 
        country:'',                          //initilazing the empty data se
               
    }    
    async componentDidMount(){

        const fetchedDataIndia=await fetchDataIndia();          //calling the api index.js function fetchdataindia
        this.setState({india:fetchedDataIndia});              //must be same for setState india.jsx and <india data1>

        const fetchedData=await fetchData();                //calling the api index.js function fetchdata
        this.setState({world:fetchedData});

    }
    
    handleCountryChange=async(country) =>{
        const fetchedData=await fetchData(country);                //calling the api index.js function fetchdata
        this.setState({world:fetchedData,country:country});

        console.log(country);
    }
   
    render(){
        const {world ,country}=this.state; //passing data from cards.jsx to <Cards>
        const {india}=this.state; //passing data from cards.jsx to <Cards>
        
        return(
            <div className={styles.container}>
            <img className={styles.image} src={coronaImage} alt="COVID-19"/>
            <h3>India</h3>
            <India data={india}/> 
            <h3>{country}</h3>
            <Cards data={world} /> 
            <CountryPicker handleCountryChange={this.handleCountryChange}/>
            <Charts data={world} country={country}/>
            </div>
        )
    }
}

export default App;