import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

async function sendMessage(userInput) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: userInput }],
            model: "deepseek-chat",
        });

        const response = completion.choices[0].message.content;
        document.getElementById('chatResponse').innerText = response;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('chatResponse').innerText = "Terjadi kesalahan. Silakan coba lagi.";
    }
}

// Fungsi untuk menangani klik tombol
window.sendMessage = function () {
    const userInput = document.getElementById('userInput').value;
    if (userInput) {
        sendMessage(userInput);
    } else {
        alert("Silakan masukkan pesan!");
    }
};
