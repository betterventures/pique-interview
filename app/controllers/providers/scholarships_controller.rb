class Providers::ScholarshipsController < ApplicationController
  include Providers::ScholarshipsHelper
  before_action :authenticate_provider!

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
end
