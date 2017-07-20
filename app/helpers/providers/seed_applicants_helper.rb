module Providers
  module SeedApplicantsHelper

    BRUCKER_EMAIL = 'brucker@email.com'
    ZGIBBONS_EMAIL = 'zgibbons@email.com'
    SSTEVENS_EMAIL = 'sstevens@email.com'
    DRUCKER_EMAIL = 'drucker@email.com'
    CPIEDRA_EMAIL = 'cpiedra@email.com'

    # have the dummy users apply to one or more scholarships
    # - useful for quick setup!
    def self.apply_to_scholarships!(scholarships)
      schols_arr = Array(scholarships)

      applicants = dummy_users
      unscored_applicants = applicants[0..2]
      scored_applicants = applicants[3..3]
      awarded_applicants = applicants[4..4]

      schols_arr.each do |s|
        unscored_applicants.each {|u| u.apply!(s) }
        scored_applicants.each {|u| u.apply!(s, ScholarshipApplication.stages[:scored]) }
        awarded_applicants.each {|u| u.apply!(s, ScholarshipApplication.stages[:awarded]) }
      end
    end

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
      Student.where(email: dummy_emails)
    end

    def self.seed_dummy_users!
      if (dummy_users.count == dummy_emails.length)
        dummy_users.reload
      else
        Student.create!(dummy_data)
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
          phone: '(202) 615-8353',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/brucker.png',
          activities_attributes: [
            {
              title: 'Debate Team',
              position_held: 'Captain',
              start_date: '09/2014',
              end_date: '06/2015',
              description: 'I led the debate team to our first State Championship!',
            },
            {
              title: 'Student Newspaper',
              position_held: 'Journalist',
              start_date: '09/2014',
              end_date: '06/2016',
              description: 'I reported on school and local news for Benjamin Banneker High School.',
            },
            {
              title: 'Student Council',
              position_held: 'President',
              start_date: '09/2016',
              end_date: '06/2017',
              description: 'I was elected Student Body President of the Class of 2017 by my peers!',
            },
          ],
          parent_or_guardian_relationships_attributes: [
            {
              relationship_type: :mother,
              parent_or_guardian_attributes: {
                first_name: 'Tanya',
                last_name: 'Rucker',
                phone: '(202) 258-7563',
                email: 'Tanya.Rucker@gmail.com',
                password: SecureRandom.hex,
              },
            },
            {
              relationship_type: :father,
              parent_or_guardian_attributes: {
                first_name: 'Gregory',
                last_name: 'Rucker',
                phone: '(202) 635-2631',
                email: 'Gregory.Rucker@gmail.com',
                password: SecureRandom.hex,
              },
            },
          ],
        },
        {
          first_name: 'Zakiya',
          last_name: 'Gibbons',
          tagline: 'I am a student journalist passionate about salads and using bulldozers as a vehicle to unearth truths and educate.',
          gpa: 2.25,
          email: ZGIBBONS_EMAIL,
          phone: '(202) 615-8354',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/zgibbons.png',
          activities_attributes: [
            {
              title: 'Student Newspaper',
              position_held: 'Journalist',
              start_date: '09/2014',
              end_date: '06/2017',
              description: "I organized our school's first newspaper and collaborated with the local news on coverage.",
            },
            {
              title: 'Drama Club',
              position_held: 'Director, Acting Lead',
              start_date: '09/2013',
              end_date: '06/2016',
              description: 'I was the lead in 3 school plays, and directed the upperclassmen in our production of "Evita".',
            },
            {
              title: 'The Washington Post',
              position_held: 'Intern',
              start_date: '06/2016',
              end_date: '09/2017',
              description: 'I was one of three students in the DC Metro area to be selected for a prestigious internship at the national newspaper, the Washington Post.',
            },
          ],
        },
        {
          first_name: 'Sade',
          last_name: 'Stevens',
          tagline: 'I am a student activist who has a passion for creating cross-cultural exchanges through the arts.',
          gpa: 4.0,
          email: SSTEVENS_EMAIL,
          phone: '(202) 615-8355',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/sstevens.png',
          activities_attributes: [
            {
              title: 'Dance Club',
              position_held: 'President',
              start_date: '09/2013',
              end_date: '06/2017',
              description: "I founded and grew our school's Dance Club from 3 members to 45, and organized 6 productions over the course of my 4-year tenure.",
            },
            {
              title: 'Black Student League',
              position_held: 'President',
              start_date: '09/2016',
              end_date: '06/2017',
              description: 'I organized events focused on the black community at Wilson High and in DC at large, including service-, academic-, and professionally-focused events.',
            },
            {
              title: 'The Washington Post',
              position_held: 'Intern',
              start_date: '06/2016',
              end_date: '09/2017',
              description: 'I was one of three students in the DC Metro area to be selected for a prestigious internship at the national newspaper, the Washington Post.',
            },
          ],
        },
        {
          first_name: "D'Angelo",
          last_name: 'Rucker',
          tagline: 'Future Morehouse Man passionate about mentorship and coding.',
          gpa: 4.0,
          email: DRUCKER_EMAIL,
          phone: '(202) 615-8356',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/drucker.png',
          activities_attributes: [
            {
              title: 'Debate Team',
              position_held: 'Captain',
              start_date: '09/2016',
              end_date: '06/2017',
              description: "As captain of the Banneker Debate Team, I led us to our first National competition, placing Third in the nation, out of a pool of 250 schools.",
            },
            {
              title: 'Student News',
              position_held: 'Journalist',
              start_date: '09/2013',
              end_date: '06/2015',
              description: "As Journalist at the Banneker News, I embarked on a project to interview all of the city's Councilmembers, and learn more about the way our government functions at the local level.",
            },
            {
              title: 'Student Government',
              position_held: 'President',
              start_date: '06/2015',
              end_date: '09/2016',
              description: 'As President of the Student Government, I focused on fundraising and community service, donating over $10,000 to effective charities by the end of the year.',
            },
          ],
        },
        {
          first_name: "Carla",
          last_name: 'Piedra',
          tagline: 'Incoming freshman at Oklahoma University studying Political Science and Economics.',
          gpa: 1.75,
          email: CPIEDRA_EMAIL,
          phone: '(202) 615-8357',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/cpiedra.png',
          activities_attributes: [
            {
              title: 'International Club',
              position_held: 'President',
              start_date: '09/2013',
              end_date: '06/2015',
              description: "As President of the International Club, I organized Spring Break trips to Peru and Argentina, and facilitated Spanish language and culture classes during the school year for 26 students.",
            },
            {
              title: 'Drama Club',
              position_held: 'Actor',
              start_date: '09/2013',
              end_date: '06/2017',
              description: "As a member of Drama Club, I acted in 12 productions over my four years, including 2 lead and 2 musical lead roles.",
            },
            {
              title: 'Student Government',
              position_held: 'Treasurer',
              start_date: '06/2016',
              end_date: '09/2017',
              description: 'As Treasurer for the Student Government, I reduced cost for our annual Formal and Prom by $5000 for the previous year, while accomodating 200 more students and securing a newer, larger venue for the Class of 2017.',
            },
          ],
        },
      ]
    end

    private

    def random_email_for(name)
      "#{name}+#{SecureRandom.hex}@email.com"
    end

    def self.update_dummy_users_in_db!
      Rails.logger.info("Updating dummy students!")
      dummy_data.each do |dummy_json|
        Rails.logger.info("About to update dummy data for #{dummy_json[:email]}.")
        dummy_student = Student.find_by(email: dummy_json[:email])

        if !dummy_student
          Rails.logger.error("Unable to find dummy student #{dummy_json[:email]} to update!")
          next
        end

        Rails.logger.info("About to update dummy student with email #{dummy_student.email}")
        dummy_student.update_attributes!(dummy_json)
        Rails.logger.info("Updated dummy student #{dummy_student.email}")
      end
    end
  end
end
