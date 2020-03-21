class Api::MessagesController < ApplicationController
  # ::で繋げることを名前空間と呼び同じ名前のファイルが存在しても部署ごと分けられていると言う意味
  def index
     # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    group = Group.find(params[:group_id])
     # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id].to_i
     # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
   end
 end