document.addEventListener("DOMContentLoaded", () => {
    const clickButton = document.getElementById("click-button");
    const cpsDisplay = document.getElementById("cps");

    // クリックイベント
    clickButton.addEventListener("click", async () => {
        await fetch("/click", { method: "POST" });
    });

    // CPSを定期的に取得
    setInterval(async () => {
        const response = await fetch("/cps");
        const data = await response.json();
        cpsDisplay.textContent = data.cps.toFixed(2);
    }, 1000);
});
