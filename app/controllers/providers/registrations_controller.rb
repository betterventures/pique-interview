class Providers::RegistrationsController < Devise::RegistrationsController

  protected

  def after_sign_up_path_for(_resource)
    new_scholarship_organization_path
  end
end
