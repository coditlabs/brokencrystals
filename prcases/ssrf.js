const http = require('http');
function fetchRemote(req, res) {
  const target = req.query.url;
  http.get(target, upstream => upstream.pipe(res));
}
module.exports = { fetchRemote };
