function formatConvHistory(messages) {
  return messages
    .map((message, i) => {
      if (i % 2 == 0) {
        return `AI: ${message}`;
      } else {
        return `HUMAN: ${message}`;
      }
    })
    .join('\n');
}
