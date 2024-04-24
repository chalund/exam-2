export default function formatDate(timestamp) {
    const formattedDate = new Date(timestamp);
  
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  
    return formattedDate.toLocaleString("en-US", options);
  }