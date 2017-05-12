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
    end
  end

  get 'new-scholarship/scholarship',
      to: 'scholarship_setup#scholarship'
  post 'new-scholarship/scholarship/new',
       to: 'scholarship_setup#new_scholarship'

  get 'new-scholarship/payment', to: 'scholarship_setup#payment'
  post 'new-scholarship/payment', to: 'scholarship_setup#new_payment'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  get 'indiegogo/share', to: 'indiegogo#share'
end
