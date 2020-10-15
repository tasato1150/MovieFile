class Tweet < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :tweet_genres
  has_many :genres, through: :tweet_genres, dependent: :destroy
  accepts_nested_attributes_for :genres, allow_destroy: true

  validates :title, presence: true
  validates :image, presence: true
  mount_uploader :image, ImageUploader
  validates :rate, numericality: {
    less_than_or_equal_to: 5,
    greater_than_or_equal_to: 1
  }, presence: true

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
