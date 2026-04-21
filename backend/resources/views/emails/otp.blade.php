<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: Georgia, serif; background: #0d0d0d; margin: 0; padding: 40px 20px; }
  .container { max-width: 520px; margin: 0 auto; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden; }
  .header { background: #8a1c3b; padding: 32px 40px; text-align: center; }
  .logo { font-size: 28px; letter-spacing: 8px; color: #fff; font-weight: 400; }
  .logo span { font-style: italic; color: #f0c0c0; }
  .body { padding: 40px; color: #ccc; }
  .body h2 { color: #fff; font-size: 22px; margin: 0 0 16px; font-weight: 400; }
  .body p { line-height: 1.7; margin: 0 0 20px; font-size: 15px; }
  .otp-box { background: #0d0d0d; border: 1px solid #8a1c3b; border-radius: 4px; text-align: center; padding: 28px; margin: 28px 0; }
  .otp-code { font-size: 42px; letter-spacing: 12px; color: #8a1c3b; font-family: monospace; font-weight: bold; }
  .otp-note { font-size: 12px; color: #666; margin-top: 12px; letter-spacing: 1px; text-transform: uppercase; }
  .footer { padding: 24px 40px; border-top: 1px solid #2a2a2a; text-align: center; font-size: 12px; color: #555; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">LU<span>M</span>IÈRE</div>
  </div>
  <div class="body">
    <h2>Password Reset Request</h2>
    <p>Dear {{ $userName }},</p>
    <p>We received a request to reset the password on your LUMIÈRE account. Use the code below to proceed. This code is valid for <strong style="color:#fff">10 minutes</strong>.</p>

    <div class="otp-box">
      <div class="otp-code">{{ $otp }}</div>
      <div class="otp-note">One-Time Password — Do not share</div>
    </div>

    <p>If you did not request a password reset, please ignore this email. Your account remains secure.</p>
    <p style="color:#666; font-size:13px;">— The LUMIÈRE Concierge Team</p>
  </div>
  <div class="footer">
    © {{ date('Y') }} LUMIÈRE. All rights reserved. &nbsp;|&nbsp; hello@lumiere.pk
  </div>
</div>
</body>
</html>
