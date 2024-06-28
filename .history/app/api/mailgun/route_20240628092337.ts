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
