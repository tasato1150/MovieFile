class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect to root_path
    else
      render :edit
    end
  end

  def show
    user = User.find(params[:id])
    @name = user.name
    @tweets = user.tweets
    @user_id = user.id
  end

  private
  def user_params
    params.requier(:user).permit(:name, :email)
  end
end
