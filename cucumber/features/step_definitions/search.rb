Given(/^Open the homepage$/) do
  visit('/')
  sleep 1       # Write code here that turns the phrase above into concrete actions
end


Given(/^Search "([^"]*)"$/) do |search_content|
  fill_in 'input',with: search_content # Write code here that turns the phrase above into concrete actions
  sleep 1
end


Given(/^Have (\d+) result$/) do |expect|
  sleep 1 # Write code here that turns the phrase above into concrete actions
  result = all('.list')
  sleep 1
  expect(result.length).to eq expect.to_i
end
