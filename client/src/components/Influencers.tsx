import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './influencer.css' 

// Function that converts the numbers back to the initial format before rendering
function numConvert(num: any) {
    if (num > 1000000) {
        return num / 1000000 + "M"
    } else if (num > 1000) {
        return num / 1000 + "K"
    } else {
        return num
    }
  }


  // Column definitions for the data grid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'Influencer_insta_name',
    headerName: 'Instagram Username',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'instagram_name',
    headerName: 'Instagram Name',
    width: 200,
    headerAlign: 'center',
    },
    {
      field: 'category_1',
      headerName: 'Category 1',
      width: 200,
    headerAlign: 'center',
    },
    {
      field: 'category_2',
      headerName: 'Category 2',
      width: 100,
    headerAlign: 'center',
    },
    {
      field: 'Followers',
      headerName: 'Followers Count',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Followers ? numConvert(params.row.Followers) : 0
      }
    },
    {
      field: 'Audience_country',
      headerName: 'Country',
      width: 100,
    headerAlign: 'center',
    },
    {
      field: 'Authentic_engagement',
      headerName: 'Authentic Engagement',
      width: 200,
      headerAlign: 'center',
    valueGetter: (params) => {
        return params.row.Authentic_engagement ? numConvert(params.row.Authentic_engagement) : 0
      }
    },
    {
      field: 'Engagement_avg',
      headerName: 'Engagement Rate',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Engagement_avg ? numConvert(params.row.Engagement_avg) : 0
      }
    },
];

const categoryColumn: GridColDef[] = [
  {
      field: 'category',
    headerName: 'Categories',
      width: 200,
    headerAlign: 'center',
  },
  {
    field: 'Influencer_insta_name',
    headerName: 'Instagram Username',
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'instagram_name',
    headerName: 'Instagram Name',
    width: 200,
    headerAlign: 'center',
    },
    {
      field: 'Followers',
      headerName: 'Followers Count',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Followers ? numConvert(params.row.Followers) : 0
      }
    },
    {
      field: 'Audience_country',
      headerName: 'Country',
      width: 200,
      headerAlign: 'center',
    },
    {
      field: 'Authentic_engagement',
      headerName: 'Authentic Engagement',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Authentic_engagement ? numConvert(params.row.Authentic_engagement) : 0
      }
    },
    {
      field: 'Engagement_avg',
      headerName: 'Engagement Rate',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Engagement_avg ? numConvert(params.row.Engagement_avg) : 0
      }
    },
];

const countryColumn: GridColDef[] = [
  
    {
      field: 'Audience_country',
    headerName: 'Country',
      width: 200,
    headerAlign: 'center',
  },
  {
    field: 'Influencer_insta_name',
    headerName: 'Instagram Username',
    width: 150,
    headerAlign: 'center',
  },
  {
    field: 'instagram_name',
    headerName: 'Instagram Name',
    width: 150,
    headerAlign: 'center',
    },
    {
      field: 'category_1',
      headerName: 'Category 1',
      width: 150,
    headerAlign: 'center',
    },
    {
      field: 'category_2',
      headerName: 'Category 2',
      width: 150,
    headerAlign: 'center',
    },
    {
      field: 'Followers',
      headerName: 'Followers Count',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Followers ? numConvert(params.row.Followers) : 0
      }
    },
    {
      field: 'Authentic_engagement',
      headerName: 'Authentic Engagement',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Authentic_engagement ? numConvert(params.row.Authentic_engagement) : 0
      }
    },
    {
      field: 'Engagement_avg',
      headerName: 'Engagement Rate',
      width: 200,
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.Engagement_avg ? numConvert(params.row.Engagement_avg) : 0
      }
    },
];

const Influencers = () => {

  // States for the data
  const [myData, setMyData] = useState([])  // The main data array
  const [categories, setCategories] = useState(['All']) // The categories array
  const [topInfluencers, setTopInfluencers] = useState([]) // The top influencers array
  const [countries, setCountries] = useState([ 'All']) // The countries array
  const [topInfluencersCountry, settopInfluencersCountry] = useState([]) // The top influencers array based on country
  const [topInfluencersByCategory, setTopInfluencersByCategory] = useState([]) // The top influencers array based on category
  const [topInfluencersByCountry, setTopInfluencersByCountry] = useState([]) // The top influencers array based on country

  

  // This function changes the column names of the columns that have sppace in their names
  function changeColumnName(myData: any) {
  for (let i = 0; i < myData.length; i++) {
    let temp = myData[i]

    myData[i]["id"] = i

    let keys = Object.keys(temp)
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j]
      if (key === "Influencer insta name") {
        temp["Influencer_insta_name"] = temp[key]
        delete temp[key]
      } else if (key === "instagram name") {
        temp["instagram_name"] = temp[key]
        delete temp[key]
      } else if (key === "Audience country(mostly)") {
        temp["Audience_country"] = temp[key]
        delete temp[key]
      } else if (key === "Authentic engagement\r\n") {
        temp["Authentic_engagement"] = temp[key]
        delete temp[key]
      } else if (key === "Engagement avg\r\n") {
        temp["Engagement_avg"] = temp[key]
        delete temp[key]
      }
    }
  }
  return myData
}

