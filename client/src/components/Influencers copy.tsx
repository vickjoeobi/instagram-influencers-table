import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios'
import './influencer.css' 

const Influencers2 = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [myData, setMyData] = useState({})
  const [categories, setCategories] = useState(['all'])
  const [topInfluencers, setTopInfluencers] = useState({})
  const [countries, setCountries] = useState(['all'])
  const [topInfluencersByCountry, setTopInfluencersByCountry] = useState({})

  const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];


  // get a new copy of myData with numbers formated correctly

  function newMyData(myData : {[key: string] : any}) {
    for (var i = 0; i < myData.length; i++) {
        var followers = myData[i].Followers;
        var authenticEngagement = myData[i]['Authentic engagement\r\n'];
        var engagementAvg = myData[i]['Engagement avg\r\n'];

        if (followers.endsWith("M")) {
            myData[i].Followers = parseFloat(followers.slice(0, followers.length - 1)) * 1000000;
        } else if (followers.endsWith("K")) {
            myData[i].Followers = parseFloat(followers.slice(0, followers.length - 1)) * 1000;
        } else {
            myData[i].Followers = parseFloat(followers);
        }

        if (authenticEngagement.endsWith("M")) {
            myData[i]['Authentic engagement\r\n'] = parseFloat(authenticEngagement.slice(0, authenticEngagement.length - 1)) * 1000000;
        } else if (authenticEngagement.endsWith("K")) {
            myData[i]['Authentic engagement\r\n'] = parseFloat(authenticEngagement.slice(0, authenticEngagement.length - 1)) * 1000;
        } else {
            myData[i]['Authentic engagement\r\n'] = parseFloat(authenticEngagement);
        }

        if (engagementAvg.endsWith("M")) {
            myData[i]['Engagement avg\r\n'] = parseFloat(engagementAvg.slice(0, engagementAvg.length - 1)) * 1000000;
        } else if (engagementAvg.endsWith("K")) {
            myData[i]['Engagement avg\r\n'] = parseFloat(engagementAvg.slice(0, engagementAvg.length - 1)) * 1000;
        } else {
            myData[i]['Engagement avg\r\n'] = parseFloat(engagementAvg);
        }
    }
    return myData;
  }
  
  function getCategories(myData : any) {
    var categories = [];
    for (var i = 0; i < myData.length; i++) {
        var category_1 = myData[i].category_1;
        var category_2 = myData[i].category_2;
        if (categories.indexOf(category_1) === -1) {
            categories.push(category_1);
        }
        if (categories.indexOf(category_2) === -1) {
            categories.push(category_2);
        }
    }
    return categories;
  }
  
  function getTopInfluencers(myData : any, categories : any) {
    var topInfluencers : { [key: string]: any } = {};

    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var maxFollowers = 0;
        var maxFollowersIndex = 0;

        for (var j = 0; j < myData.length; j++) {
            var category_1 = myData[j].category_1;
            var category_2 = myData[j].category_2;

            if (category_1 === category || category_2 === category) {
                if (myData[j].Followers > maxFollowers) {
                    maxFollowers = myData[j].Followers;
                    maxFollowersIndex = j;
                }
            }
        }

        topInfluencers[category] = myData[maxFollowersIndex];
    }

    return topInfluencers;
}

function getCountries(myData: any) {
    var countries = [];

    for (var i = 0; i < myData.length; i++) {
        var country = myData[i]['Audience country(mostly)'];

        if (countries.indexOf(country) === -1) {
            countries.push(country);
        }
    }

    return countries;
  }
  
  function getTopInfluencersByCountry(countries: any, myData: any) {
    var topInfluencersByCountry : { [key: string]: any }  = {};

    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        var maxEngagementAvg = 0;
        var maxEngagementAvgIndex = 0;

        for (var j = 0; j < myData.length; j++) {
            var country_1 = myData[j]['Audience country(mostly)'];

            if (country_1 === country) {
                if (myData[j]['Engagement avg\r\n'] > maxEngagementAvg) {
                    maxEngagementAvg = myData[j]['Engagement avg\r\n'];
                    maxEngagementAvgIndex = j;
                }

            }
        }

        topInfluencersByCountry[country] = myData[maxEngagementAvgIndex];
    }

    return topInfluencersByCountry;
}

    
  /* const getInfluencers = async () => {
    setLoading(true)
    console.log("Loading...", loading) //remove later
    setError("")
    try {
      const response = await axios.get('http://localhost:3001/')
      if (response.status !== 200) {
        throw new Error("There was an error")
      }
      const data = response.data
      setMyData(newMyData(data))
    } catch (error: any) {
      setError(error)
      console.log(error)
    }
    setLoading(false)
  } */


    
  useEffect(() => {
    
    setLoading(true)
    console.log("Loading...", loading) //remove later
    setError("")
    axios.get('http://localhost:3001/')
      .then(response => {
        if (response.status !== 200) {
          throw new Error("There was an error.")
        }
        const data = response.data
        setMyData(newMyData(data))
      })
      .catch(error => {
        setError(error)
        console.log(error)
      })
    setLoading(false)

    setCategories(getCategories(myData))
    setTopInfluencers(getTopInfluencers(myData, categories))
    setCountries(getCountries(myData))
    setTopInfluencersByCountry(getTopInfluencersByCountry(countries, myData))

  }, [myData, categories, topInfluencers, countries, topInfluencersByCountry, loading])	
    
  return (
    <>
      <div className='header'>
        <h1>Coding Challenge</h1>
        <div>
          <div>{ countries}</div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Influencers2