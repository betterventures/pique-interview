require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PiqueWeb
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.filepicker_rails.api_key = Rails.application.secrets.filepicker_api_key

    # Configure Babel Transpilers
    # - Commented out, as we are transpiling our React components with Webpacker
    #config.react.jsx_transform_options = {}

    # Configure React-Rails
    # - Some helpful helpers
    config.react.camelize_props = true  # always camelize props passed to `react_component`
  end
end
