class Tweet < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :tweet_genres
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
  has_many :genres, through: :tweet_genres, dependent: :destroy
  accepts_nested_attributes_for :genres, allow_destroy: true

  validates :title, presence: true
  validates :rate, presence:  {message: "を登録してください"}, 
   numericality: {
    less_than_or_equal_to: 5,
    greater_than_or_equal_to: 1
  }
  validates :images, presence: {message: "を1枚以上登録してください"}
  validates :genres, presence: {message: "を1つ以上選択してください"}

  def self.search(search)
    if search != ""
      Tweet.where('title LIKE(?)', "%#{search}%")
    else
      Tweet.all
    end
  end

  def like_user(user_id)
    likes.find_by(user_id: user_id)
  end

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :category
end
