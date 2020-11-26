class GenresController < ApplicationController

  def index
    @tweets = Tweet.includes(:user).order("created_at DESC")
  end

  def show
    genre = Genre.find(params[:id])
    @name = genre.name
    @tweets = genre.tweets.order("created_at DESC")
  end

end