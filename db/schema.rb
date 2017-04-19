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

ActiveRecord::Schema.define(version: 20170419034604) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "phone"
    t.string   "address"
    t.string   "email"
    t.string   "website"
  end

  create_table "payments", force: :cascade do |t|
    t.string   "stripe_charge_id"
    t.string   "stripe_customer_id"
    t.integer  "organization_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["organization_id"], name: "index_payments_on_organization_id", using: :btree
  end

  create_table "providers", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "organization_id"
    t.index ["email"], name: "index_providers_on_email", unique: true, using: :btree
    t.index ["organization_id"], name: "index_providers_on_organization_id", using: :btree
    t.index ["reset_password_token"], name: "index_providers_on_reset_password_token", unique: true, using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
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
    t.integer  "role_id"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
  end

  add_foreign_key "providers", "organizations"
  add_foreign_key "users", "roles"
end
