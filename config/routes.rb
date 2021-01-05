Rails.application.routes.draw do
  get 'images/create'
  get 'images/destroy'
  get 'images/new'
  get 'images/show'
  devise_for :users
  root "tweets#index"
  resources :tweets do
    resources :likes, only: [:create, :destroy]
    resources :comments, only: :create
    collection do
      get 'search'
    end
    resources :images, only: [:create, :destroy, :new, :show]
  end
  resources :users, only: [:index, :edit, :update, :show] do
    collection do
      get :likes
    end
  end
  get 'search' => 'tweets#search'
  resources :genres, only: [:index, :show]
end
