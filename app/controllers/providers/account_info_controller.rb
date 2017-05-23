class Providers::AccountInfoController < ApplicationController
  before_action :authenticate_provider!

  def edit
    @user = current_provider
  end

  def update
    @user = current_provider
    @user.update_attributes!(user_params)
    redirect_to new_providers_scholarship_path
  end

  private

  def user_params
    params.require(:user)
          .permit(
            :job_title,
            :employer_name,
            :photo_url
          )
  end
end
