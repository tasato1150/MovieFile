class TweetGenre < ApplicationRecord
  belongs_to :tweet
  belongs_to :genre
end
