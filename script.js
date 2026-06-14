const checkboxes = document.querySelectorAll("input[type='checkbox']");

// LOAD
function loadState() {
  checkboxes.forEach((box, i) => {
    box.checked = localStorage.getItem("box_" + i) === "true";
  });
}

// SAVE
function saveState() {
  checkboxes.forEach((box, i) => {
    localStorage.setItem("box_" + i, box.checked);
  });
}

// SCORE CALC
function updateScores() {
  let total = checkboxes.length;
  let completed = 0;

  let money = 0, health = 0, growth = 0, life = 0;
  let moneyTotal = 0, healthTotal = 0, growthTotal = 0, lifeTotal = 0;

  checkboxes.forEach(box => {
    let type = box.dataset.type || "life";

    if (box.checked) {
      completed++;

      if (type === "money") money++;
      if (type === "health") health++;
      if (type === "growth") growth++;
      if (type === "life") life++;
    }

    if (type === "money") moneyTotal++;
    if (type === "health") healthTotal++;
    if (type === "growth") growthTotal++;
    if (type === "life") lifeTotal++;
  });

  document.getElementById("completed").innerText = completed;
  document.getElementById("total").innerText = total;

  document.getElementById("moneyScore").innerText =
    moneyTotal ? Math.round((money / moneyTotal) * 100) + "%" : "0%";

  document.getElementById("healthScore").innerText =
    healthTotal ? Math.round((health / healthTotal) * 100) + "%" : "0%";

  document.getElementById("growthScore").innerText =
    growthTotal ? Math.round((growth / growthTotal) * 100) + "%" : "0%";

  document.getElementById("lifeScore").innerText =
    lifeTotal ? Math.round((life / lifeTotal) * 100) + "%" : "0%";
}

// EVENTS
checkboxes.forEach(box => {
  box.addEventListener("change", () => {
    saveState();
    updateScores();
  });
});

// JOURNAL
function startJournal() {
  document.getElementById("journalStatus").innerText = "Journal running...";

  setTimeout(() => alert("30 min check-in"), 1800000);
  setTimeout(() => alert("60 min stop"), 3600000);
}

// INIT
loadState();
updateScores();
function startDay() {
  alert("Day started. Focus on revenue first.");
}

function endDay() {
  let completed = document.querySelectorAll("input[type='checkbox']:checked").length;
  alert("Day ended. Completed tasks: " + completed);
}
function startDay() {
  document.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.checked = false;
  });

  saveStateIfExists();
  updateScoresIfExists();

  alert("New day started. Focus: revenue first, everything else follows.");
}
