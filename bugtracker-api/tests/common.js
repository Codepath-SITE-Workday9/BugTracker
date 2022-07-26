const db = require("../db")

async function commonBeforeAll()
{
    //any database actions
    //we want to take before the tests
}

async function commonBeforeEach()
{
    await db.query("BEGIN")
}

async function commonAfterEach()
{
    await db.query("ROLLBACK")
}

async function commonAfterAll()
{
    await db.end()
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach
}