const mysql = require('mysql');
const DB_PASSWORD = 'Pr0d-Db-P4ssw0rd-9f2a';
function connect() {
  return mysql.createConnection({ host: 'db.internal', user: 'app', password: DB_PASSWORD });
}
module.exports = { connect };
