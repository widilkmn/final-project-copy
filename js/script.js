const achievementList = localStorage.getItem("achievementList")
  ? JSON.parse(localStorage.getItem("achievementList"))
  : [];

function addAchievement() {
  const achievementInput = document.getElementById("achievementInput").value;
  const achievement = {
    ID: achievementList.length + 1,
    Jumlah: achievementInput,
    Status: "Pending",
  };
  achievementList.push(achievement);
  localStorage.setItem("achievementList", JSON.stringify(achievementList));
  renderAchievement();
}

function toggleAchievementStatus(id) {
  const achievement = achievementList.find((ach) => ach.ID === id);
  achievement.Status =
    achievement.Status === "Pending" ? "Completed" : "Pending";
  localStorage.setItem("achievementList", JSON.stringify(achievementList));
  renderAchievement();
}

function deleteAchievement(id) {
  const index = achievementList.findIndex((ach) => ach.ID === id);
  achievementList.splice(index, 1);
  localStorage.setItem("achievementList", JSON.stringify(achievementList));
  renderAchievement();
}

function renderAchievement() {
  const achievementListElement = document.getElementById("achievementList");
  achievementListElement.innerHTML = "";
  achievementList.forEach((achievement) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <input type="checkbox" onclick="toggleAchievementStatus(${
          achievement.ID
        })" ${achievement.Status === "Completed" ? "checked" : ""}>
        <span style="text-decoration: ${
          achievement.Status === "Completed" ? "line-through" : "none"
        }">${achievement.Jumlah}</span>
        <button class="btn btn-danger" onclick="deleteAchievement(${achievement.ID})">X</button>
      `;
    achievementListElement.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", renderAchievement);
