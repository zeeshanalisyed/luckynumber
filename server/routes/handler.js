let waterfall = require('async-waterfall');
let CTRL = {}
CTRL.match = (req, res, next) => {
  const status = req.params.num == enm.luckyNumber ? 200 : 404;
  req.DATA = {status, time: new Date(), entry: req.params.num}
  waterfall([
    done => CTRL.save(req, res, done),
    done => {
      res.cookie('req_id', req.headers.req_id)
      res.send(DB[req.headers.req_id])
    }
    ],
    err => res.sendStatus(500)
  )
  // res.sendStatus(status).json()
}

CTRL.isValidRange = (req, res, next) => req.params.num < enm.range.min || req.params.num > enm.range.max ? res.status(403).json({msg: 'RANGE_INVALID'}) : next()

CTRL.defaults = (req, res, next) => {
  res.send({range:enm.range, req_id: req.headers.req_id, data:DB[req.headers.req_id]})
}

CTRL.init = (req, res, next) => {
  res.cookie('req_id', req.headers.req_id)
  res.sendStatus(201)
}

CTRL.save = (req, res, next) => {
  DB[req.headers.req_id].count = req.DATA.status == 200 ? -1 : DB[req.headers.req_id].count + 1
  DB[req.headers.req_id].data.push(req.DATA)
  dbManager.writeFile(dpath, DB, next)
}
module.exports = CTRL