# Devise portion of Provider signup
class Providers::RegistrationsController < Devise::RegistrationsController
  # allow extra attributes to get through Devise's parameter sanitizer
  before_action :configure_permitted_parameters

  protected

  def after_sign_up_path_for(_resource)
    new_providers_organization_path
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [
        :first_name,
        :last_name,
        :role,
      ]
    )
  end
end
