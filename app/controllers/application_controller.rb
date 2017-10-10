class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    return root_path unless current_provider
    # org_creation if no org for user
    return new_providers_organization_path if !current_provider.organization

    # account_info if no account_info (job_title, profile pic, etc)
    return providers_setup_account_path if (!current_provider.job_title ||
                                           !current_provider.photo_url)

    # new, step, or dashboard, depending on where the current provider is at
    return next_scholarship_path_for_provider
  end

  # NB: this is overridden in Providers::RegistrationsController.
  # This method here provides a default.
  def after_sign_up_path_for(resource)
    new_providers_scholarship_path
  end

  def after_sign_out_path_for(resource)
    new_provider_session_path
  end

  def after_update_path_for(resource)
    providers_account_info_path
  end

  def after_resetting_password_path_for(resource)
    new_providers_scholarship_path
  end

  # override redirect path for accepted invitations -> go to Account Info
  def after_accept_path_for(resource)
    self.send("#{resource_class.to_s.downcase.pluralize}_setup_account_path")
  end

  # the next valid scholarship path for the current provider (new, step, or dashboard)
  def next_scholarship_path_for_provider
    #
    # TODO: we need an additional one here where "if not an admin and no scholarship complete
    #       then ask your org to complete scholarship before you can review" page.
    #

    # dashboard if Provider is not an admin or one has already been completed
    if !current_provider.admin? || current_provider.has_completed_scholarship?
      return providers_scholarship_dashboard_path(current_provider.primary_scholarship)
    end

    # new_scholarship if none has been saved for the Org
    return new_providers_scholarship_path if !current_provider.has_saved_scholarship?

    # next incomplete step if one has been saved but not completed
    return providers_scholarship_step_path(
      current_provider.primary_scholarship,
      current_provider.primary_scholarship.next_incomplete_step
    )
  end
end
