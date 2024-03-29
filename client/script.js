import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const server = "http://localhost:5000";
const form = document.querySelector("form");
const trash = document.querySelector("#trash");
const chatContainer = document.querySelector("#chatContainer");
let loadInterval;

function loader(e) {
  e.textContent = "";
  loadInterval = setInterval(() => {
    e.textContent += ".";
    if (e.textContent.length > 3) {
      e.textContent = "";
    }
  }, 300);
}

function textType(e, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      e.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  trash.style.display = "inline-block";

  return `
        <div class="wrapper ${isAi && "ai"}">
            <div class="chat">
                <div class="profile">
                    <img 
                    src=${isAi ? bot : user}
                    alt=${isAi ? "bot" : "user"}
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  // user's chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
  form.reset();

  // bot's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  // fetch data from server -> bot's response
  const response = await fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = "";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    textType(messageDiv, parsedData);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = `Beklenmedik bir hata oluştu, lütfen <a href="https://beta.openai.com/" target="_blank">OpenAI Destek</a> ekibiyle veya <a href="mailto:support@urgun.com.tr" target="_blank">Teknik Destek</a> ekibinizle <b>API</b> hakkında iletişime geçiniz! \n\n<table><tr><td>Durum Kodu:</td><td>429</td></tr><tr><td>Sunucu URL:</td><td><a href="${server}" target="_blank">${server}</a></td></tr></table>`;
    console.log(err);
  }
};

const handleTrash = async () => {
  chatContainer.innerHTML = "";
  trash.style.display = "none";
  clearInterval(loadInterval);
};

trash.addEventListener("click", handleTrash);
form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && !e.shiftKey) {
    handleSubmit(e);
  }
});

// initial message
chatContainer.innerHTML += chatStripe(
  true,
  "Merhaba, ben <b>OpenAI</b>'nin <b>GPT-3</b> modeliyle çalışan bir <b>chatbot</b>'um. Sizinle sohbet etmek için buradayım!"
);
