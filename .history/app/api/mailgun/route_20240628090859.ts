import { NextRequest, NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import Mailgen from "mailgen";
import FormData from "form-data";

const API_KEY = process.env.MAILGUN_API_KEY!;
const DOMAIN = process.env.MAILGUN_DOMAIN!;

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Campify",
    link: "https://campify.app/",
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

const mailgun = new Mailgun(FormData).client({
  username: "api",
  key: API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const intro = body.intro || "";
    const outro = body.outro || "";
    //const content = body.content || "";
    // const email = {
    //   body: {
    //     name: body.name || "Customer",
    //     intro,
    //     outro: content,
    //   },
    // };

    const email = {
      body: {
        name: body.name || "Customer",
        intro: intro,
        action: {
          instructions: "See more details in your Instructor Dashboard",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Go to Campify",
            link: "https://campify.app",
          },
        },
        outro: outro,
      },
    };

    // Generate an HTML email with the provided contents
    const emailBody = mailGenerator.generate(email);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailText = mailGenerator.generatePlaintext(email);

    try {
      // Mailgun send
      await mailgun.messages.create(DOMAIN, {
        to: body.to,
        from: "Campify <no-reply@campify.app>",
        subject: body.subject || "Order Notification",
        text: intro + content,
        html: intro + content,
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
      console.error("Mailgun error:", e as Error); // Log error details
      return NextResponse.json({ success: false, error: e }, { status: 500 });
    }
  } catch (e) {
    console.error("Request handling error:", e as Error); // Log error details
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ success: false }, { status: 404 });
}