// This function adds id to the data, converts M to K and converts to numbers to enable computation and rturns the data 
  function newMyData(myData : any) {
    for (var i = 0; i < myData.length; i++) {
        var followers = myData[i].Followers;
        var authenticEngagement = myData[i].Authentic_engagement;
        var engagementAvg = myData[i].Engagement_avg;

        if (followers.endsWith("M")) {
            myData[i].Followers = parseFloat(followers.slice(0, followers.length - 1)) * 1000000;
        } else if (followers.endsWith("K")) {
            myData[i].Followers = parseFloat(followers.slice(0, followers.length - 1)) * 1000;
        } else {
            myData[i].Followers = parseFloat(followers);
        }

        if (authenticEngagement.endsWith("M")) {
            myData[i].Authentic_engagement = parseFloat(authenticEngagement.slice(0, authenticEngagement.length - 1)) * 1000000;
        } else if (authenticEngagement.endsWith("K")) {
            myData[i].Authentic_engagement = parseFloat(authenticEngagement.slice(0, authenticEngagement.length - 1)) * 1000;
        } else {
            myData[i].Authentic_engagement = parseFloat(authenticEngagement);
        }

        if (engagementAvg.endsWith("M")) {
            myData[i].Engagement_avg = parseFloat(engagementAvg.slice(0, engagementAvg.length - 1)) * 1000000;
        } else if (engagementAvg.endsWith("K")) {
            myData[i].Engagement_avg = parseFloat(engagementAvg.slice(0, engagementAvg.length - 1)) * 1000;
        } else {
            myData[i].Engagement_avg = parseFloat(engagementAvg);
        }
    }
    return myData;
  }
  
  // function gets all the categories from the data and returns them
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

  // This function gets the top influencers based on the category 
  function getTopInfluencers(myData : any, categories : any) {
    var topInfluencers : any = [];

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

    // This function gets the list of countries from the data and returns them
function getCountries(myData: any) {
    var countries = [];

    for (var i = 0; i < myData.length; i++) {
        var country = myData[i].Audience_country;

        if (countries.indexOf(country) === -1) {
            countries.push(country);
        }
    }

    return countries;
  }
  
  // This function gets the top influencers based on the country
  function getTopInfluencersCountry(countries: any, myData: any) {
    var topInfluencersCountry : any  = [];

    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        var maxEngagementAvg = 0;
        var maxEngagementAvgIndex = 0;

        for (var j = 0; j < myData.length; j++) {
            var country_1 = myData[j].Audience_country;

            if (country_1 === country) {
                if (myData[j].Engagement_avg > maxEngagementAvg) {
                    maxEngagementAvg = myData[j].Engagement_avg;
                    maxEngagementAvgIndex = j;
                }

            }
        }

        topInfluencersCountry[country] = myData[maxEngagementAvgIndex];
    }

    return topInfluencersCountry;
  }
  
  // This function gets the top influencers based on the categories
  function getTopInfluencersPerCategory(topInfluencersCategory: any) {
    var topInfluencersCategoryArray : any = []
    for (var key in topInfluencersCategory) {
        var temp = topInfluencersCategory[key]
        var tempObj: any = []
        tempObj.category = key
        tempObj.id = temp.id
        tempObj.Influencer_insta_name = temp.Influencer_insta_name
        tempObj.Audience_country = temp.Audience_country
        tempObj.instagram_name = temp.instagram_name
        tempObj.Followers = temp.Followers
        tempObj.Authentic_engagement = temp.Authentic_engagement
        tempObj.Engagement_avg = temp.Engagement_avg
        topInfluencersCategoryArray.push(tempObj)
    }
    return topInfluencersCategoryArray
}

  // This function gets the top influencers based on the countries
function getTopInfluencersByCountry(topInfluencersCountry: any) {
    var topInfluencersCountryArray: any = []
    for (var key in topInfluencersCountry) {
        var temp = topInfluencersCountry[key]
        var tempObj: any = []
        tempObj.country = key
        tempObj.id = temp.id
        tempObj.Influencer_insta_name = temp.Influencer_insta_name
        tempObj.Audience_country = temp.Audience_country
        tempObj.instagram_name = temp.instagram_name
        tempObj.Followers = temp.Followers
        tempObj.Authentic_engagement = temp.Authentic_engagement
        tempObj.Engagement_avg = temp.Engagement_avg
        tempObj.category_1 = temp.category_1
        tempObj.category_2 = temp.category_2
        topInfluencersCountryArray.push(tempObj)
    }
    return topInfluencersCountryArray
  }

  // UseEffect to get the data from the API
  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((data) => data.json())
      .then((data) => setMyData(newMyData(changeColumnName(data))))
      .then(() => {
        setCategories(getCategories(myData))
        setTopInfluencers(getTopInfluencers(myData, categories))
        setCountries(getCountries(myData))
        settopInfluencersCountry(getTopInfluencersCountry(countries, myData))
        setTopInfluencersByCategory(getTopInfluencersPerCategory(topInfluencers))
        setTopInfluencersByCountry(getTopInfluencersByCountry(topInfluencersCountry))
      })

  })
    
  // rendering the data
  return (
    <>
      <div>
        <div style={{
          height: 700, width: '100%',
        }}>
          <h1>All influencer's Data</h1>
          <DataGrid
            rows={myData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
        <div style={{
          height: 700, width: '100%',
        }}>
          <h1>Top 1 Influencer per category</h1>
          <DataGrid
            rows={topInfluencersByCategory}
            columns= {categoryColumn}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
        <div style={{
          height: 700, width: '100%',
        }}>
          <h1>Top 1 Influencer per country</h1>
          <DataGrid
            rows={topInfluencersByCountry}
            columns={countryColumn}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </>
  )
}


export default Influencers