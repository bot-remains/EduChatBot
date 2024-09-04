export default function formatConvHistory(messages) {
  return messages
    ?.map((message, i) => {
      if (i % 2 === 0) {
        return `HUMAN: ${message}`;
      } else {
        return `AI: ${message}`;
      }
    })
    .join('\n');
}
