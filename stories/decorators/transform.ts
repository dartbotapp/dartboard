export const transform = (source: string) => {
  const container = `<div id="dartbot-transform">${source}</div>`;
  const doc = new DOMParser().parseFromString(container, 'text/html');
  const remove = doc.querySelectorAll('[data-dartbot-remove]');
  remove.forEach(el => el.remove());
  const content = doc.querySelector('#dartbot-transform');
  return content?.innerHTML || source;
};
