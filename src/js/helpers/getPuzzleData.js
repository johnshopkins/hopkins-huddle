/**
 * Get the puzzle data from the DOM
 * @returns {any}
 */
export default function () {
  const contextData = document.getElementById('puzzleData');
  return JSON.parse(contextData.innerText);
};
