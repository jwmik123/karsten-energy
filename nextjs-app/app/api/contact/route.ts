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

async function submitTo2Solar(formData: any) {
  const requestId = Math.random().toString(36).substring(7); // Generate unique request ID
  console.log(
    `[2Solar] [${requestId}] Starting lead submission for email:`,
    formData.email
  );

  // Format address components for 2Solar
  const address = formData.address || "";
  const houseNumber = formData.houseNumber || "";
  const postcode = formData.postalCode || "";
  const city = formData.city || "";

  // Log the raw address components for debugging
  console.log(`[2Solar] [${requestId}] Raw form data:`, {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address,
    houseNumber,
    postcode,
    city,
    message: formData.message,
  });

  // Validate required fields
  if (!postcode || !houseNumber) {
    console.error(`[2Solar] [${requestId}] Missing required fields:`, {
      postcode,
      houseNumber,
    });
    throw new Error("Postcode and house number are required");
  }

  // Format postcode (remove spaces and ensure uppercase)
  const formattedPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  // Format house number (ensure it's a string and remove any spaces)
  const formattedHouseNumber = houseNumber.toString().trim();

  // Validate formatted values
  if (!formattedPostcode || !formattedHouseNumber) {
    console.error(`[2Solar] [${requestId}] Invalid formatted values:`, {
      formattedPostcode,
      formattedHouseNumber,
    });
    throw new Error("Invalid postcode or house number format");
  }

  // Format the full address for 2Solar
  const fullAddress = `${address} ${formattedHouseNumber}`.trim();

  // Format phone number (remove all non-numeric characters)
  const formattedPhone = formData.phone.replace(/\D/g, "");

  // Prepare the data exactly as 2Solar expects it
  const solarLeadData = {
    firstname: formData.firstName.trim(),
    lastname: formData.lastName.trim(),
    email: formData.email.trim(),
    phone: formattedPhone,
    postcode: formattedPostcode,
    city: city.trim(),
    address: address.trim(),
    number: formattedHouseNumber,
    message: formData.message ? formData.message.trim() : "",
    leadSource: "Website Contact Form",
    type: "person",
    status: "new",
  };

  // Log the formatted data being sent to 2Solar
  console.log(`[2Solar] [${requestId}] Formatted data being sent:`, {
    ...solarLeadData,
    email: solarLeadData.email, // Only log email for privacy
  });

  const apiKey = process.env.SOLAR_API_KEY;

  if (!apiKey) {
    console.error(
      `[2Solar] [${requestId}] API key is not defined in environment variables`
    );
    throw new Error("2Solar API configuration error");
  }

  try {
    // Log the exact request being made
    console.log(
      `[2Solar] [${requestId}] Making API request to:`,
      "https://app.2solar.nl/api/person"
    );

    const response = await fetch("https://app.2solar.nl/api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(solarLeadData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(`[2Solar] [${requestId}] API error:`, responseData);
      console.error(
        `[2Solar] [${requestId}] Response status:`,
        response.status
      );
      console.error(
        `[2Solar] [${requestId}] Response headers:`,
        Object.fromEntries(response.headers.entries())
      );
      throw new Error(
        responseData.message || "Failed to submit lead to 2Solar"
      );
    }

    console.log(`[2Solar] [${requestId}] Lead successfully submitted:`, {
      email: formData.email,
    });
    return responseData;
  } catch (error) {
    console.error(`[2Solar] [${requestId}] Error submitting lead:`, error);
    throw error;
  }
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7); // Generate unique request ID
  console.log(`[Contact] [${requestId}] Starting contact form submission`);

  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    console.log(`[Contact] [${requestId}] Request from IP:`, ip);

    if (isRateLimited(ip)) {
      console.log(`[Contact] [${requestId}] Rate limit exceeded for IP:`, ip);
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

    console.log(`[Contact] [${requestId}] Received form data:`, {
      email,
      firstName,
      lastName,
      phone,
      address,
      houseNumber,
      postalCode,
      city,
    });

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message) {
      console.log("[Contact] Missing required fields");
      return NextResponse.json(
        { error: "Vul alle verplichte velden in" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.log("[Contact] Invalid email format:", email);
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
    console.log("[Contact] Sending email via Resend");
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "noreply@noreply.karstenenergy.eu",
      to: ["joelmik123@gmail.com"], // info@karstenenergy.nl
      replyTo: email,
      subject: "Nieuwe offerte aanvraag via website",
      html: emailContent.html,
      text: emailContent.text,
    });

    if (emailError) {
      console.error("[Contact] Resend API error:", emailError);
      return NextResponse.json(
        { error: "Er is een fout opgetreden bij het verzenden van de e-mail" },
        { status: 500 }
      );
    }

    console.log("[Contact] Email sent successfully");

    // Submit to 2Solar
    console.log(`[Contact] [${requestId}] Submitting lead to 2Solar`);
    try {
      await submitTo2Solar(body);
    } catch (solarError) {
      console.error(
        `[Contact] [${requestId}] 2Solar submission failed:`,
        solarError
      );
      // We don't return an error here because the email was sent successfully
      // We just log the error and continue
    }

    const endTime = Date.now();
    console.log(
      `[Contact] [${requestId}] Form submission completed in ${endTime - startTime}ms`
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Bedankt voor uw aanvraag. We nemen zo snel mogelijk contact met u op.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `[Contact] [${requestId}] Error in contact form submission:`,
      error
    );
    return NextResponse.json(
      { error: "Er is een fout opgetreden" },
      { status: 500 }
    );
  }
}
