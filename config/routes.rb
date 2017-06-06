Rails.application.routes.draw do
  # Provider flow
  devise_for :providers, controllers: {
    registrations: 'providers/registrations'
  }
  namespace :providers do
    resources :organizations, only: [:new, :create, :edit, :show]

    # nest payments under scholarships
    resources :scholarships, only: [:new, :create] do
      resources :payments, only: [:new, :create]
      resources :steps, only: [:show, :update], controller: 'scholarship_steps'

      resource :score_card, only: [:new]
    end

    # schol dash route
    # TODO: just put this all in scholarship#show
    get '/scholarships/:scholarship_id/', to: 'scholarship_dashboard#new', as: 'scholarship_dashboard'
    put '/scholarships/:scholarship_id/', to: 'scholarships#update_json', as: 'scholarship_update_json'

    # user account info routes
    get 'account_info', to: 'account_info#edit'
    put 'account_info', to: 'account_info#update'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :provider do
    root 'providers/sessions#new'
  end

  get 'indiegogo/share', to: 'indiegogo#share'
end
