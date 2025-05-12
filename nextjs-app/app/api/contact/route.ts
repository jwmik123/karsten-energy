import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
// Replace with your actual API key in environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple rate limiting
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;
const ipRequests = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestData = ipRequests.get(ip);

  if (!requestData) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (requestData.count >= MAX_REQUESTS) {
    return true;
  }

  requestData.count++;
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Te veel aanvragen. Probeer het later opnieuw." },
        { status: 429 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      houseNumber,
      postalCode,
      city,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Format the full address
    const fullAddress = `${address} ${houseNumber}, ${postalCode} ${city}`;

    // Prepare email content
    const emailContent = {
      html: `
        <h1>Nieuwe offerte aanvraag</h1>
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Adres:</strong> ${fullAddress}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
Nieuwe offerte aanvraag

Naam: ${firstName} ${lastName}
E-mail: ${email}
Telefoon: ${phone}
Adres: ${fullAddress}

Bericht:
${message}
      `,
    };

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "noreply@karstenenergy.eu",
      to: ["joelmik123@gmail.com"],
      replyTo: email,
      subject: "Nieuwe offerte aanvraag via website",
      html: emailContent.html,
      text: emailContent.text,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Er is een fout opgetreden bij het verzenden van de e-mail" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Bedankt voor uw aanvraag. We nemen zo snel mogelijk contact met u op.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden" },
      { status: 500 }
    );
  }
}
