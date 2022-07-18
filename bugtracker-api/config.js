//IMPORTING CONFIG DEPENDENCIES
require('dotenv').config()
require('colors')



//IMPORTING THE LISTENING PORT
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001



//FUNCTION TO CREATE THE DATABASE URL
function getDatabaseUri()
{
    const dbUser = process.env.DATABASE_USER || 'postgres';
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : 'postgres';
    const dbHost = process.env.DATABASE_HOST || 'localhost';
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || 'bugtracker';

    //If a database url is supplied, use that url. Otherwise, create a db connection string.
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}


//CONSOLE LOGGING THE CURRENT URI BEING USED AND OTHER SYSTEM INFORMATION
console.log("Bug Tracker Config: ".red)
console.log("PORT: ".blue, PORT)
console.log("Bug Tracker URI: ".blue, getDatabaseUri())
console.log("-----")

module.exports = {
    PORT,
    getDatabaseUri
}