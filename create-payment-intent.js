/**
 * Cloudflare Pages Function — /api/create-payment-intent
 *
 * This tiny function lives in your GitHub repo alongside index.html.
 * Cloudflare deploys it automatically for free — no separate setup needed.
 *
 * SETUP:
 * 1. In Cloudflare Pages → your site → Settings → Environment Variables
 * 2. Add variable: STRIPE_SECRET_KEY = sk_live_xxxxxxx  (your Stripe secret key)
 * 3. That's it. Cloudflare keeps your secret key safe server-side.
 *
 * Free tier: 100,000 requests/day — far more than you'll ever need.
 */

export async function onRequestPost(context) {
  // CORS headers so the form page can call this endpoint
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    // Read the request body
    const { amount, description, email } = await context.request.json();

    // Basic validation
    if (!amount || amount < 100) {
      return new Response(JSON.stringify({ error: 'Invalid amount.' }), {
        status: 400, headers: corsHeaders
      });
    }

    // Your Stripe secret key comes from Cloudflare environment variable
    const secretKey = context.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return new Response(JSON.stringify({ error: 'Payment system not configured.' }), {
        status: 500, headers: corsHeaders
      });
    }

    // Create a PaymentIntent with Stripe API
    const params = new URLSearchParams({
      amount:      String(amount),
      currency:    'usd',
      description: description || 'PLG Gridders Registration',
      'metadata[source]': 'plgridders.com',
    });

    // Attach email to customer if provided
    if (email) {
      params.set('receipt_email', email);
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const intent = await stripeRes.json();

    if (intent.error) {
      return new Response(JSON.stringify({ error: intent.error.message }), {
        status: 400, headers: corsHeaders
      });
    }

    // Return the client_secret — Stripe.js uses this to confirm payment on the frontend
    return new Response(JSON.stringify({ clientSecret: intent.client_secret }), {
      status: 200, headers: corsHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error: ' + err.message }), {
      status: 500, headers: corsHeaders
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
