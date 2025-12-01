document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.querySelector(".analyze-btn");

    analyzeBtn.addEventListener("click", async () => {
        const code = document.querySelectorAll("textarea")[0].value;
        const error = document.querySelectorAll("textarea")[1].value;

        // Default platform for now until you add dynamic selection
        const platform = "VSCode";

        // Show loading state
        analyzeBtn.innerText = "⏳ Analyzing...";
        analyzeBtn.disabled = true;

        try {
            const response = await fetch("http://localhost:3001/api/debug", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code, error, platform })
            });

            const data = await response.json();

            // Inject the result into the solution area
            const resultBox = document.querySelector(".solution-content");
            resultBox.innerHTML = data.result.replace(/\n/g, "<br>");
        } catch (err) {
            alert("Backend error: " + err.message);
        } finally {
            analyzeBtn.innerText = "🔍 Analyze & Debug with AI";
            analyzeBtn.disabled = false;
        }
    });
});
