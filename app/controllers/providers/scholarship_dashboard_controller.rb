class Providers::ScholarshipDashboardController < ApplicationController
  include Providers::ScholarshipsHelper
  before_action :authenticate_provider!

  def new
    @scholarship = Scholarship.find(params[:scholarship_id])
    @applicants = @scholarship.applicants_by_stage_json
    @user = current_provider.to_json
  end
end
