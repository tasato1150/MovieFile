class CreateTweets < ActiveRecord::Migration[6.0]
  def change
    create_table :tweets do |t|
      t.text :text
      t.string :title
      t.float :rate
      t.date :date
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
