const Promise = require("es6-promise").Promise
const sql = require("mssql")
const dbConfig = require("../config/dbConfig.json")
// const dbConfig = require("../config/devDbConfig.json")
const { onDbError } = require("./log")
let connectionPool

sql.on("error", err => {
	sql.close()
	onDbError(err, "mssql error")
	throw new Error(err)
})

const getConnectionPool = async () => {
	try {
		if (connectionPool) return
		return new Promise( async (resolve, reject) => {
			connectionPool = await new sql.ConnectionPool(dbConfig).connect()
			connectionPool.on("error", err => {
				onDbError(err, "getConnectionPool error")
				reject(Error(err))
			})
			if (connectionPool) resolve(connectionPool)
			reject(Error("getConnectionPool failed"))
		})
	} catch (err) {
		connectionPool = null
		onDbError(err, "getConnectionPool error in catch")
		throw new Error(err)
	}
}

module.exports = {
	getConnectionPool: getConnectionPool
}
