var express = require('express');
var router = express.Router();
const count = require ('../socialInsider/test')
/* GET newRout listing. */
router.get('/', async function(req, res, next) {
 let t = await count.countFansAndEngagement();
 console.log(t);
 res.json(t);
});
module.exports = router;