/**
 * Utility functions for handling Zeffy form interactions
 */

/**
 * Opens a Zeffy form in a centered modal/popup window
 * @param {string} formUrl - The Zeffy form URL (should include ?modal=true)
 * @returns {void}
 */
export function openZeffyModal(formUrl: string): void {
  if (!formUrl) {
    console.error('Zeffy form URL is required');
    return;
  }

  // Popup dimensions
  const width = 600;
  const height = 800;

  // Calculate centered position
  const screenWidth = typeof window !== 'undefined' ? window.screen.width : 1024;
  const screenHeight = typeof window !== 'undefined' ? window.screen.height : 768;
  const left = (screenWidth - width) / 2;
  const top = (screenHeight - height) / 2;

  // Create popup features string
  const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;

  // Open popup
  window.open(formUrl, 'zeffy-form', features);
}

/**
 * Handles click events on Zeffy buttons
 * Reads the data-zeffy-form-link attribute and opens the form in a modal
 * @param {React.MouseEvent<HTMLButtonElement>} event - Click event from button
 * @returns {void}
 */
export function handleZeffyClick(event: React.MouseEvent<HTMLButtonElement>): void {
  event.preventDefault();
  
  const formLink = event.currentTarget.getAttribute('data-zeffy-form-link');
  
  if (!formLink) {
    console.error('data-zeffy-form-link attribute is missing on button');
    return;
  }

  openZeffyModal(formLink);
}
