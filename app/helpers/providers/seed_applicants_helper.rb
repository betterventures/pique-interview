module Providers
  module SeedApplicantsHelper

    BANNEKER_HIGH = 'Benjamin Banneker Academic HS'
    MCKINLEY_HIGH = 'McKinley Technology High School'
    WILSON_HIGH   = 'Woodrow Wilson High School'
    COLUMBIA_EC   = 'Columbia Heights Educational Campus (CHEC)'

    IWILLIAMS_EMAIL = 'iwilliams@email.com'
    LNGUYEN_EMAIL = 'lnguyen@email.com'
    SSTEVENS_EMAIL = 'sstevens@email.com'
    CMENDOZA_EMAIL = 'cmendoza@email.com'
    DCOATES_EMAIL = 'dcoates@email.com'

    # have the dummy users apply to one or more scholarships
    # - useful for quick setup!
    def self.apply_to_scholarships!(scholarships)
      schols_arr = Array(scholarships)

      schols_arr.each do |s|
        dummy_students.each {|u| u.apply!(s) }
      end
    end

    # list of dummy School names;
    # Must be updated when legitimate School database is introduced
    def self.dummy_school_names
      [
        BANNEKER_HIGH,
        MCKINLEY_HIGH,
        WILSON_HIGH,
        COLUMBIA_EC,
      ]
    end

    # list of dummy emails;
    # can be used to identify and delete seed data from Org accounts
    def self.dummy_student_emails
      [
        IWILLIAMS_EMAIL,
        LNGUYEN_EMAIL,
        SSTEVENS_EMAIL,
        CMENDOZA_EMAIL,
        DCOATES_EMAIL,
      ]
    end

    def self.dummy_schools
      School.where(name: dummy_school_names)
    end

    def self.dummy_students
      Student.where(email: dummy_student_emails)
    end

    # entry point - called publicly
    # composite methods return early - we only want to validate that the records exist -
    # we do not want to update them every time we check for seeds
    # (eg, currently, when an application is created)
    # @return {Array} list of the dummy Students
    def self.seed_dummy_models!
      seed_dummy_schools!
      seed_dummy_users!
    end

    private

    def self.seed_dummy_schools!
      if (dummy_schools.pluck(:name) == dummy_school_names)
        dummy_schools.reload
      else
        School.create!(dummy_school_json)
      end
    end

    def self.seed_dummy_users!
      if (dummy_students.pluck(:email) == dummy_student_emails)
        dummy_students.reload
      else
        Student.create!(dummy_student_json)
      end
    end

    def self.dummy_school_json
      [
        {
          name: BANNEKER_HIGH,
          phone: '(202) 258-7168',
          fax: '(202) 258-6230',
        },
        {
          name: MCKINLEY_HIGH,
          phone: '(202) 281-3950',
          fax: '(202) 281-3951',
        },
        {
          name: WILSON_HIGH,
          phone: '(202) 282-0120',
          fax: '(202) 282-0128',
        },
        {
          name: COLUMBIA_EC,
          phone: '(202) 576-9147',
          fax: '(202) 576-9147',
        },
      ]
    end

    # provide array of standardized Student data to seed new Provider accounts with
    def self.dummy_student_json
      [
        {
          first_name: 'Isaiah',
          last_name: 'Williams',
          tagline: 'Future Morehouse Man passionate about coding, mentorship, and community.',
          description: "Hi, I’m Isaiah Williams! I’m a graduating senior at McKinley Tech High School and an incoming Computer Science major at Morehouse College. I’m really passionate about the intersection between technology and social impact and hope to one day leverage technology to create large-scale social impact to help underserved communities. When I’m not participating in my high school’s Senior-to-Freshman mentorship program, Level Up, I’m in front of a computer screen writing and breaking code. Technology has completely transformed the ways in which we live and navigate the world, I’m interested in forging a future where technology can be tool to empower communities and through your scholarship’s support I will be one step closer to achieving that goal.",
          gpa: 3.91,
          email: IWILLIAMS_EMAIL,
          phone: '(202) 615-8353',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/brucker.png',
          school_id: School.find_by(name: MCKINLEY_HIGH).id,
          activities_attributes: [
            {
              title: 'Level Up (McKinley Technology High School)',
              position_held: 'Mentor',
              start_date: '09/2016',
              end_date: '05/2017',
              description: 'As a McKinley Senior, I mentor our high school Freshmen one-on-one, three times per week.',
            },
            {
              title: 'Code Whisperers',
              position_held: 'App Developer',
              start_date: '09/2015',
              end_date: '05/2016',
              description: 'As an app developer on McKinley’s Code Whisperers team, I worked with a team of three developers, eight hours a week, to build an web app that allows parents of DCPS students to see what their children’s curricula are across subjects. My work with the Code Whispers resulted in my team winning DCPS’s App Challenge Competition and receiving a $5,000 grant to prepare for the launch of our beta version.',
            },
            {
              title: 'Commerce Department',
              position_held: 'Incoming IT Intern',
              start_date: '06/2017',
              end_date: '08/2017',
              description: 'This upcoming summer I will be working with a newly established architecture strategy and design department at the International Trade Agency (ITA), an agency within the Commerce Department. As an intern I will support the ITA’s staff with any IT issues they may encounter. I will also work alongside two other interns to give a presentation to explain the new Architecture Strategy and Design Department division.',
            },
            {
              title: 'Debate Team',
              position_held: 'Captain',
              start_date: '09/2015',
              end_date: '05/2017',
              description: 'As Captain of the Debate Team I set and led weekly debate team meetings, trained new members on the principles of debating and led my team to the DC City Wide Debate Tournament in November.',
            },
          ],
          parent_or_guardian_relationships_attributes: [
            {
              relationship_type: :mother,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Mother',
                phone: '(555) 555-5555',
                email: 'demomother@getpique.co',
                password: SecureRandom.hex,
              },
            },
            {
              relationship_type: :father,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Father',
                phone: '(555) 555-5555',
                email: 'demofather@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
          counselor_relationships_attributes: [
            {
              relationship_type: :counselor,
              counselor_attributes: {
                first_name: 'Demo',
                last_name: 'Counselor',
                email: 'counselor@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
        },
        {
          first_name: 'Lynda',
          last_name: 'Nguyen',
          tagline: 'Incoming freshman at UC Berkeley studying International Development.',
          description: "Hi, I’m Lynda and welcome to my Pique Profile! I’m a 1st-generation college student, student activist, journalist and, dare I say it, a political wonk! I will be studying International Development at UC Berkeley in the Fall to learn more about how government and diplomacy can be used to advance human rights. I became interested in International Development after attending my first Model UN conference in 2015 and saw firsthand the role the UN plays in shaping international efforts to end human rights violations and protect the rights of marginalized groups.",
          gpa: 3.75,
          email: LNGUYEN_EMAIL,
          phone: '(555) 555-5555',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/lnguyen.png',
          school_id: School.find_by(name: BANNEKER_HIGH).id,
          activities_attributes: [
            {
              title: 'Asian American Lead',
              position_held: 'College Prep Mentee',
              start_date: '09/2014',
              end_date: '05/2017',
              description: "AALead is a nonprofit organization in Washington, DC, that supports low-income and underserved Asian Pacific American with educational empowerment and leadership development. As an after school participant in the program I received one-on-one college prep mentorship from the AALead and also helped with programming to provide mentorship to elementary and middle school students.",
            },
            {
              title: 'Tennis Team',
              position_held: 'Member',
              start_date: '09/2015',
              end_date: '05/2017',
              description: 'I love to stay active, and as a member of my high school’s tennis team, I practice 4 days per week for two hours each day. Fun note: I have a pretty impressive serve.',
            },
            {
              title: 'Model U.N.',
              position_held: 'President',
              start_date: '09/2014',
              end_date: '05/2016',
              description: 'As the lead organizer of my high school’s Model UN Team, I host my high school’s annual Model UN conference where high school students across Washington, DC (and sometimes Maryland) come to debate and reach consensus on approaches to protecting the environment, human rights of groups and of sovereign nations.',
            },
          ],
          parent_or_guardian_relationships_attributes: [
            {
              relationship_type: :mother,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Mother',
                phone: '(555) 555-5555',
                email: 'demomother@getpique.co',
                password: SecureRandom.hex,
              },
            },
            {
              relationship_type: :father,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Father',
                phone: '(555) 555-5555',
                email: 'demofather@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
          counselor_relationships_attributes: [
            {
              relationship_type: :counselor,
              counselor_attributes: {
                first_name: 'Demo',
                last_name: 'Counselor',
                email: 'counselor@getpique.co',
                password: SecureRandom.hex,
              },
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
          school_id: School.find_by(name: BANNEKER_HIGH).id,
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
          parent_or_guardian_relationships_attributes: [
            {
              relationship_type: :mother,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Mother',
                phone: '(555) 555-5555',
                email: 'demomother@getpique.co',
                password: SecureRandom.hex,
              },
            },
            {
              relationship_type: :father,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Father',
                phone: '(555) 555-5555',
                email: 'demofather@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
          counselor_relationships_attributes: [
            {
              relationship_type: :counselor,
              counselor_attributes: {
                first_name: 'Demo',
                last_name: 'Counselor',
                email: 'counselor@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
        },
        {
          first_name: "Carla",
          last_name: 'Mendoza',
          tagline: 'Incoming Economics and Political Science Double Major at NYU.',
          description: "Hi, I’m Carla Mendoza! A little about me: I’m a well-rounded student passionate about family, entrepreneurship, and political science. I often spend my days studying for my AP classes, working on the business plan for my nonprofit organization, or crafting essays for my ‘Introduction to Politics’ course at George Washington University. I’m a first generation college student and the eldest of three children. My goal is go to college to show my younger sisters the opportunities a college education can afford and to use my education to help my communities. Your scholarship will help me make these ideas a reality. Thank you for considering me!",
          gpa: 3.82,
          email: CMENDOZA_EMAIL,
          phone: '(555) 555-5555',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/cmendoza.png',
          school_id: School.find_by(name: WILSON_HIGH).id,
          activities_attributes: [
            {
              title: 'LearnServe International',
              position_held: 'Fellow',
              start_date: '09/2014',
              end_date: '05/2015',
              description: "LearnServe International’s Fellow Program brings together high school students from across the Washington, DC, area to learn how to bring sustainable social change to their communities. As a fellow I spent a full academic year designing and launching my social venture, Aprindizaje Experimental. I also learned the basics of  operating a company, including budgeting, strategic planning, and team-building. I ultimately pitched my venture to community leaders and was awarded a $10,000 grant to make my ideas reality.",
            },
            {
              title: 'District of Columbia Public Schools',
              position_held: 'High School/College Internship Program (HISCIP) Scholar',
              start_date: '01/2017',
              end_date: '05/2017',
              description: "As a HISCIP scholar, I was one of a few high school seniors selected from throughout DCPS to take college-level courses at George Washington University. HISCIP is a competitive program requiring SAT scores, a 3.0 GPA above 3.0, and two page-long personal statements.",
            },
            {
              title: 'Aprindizaje Experimental (Experiential Learning)',
              position_held: 'Nonprofit Founder',
              start_date: '09/2014',
              end_date: '05/2017',
              description: 'Aprindizaje Experimental is a social venture I created and run that works to ease the English-language acquisition process for English Language Learners (ELLs) of Latin descent in Washington, DC. We provide programming and activities for our participants that allow them to practice and learn English in a controlled environment while still employing the best practices of experiential learning, a learning technique my team and I believe is the most effective way to acquire a new language.',
            },
          ],
          parent_or_guardian_relationships_attributes: [
            {
              relationship_type: :mother,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Mother',
                phone: '(555) 555-5555',
                email: 'demomother@getpique.co',
                password: SecureRandom.hex,
              },
            },
            {
              relationship_type: :father,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Father',
                phone: '(555) 555-5555',
                email: 'demofather@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
          counselor_relationships_attributes: [
            {
              relationship_type: :counselor,
              counselor_attributes: {
                first_name: 'Demo',
                last_name: 'Counselor',
                email: 'counselor@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
        },
        {
          first_name: 'Daniel',
          last_name: 'Coates',
          tagline: 'An incoming freshman at Northwestern University passionate about journalism and media!',
          description: "Pensive. Ambitious. Curious. Nurturing. These are but a few words that describe me. Hi! I’m Dan Coates, an incoming freshman at Northwestern High School. I’m a 17-year old with an unhealthy obsession for good journalism and copyediting. In my freshman year of high school, my AP Government class and I read “All the President’s Men”, and since then I have taken every opportunity to use my writing as a medium to distribute knowledge. Most recently, I have taken my writing, brainstorming, and research skills to help be a Student Assistant Producer for WPFW’s Youth Broadcast program, 2k Nation.",
          gpa: 3.75,
          email: DCOATES_EMAIL,
          phone: '(555) 555-5555',
          password: SecureRandom.hex,
          role: :student,
          photo_url: '/assets/dcoates.png',
          school_id: School.find_by(name: COLUMBIA_EC).id,
          activities_attributes: [
            {
              title: "WPFW's 2k Nation",
              position_held: 'Student Assistant Producer',
              start_date: '09/2016',
              end_date: '05/2017',
              description: "As a Student Assistant Producer at WPFW’s 2k Nation, I spend 8 hours a week working with the segment’s lead student producer and student radio hosts to pitch topics, do research, and prep radio hosts for our weekly 1-hour segment.",
            },
            {
              title: 'CHEC School Newspaper',
              position_held: 'Editor-In-Chief',
              start_date: '09/2015',
              end_date: '05/2017',
              description: "As Editor-In-Chief at CHEC’s school paper, I was responsible for managing the paper’s editorial policies and content production. I often reviewed and proof-read articles before release and ensured that journalists used ethical journalism practices before releasing articles.",
            },
            {
              title: 'Student Government',
              position_held: 'Vice President',
              start_date: '09/2014',
              end_date: '05/2015',
              description: 'As the Vice President of my high school during my freshman year, I worked alongside my class President to accomplish a few goals including: learning more about the needs of our freshman class, successfully executing a $2,000 fundraising effort, and organizing the Freshman Winter Ball dance.',
            },
          ],
          parent_or_guardian_relationships_attributes: [
            {
              relationship_type: :mother,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Mother',
                phone: '(555) 555-5555',
                email: 'demomother@getpique.co',
                password: SecureRandom.hex,
              },
            },
            {
              relationship_type: :father,
              parent_or_guardian_attributes: {
                first_name: 'Demo',
                last_name: 'Father',
                phone: '(555) 555-5555',
                email: 'demofather@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
          counselor_relationships_attributes: [
            {
              relationship_type: :counselor,
              counselor_attributes: {
                first_name: 'Demo',
                last_name: 'Counselor',
                email: 'counselor@getpique.co',
                password: SecureRandom.hex,
              },
            },
          ],
        },
      ]
    end

    def random_email_for(name)
      "#{name}+#{SecureRandom.hex}@email.com"
    end

    def self.update_dummy_users_in_db!
      Rails.logger.info("Updating dummy students!")
      dummy_student_json.each do |dummy_json|
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
