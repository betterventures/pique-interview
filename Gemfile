source 'https://rubygems.org'

gem 'cocoon', '~> 1.2.9'
gem 'coffee-rails', '~> 4.2'
gem 'devise', '~> 4.2.1'
gem 'devise_invitable', '~> 1.7.0'
gem 'filestack-rails', require: 'filepicker-rails'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails'
# Enable filepicker when page is rendered via Turbolinks.
# Necessary because JS in the <head> is not reloaded, as in our Scholarship wizard.
gem 'jquery-turbolinks'
gem 'pg', '~> 0.18.4'
gem 'puma', '~> 3.7.1'
gem 'rails', '= 5.0.2'
gem 'react_on_rails', '~> 7.0.4'
gem 'sass-rails', '~> 5.0'
gem 'stripe', '~> 2.4.0'
gem 'turbolinks', '~> 5'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'uglifier', '>= 3.2.0'
gem 'wicked'
gem 'foreman'

# mail
gem 'mandrill-api'

# datepicker
gem 'bootstrap-sass', '~> 3.3.6'
gem 'momentjs-rails', '>= 2.9.0'
gem 'bootstrap3-datetimepicker-rails', '~> 4.17.47'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'rubocop', '0.48.1', require: false
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'

  # mail
  gem 'letter_opener'
end

# react_on_rails' webpacker_lite fork of Webpacker
# - some simplified configuration
# - unclear whether they'll keep it or go back to Webpacker as it evolves
gem 'mini_racer', platforms: :ruby
gem 'webpacker_lite'
