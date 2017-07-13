class Providers::ScholarshipsController < ApplicationController
  include Providers::ScholarshipsHelper
  before_action :authenticate_provider!
  before_action :redirect_if_has_saved_scholarship, only: [:new]

  def new
    @scholarship = Scholarship.new
  end

  def create
    @scholarship = Scholarship.create(scholarship_params)

    # seed the scholarship with applicants on create
    Providers::SeedApplicantsHelper.seed_dummy_users!
    Providers::SeedApplicantsHelper.apply_to_scholarships!(@scholarship)

    # redirect to the essay path after creating the general instructions
    redirect_to providers_scholarship_step_path(@scholarship, :essay)
  end

  def edit
    @scholarship = Scholarship.find(params[:scholarship_id])
    render_wizard @scholarship
  end

  def update_json
    @scholarship = Scholarship.find(params[:scholarship_id])
    @scholarship.update_attributes!(scholarship_params)
    render status: 200, :json => { scholarship: @scholarship.to_json }
  end

  private

  def redirect_if_has_saved_scholarship
    if current_provider.has_saved_scholarship?
      redirect_to providers_scholarship_dashboard_path(current_provider.primary_scholarship)
    end
  end

end
