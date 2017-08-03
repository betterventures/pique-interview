class Providers::InvitationsController < Devise::InvitationsController
  # allow extra attributes to get through Devise's parameter sanitizer
  before_action :configure_permitted_parameters

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :invite,
      keys: [
        :email,
        :first_name,
        :last_name,
        :role,
        :admin,
        :reviewer,
        :organization_id,
      ]
    )
  end

  #
  # Override DeviseInvitable's implementation of invite_resource
  # because for some reason its version of invite_params
  # does not return the actual params to pass into `invite!`
  #
  def invite_resource(&block)
    # sanitize the params via devise; does not return the remaining params for some reason
    invite_params

    # invites a Provider (resource_class),
    # passing the sanitized params (invitation_params)
    resource_class.invite!(invitation_params, current_inviter, &block)
  end

  # redefine the params to pass down into the model
  def invitation_params
    if params[:invitation]
      params.require(:invitation)
        .permit(
          :email,
          :first_name,
          :last_name,
          :password,
          :password_confirmation,
          :role,
          :admin,
          :reviewer,
          :organization_id,
        )
    else
      {}
    end
  end
end
