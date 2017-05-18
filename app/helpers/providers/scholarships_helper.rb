module Providers
  module ScholarshipsHelper

    private

    def scholarship_params
      if params[:scholarship]
        params.require(:scholarship)
              .permit(:title, :description, :eligibility,
                      :photo_url,
                      :number_of_awards, :award_amount, :renewable,
                      :minimum_age,
                      :cycle_start, :cycle_end,
                      :gpa, :minimum_sat_score, :minimum_act_score, :flexible_scores,
                      :minimum_recommendations, :generic_recommendation,
                      :for_hs_freshman, :for_hs_sophomore,
                      :for_hs_junior, :for_hs_senior,
                      :for_us_citizen,
                      :for_male, :for_female,
                      :for_black_people, :for_white_people, :for_hispanic_people,
                      :for_asian_people, :for_native_people,
                      :maximum_family_income,
                      :requires_community_service, :minimum_community_service,
                      location_limitations_attributes: %i[id city state _destroy],
                      supplemental_requirements_attributes: %i[id title _destroy])
      else
        {}
      end
    end
  end
end
