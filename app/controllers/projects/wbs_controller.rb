class Projects::WbsController < ApplicationController
  before_action :get_project
  before_action :get_counteractions, only: [:draw]
  before_action :set_wb, only: [:show, :edit, :update, :destroy]

  # GET /wbs
  # GET /wbs.json
  def index
    @wbs = @project.wb
  end

  # GET /wbs/1
  # GET /wbs/1.json
  def show
  end

  # GET /wbs/new
  def new
    @wb = @project.wbs.build
  end

  # GET /wbs/1/edit
  def edit
  end

  # POST /wbs
  # POST /wbs.json
  def create
    @wb = @project.wbs.build(wb_params)
    respond_to do |format|
      if @wb.save
        format.html { redirect_to project_wb_path(@project, @wb), notice: 'Wb was successfully created.' }
        format.json { render :show, status: :created, location: @wb }
      else
        format.html { render :new }
        format.json { render json: @wb.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wbs/1
  # PATCH/PUT /wbs/1.json
  def update
    respond_to do |format|
      if @wb.update(wb_params)
        format.html { redirect_to @project, notice: 'Wb was successfully updated.' }
        format.json { render :show, status: :ok, location: @wb }
      else
        format.html { render :edit }
        format.json { render json: @wb.errors, status: :unprocessable_entity }
      end
    end
  end


  def draw
  end

  # DELETE /wbs/1
  # DELETE /wbs/1.json
  def destroy
    @wb.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: 'Wb was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wb
      @wb = Wb.find(params[:id])
    end

    def get_counteractions
      @counteractions = @project.counteractions
    end

    def get_project
      @project = Project.find(params[:project_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wb_params
      params.require(:wb).permit(:name, :project_id)
    end
end
