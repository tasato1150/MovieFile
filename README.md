# README
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|name|string|null: false, unique: true|

### Association
- has_many :tweets
- has_many :comments, dependent: :destroy
- has_many :likes, dependent: :destroy
- has_many :like_tweets, through: :likes, source: :tweet

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|title|string|null: false|
|rate|float|null: false|
|text|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :comments, dependent: :destroy
- has_many :likes, dependent: :destroy
- has_many :liked_users, through: :likes, source: :user
- has_many :tweet_genres
- has_many :genres, through: :tweet_genres, dependent: :destroy
- accepts_nested_attributes_for :genres, allow_destroy: true

## genresテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :tweet_genres
- has_many :tweets, through: :tweet_genres

## genresテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|name|string|null: false|

### Association
- has_many :tweet_genres
- has_many :tweets, through: :tweet_genres

## tweet_genresテーブル
|Column|Type|Options|
|------|----|-------|
|tweet_id|integer|null: false, foreign_key: true|
|genre_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :tweet
- belongs_to :genre

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|tweet_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :tweet
- belongs_to :user

## likesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|tweet_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :tweet
- belongs_to :user
