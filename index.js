const promiseFinally = require("promise.prototype.finally")
promiseFinally.shim()

const fetchUrl = require("fetch").fetchUrl;
const dbService = require("./service/db")
const { onStart, onDBConncetion, onServerError } = require("./service/log")

const patrol = () => {
  fetchUrl("http://cms.inha.ac.kr/ctlt/board_pworkshop/list.aspx", function(error, meta, body){
    if (error) {
      error.toString();
      return;
    }
      console.log(body.toString());
  });

  fetchUrl("http://cms.inha.ac.kr/ctlt/board_sworkshop/list.aspx", function(error, meta, body){
    if (error) {
      error.toString();
      return;
    }
      console.log(body.toString());
  });
}

onStart()
dbService.getConnectionPool()
	.then((connectionPool) => {
    onDBConncetion(connectionPool)
    patrol()
	}, (error) => {
		onServerError(error)
		process.exit()
	})
