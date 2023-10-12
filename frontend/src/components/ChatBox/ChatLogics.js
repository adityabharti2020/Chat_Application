export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      (messages[i + 1].sender === m.sender ||
        messages[i + 1].sender !== userId) &&
      messages[i].sender == userId
    )
      return 950;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender !== m.sender &&
        messages[i].sender !== userId) ||
      (i === messages.length - 1 && messages[i].sender !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender !== m.sender ||
        messages[i + 1].sender === userId) &&
      messages[i].sender == m.sender
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender !== userId &&
      messages[messages.length - 1].sender
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender === m.sender;
  };
  
  export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  export const DateTimeFormater = (date) => {
    const utcDate = new Date(date);
    // console.log(utcDate)

    const day = utcDate.getDate(); // Day of the month (e.g., 11)
    const month = utcDate.getMonth(); // Month (0-based, e.g., 9 for October)
    const year = utcDate.getFullYear(); // Year (e.g., 2023)
    const hours = utcDate.getHours(); // Hours (e.g., 17)
    const minutes = utcDate.getMinutes(); // Minutes (e.g., 54)
    const seconds = utcDate.getSeconds(); // Seconds (e.g., 41)
    const dayOfWeek = utcDate.getDay();
    const formattedTime = `${hours}:${minutes}`;

    // console.log(day)
    // console.log(month)
    // console.log(year)
    // console.log(hours)
    // console.log(minutes)
    // console.log(seconds)
    // console.log(dayOfWeek)
    return formattedTime

  }