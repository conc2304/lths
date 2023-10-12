/**
 * Scrolls a specified container to bring a target element into view, centered within the container.
 *
 * @param containerSelector - CSS selector for the container element.
 * @param elementSelector - CSS selector for the target element within the container
 */
export const scrollToAnElementInAContainer = (containerSelector: string, elementSelector: string) => {
  // Find the container and target element using the provided CSS selectors
  const container = document.querySelector(containerSelector) as HTMLElement;
  const element = document.querySelector(elementSelector) as HTMLElement;

  if (container && element) {
    // Calculate the position to scroll to, centering the target element within the container
    const top = element.offsetTop - container.offsetTop + element.clientHeight / 2 - container.clientHeight / 2;

    // Scroll the container to the calculated position smoothly
    container.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  }
};
