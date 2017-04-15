class ScholarshipSetupController < ApplicationController
  before_action :authenticate_provider!

  def organization
  end

  def new_organization
    @organization = Organization.create(organization_params)
    current_provider.organization = @organization
    current_provider.save
  end

  def organization_params
    params.require(:organization)
          .permit(:name, :phone, :email, :website, :address)
  end
end
