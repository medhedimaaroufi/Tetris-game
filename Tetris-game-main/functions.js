function changetext(buttonId) {
    var button = document.getElementById(buttonId);
    if (button.innerHTML === "START") {
      button.innerHTML = "RESTART";
    } else if (button.innerHTML === "PAUSE") {
      button.innerHTML = "CONTINUE";
    }
        else if (button.innerHTML === "RESTART") {
            button.innerHTML = "START";
        }   else if (button.innerHTML === "CONTINUE") {
            button.innerHTML = "PAUSE";
        }
    }
