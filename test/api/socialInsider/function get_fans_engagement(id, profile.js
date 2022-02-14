function get_fans_engagement(id, profiles, start_date, end_date, callback) {
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
                            engagement += results.resp[id][j].engagement + engagement;
                        }

                    }
                    console.log("id " + id + " profile " + profile + fans + " " + engagement);
                }
                else {
                    return;
                }
            }
        })
    })

    callback(fans, engagement);
}
    
  
    