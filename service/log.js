const { logger } = require("../config/logConfig")

const onStart = () => {
	logger.info("site patrol start")
}

const onDBConncetion = (connectionPool) => {
	logger.info("Getting DB Connection is done successfully")
	logger.info(connectionPool)
}

const onServerError = (error) => {
	logger.error("Error on server.js")
	logger.error(error)
}

const onDbError = (error, functionName) => {
	logger.error(`Error on ${functionName} in db.js`)
	logger.error(error)
}

module.exports = {
	onStart: onStart,
	onDBConncetion: onDBConncetion,
	onServerError: onServerError,
	onDbError: onDbError
}
