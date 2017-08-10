class MandrillMailer < Devise::Mailer

  #
  # HOW TO USE MANDRILL:
  # * Merge Vars: https://mandrill.zendesk.com/hc/en-us/articles/205582487-How-to-Use-Merge-Tags-to-Add-Dynamic-Content
  # * Devise Integration: https://nvisium.com/blog/2014/10/08/mandrill-devise-and-mailchimp-templates/
  #

  # we expect `opts` to contain only `current_inviter_id` currently,
  # which we use to calculate the inviting org and user
  def invitation_instructions(record, token, opts={})
    current_inviter_id = opts[:current_inviter_id]
    inviter = Provider.find_by(id: current_inviter_id)

    options = {
      subject: "You've been invited to Pique!",
      from_name: 'Pique Scholarships',
      from_email: 'brian@getpique.co',
      to_name: record.name,
      to_email: record.email,
      global_merge_vars: [
        {
          name: 'subject',
          content: "Welcome to Pique!",
        },
        {
          name: 'inviter_email',
          content: inviter.email.to_s || 'brian@getpique.co',
        },
        {
          name: 'inviter_name',
          content: inviter.name || 'A Pique user',
        },
        {
          name: 'org_name',
          content: (inviter.organization && inviter.organization.name.to_s) || '',
        },
        {
          name: 'invite_link',
          content: accept_provider_invitation_url(record, invitation_token: token),
        },
      ],
      template: 'Invite - Reviewer',
    }

    mandrill_send options
  end


  private

  def mandrill_send(opts={})
    options = {
      subject: opts[:subject],
      from_name: opts[:from_name],
      from_email: opts[:from_email],
      to: [
        {
          name: opts[:to_name],
          email: opts[:to_email],
          type: :to,
        },
      ],
      merge: true,
      merge_vars: opts[:merge_vars],
      global_merge_vars: opts[:global_merge_vars],
    }

    message = MANDRILL.messages.send_template(
      opts[:template],
      [],
      options
    )

  rescue Mandrill::Error => e
    Rails.logger.debug("Error sending message: #{e.class}: #{e.message}.\n\nOriginal Message: \n#{message}.")
    raise
  end
end
