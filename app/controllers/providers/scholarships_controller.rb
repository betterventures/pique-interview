class Providers::ScholarshipsController < ApplicationController
  before_action :authenticate_provider!

  def new
    @scholarship = Scholarship.new
  end

  def create
    @scholarship = Scholarship.create(scholarship_params)

    redirect_to new_scholarship_payment_path
  end

  private

  def scholarship_params
    params.require(:scholarship)
          .permit(:title, :description, :award_amount, :gpa, :minimum_sat_score,
                  :minimum_act_score, :minimum_recommendations,
                  :generic_recommendation, :for_hs_freshman, :for_hs_sophomore,
                  :for_hs_junior, :for_hs_senior, :for_us_citizen, :for_male,
                  :for_female, :for_black_people, :for_white_people,
                  :for_hispanic_people, :for_asian_people, :for_native_people,
                  :maximum_family_income, :requires_community_service,
                  :number_of_awards, :minimum_age, :flexible_scores,
                  :eligibility, :renewable, :minimum_community_service,
                  location_limitations_attributes: %i[id city state _destroy],
                  supplemental_requirements_attributes: %i[id title _destroy])
  end
end
