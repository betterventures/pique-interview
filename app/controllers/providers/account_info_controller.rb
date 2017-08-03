class Providers::AccountInfoController < ApplicationController
  before_action :authenticate_provider!

  def edit
    @user = current_provider
  end

  def initial
    @user = current_provider
  end

  def update
    @user = current_provider
    @user.update_attributes!(user_params)
    redirect_to after_sign_in_path_for(@user)
  end

  def update_password
    @user = current_provider
    if @user.update_with_password(user_params)
      bypass_sign_in(@user)
      flash[:password_success] = 'Password updated!'
      redirect_to providers_account_info_path
    else
      flash[:password_error] = 'Current password was incorrect or passwords did not match.'
      render :edit
    end
  end

  private

  def user_params
    params.require(:user)
          .permit(
            :job_title,
            :employer_name,
            :photo_url,
            :password,
            :password_confirmation,
            :current_password,
          )
  end
end
