class GenresController < ApplicationController

  def index
  end

  def show
    genre = Genre.find(params[:id])
    @name = genre.name
    @tweets = genre.tweets
  end

end