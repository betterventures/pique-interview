class Providers::OrganizationsController < ApplicationController
  before_action :authenticate_provider!

  def new
  end

  def create
    @organization = Organization.create(organization_params)
    current_provider.organization = @organization
    current_provider.save

    # continue sign-in flow: redirect to account_info after organization
    redirect_to providers_account_info_path
  end

  def edit
  end

  def show
  end

  private

  def organization_params
    params.require(:organization)
          .permit(:name, :phone, :email, :website, :address, :city, :state)
  end
end
