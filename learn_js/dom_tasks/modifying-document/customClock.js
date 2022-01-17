import { helper } from "./helpers.js";

const cl = console.log;

export class CustomClock {
  _initialHours;
  _initialMinutes;
  _initialSeconds;

  get targetClockDiv() {
    let targetClockDiv = document.querySelector(".clock-div");
    if (!targetClockDiv) {
      targetClockDiv = document.createElement("div");
      targetClockDiv.classList.add("clock-div");
      document.body.appendChild(targetClockDiv);
    }
    return targetClockDiv;
  }

  spanElHours = document.createElement("span");
  spanElMinutes = document.createElement("span");
  spanElSeconds = document.createElement("span");
  isAllowedToStart = true;

  constructor(initialDate) {
    if (initialDate instanceof Date) {
      this.spanElHours.id = "spanHours";
      this.spanElHours.style.color = "red";

      this.spanElMinutes.id = "spanMinutes";
      this.spanElMinutes.style.color = "green";

      this.spanElSeconds.id = "spanSeconds";
      this.spanElSeconds.style.color = "blue";

      this.targetClockDiv.append(
        this.spanElHours,
        this.spanElMinutes,
        this.spanElSeconds
      );

      this.setInitialDate(initialDate);
      this.outputTime(
        this._initialHours,
        this._initialMinutes,
        this._initialSeconds
      );
    } else {
      cl("no initial date provided");
    }
  }
  setInitialDate(initialDate) {
    this._initialHours = initialDate.getHours();
    this._initialMinutes = initialDate.getMinutes();
    this._initialSeconds = initialDate.getSeconds();
    return {
      hours: this._initialHours,
      minutes: this._initialMinutes,
      seconds: this._initialSeconds,
    };
  }

  outputTime(hours, minutes, seconds) {
    cl(`hours,minutes,seconds new Date()`, hours, minutes, seconds, new Date());

    this.spanElHours.innerHTML = `${hours} : `;

    this.spanElMinutes.innerHTML = `${minutes} : `;

    this.spanElSeconds.innerHTML = `${seconds}`;
  }

  async startClock() {
    if (this.started) return;

    this.isAllowedToStart = true;

    while (this.isAllowedToStart) {
      this.started = true;

      await helper.sleep(1000);
      // .then(r=>{
      cl("setting time");

      if (this._initialSeconds == 59) {
        this._initialSeconds = 0;

        if (this._initialMinutes == 59) {
          this._initialMinutes = 0;

          if (this._initialHours == 23) {
            this._initialHours = 0;
          } else {
            ++this._initialHours;
          }
        } else {
          ++this._initialMinutes;
        }
      }
      ++this._initialSeconds;
      this.outputTime(
        this._initialHours,
        this._initialMinutes,
        this._initialSeconds
      );

      // })
    }
    cl("leaving loop");
  }

  stopClock() {
    this.started = false;
    this.isAllowedToStart = false;
  }
}
