const theme = require("../styles/theme");

function welcomeTemplate({ name }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to IntraHome</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:${theme.colors.backgroundPrimary};
  font-family:${theme.fonts.family};
  color:${theme.colors.textPrimary};
">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:48px 16px;">

      <!-- Main Card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="
        max-width:640px;
        background:${theme.colors.backgroundSecondary};
        border-radius:${theme.radius.lg};
        overflow:hidden;
        border:1px solid ${theme.colors.borderSubtle};
      ">

        <!-- HERO -->
        <tr>
          <td style="
            padding:40px 32px;
            background:linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover});
            text-align:left;
          ">
            <h1 style="
              margin:0;
              font-size:26px;
              font-weight:${theme.fonts.weight.bold};
              color:#ffffff;
              letter-spacing:0.4px;
            ">
              Welcome to IntraHome
            </h1>

            <p style="
              margin:10px 0 0;
              font-size:15px;
              color:#E0E7FF;
              max-width:420px;
            ">
              Smart, reliable home services — all in one place.
            </p>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:36px 32px;">

            <p style="
              margin:0 0 18px;
              font-size:16px;
              line-height:1.7;
            ">
              Hi <strong>${name || "there"}</strong>,
            </p>

            <p style="
              margin:0 0 28px;
              font-size:14px;
              line-height:1.8;
              color:${theme.colors.textSecondary};
            ">
              Your IntraHome account is ready. You can now easily book trusted
              home services, manage your addresses, and track all your service
              requests — with complete transparency and security.
            </p>

            <!-- FEATURE BLOCKS -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="
                    background:${theme.colors.backgroundPrimary};
                    border-radius:${theme.radius.md};
                    padding:18px;
                    border:1px solid ${theme.colors.borderSubtle};
                  ">
                    <tr>
                      <td style="font-size:14px;">
                        <strong style="color:${theme.colors.primary};">Verified Professionals</strong><br/>
                        <span style="color:${theme.colors.textMuted};">
                          Book trusted and background-checked service providers.
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="
                    background:${theme.colors.backgroundPrimary};
                    border-radius:${theme.radius.md};
                    padding:18px;
                    border:1px solid ${theme.colors.borderSubtle};
                  ">
                    <tr>
                      <td style="font-size:14px;">
                        <strong style="color:${theme.colors.primary};">Real-time Tracking</strong><br/>
                        <span style="color:${theme.colors.textMuted};">
                          Stay updated on your bookings and service progress.
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="
                    background:${theme.colors.backgroundPrimary};
                    border-radius:${theme.radius.md};
                    padding:18px;
                    border:1px solid ${theme.colors.borderSubtle};
                  ">
                    <tr>
                      <td style="font-size:14px;">
                        <strong style="color:${theme.colors.primary};">Secure Account</strong><br/>
                        <span style="color:${theme.colors.textMuted};">
                          Your data and payments are protected at every step.
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:36px;">
              <tr>
                <td align="center">
                  <a href="${process.env.APP_URL || "#"}"
                    style="
                      display:inline-block;
                      padding:15px 32px;
                      background:${theme.colors.primary};
                      color:${theme.colors.textInverted};
                      text-decoration:none;
                      font-size:15px;
                      font-weight:${theme.fonts.weight.semibold};
                      border-radius:${theme.radius.md};
                      box-shadow:${theme.shadow.button};
                    ">
                    Open Dashboard
                  </a>
                </td>
              </tr>
            </table>

            <p style="
              margin:32px 0 0;
              font-size:13px;
              color:${theme.colors.textMuted};
              line-height:1.7;
              text-align:center;
            ">
              Need help? Our support team is always ready to assist you.
            </p>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="
            padding:20px 28px;
            background:${theme.colors.backgroundPrimary};
            border-top:1px solid ${theme.colors.borderSubtle};
            font-size:12px;
            color:${theme.colors.footerText};
            text-align:center;
          ">
            © ${new Date().getFullYear()} IntraHome · Secure Home Services Platform
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

module.exports = welcomeTemplate;
