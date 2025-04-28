import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
// Replace with your actual API key in environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
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

    // Format the full address
    const fullAddress = `${address} ${houseNumber}, ${postalCode} ${city}`;

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Karsten Energy Website <noreply@karstenenergy.nl>",
      to: ["joelmik123@gmail.com"], // Replace with your actual email
      subject: "Nieuwe offerte aanvraag via website",
      html: `
        <h1>Nieuwe offerte aanvraag</h1>
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Adres:</strong> ${fullAddress}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
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
