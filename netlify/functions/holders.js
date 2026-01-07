const HELIUS_RPC = "https://mainnet.helius-rpc.com/"

exports.handler = async (event) => {
  try {
    const mint = event.queryStringParameters?.mint
    if (!mint) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing mint parameter." })
      }
    }

    const apiKey = process.env.HELIUS_API_KEY || process.env.VITE_HELIUS_API_KEY
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Helius API key not configured." })
      }
    }

    const response = await fetch(`${HELIUS_RPC}?api-key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "holders",
        method: "getTokenAccounts",
        params: {
          mint
        }
      })
    })

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch holders." })
      }
    }

    const data = await response.json()
    const holders =
      data?.result?.total ??
      data?.result?.pagination?.total ??
      data?.result?.token_accounts?.length ??
      null

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=20"
      },
      body: JSON.stringify({ holders })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected error.", message: err?.message })
    }
  }
}
