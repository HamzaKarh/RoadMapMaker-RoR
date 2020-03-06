require "application_system_test_case"

class WbsTest < ApplicationSystemTestCase
  setup do
    @wb = wbs(:one)
  end

  test "visiting the index" do
    visit wbs_url
    assert_selector "h1", text: "Wbs"
  end

  test "creating a Wb" do
    visit wbs_url
    click_on "New Wb"

    fill_in "Name", with: @wb.name
    fill_in "Project", with: @wb.project_id
    click_on "Create Wb"

    assert_text "Wb was successfully created"
    click_on "Back"
  end

  test "updating a Wb" do
    visit wbs_url
    click_on "Edit", match: :first

    fill_in "Name", with: @wb.name
    fill_in "Project", with: @wb.project_id
    click_on "Update Wb"

    assert_text "Wb was successfully updated"
    click_on "Back"
  end

  test "destroying a Wb" do
    visit wbs_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Wb was successfully destroyed"
  end
end
