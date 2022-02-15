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

// get all brands method

const get_brands = async () => {
  try {
    return await axios(options_get_brands);
  } catch (error) {
    console.error(error)
  }
}

// make the request for fans and engagement per profile

 async function get_fans_engagement(id, profile, start_date, end_date, ) {
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

// return the sum of fans and engagement per profile
function get_fans_engagement_per_profile(jsonBody, id) {
  var fans = 0;
  var engagement = 0;
  for (var j in jsonBody.resp[id]) {

    if (!isNaN(jsonBody.resp[id][j].fans)){
      fans += jsonBody.resp[id][j].fans;
    }

    if (!isNaN(jsonBody.resp[id][j].engagement)) {
      engagement += jsonBody.resp[id][j].engagement + engagement;
    }
  }

  return {fans: fans, engagement:engagement};
}


//get number of fans and engagement

const countFansAndEngagement = async () => {
    const brands = await get_brands();
    var brand_name;
    var total_profiles;
    var total_fans;
    var total_engagement;
    var brandElement;

    //check if we have brands

    if (brands!=null){
    if(brands.hasOwnProperty('data')){

      // foreach brand get profiles, fans and enagement

      const syncRes = await brands.data.result.reduce(async (previousPromise, brand) => {
        let allBrands = await previousPromise;
        brandElement = {};
        brand_name = brand.brandname;
        total_profiles = brand.profiles.length;
        total_fans = 0;
        total_engagement = 0;
        var brand_id = brand.profiles[0].id;

        // foreach brand get all fans and engagement

        await Promise.all(brand.profiles.map(async (profile) =>{
            const fansAndEngagement = await get_fans_engagement(brand_id, profile.profile_type, 1608209422374, 1639745412436);
            if(fansAndEngagement!=null){
             if(!fansAndEngagement.data.resp[brand_id].hasOwnProperty('err')){

                // get sum of fans and engagement per profile
                let values = get_fans_engagement_per_profile(fansAndEngagement.data, brand_id);
                brand_name =brand_name;

                total_fans += values.fans;
                total_engagement += values.engagement;
             }
            }
        })
        )
        brandElement={
          brand_name: brand_name,
          total_profiles: total_profiles,
          total_fans: total_fans,
          total_engagement: total_engagement
        };
        allBrands.push({
          brand_name: brand_name,
          total_profiles: total_profiles,
          total_fans: total_fans,
          total_engagement: total_engagement
        });
        return allBrands;

    }, Promise.resolve([]));
    
    return syncRes;
   
  }
}
}

exports.countFansAndEngagement = countFansAndEngagement;
