class Projects::Problems::CounteractionsController < ApplicationController
  before_action :get_problem
  before_action :get_project
  before_action :set_counteraction, only: [:show, :edit, :update, :destroy]


  # GET /counteractions
  # GET /counteractions.json
  def index
    @counteractions = @problem.counteractions
  end

  # GET /counteractions/1
  # GET /counteractions/1.json
  def show
  end


  # GET /counteractions/new
  def new
    @counteraction = @problem.counteractions.build
    @counteraction.project = @project
  end

  # GET /counteractions/1/edit
  def edit
  end

  # POST /counteractions
  # POST /counteractions.json
  def create
    @counteraction =  @problem.counteractions.build(counteraction_params)
    @counteraction.project = @project
    respond_to do |format|  
      if @counteraction.save
        format.html { redirect_to @project, notice: 'counteraction was successfully created.' }
        format.json { render :show, status: :created, location: @counteraction }
      else
        format.html { render :new }
        format.json { render json: @counteraction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /counteractions/1
  # PATCH/PUT /counteractions/1.json
  def update
    respond_to do |format|
      if @counteraction.update(counteraction_params)
        format.html { redirect_to @project, notice: 'Action problem was successfully updated.' }
        format.json { render :show, status: :ok, location: @counteraction }
      else
        format.html { render :edit }
        format.json { render json: @counteraction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /counteractions/1
  # DELETE /counteractions/1.json
  def destroy
    @counteraction.destroy
    respond_to do |format|
      format.html { redirect_to @project, notice: 'Action was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def get_problem
      @problem = Problem.find(params[:problem_id])
    end

    def get_project
      @project = Project.find(params[:project_id])
    end
    
    # Use callbacks to share common setup or constraints between counteractions.
    def set_counteraction
      @counteraction = @problem.counteractions.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def counteraction_params
      params.require(:counteraction).permit(:name, :description, :problem_id, :project_id)
      #json = params.require(:counteraction)
      #{counteraction: JSON.parse(json).permit(:name, :description, :problem_id, :project_id)}
    end
end
  