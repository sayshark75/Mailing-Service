// Function to get current date in a specific time zone using Date class
function getCurrentDateInTimeZone(timeZone: string): string {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return currentDate.toLocaleString("en-US", options);
}

// Get current date in GMT+5:30
export default getCurrentDateInTimeZone;
