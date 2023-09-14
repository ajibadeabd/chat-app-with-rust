let log = console.log;

const wsUri =
  ((window.location.protocol == "https:" && "wss://") || "ws://") +
  window.location.host +
  "/ws";
conn = new WebSocket(wsUri);

log("Connecting...");

conn.onopen = function () {
  log("Connected.");
};
 


conn.onmessage = function (e) {
  // Create a new chat message div
  var chatDiv = document.createElement("div");
  chatDiv.className = "incoming-message"; // Apply the chat-box class
 
  chatDiv.textContent = e.data;

  var logDiv = document.getElementById("log");
  logDiv.appendChild(chatDiv);
  
  logDiv.scrollTop = logDiv.scrollHeight;
};


conn.onclose = function () {
  log("Disconnected.");
  conn = null;
};

function send() {
  conn.send(document.getElementById("input").value);
  var chatDiv = document.createElement("div");
  chatDiv.className = "outgoing-message"; 
 
  chatDiv.textContent = document.getElementById("input").value;

  var logDiv = document.getElementById("log");
  logDiv.appendChild(chatDiv);
  document.getElementById("input").value = ""
}

document.getElementById("btn").addEventListener("click", send);