class Providers::ScholarshipStepsController < ApplicationController
  include Providers::ScholarshipsHelper
  include Wicked::Wizard
  steps :general, :essay, :audience, :application_questions, :supplemental

  before_action :authenticate_provider!
  before_action -> { authorize_provider_access_to_scholarship!(params[:scholarship_id]) }

  def show
    @scholarship = Scholarship.find(params[:scholarship_id])
    render_wizard
  end

  def update
    @scholarship = Scholarship.find(params[:scholarship_id])
    @scholarship.update_attributes!(scholarship_params)
    render_wizard @scholarship
  end

  private

  def finish_wizard_path
    if @scholarship && @scholarship.id
      providers_scholarship_dashboard_path
    else
      root_url
    end
  end

end
