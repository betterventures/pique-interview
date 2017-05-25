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

ActiveRecord::Schema.define(version: 20170525044733) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "area_of_study_requirements", force: :cascade do |t|
    t.integer "aos_type"
    t.integer "scholarship_id"
    t.index ["scholarship_id"], name: "index_area_of_study_requirements_on_scholarship_id", using: :btree
  end

  create_table "awards", force: :cascade do |t|
    t.integer  "amount",         null: false
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_awards_on_scholarship_id", using: :btree
  end

  create_table "essay_prompts", force: :cascade do |t|
    t.text    "prompt"
    t.integer "essay_requirement_id"
    t.index ["essay_requirement_id"], name: "index_essay_prompts_on_essay_requirement_id", using: :btree
  end

  create_table "essay_requirements", force: :cascade do |t|
    t.text    "prompt"
    t.integer "word_limit"
    t.integer "scholarship_id"
    t.index ["scholarship_id"], name: "index_essay_requirements_on_scholarship_id", using: :btree
  end

  create_table "location_limitations", force: :cascade do |t|
    t.string   "city"
    t.string   "state"
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_location_limitations_on_scholarship_id", using: :btree
  end

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "phone"
    t.string   "website"
    t.string   "city"
    t.string   "state"
    t.string   "address"
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
    t.integer  "user_id"
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_scholarship_applications_on_scholarship_id", using: :btree
    t.index ["user_id"], name: "index_scholarship_applications_on_user_id", using: :btree
  end

  create_table "scholarships", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "award_amount"
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
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "number_of_awards"
    t.integer  "minimum_age"
    t.boolean  "flexible_scores"
    t.text     "eligibility"
    t.boolean  "renewable"
    t.integer  "minimum_community_service"
    t.boolean  "for_two_year_program"
    t.boolean  "for_four_year_program"
    t.integer  "faith_requirement",          default: 0
    t.date     "cycle_start"
    t.date     "cycle_end"
    t.string   "photo_url"
  end

  create_table "supplemental_requirements", force: :cascade do |t|
    t.string   "title"
    t.integer  "scholarship_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["scholarship_id"], name: "index_supplemental_requirements_on_scholarship_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                               null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
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
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["organization_id"], name: "index_users_on_organization_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "area_of_study_requirements", "scholarships"
  add_foreign_key "essay_prompts", "essay_requirements"
  add_foreign_key "essay_requirements", "scholarships"
  add_foreign_key "location_limitations", "scholarships"
  add_foreign_key "scholarship_applications", "scholarships"
  add_foreign_key "scholarship_applications", "users"
  add_foreign_key "supplemental_requirements", "scholarships"
  add_foreign_key "users", "organizations"
end
