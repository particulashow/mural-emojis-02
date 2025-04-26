const streamId = "748c0ff7"; // substitui aqui o teu stream ID real
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);

const emojiContainer = document.getElementById('emoji-container');

socket.addEventListener("open", () => {
  console.log("Ligado ao WebSocket do mural de emojis!");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "chat-message") {
    const message = data.message.trim();
    displayEmojisFromMessage(message);
  }
});

function displayEmojisFromMessage(message) {
  const emojis = Array.from(message).filter(char => /\p{Emoji}/u.test(char));

  emojis.forEach(emoji => {
    const emojiEl = document.createElement('div');
    emojiEl.className = 'emoji';
    emojiEl.textContent = emoji;
    emojiEl.style.left = `${Math.random() * 90}%`;
    emojiContainer.appendChild(emojiEl);

    setTimeout(() => {
      emojiEl.remove();
    }, 5000);
  });
}
