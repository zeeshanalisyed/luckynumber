const uuidv4 = require('uuid/v4');
let MDLW = {}

MDLW.auth = (req, res, next) =>  DB[req.headers.req_id].count < 0 || DB[req.headers.req_id].count > enm.tries_limit ? res.sendStatus(403) : next()

MDLW.UUID = (req, res, next) => {
   if(!req.headers.req_id) {
     req.headers.req_id = uuidv4();
     DB[req.headers.req_id] = {count: 0, data: []}
   }
   return next();
}


module.exports = MDLW

