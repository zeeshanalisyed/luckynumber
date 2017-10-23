
const port = process.env.PORT || '3000';
const dbPath = process.env.dbPath || require('path').join(__dirname, '/DB/data.json')

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = express.Router();
const app = express();



module.exports = enm = {
  luckyNumber: 10568,
  range: {min: 1, max: 10568},
  tries_limit:3
}
module.exports = dbManager = require('jsonfile')
module.exports = DB = dbManager.readFileSync(dbPath);
module.exports = dpath = dbPath;

require('./routes')

app.use(cors({exposeHeaders:['req_id']}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', API(router));

app.set('port', port);
const server = http.createServer(app);
server.listen(port);

