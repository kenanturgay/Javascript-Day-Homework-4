const form = document.querySelector("form");
const titleInput = document.querySelector(".title");
const messageInput = document.getElementById("message");
const dateInput = document.getElementById("start");
const tasksList = document.querySelector(".tasks-list");

const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    const title = titleInput.value.trim();
    const message = messageInput.value.trim();
    const date = dateInput.value;
    const selectedPriority = document.querySelector('input[name="priority"]:checked')?.value || "Belirtilmedi";

    if (!title) {
      alert("Lütfen görev başlığı girin.");
      return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";
    taskDiv.innerHTML = `
      <h4>${title}</h4>
      <p>${message}</p>
      <p>Öncelik: ${selectedPriority}</p>
      <p>Bitiş Tarihi: ${date}</p>
      <div class="btn-group">
        <button class="complete-btn">Tamamla</button>
        <button class="delete-btn">Sil</button>
      </div>
    `;

    taskDiv.addEventListener("click", function (event) {
      event.stopPropagation();

      if (event.target.classList.contains("complete-btn")) {
        taskDiv.classList.toggle("completed");
      }

      if (event.target.classList.contains("delete-btn")) {
        taskDiv.remove();
      }
    });

    tasksList.appendChild(taskDiv);
    form.reset();
    dateInput.value = today;

  } catch (error) {
    console.error("Hata:", error);
    alert("Beklenmeyen bir hata oluştu.");
  }
});
