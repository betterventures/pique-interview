module Providers
  module ScholarshipsHelper

    private

    def scholarship_params
      if params[:scholarship]
        params.require(:scholarship)
              .permit(:id,
                      :photo_url,
                      :renewable,
                      :minimum_age,
                      :cycle_start, :cycle_end,
                      :title, :description,
                      :eligibility, :note_from_provider,

                      :organization_id,

                      :gpa, :minimum_sat_score, :minimum_act_score, :flexible_scores,
                      :minimum_recommendations, :generic_recommendation,

                      :for_hs_freshman, :for_hs_sophomore,
                      :for_hs_junior, :for_hs_senior,
                      :for_hs_none, :for_hs_collect,
                      :for_two_year_program, :for_four_year_program,

                      :for_us_citizen, :for_us_permanent, :for_us_other, :for_us_collect,
                      :for_us_undocumented, :for_us_refugee, :for_us_none,

                      :for_male, :for_female,
                      :for_gender_trans, :for_gender_nonbinary, :for_gender_none, :for_gender_collect,

                      :for_black_people, :for_white_people, :for_hispanic_people,
                      :for_asian_people, :for_native_people, :for_people_middle_eastern,
                      :for_people_none, :for_people_collect,

                      :for_financial_need,
                      :financial_acceptable_fafsa,
                      :financial_acceptable_sar,
                      :financial_acceptable_tax,
                      :financial_acceptable_w2,

                      :requires_community_service, :minimum_community_service,
                      :faith_requirement,

                      :app_ques_college,
                      :app_ques_birthplace,
                      :app_ques_parent_occupation,
                      :app_ques_accepted_college,
                      :app_ques_hs_ceremony_date,

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
                        scholarship_id
                        city
                        state
                        _destroy
                      ],
                      application_questions_attributes: %i[
                        id
                        scholarship_id
                        prompt
                        answer_type
                        _destroy
                      ],
                      supplemental_requirements_attributes: %i[
                        id
                        title
                        _destroy
                      ],
                      scholarship_applications_attributes: [
                        :id,
                        :scholarship_id,
                        :student_id,
                        :stage,
                        :_destroy,
                        ratings_attributes: [
                          :id,
                          :rater_id,
                          :scholarship_application_id,
                          :comment,
                          :_destroy,
                          fields_attributes: [
                            :id,
                            :application_rating_id,
                            :score_card_field_id,
                            :score,
                            :_destroy,
                          ],
                        ],
                      ],
                      score_card_attributes: [
                        :id,
                        :scholarship_id,
                        score_card_fields_attributes: [
                          :id,
                          :score_card_id,
                          :title,
                          :possible_score,
                          :_destroy,
                        ],
                      ],
                    )
      else
        {}
      end
    end
  end
end
