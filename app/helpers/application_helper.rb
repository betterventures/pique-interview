module ApplicationHelper
  # return devise errors, one at a time, for display in auth views
  def devise_error_flash
    return "" unless devise_error_messages?

    resource.errors.full_messages.last.downcase.capitalize + "."
  end

  def alert
    super && super.downcase.capitalize
  end

  def devise_error_messages?
    !resource.errors.empty?
  end

  # add additional Devise types here as they are created
  def current_user
    current_provider
  end

end
