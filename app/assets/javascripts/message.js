$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__message__list">
          <div class="chat-main__message__list__upper-info">
            <div class="chat-main__message__list__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__message__list__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message__list">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {

      var html =
       `<div class="chat-main__message__list">
          <div class="chat-main__message__list__upper-info">
            <div class="chat-main__message__list__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__message__list__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message__list">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    // new_messageはformのid属性
    e.preventDefault()
    // e.preventDefault()によってフォームの送信というアクションは為されなくなっています。
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html); 
      $('.chat-main__message').animate({scrollTop: $('.chat-main__message')[0].scrollHeight}, 'fast');        
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  return false;
})
});



// console.log('hoge');これにて検証画面のコンソールにおいてhogeとでていれば発火できていることが確認できる

// $(this)の値について
// onメソッドの内部では、$(this)と書くことでonメソッドを利用しているノードのオブジェクトが参照されます。つまり、今回の場合はform要素自体ということになります

// attrメソッドについて
// attrメソッドによって、引数に指定した属性の値を取得することができます。
// 今回は引数に'action'を指定しているので、form要素のaction属性の値が取得できます。
