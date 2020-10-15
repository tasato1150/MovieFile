class TweetsController < ApplicationController
  before_action :set_tweet, only: [:edit, :show]

  def index
    @tweet = Tweet.new
    @tweets = Tweet.includes(:user).order("created_at DESC")
    @likes = Tweet.where(rate: '4').or(Tweet.where(rate: '5'))
  end

  def new
    @tweet = Tweet.new
    @genres = Genre.all
  end

  def create
    @tweet = Tweet.create(tweet_params)
    if @tweet.save
      redirect_to root_path, notice: '投稿完了しました'
    else
      flash.now[:alert] = '※必須項目を入力してください（タイトル/おすすめ度/画像）'
      render "/tweets/new"
    end
  end

  def destroy
    tweet = Tweet.find(params[:id])
    tweet.destroy
    redirect_to "/users/#{current_user.id}"
  end

  def edit
  end

  def update
    tweet = Tweet.find(params[:id])
    tweet.update(tweet_params)
    redirect_to "/users/#{current_user.id}"
  end

  def show
    @comment = Comment.new
    @comments = @tweet.comments.includes(:user)
    @like = Like.new
  end

  def search
    @tweets = Tweet.search(params[:keyword])
  end

  private

  def tweet_params
    params.require(:tweet).permit(:text, :image, :title, :rate, {genre_ids: []}).merge(user_id: current_user.id)
  end

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end

end
