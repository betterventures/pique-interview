module UsersHelper

	def user_signup_roles
		User.roles.keys.map {|role| [role.titleize, role] if ['student', 'educator'].include? role }.compact  
	end

end