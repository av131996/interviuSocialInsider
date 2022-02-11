var request = require('request');
var express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
var cors = require('cors');
app.use(cors());

// var options_get_brands = {
//   'method': 'POST',
//   'url': 'https://app.socialinsider.io/api/',
//   'headers': {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer API_KEY_TEST'
//   },
//   body: '{"id" : 1,"method" : "socialinsider_api.get_brands", "params":{"projectname": "API_test"}}'


// };
// var options_get_profiles = {
//   'method': 'POST',
//   'url': 'https://app.socialinsider.io/api/',
//   'headers': {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer API_KEY_TEST'
//   },
//   body: '{"id" : 1,"method" : "socialinsider_api.get_profiles", "params":{"projectname": "API_test"}}'


// };
// var options_get_profile_data = {
//   'method': 'POST',
//   'url': 'https://app.socialinsider.io/api/',
//   'headers': {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer API_KEY_TEST'
//   },
//   body: '{"id" : 1,"method" : "socialinsider_api.get_profile_data", \
//     "params":{\
//       "id":"15087023444",\
//       "profile_type": "facebook_page",\
//       "date": {\
//           "start": 1608209422374,\
//           "end": 1639745412436,\
//           "timezone": "Europe/London"\
//       }\
//   }}'


// };
// function get_brands(options) {
//   var brand_name;
//   var total_profiles;
//   var total_fans;
//   var total_engagement;
//   var brands = [];
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     if (IsJsonString(response.body)) {
//       var results = JSON.parse(response.body);
//       //console.log(results.result);
//       results.result.forEach(brands => {
//         var brandElement = {};
        
//         brand_name = brands.brandname;
//         total_fans = 0;
//         total_engagement = 0;
//        // console.log(brand_name);
//         total_profiles = brands.profiles.length;
//         brandElement={
//           brand_name: brand_name,
//           total_profiles: total_profiles,
//         };
//        // console.log(total_profiles);
//         var brand_id = brands.profiles[0].id;
//         //console.log(brand_id);
//         brands.profiles.forEach(brand => {
//         //  console.log(brand.profile_type);
//           //console.log(brand_name + " " + brand.profile_type);
//            brandElement["total_fans"]=0;
//            brandElement["total_engagement"]=0;
//           get_fans_engagement(brand_id, brand.profile_type, 1608209422374, 1639745412436,  function(fans, engagement){
//                 //console.log(fans);
//                 //total_engagement=engagement;
//                 //total_fans=fans;
//                 if(fans!=0){
//                   console.log(fans);
//                   brandElement["total_fans"]+=fans;
//                 }
//                 if(engagement!=0){
//                   brandElement["total_engagement"]+=engagement;

//                  }
//                // total_fans+=fans;
//                 //console.log(fans);

//                 //console.log(brand_name);
//                // console.log(brand.profile_type);
//                console.log(brandElement);
               

//                // console.log(brand_id + " " + brand.profile_type + " " + fans);

//                // console.log(brand_id + " " + brand.profile_type + " " + fans);
//                 //console.log(total_fans);
//               });

//               //console.log(brand_name + " " + brand.profile_type + " " + total_fans);

            

//             // get_profiles(brandBody, brand_id);
          
//         })
//        //console.log(total_fans);

//         // brandElement={
//         //   brand_name: brand_name,
//         //   total_profiles: total_profiles,
//         //   total_fans: total_fans,
//         //   total_engagement: total_engagement
//         // };
//         console.log(brandElement);
//         //brand.profiles
//       })
//     }
//   });
// }
// function get_fans_engagement(id, profile, start_date, end_date, callback) {
//   var options_get_profile_data = {
//     'method': 'POST',
//     'url': 'https://app.socialinsider.io/api/',
//     'headers': {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer API_KEY_TEST'
//     },
//     body: `{"id" : 1,"method" : "socialinsider_api.get_profile_data", \
//     "params":{\
//       "id": "${id}",\
//       "profile_type": "${profile}",\
//       "date": {\
//           "start": ${start_date},\
//           "end": ${end_date},\
//           "timezone": "Europe/London"\
//       }\
//   }}`};
//   request(options_get_profile_data, function (error, response) {
//     if (error) throw new Error(error);

//     if(IsJsonString(response.body)){
//     var results = JSON.parse(response.body);
//     // console.log(IsJsonString(response.body));
//    // callback(response.body);
//   // var results = JSON.parse(jsonBody);
//   let fans = 0;
//   //var sum_fans = 0;
//   var engagement = 0;
//   console.log(id);
//   for (var j in results.resp[id]) {
//     //console.log(results.resp[id][j]);

//     if (!isNaN(results.resp[id][j].fans)){
//       fans += results.resp[id][j].fans;
//     }

//     if (!isNaN(results.resp[id][j].engagement)) {
//       engagement += results.resp[id][j].engagement + engagement;
//     }
//   }
//   //console.log("id "+id + " profile " +profile + fans +" "+ engagement);

//   //console.log(fans);
//   callback(fans, engagement);
// }

//   });
// }
// get_brands(options_get_brands);
// function IsJsonString(str) {
//   try {
//     JSON.parse(str);
//   } catch (e) {
//     return false;
//   }
//   return true;
// }

// function get_profiles(jsonBody, id, callback) {
//   var results = JSON.parse(jsonBody);
//   let fans = 0;
//   var engagement = 0;
//   //console.log("id "+id);
//   for (var j in results.resp[id]) {
//     //console.log(results.resp[id][j]);

//     if (!isNaN(results.resp[id][j].fans)){
//       fans += results.resp[id][j].fans;
//     }

//     if (!isNaN(results.resp[id][j].engagement)) {
//       engagement += results.resp[id][j].engagement + engagement;
//     }
//   }
//   //console.log(fans);
//   callback(fans, engagement);
// }
//get_profiles(options_get_profile_data);
app.get('/api', (req, res) => res.send({ username: "alexandra" }));


// app.get("/api", (req, res) => {
//   console.log({ test: "test" });
//   res.set({
//     "Content-Type": "application/json",
// });
//   res.end(JSON.stringify({test: "test"}));
  // res.json([
  //   { name: "Anom", age: 19, gender: "Male" , sum: 10},
  //   { name: "Megha", age: 19, gender: "Female" },
  //   { name: "Subham", age: 25, gender: "Male"},
  // ]);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});