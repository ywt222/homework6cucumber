require 'capybara'
require 'capybara/cucumber'


Capybara.register_driver :selenium do |app|
  options = {
    browser: :chrome
  }
 Capybara::Selenium::Driver.new(app, options)
end
Capybara.default_driver=:selenium
Capybara.app_host='http://localhost:8080'
