class Providers::ScholarshipsController < ApplicationController
  include Providers::ScholarshipsHelper
  before_action :authenticate_provider!
  before_action :allow_only_one_scholarship!, only: [:new]

  def new
    @scholarship = Scholarship.new
  end

  def create
    @scholarship = Scholarship.create!(scholarship_params)

    # seed the scholarship with applicants on create
    Providers::SeedApplicantsHelper.seed_dummy_models!
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

    # in order to update applicant state when an Application is Awarded,
    # we can either return the applicants here,
    # or include them in Scholarship,
    # OR base applicants in the app on the applica*tions*
    render status: 200, :json => {
      scholarship: @scholarship,
      applicants: @scholarship.applicants_by_stage_json(current_provider.id),
    }
  end

  private

  def allow_only_one_scholarship!
    if current_provider.has_saved_scholarship?
      redirect_to providers_scholarship_dashboard_path(current_provider.primary_scholarship)
    end
  end

end
