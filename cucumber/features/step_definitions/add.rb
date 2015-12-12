Given(/^Open the homepage$/) do
  visit('/')
  sleep 1
end


Given(/^Click the add button$/) do
  click_on 'add'
  sleep 1
end


Given(/^Input "([^"]*)" and "([^"]*)"$/) do |title,url|
  fill_in 'add_title',with: title
  fill_in 'add_url',with: url
  sleep 1
end


Given(/^Click the confirm button$/) do
  click_on 'add_confirm'
  sleep 1
end


Given(/^Search "([^"]*)"$/) do |search_content|
  fill_in 'input',with: search_content
  sleep 1
end


Given(/^Have (\d+) result$/) do |expect|
  sleep 1 
  result = all('.list')
  sleep 1
  expect(result.length).to eq expect.to_i
end
