const fetchUrl = require("fetch").fetchUrl;
const { sendPush } = require("./db")
const patrolConfig = require("../config/patrolConfig.json")

const patrol = () => {
  patrolConfig.site.map(o => {
    fetchUrl(o.url, function(error, meta, body){
      let title = o.title
      if (error) {
        let errMsg = error.toString();
        sendPush(title + ' error', errMsg)
      }
      if (body.toString().includes(o.includeString)) {
        sendPush(title + ' error', o.errorMsg)
      }
    });
  })

  // fetchUrl("http://cms.inha.ac.kr/ctlt/board_pworkshop/list.aspx", function(error, meta, body){
  //   let title = 'workshop & seminar'
  //   if (error) {
  //     let errMsg = error.toString();
  //     sendPush(title + ' error', errMsg)
  //   }
  //   if (body.toString().includes('오류')) {
  //     sendPush(title + ' error', '워크숍 & 세미나 화면 오류 발생')
  //   }
  // });

  // fetchUrl("http://cms.inha.ac.kr/ctlt/board_sworkshop/list.aspx", function(error, meta, body){
  //   let title = 'Learning method workshop'
  //   if (error) {
  //     let errMsg = error.toString();
  //     sendPush(title + ' error', errMsg)
  //   }
  //   if (body.toString().includes('오류')) {
  //     sendPush(title + ' error', '학습법 워크숍 화면 오류 발생')
  //   }
  // });
}

module.exports = {
	patrol: patrol
}