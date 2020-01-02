{//リクエストパラメーターセット
  var key = `AIzaSyBvb9MC4zvtkG53Rh95zUTFXwwISJv-E3M`;//API KEY
  var url = 'https://www.googleapis.com/youtube/v3/search?';//API URL
  url += 'type=video';//動画を検索する
  url += '&part=snippet';
  url += '&q=music';
  url += '&videoEmbeddable=true';
  url += '&videoSyndicated=true';
  url += '&maxResults=6';
  url += '&key=' + key;

  //動作確認が終わったら消すこと。
  console.log(url);
  // HTMLが読み込まれてから実行する処理
  $(function () {
    // youtubeの動画を検索して取得
    $.ajax({
      url: url,
      dataType: 'jsonp'
    }).done(function (data) {
      //データ取得が成功した時の処理
      function setData(data) {
        var result = '';
        var video = '';
        //動画を表示するHTMLを作る
        for (let i = 0; i < data.items.length; i++) {
          video = `<iframe src ="https://www.youtube.com/embed/`;
          video += data.items[i].id.videoId;
          video += `" allowfullscreeen></iframe>`;
          result += `<div class="video">` + video + `</div>`
        }
        // HTMLに反映する
        $(`#videoList`).html(result);
      }
      if (data.items) {
        setData(data);
      } else {
        console.log(data);
        alert('該当するデータが見つかりませんでした。');
      }
    }).fail(function (data) {
      alert('通信に失敗しました。');
    });
  });


}