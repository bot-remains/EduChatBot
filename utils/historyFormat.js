function formatConvHistory(messages) {
  return messages
    .map((message, i) => {
      if (i % 2 === 0) {
        return `User: ${message}`;
      } else {
        return `EduChat: ${message}`;
      }
    })
    .join('\n');
}
