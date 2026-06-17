document.addEventListener("DOMContentLoaded", () => {

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  // TAB SWITCH
  window.showTab = function(tabId) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
  };

  // DAY SWITCH
  window.setDay = function(day) {
    document.getElementById("scheduleTitle").innerText = day + " Schedule";
  };

  // START DAY
  window.startDay = function() {
    checkboxes.forEach(c => c.checked = false);
    save();
    update();
  };

  // END DAY
  window.endDay = function() {
    const total = checkboxes.length;
    const done = document.querySelectorAll("input:checked").length;
    alert(`${done}/${total} completed`);
  };

  // JOURNAL
  window.startJournal = function() {
    document.getElementById("journalStatus").innerText = "Writing mode...";
  };

  // SAVE
  function save() {
    checkboxes.forEach((c, i) => {
      localStorage.setItem("habit_" + i, c.checked);
    });
  }

  // LOAD
  function load() {
    checkboxes.forEach((c, i) => {
      c.checked = localStorage.getItem("habit_" + i) === "true";
    });
  }

  // UPDATE
  function update() {
    document.getElementById("completed").innerText =
      document.querySelectorAll("input:checked").length;

    document.getElementById("total").innerText = checkboxes.length;
  }

  checkboxes.forEach(c => {
    c.addEventListener("change", () => {
      save();
      update();
    });
  });

  load();
  update();
  showTab("dashboard");

});
