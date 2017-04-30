# On-boarding process for a scholarship provider
class ScholarshipSetupController < ApplicationController
  before_action :authenticate_provider!

  def organization; end

  def new_organization
    @organization = Organization.create(organization_params)
    current_provider.organization = @organization
    current_provider.save

    redirect_to new_scholarship_scholarship_path
  end

  def scholarship
    @scholarship = Scholarship.new
  end

  def new_scholarship
    @scholarship = Scholarship.create(scholarship_params)

    redirect_to new_scholarship_payment_path
  end

  def payment; end

  def new_payment
    @amount = 9999

    customer = Stripe::Customer.create(
      email: stripe_params[:stripeEmail],
      source: stripe_params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: @amount,
      description: 'Scholarship post fee',
      currency: 'usd'
    )

    Payment.create(stripe_charge_id: charge[:id],
                   stripe_customer_id: charge[:customer],
                   organization: current_provider.organization)
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to payment_path
  end

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

  def organization_params
    params.require(:organization)
          .permit(:name, :phone, :email, :website, :address)
  end

  def stripe_params
    params.permit(:stripeToken, :stripeEmail)
  end
end
