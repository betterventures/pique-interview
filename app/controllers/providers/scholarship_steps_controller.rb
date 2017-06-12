class Providers::ScholarshipStepsController < ApplicationController
  include Providers::ScholarshipsHelper
  include Wicked::Wizard
  steps :general, :essay, :audience, :application_questions, :supplemental

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
      new_providers_scholarship_payment_path(@scholarship.id)
    else
      root_url
    end
  end

end
