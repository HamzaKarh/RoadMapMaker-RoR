class Projects::Problems::ActionsController < ApplicationController
  before_action :get_problem
  before_action :set_action, except: [:index, :new, :create] #only: [:show, :edit, :update, :destroy]

  # GET /actions
  # GET /actions.json
  def index
    @actions = @problem.actions
  end

  # GET /actions/1
  # GET /actions/1.json
  def show
  end


  # GET /actions/new
  def new
    @action = @problem.actions.build
  end

  # GET /actions/1/edit
  def edit
  end



  

  # POST /actions
  # POST /actions.json
  def create
    @action =  @problem.actions.build(action_params)
    respond_to do |format|  
      if @action.save
        format.html { redirect_to @problem, notice: 'Action was successfully created.' }
        format.json { render :show, status: :created, location: @action }
      else
        format.html { render :new }
        format.json { render json: @action.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /actions/1
  # PATCH/PUT /actions/1.json
  def update
    respond_to do |format|
      if @action.update(action_params)
        format.html { redirect_to @problem, notice: 'Action problem was successfully updated.' }
        format.json { render :show, status: :ok, location: @action }
      else
        format.html { render :edit }
        format.json { render json: @action.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /actions/1
  # DELETE /actions/1.json
  def destroy
    @action.destroy
    respond_to do |format|
      format.html { redirect_to @problem, notice: 'Action was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  
    def get_problem
      @problem = Problem.find(params[:problem_id])
    end

    
    # Use callbacks to share common setup or constraints between actions.
    def set_action
      @action = @problem.actions.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def action_params
      params.require(:action).permit(:name, :description, :problem_id, :project_id)
    end
end
