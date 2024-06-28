// import { NextRequest, NextResponse } from "next/server";
// import Mailgun from "mailgun.js";
// import Mailgen from "mailgen";
// import FormData from "form-data";

// const API_KEY = process.env.MAILGUN_API_KEY!;
// const DOMAIN = process.env.MAILGUN_DOMAIN!;

// const mailgun = new Mailgun(FormData).client({
//   username: "api",
//   key: API_KEY,
// });

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const intro = body.intro || "";
//     const content = body.content || "";
//     const email = {
//       body: {
//         name: body.name || "Customer",
//         intro,
//         outro: content,
//       },
//     };

//     try {
//       // Mailgun send
//       await mailgun.messages.create(DOMAIN, {
//         to: body.to,
//         from: "Campify <no-reply@campify.app>",
//         subject: body.subject || "Order Notification",
//         text: content,
//         html: content,
//       });

//       return NextResponse.json({ success: true }, { status: 200 });
//     } catch (e) {
//       console.error("Mailgun error:", e as Error); // Log error details
//       return NextResponse.json({ success: false, error: e }, { status: 500 });
//     }
//   } catch (e) {
//     console.error("Request handling error:", e as Error); // Log error details
//     return NextResponse.json({ success: false, error: e }, { status: 500 });
//   }
// }

// export function GET() {
//   return NextResponse.json({ success: false }, { status: 404 });
// }

import { NextRequest, NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import MailGen from "mailgen";

const API_KEY = process.env.MAILGUN_API_KEY!;
const DOMAIN = process.env.MAILGUN_DOMAIN!;

const mailgen = new MailGen({
  theme: "cerberus", // Ensure "default" is a valid theme name supported by MailGen
  product: {
    name: "Campify",
    link: "https://campify.app",
  },
});

const mailgun = new Mailgun(FormData).client({
  username: "api",
  key: API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body); // Add logging to see the request body

    const intro = body.intro || "";
    const content = body.content || "";
    const email = {
      //   body: {
      //     name: body.name || "Customer",
      //     intro,
      //     outro: content,
      //   },
      body: {
        name: body.name || "Customer",
        intro: intro,
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    console.log("Email content:", email); // Add logging to see the email content

    try {
      // Mailgun send
      await mailgun.messages.create(DOMAIN, {
        to: body.to,
        from: "Campify <no-reply@campify.app>",
        subject: body.subject || "Order Notification",
        text: mailgen.generatePlaintext(email),
        html: mailgen.generate(email),
      });

      console.log("Email sent successfully"); // Log success
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
      console.error("Mailgun error:", e); // Log error details
      return NextResponse.json({ success: false, error: e }, { status: 500 });
    }
  } catch (e) {
    console.error("Request handling error:", e); // Log error details
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ success: false }, { status: 404 });
}
