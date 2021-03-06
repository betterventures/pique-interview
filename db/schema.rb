# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170803223535) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer "student_id",    null: false
    t.string  "title",         null: false
    t.string  "position_held"
    t.text    "description"
    t.date    "start_date"
    t.date    "end_date"
    t.index ["student_id"], name: "index_activities_on_student_id", using: :btree
  end

  create_table "application_questions", force: :cascade do |t|
    t.integer  "scholarship_id"
    t.text     "prompt"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "answer_type"
    t.index ["scholarship_id"], name: "index_application_questions_on_scholarship_id", using: :btree
  end

  create_table "application_rating_fields", force: :cascade do |t|
    t.integer  "score"
    t.integer  "score_card_field_id"
    t.integer  "application_rating_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["application_rating_id"], name: "index_application_rating_fields_on_application_rating_id", using: :btree
    t.index ["score_card_field_id"], name: "index_application_rating_fields_on_score_card_field_id", using: :btree
  end

  create_table "application_ratings", force: :cascade do |t|
    t.integer  "scholarship_application_id"
    t.integer  "rater_id"
    t.text     "comment"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["rater_id"], name: "index_application_ratings_on_rater_id", using: :btree
    t.index ["scholarship_application_id"], name: "index_application_ratings_on_scholarship_application_id", using: :btree
  end

  create_table "area_of_study_requirements", force: :cascade do |t|
    t.integer "aos_type"
    t.integer "scholarship_id"
    t.index ["scholarship_id"], name: "index_area_of_study_requirements_on_scholarship_id", using: :btree
  end

  create_table "awards", force: :cascade do |t|
    t.integer  "amount",                     null: false
    t.integer  "scholarship_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "scholarship_application_id"
    t.index ["scholarship_application_id"], name: "index_awards_on_scholarship_application_id", using: :btree
    t.index ["scholarship_id"], name: "index_awards_on_scholarship_id", using: :btree
  end

  create_table "essay_requirements", force: :cascade do |t|
    t.text    "prompt"
    t.string  "word_limit"
    t.integer "scholarship_id"
    t.index ["scholarship_id"], name: "index_essay_requirements_on_scholarship_id", using: :btree
  end

  create_table "honor_or_awards", force: :cascade do |t|
    t.integer "student_id",    null: false
    t.string  "title"
    t.string  "provider_name"
    t.date    "awarded_at"
    t.index ["student_id"], name: "index_honor_or_awards_on_student_id", using: :btree
  end

  create_table "location_limitations", force: :cascade do |t|
    t.string   "city"
    t.string   "state"
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_location_limitations_on_scholarship_id", using: :btree
  end

  create_table "org_provided_documents", force: :cascade do |t|
    t.integer  "scholarship_id"
    t.string   "title",          null: false
    t.string   "filepicker_url"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_org_provided_documents_on_scholarship_id", using: :btree
  end

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "phone"
    t.string   "website"
    t.string   "city"
    t.string   "state"
    t.string   "address"
    t.string   "support_email"
    t.string   "logo_url"
  end

  create_table "payments", force: :cascade do |t|
    t.string   "stripe_charge_id"
    t.string   "stripe_customer_id"
    t.integer  "organization_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["organization_id"], name: "index_payments_on_organization_id", using: :btree
  end

  create_table "scholarship_applications", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id", "student_id"], name: "index_scholarship_applications_on_scholarship_id_and_student_id", unique: true, using: :btree
    t.index ["scholarship_id"], name: "index_scholarship_applications_on_scholarship_id", using: :btree
    t.index ["student_id"], name: "index_scholarship_applications_on_student_id", using: :btree
  end

  create_table "scholarships", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.decimal  "gpa"
    t.integer  "minimum_sat_score"
    t.integer  "minimum_act_score"
    t.integer  "minimum_recommendations"
    t.boolean  "generic_recommendation"
    t.boolean  "for_hs_freshman"
    t.boolean  "for_hs_sophomore"
    t.boolean  "for_hs_junior"
    t.boolean  "for_hs_senior"
    t.boolean  "for_us_citizen"
    t.boolean  "for_male"
    t.boolean  "for_female"
    t.boolean  "for_black_people"
    t.boolean  "for_white_people"
    t.boolean  "for_hispanic_people"
    t.boolean  "for_asian_people"
    t.boolean  "for_native_people"
    t.decimal  "maximum_family_income"
    t.boolean  "requires_community_service"
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.integer  "minimum_age"
    t.boolean  "flexible_scores"
    t.text     "eligibility"
    t.boolean  "renewable"
    t.integer  "minimum_community_service"
    t.boolean  "for_two_year_program"
    t.boolean  "for_four_year_program"
    t.integer  "faith_requirement",                    default: 0
    t.date     "cycle_start"
    t.date     "cycle_end"
    t.string   "photo_url"
    t.integer  "organization_id"
    t.boolean  "app_ques_college"
    t.boolean  "app_ques_birthplace"
    t.boolean  "app_ques_parent_occupation"
    t.boolean  "app_ques_accepted_college"
    t.boolean  "app_ques_hs_ceremony_date"
    t.text     "note_from_provider"
    t.boolean  "for_hs_none"
    t.boolean  "for_hs_collect"
    t.boolean  "for_us_refugee"
    t.boolean  "for_us_permanent"
    t.boolean  "for_us_undocumented"
    t.boolean  "for_us_other"
    t.boolean  "for_us_none"
    t.boolean  "for_us_collect"
    t.boolean  "for_financial_need"
    t.boolean  "financial_acceptable_fafsa"
    t.boolean  "financial_acceptable_sar"
    t.boolean  "financial_acceptable_tax"
    t.boolean  "financial_acceptable_w2"
    t.boolean  "for_gender_trans"
    t.boolean  "for_gender_nonbinary"
    t.boolean  "for_gender_none"
    t.boolean  "for_gender_collect"
    t.boolean  "for_people_middle_eastern"
    t.boolean  "for_people_none"
    t.boolean  "for_people_collect"
    t.boolean  "for_program_none"
    t.boolean  "for_program_collect"
    t.boolean  "collect_aos"
    t.boolean  "supp_doc_birth"
    t.boolean  "supp_doc_acceptance"
    t.boolean  "supp_doc_consent"
    t.boolean  "completed_step_general"
    t.boolean  "completed_step_essay"
    t.boolean  "completed_step_audience"
    t.boolean  "completed_step_application_questions"
    t.boolean  "completed_step_supplemental"
    t.index ["organization_id"], name: "index_scholarships_on_organization_id", using: :btree
  end

  create_table "schools", force: :cascade do |t|
    t.string "name",   null: false
    t.string "phone"
    t.string "fax"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip"
  end

  create_table "score_card_fields", force: :cascade do |t|
    t.integer  "score_card_id"
    t.string   "title",          null: false
    t.integer  "possible_score", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["score_card_id"], name: "index_score_card_fields_on_score_card_id", using: :btree
  end

  create_table "score_cards", force: :cascade do |t|
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_score_cards_on_scholarship_id", using: :btree
  end

  create_table "supplemental_requirements", force: :cascade do |t|
    t.string   "title"
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_supplemental_requirements_on_scholarship_id", using: :btree
  end

  create_table "user_to_student_relationships", force: :cascade do |t|
    t.integer  "student_id",            null: false
    t.integer  "parent_or_guardian_id"
    t.integer  "counselor_id"
    t.integer  "relationship_type"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["counselor_id"], name: "index_user_to_student_relationships_on_counselor_id", using: :btree
    t.index ["parent_or_guardian_id"], name: "index_user_to_student_relationships_on_parent_or_guardian_id", using: :btree
    t.index ["relationship_type"], name: "index_user_to_student_relationships_on_relationship_type", using: :btree
    t.index ["student_id"], name: "index_user_to_student_relationships_on_student_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                                  null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "encrypted_password",     default: ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "organization_id"
    t.integer  "role"
    t.string   "job_title"
    t.string   "employer_name"
    t.string   "photo_url"
    t.text     "description"
    t.string   "tagline"
    t.float    "gpa"
    t.string   "phone"
    t.integer  "school_id"
    t.date     "birthdate"
    t.integer  "gender"
    t.string   "major"
    t.integer  "race"
    t.integer  "citizenship"
    t.integer  "degree_type"
    t.integer  "grad_year"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.boolean  "reviewer",               default: false
    t.boolean  "admin",                  default: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
    t.index ["organization_id"], name: "index_users_on_organization_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["school_id"], name: "index_users_on_school_id", using: :btree
  end

  add_foreign_key "application_questions", "scholarships"
  add_foreign_key "application_rating_fields", "application_ratings"
  add_foreign_key "application_rating_fields", "score_card_fields"
  add_foreign_key "application_ratings", "scholarship_applications"
  add_foreign_key "application_ratings", "users", column: "rater_id"
  add_foreign_key "area_of_study_requirements", "scholarships"
  add_foreign_key "awards", "scholarship_applications"
  add_foreign_key "essay_requirements", "scholarships"
  add_foreign_key "location_limitations", "scholarships"
  add_foreign_key "org_provided_documents", "scholarships"
  add_foreign_key "scholarship_applications", "scholarships"
  add_foreign_key "scholarship_applications", "users", column: "student_id"
  add_foreign_key "scholarships", "organizations"
  add_foreign_key "score_card_fields", "score_cards"
  add_foreign_key "score_cards", "scholarships"
  add_foreign_key "supplemental_requirements", "scholarships"
  add_foreign_key "users", "organizations"
  add_foreign_key "users", "schools"
end
