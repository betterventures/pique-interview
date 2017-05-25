module Providers
  module SeedApplicantsHelper

    BRUCKER_EMAIL = 'brucker@email.com'
    ZGIBBONS_EMAIL = 'zgibbons@email.com'
    SSTEVENS_EMAIL = 'sstevens@email.com'
    DRUCKER_EMAIL = 'drucker@email.com'
    CPIEDRA_EMAIL = 'cpiedra@email.com'

    # list of dummy emails; can be used to identify and delete seed data from Org accounts
    def self.dummy_emails
      [
        BRUCKER_EMAIL,
        ZGIBBONS_EMAIL,
        SSTEVENS_EMAIL,
        DRUCKER_EMAIL,
        CPIEDRA_EMAIL
      ]
    end

    def self.dummy_users
      User.where(email: dummy_emails)
    end

    def self.seed_dummy_users!
      if (dummy_users.count == dummy_emails.length)
        dummy_users.reload
      else
        User.create!(dummy_data)
      end
    end

    # provide array of standardized Student data to seed new Provider accounts with
    def self.dummy_data
      [
        {
          first_name: 'Brian',
          last_name: 'Rucker',
          tagline: 'Hi! My name is Brian and I am the Founder of Pique, the Common Application for scholarships. I love reading during my free time, being my own BAWSSS and tearing up dem clubs',
          gpa: 3.7,
          email: BRUCKER_EMAIL,
          password: SecureRandom.hex,
          role: :student,
          photo_url: 'brucker.png'
        },
        {
          first_name: 'Zakiya',
          last_name: 'Gibbons',
          tagline: 'I am a student journalist passionate about salads and using bulldozers as a vehicle to unearth truths and educate.',
          gpa: 2.25,
          email: ZGIBBONS_EMAIL,
          password: SecureRandom.hex,
          role: :student,
          photo_url: 'zgibbons.png',
        },
        {
          first_name: 'Sade',
          last_name: 'Stevens',
          tagline: 'I am a student activist who has a passion for creating cross-cultural exchanges through the arts.',
          gpa: 4.0,
          email: SSTEVENS_EMAIL,
          password: SecureRandom.hex,
          role: :student,
          photo_url: 'sstevens.png',
        },
        {
          first_name: "D'Angelo",
          last_name: 'Rucker',
          tagline: 'Future Morehouse Man passionate about mentorship and coding.',
          gpa: 4.0,
          email: DRUCKER_EMAIL,
          password: SecureRandom.hex,
          role: :student,
          photo_url: 'drucker.png',
        },
        {
          first_name: "Carla",
          last_name: 'Piedra',
          tagline: 'Incoming freshman at Oklahoma University studying Political Science and Economics.',
          gpa: 1.75,
          email: CPIEDRA_EMAIL,
          password: SecureRandom.hex,
          role: :student,
          photo_url: 'cpiedra.png',
        },
      ]
    end

    private

    def random_email_for(name)
      "#{name}+#{SecureRandom.hex}@email.com"
    end
  end
end
