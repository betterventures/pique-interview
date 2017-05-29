class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    new_providers_scholarship_path
  end

  def after_sign_up_path_for(resource)
    new_providers_scholarship_path
  end

  def after_sign_out_path_for(resource)
    new_provider_session_path
  end

  def after_update_path_for(resource)
    new_providers_scholarship_path
  end

  def after_resetting_password_path_for(resource)
    new_providers_scholarship_path
  end
end
