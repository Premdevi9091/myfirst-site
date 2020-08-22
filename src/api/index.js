import axios from 'axios';

const url='https://covid19.mathdro.id/api';
const urlindia='https://covid19.mathdro.id/api/countries/india';

export const fetchData =async(country) =>{  //fetch world data
    let changeurl =url;
    if(country){
        changeurl=`${url}/countries/${country}`
    }
    try{
        const {data: {confirmed,recovered,deaths,lastUpdate}}=await axios.get(changeurl);
        return {confirmed,recovered,deaths,lastUpdate};
    }
    catch(error){
        console.log(error);
    }
    
}

export const fetchDataIndia =async() =>{   //fetchindia data
    try{
        const {data: {confirmed,recovered,deaths,lastUpdate}}=await axios.get(urlindia); 
        return {confirmed,recovered,deaths,lastUpdate};
        //note 
        // this data is a attribute , in <India>  data is also attr , in India.jsx data is also attr
    }
    catch(error){
}
}

export const fetchDailyData =async() => {
    try{
        const {data} =await axios.get(`${url}/daily`);

        const modifiedData=data.map((dailyData)=>(
            {
                confirmed:dailyData.confirmed.total,
                deaths:dailyData.deaths.total,
                date:dailyData.reportDate,
            }
        ));
        return modifiedData;
    }
    catch(error){
    }    
}

export const fetchCountries =async() => {
    try{
        const {data:{countries}}=await axios.get(`${url}/countries`);
        return countries.map((country)=> country.name);
    }
    catch(error){
        console.log(error);
    }
}

