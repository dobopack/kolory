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
      // to: "RECEIVER",
      subject: subject,
      text: text,
      html: html,
    };

    try {
      let result = await transporter.sendMail(mailData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }

    res.status(201).json({ message: "Form submitted" });
  }
}
