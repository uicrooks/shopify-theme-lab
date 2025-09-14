class CountdownDisplay extends HTMLElement {
  constructor() {
    super();
    // Get the countdown target date from the dataset
    this.countdownDate = new Date(this.dataset.date).getTime();
    this.daysElement = this.querySelector("#days");
    this.hoursElement = this.querySelector("#hours");
    this.minutesElement = this.querySelector("#minutes");
    this.secondsElement = this.querySelector("#seconds");
  }

  connectedCallback() {
    this.init();
  }

  init() {
    // Update the countdown every second
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date().getTime(); // Current time in milliseconds
    const timeDifference = this.countdownDate - now; // Time difference in milliseconds

    if (timeDifference < 0) {
      // If countdown has passed, clear interval and set to 00:00:00:00
      clearInterval(this.countdownInterval);
      this.daysElement.innerText = "00";
      this.hoursElement.innerText = "00";
      this.minutesElement.innerText = "00";
      this.secondsElement.innerText = "00";
      return;
    }

    // Calculate time components (days, hours, minutes, seconds)
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the inner content of the spans with the calculated values
    this.daysElement.innerText = this.formatTime(days);
    this.hoursElement.innerText = this.formatTime(hours);
    this.minutesElement.innerText = this.formatTime(minutes);
    this.secondsElement.innerText = this.formatTime(seconds);
  }

  formatTime(timeUnit) {
    // Format numbers to always have two digits
    return timeUnit < 10 ? "0" + timeUnit : timeUnit;
  }
}

customElements.define("countdown-display", CountdownDisplay);
