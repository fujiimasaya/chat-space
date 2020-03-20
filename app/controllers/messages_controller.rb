class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      end
      # redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

# creatアクション
# json形式で来たリクエストに対してjson形式のレスポンスを返すための記述を行います。
# respond_toメソッドを利用すると、フォーマットに応じたレスポンスを作成することができます。
# この後、対応するcreate.json.jbuilderを作成することで、レスポンスをjson形式で返すことができます。