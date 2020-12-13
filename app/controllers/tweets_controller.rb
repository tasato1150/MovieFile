class TweetsController < ApplicationController
  before_action :set_tweet, only: [:edit, :show]

  def index
    @tweet = Tweet.new
    @tweets = Tweet.includes(:user, :images).order("created_at DESC").limit(20)
    @likes = Tweet.where(rate: '4').or(Tweet.where(rate: '4.5')).or(Tweet.where(rate: '5')).order("rate DESC")
    @likes_ranks = Tweet.find(Like.group(:tweet_id).order('count(tweet_id) desc').limit(10).pluck(:tweet_id))
  end

  def new
    @tweet = Tweet.new
    @tweet.images.new
    @genres = Genre.all
  end

  def create
    @tweet = Tweet.create(tweet_params)
    if @tweet.save
      redirect_to root_path
    else
      unless @tweet.images.present?
        @tweet.images.new
        render :new
      else
        render :new
      end
    end
  end

  def destroy
    tweet = Tweet.find(params[:id])
    tweet.destroy
    redirect_to root_path
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
    params.require(:tweet).permit(:text, :image, :title, :rate, :date, {genre_ids: []}, images_attributes: [:src, :_destroy, :id]).merge(user_id: current_user.id)
  end

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end

end
