$(function() {
  //一致するユーザーがいた場合の処理
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    //作ったhtmlをぶち込む
    $("#user-search-result").append(html);
  }
  //一致するユーザーがいなかった場合の処理
  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    //作ったhtmlをぶち込む
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    //作ったhtmlをぶち込む
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    //userのidをinputタグの初期値としそれをnameを使ってgroupsコントローラ内のparamsで受け取る準備
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    //作ったinputタグをaddDeleteUser内で作ったhtml内にぶち込む
    $(`#${userId}`).append(html);
  }
  //検索欄に文字入力されるたびに処理を行う
  $("#user-search-field").on("keyup", function() {
    //検索欄に入力された文字をvalで取得し変数inputに代入
    let input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      type: "GET",//httpメソッド(今回はget)
      url: "/users",//送る先のurl
      //keyを自分で決め(今回は"keyword"と定義)valueには先ほど検索欄から取得し代入したinputの値を使う
      data: { keyword: input },
      dataType: "json"
    })
    //jbuilderファイルで作った配列を引数にしdone関数を起動
      .done(function(users) {
        //if,else if,elseどの場合においても、処理後は、すでに検索欄に出力されている情報を削除する。
        $("#user-search-result").empty();
        //検索に一致するユーザーが０じゃない場合(いる場合)
        if (users.length !== 0) {
          //usersという配列をforEachで分解し、ユーザーごとにaddUser関数に飛ばす(処理は後ほど)
          users.forEach(function(user) {
            addUser(user);
          });
          //入力欄に文字が入力されてない場合処理を終了
        } else if (input.length == 0) {
          return false;
          //検索に一致するユーザーがいない場合はaddNoUserに飛ばす
        } else {
          addNoUser();
        }
      })
      // エラー時の処理を行う
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  //追加ボタンがクリックされた時の処理を記述する
  $(document).on("click", ".chat-group-user__btn--add", function() {
    // $(document).onすることで常に最新のHTMLの情報を取得することができます。
    //  $(document).onを用いることで、Ajax通信で作成されたHTMLの情報を取得することができます。
    //クリックされたところのデータを取得し各変数に代入
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    //クリックされたところのhtmlを親要素をごと消す（検索結果から消す）
    $(this)
      .parent()
      .remove();
      // 追加ボタンの対象であるユーザー情報を変数へ代入し、HTMLを描画します。その際、検索結果欄からメンバー欄へ移動するように見せるために検索結果欄からremoveメソッドを使用してHTMLは削除
      //削除ボタンの書いてあるhtmlを呼び出す処理に飛ばす
    addDeleteUser(userName, userId);
    //ユーザーをグループに登録するための処理
    addMember(userId);
    // ユーザーの追加や削除の情報は addMember というメソッドを作成してコントロールしています。ここではメンバーを追加する際に情報を user_idsへ追加できるような仕組みを作り、削除ボタンを押すと同時にその情報も削除されるように実装しています。
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});



















// $(function() {
//   function addUser(user) {
//     let html = `
//       <div class="chat-group-user clearfix">
//         <p class="chat-group-user__name">${user.name}</p>
//         <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
//       </div>
//     `;
//     $("#user-search-result").append(html);
//   }

//   function addNoUser() {
//     let html = `
//       <div class="chat-group-user clearfix">
//         <p class="chat-group-user__name">ユーザーが見つかりません</p>
//       </div>
//     `;
//     $("#user-search-result").append(html);
//   }
//   $("#user-search-field").on("keyup", function() {
//     let input = $("#user-search-field").val();
//     $.ajax({
//       type: "GET",
//       url: "/users",
//       data: { keyword: input },
//       dataType: "json"
//     })
//       .done(function(users) {
//         $("#user-search-result").empty();

//         if (users.length !== 0) {
//           users.forEach(function(user) {
//             addUser(user);
//           });
//         } else if (input.length == 0) {
//           return false;
//         } else {
//           addNoUser();
//         }
//       })
//       .fail(function() {
//         alert("通信エラーです。ユーザーが表示できません。");
//       });
//   });
// });