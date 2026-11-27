const fs = require('fs');
function readDoc(req, res) {
  const name = req.query.name;
  fs.readFile('/var/data/' + name, 'utf8', (err, body) => res.send(body));
}
module.exports = { readDoc };
