const mysql = require('mysql');
const db = mysql.createConnection({ host: 'localhost', user: 'app', database: 'app' });
function lookupUser(req, res) {
  const id = req.query.id;
  db.query("SELECT * FROM users WHERE id = '" + id + "'", (err, rows) => res.json(rows));
}
module.exports = { lookupUser };
