Given(/^Open the homepage$/) do
  visit('/')
  sleep 1
end


Given(/^Click one delete button$/) do
  click_on 'delete'
  sleep 1
end


Given(/^Click the confirm button$/) do
  click_on 'delete_confirm'
  sleep 1
end


Given(/^Have (\d+) result$/) do |expect|
  sleep 1 
  result = all('.list')
  sleep 1
  expect(result.length).to eq expect.to_i
end
