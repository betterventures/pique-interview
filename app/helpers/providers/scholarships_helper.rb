module Providers
  module ScholarshipsHelper

    private

    def scholarship_params
      if params[:scholarship]
        params.require(:scholarship)
              .permit(:title, :description, :eligibility,
                      :photo_url,
                      :renewable,
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
                      :organization_id,
                      awards_attributes: %i[
                        id
                        amount
                        scholarship_id
                        _destroy
                      ],
                      area_of_study_requirements_attributes: %i[
                        id
                        aos_type
                        scholarship_id
                        _destroy
                      ],
                      essay_requirements_attributes: [
                        :id,
                        :word_limit,
                        :scholarship_id,
                        :_destroy,
                        essay_prompts_attributes: [
                          :id,
                          :prompt,
                          :essay_requirement_id,
                          :_destroy
                        ]
                      ],
                      location_limitations_attributes: %i[
                        id
                        city
                        state
                        _destroy
                      ],
                      supplemental_requirements_attributes: %i[
                        id
                        title
                        _destroy
                      ],
                      score_card_attributes: [
                        :id,
                        :scholarship_id,
                        score_card_fields_attributes: [
                          :id,
                          :score_card_id,
                          :title,
                          :possible_score,
                        ],
                      ],
                    )
      else
        {}
      end
    end
  end
end
