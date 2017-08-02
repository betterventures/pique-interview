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
    @organization = Organization.find(params[:id])
  end

  def update
    @organization = Organization.find(params[:id])
    @organization.update_attributes!(organization_params)
    redirect_to edit_providers_organization_path(@organization)
  end

  def show
  end

  private

  def organization_params
    params.require(:organization)
          .permit(
            :name,
            :phone,
            :website,
            :support_email,
            :address,
            :city,
            :state,
            :logo_url,
          )
  end
end
