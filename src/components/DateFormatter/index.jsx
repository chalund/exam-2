export default function formatDate(timestamp) {
  const formattedDate = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
    
  };

  return formattedDate.toLocaleString("en-US", options);
}
