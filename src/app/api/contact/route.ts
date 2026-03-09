import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend("re_ci8pC8rg_6z2sfsW5385g7hMWBA4Vry7z");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, email } = body;

        if (!message) {
            return NextResponse.json(
                { error: "Message is required." },
                { status: 400 }
            );
        }

        /**
         * WHY server-side email validation:
         * Frontend validation can be bypassed. This ensures
         * we never process a form submission without a valid sender email.
         */
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "A valid email address is required." },
                { status: 400 }
            );
        }

        /**
         * WHY two recipient lists:
         * Resend test mode (onboarding@resend.dev sender) can only deliver
         * to the account owner's verified email. billy@trooper.es will
         * reject in test mode. Once a custom domain is verified in Resend,
         * switch the sender and use the full recipient list.
         */
        const isTestMode = true; // flip to false once domain is verified
        const recipients = isTestMode
            ? ["arvimudaliyar@gmail.com"]
            : ["arvimudaliyar@gmail.com", "billy@trooper.es"];

        const sender = isTestMode
            ? "onboarding@resend.dev"
            : "hello@trooper.es"; // replace with your verified domain sender

        const { data, error: sendError } = await resend.emails.send({
            from: sender,
            to: recipients,
            subject: `New Inquiry from ${email}`,
            text: `Sender Email: ${email}\n\nMessage:\n${message}`,
        });

        if (sendError) {
            console.error("Resend API Error:", JSON.stringify(sendError, null, 2));
            return NextResponse.json(
                { error: `Failed to send: ${sendError.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Contact API Route Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}
