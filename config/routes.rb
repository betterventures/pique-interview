Rails.application.routes.draw do
  devise_for :providers, controllers: {
    registrations: 'providers/registrations'
  }

  # Setup a scholarship
  get 'new-scholarship/organization', to: 'scholarship_setup#organization'
  post 'new-scholarship/organization/new',
       to: 'scholarship_setup#new_organization'

  get 'new-scholarship/scholarship',
      to: 'scholarship_setup#scholarship'
  post 'new-scholarship/scholarship/new',
       to: 'scholarship_setup#new_scholarship'

  get 'new-scholarship/payment', to: 'scholarship_setup#payment'
  post 'new-scholarship/payment', to: 'scholarship_setup#new_payment'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  get 'indiegogo/share', to: 'indiegogo#share'
end
