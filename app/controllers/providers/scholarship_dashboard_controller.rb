class Providers::ScholarshipDashboardController < ApplicationController
  include Providers::ScholarshipsHelper

  # import the `react_component`/`redux_store` helper methods
  include ReactOnRails::Controller

  before_action :authenticate_provider!

  # populate data for the store
  before_action :populate_redux_data
  # initialize the shared Redux store
  before_action :initialize_shared_store

  rescue_from ReactOnRails::PrerenderError do |err|
    Rails.logger.error(err.message)
    Rails.logger.error(err.backtrace.join("\n"))
    redirect_to client_side_hello_world_path,
                flash: { error: "Error prerendering in react_on_rails. See server logs." }
  end

  def new
    # data fetching/setup is done in :populate_redux_data
  end

  private

  def initialize_shared_store
    @store = redux_store("SharedReduxStore", props: @app_props_server_render)
  end

  def populate_redux_data
    @scholarship = Scholarship.find(params[:scholarship_id])
    @applicants = @scholarship.applicants_by_stage_json
    @user = current_provider.to_json

    @props = {
      scholarship: @scholarship.to_json,
      applicants: @applicants,
      user: @user,
      store: @store,
    }
  end
end
