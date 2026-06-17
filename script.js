document.addEventListener("DOMContentLoaded", () => {

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  // -----------------------
  // TAB SYSTEM
  // -----------------------
  window.showTab = function(tabId) {
    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.remove("active");
    });

    const el = document.getElementById(tabId);
    if (el) el.classList.add("active");
  };

  // -----------------------
  // DAY SYSTEM
  // -----------------------
  window.setDay = function(day) {
    const title = document.getElementById("scheduleTitle");
    if (title) title.innerText = day + " Schedule";
  };

  // -----------------------
  // START DAY
  // -----------------------
  window.startDay = function() {
    checkboxes.forEach(box => box.checked = false);
    saveState();
    updateScores();
    alert("New day started 🚀");
  };

  // -----------------------
  // END DAY
  // -----------------------
  window.endDay = function() {
    const total = checkboxes.length;
    const done = document.querySelectorAll("input[type='checkbox']:checked").length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    alert(`Day complete\n\n${done}/${total} tasks\n${percent}% done`);
  };

  // -----------------------
  // JOURNAL
  // -----------------------
  window.startJournal = function() {
    const status = document.getElementById("journalStatus");
    if (status) status.innerText = "Journal running...";

    setTimeout(() => alert("30 min check-in"), 1800000);
    setTimeout(() => alert("60 min stop"), 3600000);
  };

  // -----------------------
  // SAVE / LOAD
  // -----------------------
  function saveState() {
    checkboxes.forEach((box, i) => {
      localStorage.setItem("habit_" + i, box.checked);
    });
  }

  function loadState() {
    checkboxes.forEach((box, i) => {
      box.checked = localStorage.getItem("habit_" + i) === "true";
    });
  }

  // -----------------------
  // SCORES
  // -----------------------
  function updateScores() {
    let total = checkboxes.length;
    let completed = 0;

    let money = 0, health = 0, growth = 0, life = 0;
    let moneyT = 0, healthT = 0, growthT = 0, lifeT = 0;

    checkboxes.forEach(box => {
      const type = box.dataset.type || "life";

      if (box.checked) {
        completed++;
        if (type === "money") money++;
        if (type === "health") health++;
        if (type === "growth") growth++;
        if (type === "life") life++;
      }

      if (type === "money") moneyT++;
      if (type === "health") healthT++;
      if (type === "growth") growthT++;
      if (type === "life") lifeT++;
    });

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    set("completed", completed);
    set("total", total);

    set("moneyScore", moneyT ? Math.round((money / moneyT) * 100) + "%" : "0%");
    set("healthScore", healthT ? Math.round((health / healthT) * 100) + "%" : "0%");
    set("growthScore", growthT ? Math.round((growth / growthT) * 100) + "%" : "0%");
    set("lifeScore", lifeT ? Math.round((life / lifeT) * 100) + "%" : "0%");
  }

  // -----------------------
  // EVENTS
  // -----------------------
  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      saveState();
      updateScores();
    });
  });

  // -----------------------
  // INIT
  // -----------------------
  loadState();
  updateScores();
  showTab("dashboard");

});
