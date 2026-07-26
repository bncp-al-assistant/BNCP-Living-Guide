// ==============================
// BNCP Smart Welfare Portal
// app.js
// ==============================

// Cloudflare Worker URL
const API_URL = "YOUR_CLOUDFLARE_WORKER_URL";

// 요소 가져오기
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// 메시지 출력
function addMessage(sender, message) {

    const div = document.createElement("div");

    div.className = sender === "user" ? "user" : "ai";

    div.innerHTML = `<strong>${sender === "user" ? "🙋 나" : "🤖 AI"}</strong><br>${message}`;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// AI 호출
async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    addMessage("user", message);

    userInput.value = "";

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        addMessage("ai", data.reply);

    } catch (error) {

        console.error(error);

        addMessage(
            "ai",
            "죄송합니다. 현재 AI 서버와 연결할 수 없습니다."
        );
    }
}

// Enter 키 전송
userInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});

// 샘플 날씨 표시
const weather = document.getElementById("weather");

if (weather) {

    weather.innerHTML = `
        ☀️ Baghdad<br>
        39°C<br>
        맑음
    `;

}

// 페이지 시작
window.onload = function () {

    addMessage(
        "ai",
        "안녕하세요! BNCP AI Assistant입니다. 무엇을 도와드릴까요?"
    );

};
