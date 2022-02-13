const axios = require('axios');

var options_get_brands = {
    'method': 'POST',
    'url': 'https://app.socialinsider.io/api/',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer API_KEY_TEST'
    },
    data: '{"id" : 1,"method" : "socialinsider_api.get_brands", "params":{"projectname": "API_test"}}'
  
  
  };
const get_brands = async () => {
  try {
    return await axios(options_get_brands);
  } catch (error) {
    console.error(error)
  }
}

 async function get_fans_engagement(id, profile, start_date, end_date, callback) {
    var options_get_profile_data = {
      'method': 'POST',
      'url': 'https://app.socialinsider.io/api/',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_TEST'
      },
      data: `{"id" : 1,"method" : "socialinsider_api.get_profile_data", \
      "params":{\
        "id": "${id}",\
        "profile_type": "${profile}",\
        "date": {\
            "start": ${start_date},\
            "end": ${end_date},\
            "timezone": "Europe/London"\
        }\
    }}`};
    try {
        return await axios(options_get_profile_data);
      } catch (error) {
        console.error(error)
      }
}
const countFansAndEngagement = async () => {
    const brands = await get_brands();
    var brand_name;
    var total_profiles;
    var total_fans;
    var total_engagement;
    var allBrands = [];
    if(brands.hasOwnProperty('data')){
    console.log("Breeds " + JSON.stringify(brands.data.result))
    brands.data.result.forEach(async (brand) => {
        brand_name = brand.brandname;
        console.log(brand_name);
        total_profiles = brand.profiles.length;
        total_fans = 0;
        total_engagement = 0;
        var brand_id = brand.profiles[0].id;
        brand.profiles.forEach(async (profile) =>{
            console.log(profile.profile_type);
            const fansAndEngagement = await get_fans_engagement(brand_id, profile.profile_type, 1608209422374, 1639745412436);
           // if(fansAndEngagement!=null && fansAndEngagement.hasOwnProperty('data'))
               // console.log(JSON.stringify(fansAndEngagement.data));
        })
    })
    // if (breeds.data.message) {
    //   console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
    // }
  }
}
  
  countFansAndEngagement();