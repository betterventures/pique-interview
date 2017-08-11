class LandingPagesController < ApplicationController

  # import the `react_component`/`redux_store` helper methods
  include ReactOnRails::Controller

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
    # no scholarship or authed-user data needed for the static site root
    @props = {
    }
  end

  def initialize_shared_store
    @store = redux_store("SharedReduxStore", props: @props)
  end

end
