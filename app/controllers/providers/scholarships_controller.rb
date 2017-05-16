class Providers::ScholarshipsController < ApplicationController
  include Providers::ScholarshipsHelper
  before_action :authenticate_provider!

  def new
    @scholarship = Scholarship.new
  end

  def create
    @scholarship = Scholarship.create(scholarship_params)
    # redirect to the essay path after creating the general instructions
    redirect_to providers_scholarship_step_path(@scholarship, :essay)
  end

  def edit
    @scholarship = Scholarship.find(params[:id])
    render_wizard @scholarship
  end
end
