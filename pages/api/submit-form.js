export default async function handler(req, res) {
  if (req.method === "POST") {
    let nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      port: 465,
      host: process.env.HOST,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure: true,
    });

    const data = req.body;
    const captcha = data.captcha;

    if (!captcha) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    const subject =
      data.subject == ""
        ? "Wiadomość z formularza"
        : `Wiadomość z formularza: ${data.subject}`;

    const htmlContent = data.content.replace(/(?:\r\n|\r|\n)/g, "<br>");

    const html = `<table role="presentation" class="main">
              <tr>
                <td class="wrapper">
                  <table
                    role="presentation"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <tr>
                      <td>
                        <p>
                          Wiadomość z formularza kontaktowego dla adresu:
                          ${data.email}
                        </p>
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tbody>
                            <tr>
                              <td align="left">
                                <table
                                  role="presentation"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="padding-right: 20px;">Imię i nazwisko</td>
                                      <td>${data.name}</td>
                                    </tr>
                                    <tr>
                                      <td>Email</td>
                                      <td>${data.email}</td>
                                    </tr>
                                    <tr>
                                      <td>Telefon</td>
                                      <td>${data.phone}</td>
                                    </tr>
                                    <tr>
                                      <td>Temat</td>
                                      <td>${data.subject}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>${htmlContent}</p>
                      </td>
                    </tr>
                  </table>`;

    const text = `Wiadomość od: ${data.email}. Telefon: ${data.phone}. Imię i nazwisko: ${data.name}. Temat: ${data.subject}. Treść: ${data.content}`;

    const mailData = {
      from: "'Dobopack' <mailer@kolory.com>",
      to: process.env.RECEIVER,
      subject: subject,
      text: text,
      html: html,
    };

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (captchaValidation.success) {
        await transporter.sendMail(mailData);

        return res.status(201).json({ message: "Form submitted" });
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
}
