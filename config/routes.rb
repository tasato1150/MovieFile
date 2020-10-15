Rails.application.routes.draw do
  devise_for :users
  root "tweets#index"
  resources :tweets do
    resources :likes, only: [:create, :destroy]
    resources :comments, only: :create
    collection do
      get 'search'
    end
  end
  resources :users, only: [:index, :edit, :update, :show] do
    collection do
      get :likes
    end
  end
  get 'search' => 'tweets#search'
  resources :genres, only: [:index, :show]
end
