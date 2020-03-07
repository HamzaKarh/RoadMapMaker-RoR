require 'test_helper'

class WbsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @wb = wbs(:one)
  end

  test "should get index" do
    get wbs_url
    assert_response :success
  end

  test "should get new" do
    get new_wb_url
    assert_response :success
  end

  test "should create wb" do
    assert_difference('Wb.count') do
      post wbs_url, params: { wb: { name: @wb.name, project_id: @wb.project_id } }
    end

    assert_redirected_to wb_url(Wb.last)
  end

  test "should show wb" do
    get wb_url(@wb)
    assert_response :success
  end

  test "should get edit" do
    get edit_wb_url(@wb)
    assert_response :success
  end

  test "should update wb" do
    patch wb_url(@wb), params: { wb: { name: @wb.name, project_id: @wb.project_id } }
    assert_redirected_to wb_url(@wb)
  end

  test "should destroy wb" do
    assert_difference('Wb.count', -1) do
      delete wb_url(@wb)
    end

    assert_redirected_to wbs_url
  end
end
