let timer;

// Mapping US states & major world cities to timezones
const timezones = {
  // --- US States ---
  "alabama": "America/Chicago",
  "alaska": "America/Anchorage",
  "arizona": "America/Phoenix",
  "arkansas": "America/Chicago",
  "california": "America/Los_Angeles",
  "colorado": "America/Denver",
  "connecticut": "America/New_York",
  "delaware": "America/New_York",
  "florida": "America/New_York",
  "georgia": "America/New_York",
  "hawaii": "Pacific/Honolulu",
  "idaho": "America/Boise",
  "illinois": "America/Chicago",
  "indiana": "America/Indiana/Indianapolis",
  "iowa": "America/Chicago",
  "kansas": "America/Chicago",
  "kentucky": "America/New_York",
  "louisiana": "America/Chicago",
  "maine": "America/New_York",
  "maryland": "America/New_York",
  "massachusetts": "America/New_York",
  "michigan": "America/Detroit",
  "minnesota": "America/Chicago",
  "mississippi": "America/Chicago",
  "missouri": "America/Chicago",
  "montana": "America/Denver",
  "nebraska": "America/Chicago",
  "nevada": "America/Los_Angeles",
  "new hampshire": "America/New_York",
  "new jersey": "America/New_York",
  "new mexico": "America/Denver",
  "new york": "America/New_York",
  "north carolina": "America/New_York",
  "north dakota": "America/Chicago",
  "ohio": "America/New_York",
  "oklahoma": "America/Chicago",
  "oregon": "America/Los_Angeles",
  "pennsylvania": "America/New_York",
  "rhode island": "America/New_York",
  "south carolina": "America/New_York",
  "south dakota": "America/Chicago",
  "tennessee": "America/Chicago",
  "texas": "America/Chicago",
  "utah": "America/Denver",
  "vermont": "America/New_York",
  "virginia": "America/New_York",
  "washington": "America/Los_Angeles",
  "west virginia": "America/New_York",
  "wisconsin": "America/Chicago",
  "wyoming": "America/Denver",

  // --- Major World Cities ---
  "london": "Europe/London",
  "paris": "Europe/Paris",
  "berlin": "Europe/Berlin",
  "rome": "Europe/Rome",
  "madrid": "Europe/Madrid",
  "moscow": "Europe/Moscow",
  "tokyo": "Asia/Tokyo",
  "beijing": "Asia/Shanghai",
  "shanghai": "Asia/Shanghai",
  "hong kong": "Asia/Hong_Kong",
  "seoul": "Asia/Seoul",
  "bangkok": "Asia/Bangkok",
  "mumbai": "Asia/Kolkata",
  "delhi": "Asia/Kolkata",
  "sydney": "Australia/Sydney",
  "melbourne": "Australia/Melbourne",
  "toronto": "America/Toronto",
  "vancouver": "America/Vancouver",
  "mexico city": "America/Mexico_City",
  "buenos aires": "America/Argentina/Buenos_Aires",
  "rio de janeiro": "America/Sao_Paulo",
  "cape town": "Africa/Johannesburg",
  "nairobi": "Africa/Nairobi",
  "dubai": "Asia/Dubai",
  "istanbul": "Europe/Istanbul",
  "singapore": "Asia/Singapore",
  "jakarta": "Asia/Jakarta",
  "kuala lumpur": "Asia/Kuala_Lumpur",
  "cairo": "Africa/Cairo"
};

async function getTime() {
  const locationInput = document.getElementById("locationInput").value.trim().toLowerCase();
  const cityName = document.getElementById("cityName");
  const clock = document.getElementById("clock");
  const clockContainer = document.getElementById("clockContainer");

  if (!locationInput) {
    alert("Please enter a city or state.");
    return;
  }

  // Look up timezone
  const timezone = timezones[locationInput];
  if (!timezone) {
    alert("City/State not found. Try something like 'Texas', 'California', 'London', 'Tokyo'.");
    return;
  }

  try {
    // Show city name
    cityName.textContent = `🕒 Time in ${locationInput.charAt(0).toUpperCase() + locationInput.slice(1)}`;
    clockContainer.classList.remove("hidden");

    // Clear old timer
    if (timer) clearInterval(timer);

    // Update live clock (based on Intl API, not local PC)
    function updateClock() {
      let now = new Date();
      let options = {
        timeZone: timezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      clock.textContent = new Intl.DateTimeFormat("en-US", options).format(now);
    }

    updateClock();
    timer = setInterval(updateClock, 1000);

  } catch (error) {
    console.error("Error fetching time:", error);
    alert("Something went wrong. Try again later.");
  }
}
