var fetchUrl = require("fetch").fetchUrl;

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