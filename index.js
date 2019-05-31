const promiseFinally = require("promise.prototype.finally")
promiseFinally.shim()

const dbService = require("./service/db")
const patrol = require("./service/patrol")
const { onStart, onDBConncetion, onServerError } = require("./service/log")


const goPatrol = () => {
  try {
    patrol.patrol();
  } catch (error) {
    onServerError(error)
  } finally {
    setTimeout(() => {
      goPatrol ()
    }, 1000 *60 * 10)
  }
}

onStart()
dbService.getConnectionPool()
	.then((connectionPool) => {
    onDBConncetion(connectionPool)
    goPatrol()
	}, (error) => {
		onServerError(error)
		process.exit()
	})
