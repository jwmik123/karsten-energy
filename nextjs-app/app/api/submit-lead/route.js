// app/api/submit-lead/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Format the data for 2Solar API
    const solarLeadData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || "",
      postalCode: formData.postalCode || "",
      city: formData.city || "",
      address: formData.address || "",
      message: formData.message || "",
      leadSource: "Website Contact Form", // You can customize this
      // Add any other 2Solar specific fields here
    };

    // Get your 2Solar API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_2SOLAR_API_KEY;

    if (!apiKey) {
      console.error("2Solar API key is not defined in environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Internal server configuration error",
        },
        { status: 500 }
      );
    }

    // Send data to 2Solar API
    const response = await fetch("https://app.2solar.nl/api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // Add any other required headers
      },
      body: JSON.stringify(solarLeadData),
    });

    // Parse the 2Solar API response
    const responseData = await response.json();

    // Check if the submission was successful
    if (!response.ok) {
      console.error("2Solar API error:", responseData);
      return NextResponse.json(
        {
          success: false,
          message: responseData.message || "Failed to submit lead to 2Solar",
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Lead successfully submitted to 2Solar",
      data: responseData,
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
