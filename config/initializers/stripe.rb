Rails.configuration.stripe = {
  publishable_key: ENV['STRIPE_PUBLISHABLE_KEY'] || 'pk_test_nXyFVEMB3BgqcJqqyqvsGD08',
  secret_key: ENV['STRIPE_SECRET_KEY'] || 'sk_test_oCfksiIKp60OtOWZNn9dR2nm'
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]
