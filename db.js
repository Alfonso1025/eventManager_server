const Pool = require('pg').Pool
const pool= new Pool({
    user:'postgres',
    password:'2004',
    database:'guest_list',
    host:'localhost',
    port:5432
})

module.exports=pool