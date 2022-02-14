var request = require('request');
var express = require('express');
var options_get_brands = {
    'method': 'POST',
    'url': 'https://app.socialinsider.io/api/',
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_TEST'
    },
    body: '{"id" : 1,"method" : "socialinsider_api.get_brands", "params":{"projectname": "API_test"}}'


};
var options_get_profiles = {
    'method': 'POST',
    'url': 'https://app.socialinsider.io/api/',
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_TEST'
    },
    body: '{"id" : 1,"method" : "socialinsider_api.get_profiles", "params":{"projectname": "API_test"}}'


};
var options_get_profile_data = {
    'method': 'POST',
    'url': 'https://app.socialinsider.io/api/',
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_TEST'
    },
    body: '{"id" : 1,"method" : "socialinsider_api.get_profile_data", \
      "params":{\
        "id":"15087023444",\
        "profile_type": "facebook_page",\
        "date": {\
            "start": 1608209422374,\
            "end": 1639745412436,\
            "timezone": "Europe/London"\
        }\
    }}'


};
function get_fans_engagement(id, profiles, start_date, end_date) {
    let fans = 0;
    //var sum_fans = 0;
    var engagement = 0;
    profiles.forEach(profile => {
        var options_get_profile_data = {
            'method': 'POST',
            'url': 'https://app.socialinsider.io/api/',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer API_KEY_TEST'
            },
            body: `{"id" : 1,"method" : "socialinsider_api.get_profile_data", \
        "params":{\
          "id": "${id}",\
          "profile_type": "${profile}",\
          "date": {\
              "start": ${start_date},\
              "end": ${end_date},\
              "timezone": "Europe/London"\
          }\
      }}`};
      return new Promise(function(resolve, reject){

        request(options_get_profile_data, function (error, response) {
            if (error) throw new Error(error);

            if (IsJsonString(response.body)) {
                var results = JSON.parse(response.body);
                // console.log(IsJsonString(response.body));
                // callback(response.body);
                // var results = JSON.parse(jsonBody);

                var err = 'err';
                //console.log(results.resp[id][err]);
                if (results.resp[id][err] != 'Profile not found or incorrect id and profile_type combo') {

                    for (var j in results.resp[id]) {
                        //   console.log(results.resp[id][j]);
                        if (!isNaN(results.resp[id][j].fans)) {
                            fans += results.resp[id][j].fans;
                        }

                        if (!isNaN(results.resp[id][j].engagement)) {
                            engagement += results.resp[id][j].engagement;
                        }

                    }
                    resolve(JSON.parse({fans: fans, engagement:engagement}));

                }
                else {
                    // callback('error',results.resp[id][err]);
                    return reject(err);
                }
            }else{
                return reject(err);
            }
            console.log("id " + id + " " + fans + " " + engagement);
            // callback(fans, engagement);

        });
      });

    })
    
}
async function get_brands(options) {
    var brand_name;
    var total_profiles;
    var total_fans;
    var total_engagement;
    var brands = [];
    request(options, async function (error, response) {
        if (error) throw new Error(error);
        if (IsJsonString(response.body)) {
            var results = JSON.parse(response.body);
            results.result.forEach(brands => {
                var brandElement = {};

                brand_name = brands.brandname;
                console.log(brand_name);
                total_fans = 0;
                total_engagement = 0;
                // console.log(brand_name);
                total_profiles = brands.profiles.length;
                brandElement = {
                    brand_name: brand_name,
                    total_profiles: total_profiles,
                };
                // console.log(total_profiles);
                var brand_id = brands.profiles[0].id;
                //console.log(brand_id);
                var profiles = [];
                brandElement["total_fans"] = 0;
                brandElement["total_engagement"] = 0;
                brands.profiles.forEach(brand => {
                    //  console.log(brand.profile_type);
                    //console.log(brand_name + " " + brand.profile_type);

                    profiles.push(brand.profile_type);

                    // total_fans+=fans;
                    //console.log(fans);
                    //console.log(brand_name);
                    // console.log(brand.profile_type);


                    // console.log(brand_id + " " + brand.profile_type + " " + fans);

                    // console.log(brand_id + " " + brand.profile_type + " " + fans);
                    //console.log(total_fans);
                    // });

                    //console.log(brand_name + " " + brand.profile_type + " " + brandElement["total_fans"]);



                    // get_profiles(brandBody, brand_id);

                })
                await get_fans_engagement(brand_id, profiles, 1608209422374, 1639745412436)
                .then(function(val) {
                    console.log("Din promise " + val);
                }).catch(function(err) {
                    console.err(err);
                });
            })
        }
    });
}
function get_fans_engagement(id, profiles, start_date, end_date) {
    let fans = 0;
    //var sum_fans = 0;
    var engagement = 0;
    profiles.forEach(profile => {
        var options_get_profile_data = {
            'method': 'POST',
            'url': 'https://app.socialinsider.io/api/',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer API_KEY_TEST'
            },
            body: `{"id" : 1,"method" : "socialinsider_api.get_profile_data", \
        "params":{\
          "id": "${id}",\
          "profile_type": "${profile}",\
          "date": {\
              "start": ${start_date},\
              "end": ${end_date},\
              "timezone": "Europe/London"\
          }\
      }}`};
      return new Promise(function(resolve, reject){

        request(options_get_profile_data, function (error, response) {
            if (error) throw new Error(error);

            if (IsJsonString(response.body)) {
                var results = JSON.parse(response.body);
                // console.log(IsJsonString(response.body));
                // callback(response.body);
                // var results = JSON.parse(jsonBody);

                var err = 'err';
                //console.log(results.resp[id][err]);
                if (results.resp[id][err] != 'Profile not found or incorrect id and profile_type combo') {

                    for (var j in results.resp[id]) {
                        //   console.log(results.resp[id][j]);
                        if (!isNaN(results.resp[id][j].fans)) {
                            fans += results.resp[id][j].fans;
                        }

                        if (!isNaN(results.resp[id][j].engagement)) {
                            engagement += results.resp[id][j].engagement;
                        }

                    }
                }
                else {
                    // callback('error',results.resp[id][err]);
                    return reject(err);
                }
            }else{
                return reject(err);
            }
            console.log("id " + id + " " + fans + " " + engagement);
            // callback(fans, engagement);

        });
        resolve({fans: fans, engagement:engagement});
      });

    })
    
}


//  console.log(fans+ " " + id + " " +profile);

// else{
//     callback('error',results.resp[id][err]);
//   // return;
// }






get_brands(options_get_brands);
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function get_profiles(jsonBody, id, callback) {
    var results = JSON.parse(jsonBody);
    let fans = 0;
    var engagement = 0;
    //console.log("id "+id);
    for (var j in results.resp[id]) {
        //console.log(results.resp[id][j]);

        if (!isNaN(results.resp[id][j].fans)) {
            fans += results.resp[id][j].fans;
        }

        if (!isNaN(results.resp[id][j].engagement)) {
            engagement += results.resp[id][j].engagement + engagement;
        }
    }
    //console.log(fans);
    callback(fans, engagement);
}