using SendGrid;
using SendGrid.Helpers.Mail;

namespace AirportCodes.API.Services;

public class EmailService : IEmailService
{
	private readonly IConfiguration _configuration;
	private readonly ILogger<EmailService> _logger;
	private readonly string _apiKey;
	private readonly string _fromEmail;
	private readonly string _fromName;
	private readonly string _confirmationUrl;

	public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
	{
		_configuration = configuration;
		_logger = logger;
		_apiKey = _configuration["SendGridSettings:ApiKey"] ?? throw new InvalidOperationException("SendGrid API key not configured");
		_fromEmail = _configuration["SendGridSettings:FromEmail"] ?? "noreply@airportcodes.app";
		_fromName = _configuration["SendGridSettings:FromName"] ?? "AirportCodes";
		_confirmationUrl = _configuration["EmailSettings:ConfirmationUrl"] ?? "http://localhost:5173/confirm-email";
	}

	public async Task SendEmailConfirmationAsync(string toEmail, string confirmationToken)
	{
		try
		{
			var client = new SendGridClient(_apiKey);
			var from = new EmailAddress(_fromEmail, _fromName);
			var to = new EmailAddress(toEmail);
			var subject = "Confirm Your Email - AirportCodes";

			var confirmationLink = $"{_confirmationUrl}?token={confirmationToken}";

			var plainTextContent = $@"Welcome to AirportCodes!

Please confirm your email address by clicking the link below:

{confirmationLink}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.

Best regards,
The AirportCodes Team";

			var htmlContent = $@"
<!DOCTYPE html>
<html>
<head>
	<style>
		body {{
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			color: #333;
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
		}}
		.header {{
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 30px;
			text-align: center;
			border-radius: 8px 8px 0 0;
		}}
		.content {{
			background: #ffffff;
			padding: 30px;
			border: 1px solid #e5e7eb;
			border-top: none;
		}}
		.button {{
			display: inline-block;
			background: #2563eb;
			color: white;
			padding: 12px 30px;
			text-decoration: none;
			border-radius: 6px;
			margin: 20px 0;
			font-weight: 600;
		}}
		.footer {{
			background: #f9fafb;
			padding: 20px;
			text-align: center;
			font-size: 12px;
			color: #6b7280;
			border-radius: 0 0 8px 8px;
			border: 1px solid #e5e7eb;
			border-top: none;
		}}
	</style>
</head>
<body>
	<div class=""header"">
		<h1>✈️ AirportCodes</h1>
	</div>
	<div class=""content"">
		<h2>Welcome to AirportCodes!</h2>
		<p>Thank you for creating an account. Please confirm your email address to get started.</p>
		<p style=""text-align: center;"">
			<a href=""{confirmationLink}"" class=""button"">Confirm Email Address</a>
		</p>
		<p style=""color: #6b7280; font-size: 14px;"">
			Or copy and paste this link into your browser:<br>
			<a href=""{confirmationLink}"">{confirmationLink}</a>
		</p>
		<p style=""color: #6b7280; font-size: 14px;"">
			This link will expire in 24 hours.
		</p>
	</div>
	<div class=""footer"">
		<p>If you didn't create an account, you can safely ignore this email.</p>
		<p>© 2024 AirportCodes. All rights reserved.</p>
	</div>
</body>
</html>";

			var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
			var response = await client.SendEmailAsync(msg);

			if (response.IsSuccessStatusCode)
			{
				_logger.LogInformation("Email confirmation sent successfully to {Email}", toEmail);
			}
			else
			{
				_logger.LogError("Failed to send email confirmation to {Email}. Status: {Status}", toEmail, response.StatusCode);
			}
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error sending email confirmation to {Email}", toEmail);
			throw;
		}
	}

	public async Task SendPasswordResetAsync(string toEmail, string resetToken)
	{
		try
		{
			var client = new SendGridClient(_apiKey);
			var from = new EmailAddress(_fromEmail, _fromName);
			var to = new EmailAddress(toEmail);
			var subject = "Reset Your Password - AirportCodes";

			var resetLink = $"http://localhost:5173/reset-password?token={resetToken}";

			var plainTextContent = $@"Password Reset Request

We received a request to reset your password for your AirportCodes account.

Click the link below to reset your password:

{resetLink}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email.

Best regards,
The AirportCodes Team";

			var htmlContent = $@"
<!DOCTYPE html>
<html>
<head>
	<style>
		body {{
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			color: #333;
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
		}}
		.header {{
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 30px;
			text-align: center;
			border-radius: 8px 8px 0 0;
		}}
		.content {{
			background: #ffffff;
			padding: 30px;
			border: 1px solid #e5e7eb;
			border-top: none;
		}}
		.button {{
			display: inline-block;
			background: #2563eb;
			color: white;
			padding: 12px 30px;
			text-decoration: none;
			border-radius: 6px;
			margin: 20px 0;
			font-weight: 600;
		}}
		.footer {{
			background: #f9fafb;
			padding: 20px;
			text-align: center;
			font-size: 12px;
			color: #6b7280;
			border-radius: 0 0 8px 8px;
			border: 1px solid #e5e7eb;
			border-top: none;
		}}
	</style>
</head>
<body>
	<div class=""header"">
		<h1>✈️ AirportCodes</h1>
	</div>
	<div class=""content"">
		<h2>Password Reset Request</h2>
		<p>We received a request to reset your password. Click the button below to create a new password.</p>
		<p style=""text-align: center;"">
			<a href=""{resetLink}"" class=""button"">Reset Password</a>
		</p>
		<p style=""color: #6b7280; font-size: 14px;"">
			Or copy and paste this link into your browser:<br>
			<a href=""{resetLink}"">{resetLink}</a>
		</p>
		<p style=""color: #6b7280; font-size: 14px;"">
			This link will expire in 1 hour.
		</p>
	</div>
	<div class=""footer"">
		<p>If you didn't request a password reset, you can safely ignore this email.</p>
		<p>© 2024 AirportCodes. All rights reserved.</p>
	</div>
</body>
</html>";

			var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
			var response = await client.SendEmailAsync(msg);

			if (response.IsSuccessStatusCode)
			{
				_logger.LogInformation("Password reset email sent successfully to {Email}", toEmail);
			}
			else
			{
				_logger.LogError("Failed to send password reset email to {Email}. Status: {Status}", toEmail, response.StatusCode);
			}
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error sending password reset email to {Email}", toEmail);
			throw;
		}
	}
}
