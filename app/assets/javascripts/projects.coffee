# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  $('.addButton').on 'click', (e) ->
    id = this.dataset['key']
    render('#problem_form_anchor', id)
  return


render = (anchor, prjct_id) => $(anchor).html
 '<%= escape_javascript(render \'problem\', project_id:'+ prjct_id +') %>'