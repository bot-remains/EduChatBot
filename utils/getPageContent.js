function getPageContent(docs) {
  return docs.map((doc) => doc.pageContent).join('\n\n');
}
export default getPageContent;
