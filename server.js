import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// 🔥 REAL-TIME TRACKING VARIABLES
// -------------------------------
let stats = {
    errorsSolved: 1,   // Starting number (you can change)
    activeUsers: 1,     // Simulated active users
    platformsUsed: 1,       // Count platforms used
    successRate: 100,         // % (will be auto updated)
    totalRequests: 0,
    successfulRequests: 0
};

// -------------------------------
// 🔥 TRACKING HELPER FUNCTION
// -------------------------------
function updateStats(success, platform) {

    stats.totalRequests++;

    // Count successful AI reply
    if (success) {
        stats.successfulRequests++;
        stats.errorsSolved++;  // Increase errors solved
    }

    // Recalculate success rate
    stats.successRate = Math.round(
        (stats.successfulRequests / stats.totalRequests) * 100
    );

    // Track platforms used dynamically
    if (platform && platform !== "" && platform !== null) {
        stats.platformsUsed = stats.platformsUsed; // keep constant OR add logic
    }
}

// -------------------------------
// 📌 PUBLIC ENDPOINT TO GET LIVE STATS
// -------------------------------
app.get("/api/stats", (req, res) => {
    res.json(stats);
});


// -------------------------------
// 🔥 MAIN AI DEBUG ENDPOINT
// -------------------------------
const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
    console.error("❌ Missing OPENROUTER_API_KEY in .env");
    process.exit(1);
}

console.log("✅ OpenRouter API Key Loaded.");

app.post("/api/debug", async (req, res) => {
    const { code, error, platform } = req.body;

    if (!code || !error) {
        return res.status(400).json({ error: "Missing code or error description" });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5500",
                "X-Title": "CodeDebugger AI"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `You are a code-debugging AI specialized in ${platform}.`
                    },
                    {
                        role: "user",
                        content:
`Here is the code:
${code}

Here is the error:
${error}

Explain the issue and give a fixed version.`
                    }
                ]
            })
        });

        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content || null;

        // SUCCESS IF AI RETURNS A VALID ANSWER
        const success = aiResponse !== null && aiResponse.trim() !== "";

        // 🔥 UPDATE REAL-TIME TRACKING
        updateStats(success, platform);

        res.json({ result: aiResponse || "No reply" });

    } catch (err) {
        // Failed request counts as unsuccessful
        updateStats(false, null);

        res.status(500).json({ error: "Server error", detail: err.message });
    }
});


// -------------------------------
// 🚀 START SERVER
// -------------------------------
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
