class Providers::PaymentsController < ApplicationController
  include Providers::ScholarshipsHelper

  before_action :authenticate_provider!
  before_action -> { authorize_provider_access_to_scholarship!(params[:scholarship_id]) }

  def new
    @scholarship = Scholarship.find(params[:scholarship_id])
  end

  def create
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

  private

  def stripe_params
    params.permit(:stripeToken, :stripeEmail)
  end
end
