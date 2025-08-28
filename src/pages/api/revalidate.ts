import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify the request is from Sanity (optional but recommended)
    const body = await request.json();

    // Log the webhook for debugging
    console.log("Sanity webhook received:", body);

    // Extract the document type and slug from the webhook payload
    const { _type, slug } = body;

    if (!_type) {
      return new Response("No document type provided", { status: 400 });
    }

    // Create a response that triggers a rebuild
    // Since we're using Cloudflare Pages, we can't do selective revalidation
    // Instead, we'll trigger a rebuild via a deployment hook or return instructions

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook received successfully",
        type: _type,
        slug: slug?.current || "unknown",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
