const theme = require("../styles/theme");

function resetPasswordTemplate({ name, otp, expiresIn }) {
  const digits = otp.split("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>IntraHome — Password Reset</title>
</head>

<body style="
  margin:0;
  background:${theme.colors.backgroundPrimary};
  font-family:${theme.fonts.family};
  color:${theme.colors.textPrimary};
">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:${theme.spacing.xl} ${theme.spacing.md};">

      <table width="100%" cellpadding="0" cellspacing="0" style="
        max-width:520px;
        background:${theme.colors.backgroundSecondary};
        border-radius:${theme.radius.lg};
        border:1px solid ${theme.colors.borderSubtle};
        box-shadow:${theme.shadow.card};
      ">

        <!-- Header -->
        <tr>
          <td style="
            padding:${theme.spacing.lg};
            border-bottom:1px solid ${theme.colors.borderSubtle};
          ">
            <h2 style="
              margin:0;
              color:${theme.colors.primary};
              font-size:${theme.fonts.size.lg};
            ">
              IntraHome
            </h2>

            <p style="
              margin:6px 0 0;
              font-size:${theme.fonts.size.xs};
              color:${theme.colors.textMuted};
            ">
              Secure Password Reset
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:${theme.spacing.lg};">

            <p style="
              font-size:${theme.fonts.size.sm};
              line-height:1.6;
            ">
              Hello <strong>${name || "User"}</strong>,
            </p>

            <p style="
              font-size:${theme.fonts.size.sm};
              line-height:1.6;
              color:${theme.colors.textMuted};
            ">
              We received a request to reset your IntraHome account password.
              Please use the One-Time Password (OTP) below.
            </p>

            <!-- OTP BOXES -->
            <table align="center" cellpadding="0" cellspacing="0" style="margin:${theme.spacing.lg} auto;">
              <tr>
                ${digits
                  .map(
                    (d) => `
                  <td style="padding:6px;">
                    <div style="
                      width:48px;
                      height:54px;
                      background:${theme.colors.backgroundPrimary};
                      border:1px solid ${theme.colors.borderLight};
                      border-radius:${theme.radius.sm};
                      text-align:center;
                      line-height:52px;
                      font-size:24px;
                      font-weight:${theme.fonts.weight.bold};
                      color:${theme.colors.primary};
                    ">
                      ${d}
                    </div>
                  </td>
                `
                  )
                  .join("")}
              </tr>
            </table>

            <p style="
              font-size:${theme.fonts.size.xs};
              color:${theme.colors.textMuted};
            ">
              This OTP is valid for
              <b style="color:${theme.colors.primary};">${expiresIn}</b> minutes.
              Do not share this OTP with anyone.
            </p>

            <p style="
              font-size:${theme.fonts.size.xs};
              color:${theme.colors.textMuted};
              margin-top:${theme.spacing.md};
            ">
              If you did not request this, please ignore this email.
              Your account remains secure.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="
            padding:${theme.spacing.md};
            border-top:1px solid ${theme.colors.borderSubtle};
            font-size:${theme.fonts.size.xs};
            color:${theme.colors.footerText};
            text-align:center;
          ">
            © ${new Date().getFullYear()} IntraHome Security Team
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
}

module.exports = resetPasswordTemplate;
