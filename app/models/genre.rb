class Genre < ApplicationRecord
  has_many :tweet_genres
  has_many :tweets, through: :tweet_genres
end
