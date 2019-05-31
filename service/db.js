const Promise = require("es6-promise").Promise
const sql = require("mssql")
const dbConfig = require("../config/dbConfig.json")
// const dbConfig = require("../config/devDbConfig.json")
const pushConfig = require("../config/pushConfig.json")
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

const sendPush = (title, msg) => {
  if (connectionPool === undefined) return
  try {
		pushConfig.receiver.map(async o => {
			await connectionPool.request()
				.input("GUBUN", sql.NVarChar, pushConfig.delimiter)
				.input("TITLE", sql.NVarChar, title)
				.input("CONTENTS", sql.NVarChar, msg)
				.input("RECEIVER", sql.NVarChar, o.id)
				.input("MSG_TYPE", sql.NVarChar, 'INFO')
				.input("CATEGORY_ID", sql.NVarChar, 'SD-A')
				.input("SENDER_DEPT", sql.NVarChar, pushConfig.senderDept)
				.execute(pushConfig.spName)
		})
	} catch (err) {
		onDbError(err, "sendPush")
		throw new Error(err)
	}
}

module.exports = {
	getConnectionPool: getConnectionPool,
	sendPush: sendPush
}
