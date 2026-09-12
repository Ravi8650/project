let currentDisplay = "";

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

function updateDisplay() {
  display.value = currentDisplay || "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    // Clear
    if (value === "C") {
      currentDisplay = "";
      updateDisplay();
      return;
    }

    // Calculate result
    if (value === "=") {
      try {
        if (currentDisplay.trim() === "") {
          return;
        }

        currentDisplay = String(eval(currentDisplay));
      } catch (error) {
        currentDisplay = "Error";

        setTimeout(() => {
          currentDisplay = "";
          updateDisplay();
        }, 1000);
      }

      updateDisplay();
      return;
    }

    // If Error is displayed, start fresh
    if (currentDisplay === "Error") {
      currentDisplay = "";
    }

    // Prevent multiple decimal points in the same number
    if (value === ".") {
      const lastNumber = currentDisplay.split(/[+\-*/]/).pop();

      if (lastNumber.includes(".")) {
        return;
      }
    }

    currentDisplay += value;

    updateDisplay();
  });
});

updateDisplay();
