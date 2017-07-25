class Providers::ScholarshipDashboardController < ApplicationController
  include Providers::ScholarshipsHelper

  # import the `react_component`/`redux_store` helper methods
  include ReactOnRails::Controller

  # ensure logged in
  before_action :authenticate_provider!
  # ensure provider owns this scholarship
  before_action -> { authorize_provider_access_to_scholarship!(params[:scholarship_id]) }
  # populate data for the store
  before_action :populate_redux_data
  # initialize the shared Redux store
  before_action :initialize_shared_store

  # for server rendering of react components
  rescue_from ReactOnRails::PrerenderError do |err|
    Rails.logger.error(err.message)
    Rails.logger.error(err.backtrace.join("\n"))
    redirect_to client_side_hello_world_path,
                flash: { error: "Error prerendering in react_on_rails. See server logs." }
  end

  def new
    # ivar fetching/setup is done early in :populate_redux_data
  end

  private

  def populate_redux_data
    @scholarship = Scholarship.find(params[:scholarship_id])
    @user = current_provider.to_json

    @props = {
      app: {
        scholarships: Scholarship.by_location(@scholarship),
        applicants: @scholarship.applicants_by_stage_json(current_provider.id),
      },
      user: @user,
    }
  end

  def initialize_shared_store
    @store = redux_store("SharedReduxStore", props: @props)
  end

end
