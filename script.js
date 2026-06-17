document.addEventListener("DOMContentLoaded", () => {

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  // -------------------
  // LOAD STATE
  // -------------------
  function loadState() {
    checkboxes.forEach((box, i) => {
      box.checked = localStorage.getItem("box_" + i) === "true";
    });
  }

  // -------------------
  // SAVE STATE
  // -------------------
  function saveState() {
    checkboxes.forEach((box, i) => {
      localStorage.setItem("box_" + i, box.checked);
    });
  }

  // -------------------
  // SCORE CALC
  // -------------------
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

  // -------------------
  // EVENTS
  // -------------------
  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      saveState();
      updateScores();
    });
  });

  // -------------------
  // JOURNAL
  // -------------------
  window.startJournal = function () {
    document.getElementById("journalStatus").innerText = "Journal running...";

    setTimeout(() => alert("30 min check-in"), 1800000);
    setTimeout(() => alert("60 min stop"), 3600000);
  };

  // -------------------
  // DAY CONTROLS
  // -------------------
  window.startDay = function () {
    checkboxes.forEach(box => box.checked = false);
    saveState();
    updateScores();
    alert("New day started. Focus on revenue first.");
  };

  window.endDay = function () {
    let total = checkboxes.length;
    let done = document.querySelectorAll("input[type='checkbox']:checked").length;

    let percent = total === 0 ? 0 : Math.round((done / total) * 100);

    alert(
      "Day complete.\n\nTasks done: " +
      done +
      "/" +
      total +
      "\nCompletion: " +
      percent +
      "%"
    );
  };

  // -------------------
  // TABS
  // -------------------
  window.showTab = function (tabId) {
    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");
  };

  // -------------------
  // INIT
  // -------------------
  loadState();
  updateScores();
  showTab("dashboard");

});
});
