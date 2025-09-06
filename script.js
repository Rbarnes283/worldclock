let timer; // store interval

async function getTime() {
  const locationInput = document.getElementById("locationInput").value.trim();
  const cityName = document.getElementById("cityName");
  const clock = document.getElementById("clock");
  const clockContainer = document.getElementById("clockContainer");

  if (!locationInput) {
    alert("Please enter a city or state.");
    return;
  }

  try {
    // Format input for API
    const query = locationInput.replace(/\s+/g, "_");
    
    // Call WorldTimeAPI
    const response = await fetch(`https://worldtimeapi.org/api/timezone`);
    const zones = await response.json();

    // Find a matching timezone
    const match = zones.find(z => z.toLowerCase().includes(query.toLowerCase()));

    if (!match) {
      alert("City/State not found. Try again.");
      return;
    }

    // Get time data for matched zone
    const timeRes = await fetch(`https://worldtimeapi.org/api/timezone/${match}`);
    const data = await timeRes.json();

    let date = new Date(data.datetime);

    // Display city name
    cityName.textContent = `🕒 Current Time in ${locationInput}`;
    clockContainer.classList.remove("hidden");

    // Clear previous timer
    if (timer) clearInterval(timer);

    // Start clock update
    function updateClock() {
      date.setSeconds(date.getSeconds() + 1);
      clock.textContent = date.toLocaleTimeString();
    }

    updateClock();
    timer = setInterval(updateClock, 1000);

  } catch (error) {
    console.error("Error fetching time:", error);
    alert("Something went wrong. Try again later.");
  }
}
