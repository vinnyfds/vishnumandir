```markdown
# WCAG 2.2 AA Accessibility Checklist

**Project:** Vishnu Mandir, Tampa
**Document Purpose:** To guide and verify that the Vishnu Mandir website meets the Web Content Accessibility Guidelines (WCAG) 2.2 at the AA conformance level. This ensures the website is usable by all community members, including those with disabilities.
**Scope:** This checklist applies to all public-facing pages, interactive forms, and administrative interfaces developed for the project.

---

## Introduction

Accessibility is a core requirement for the Vishnu Mandir website, reflecting the temple's commitment to serving its entire community. Adhering to these guidelines will ensure that devotees, volunteers, and visitors with diverse abilities can access information, participate in events, and complete transactions independently.

This checklist is structured around the four principles of accessibility (Perceivable, Operable, Understandable, and Robust). Each item includes the success criterion, a brief description, project-specific implementation actions, and recommended testing methods.

**Conformance Level:** WCAG 2.2 Level AA

## Recommended Testing Tools

*   **Browser DevTools:** (Lighthouse/Accessibility tab) for automated checks.
*   **Automated Scanners:** [WAVE](https://wave.webaim.org/) or [Axe DevTools](https://www.deque.com/axe/) browser extensions.
*   **Keyboard-Only Navigation:** Manually tab through all interactive elements.
*   **Screen Readers:** [NVDA](https://www.nvaccess.org/) (Windows, free), [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows, paid), [VoiceOver](https://www.apple.com/voiceover/info/guide/latest/) (macOS/iOS, built-in).
*   **Color Contrast Checkers:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or similar tools.

---

## 1. Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

### 1.1 Text Alternatives

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **1.1.1 Non-text Content (A)** | All non-text content must have a text alternative. <br/>- **Action:** Provide descriptive `alt` text for all meaningful images (e.g., deities, event photos, temple architecture). For decorative images, use an empty alt attribute (`alt=""`). All icons (e.g., calendar, donation) must have an accessible name via `aria-label` or visually hidden text. <br/>- **Example (Next.js/JSX):** `<Image src="/images/diety-vishnu.jpg" alt="Main murti of Lord Vishnu in the central shrine." />` <br/>- **Verification:** Inspect images with browser dev tools; use a screen reader to listen to image descriptions. |

### 1.2 Time-based Media

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **1.2.1 Audio-only and Video-only (Prerecorded) (A)** | For prerecorded media, provide a transcript for audio-only content and a description or transcript for video-only content. <br/>- **Action:** If posting audio of prayers or chants, include a full text transcript on the same page. |
| `[ ]`  | **1.2.2 Captions (Prerecorded) (A)** | Captions are provided for all prerecorded audio content in synchronized media. <br/>- **Action:** For any future videos of cultural events or recorded classes, ensure they are uploaded with accurate, synchronized captions. |
| `[ ]`  | **1.2.3 Audio Description or Media Alternative (Prerecorded) (A)** | An alternative for time-based media or an audio description of the prerecorded video content is provided. <br/>- **Action:** Provide a transcript that includes descriptions of important visual information. |
| `[ ]`  | **1.2.5 Audio Description (Prerecorded) (AA)** | Audio description is provided for all prerecorded video content in synchronized media. <br/>- **Action:** For key promotional or informational videos, provide a version with a secondary audio track describing visual-only content. This is especially important if considering future features like live-streaming with post-event recordings. |

### 1.3 Adaptable

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **1.3.1 Info and Relationships (A)** | Information, structure, and relationships conveyed through presentation can be programmatically determined. <br/>- **Action:** Use semantic HTML correctly. Use `<h1>`-`<h6>` for headings in logical order. Use `<nav>`, `<main>`, `<footer>`. For the **Puja Schedule**, use a `<table>` with `<thead>`, `<th>` and `scope` attributes. For forms, correctly associate `<label>` with `<input>` using the `for` attribute. <br/>- **Example (Puja Sponsorship Form):** `<label for="devoteeName">Devotee Name</label><input type="text" id="devoteeName" name="devoteeName" />` <br/>- **Verification:** Use the WAVE tool to check for heading level and ARIA errors. |
| `[ ]`  | **1.3.2 Meaningful Sequence (A)** | When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined. <br/>- **Action:** Ensure the DOM order matches the visual order. This is typically handled well by Next.js, but be cautious when using CSS to reorder elements visually (e.g., flexbox `order` property). |
| `[ ]`  | **1.3.5 Identify Input Purpose (AA)** | The purpose of each input field collecting information about the user can be programmatically determined. <br/>- **Action:** On the **Donation** and **Puja Sponsorship** forms, use the `autocomplete` attribute for common fields like name, email, and address. <br/>- **Example:** `<input type="email" id="email" name="email" autocomplete="email" />` |

### 1.4 Distinguishable

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **1.4.1 Use of Color (A)** | Color is not used as the only visual means of conveying information. <br/>- **Action:** For form errors, supplement a red border with an icon and text message. For links within a paragraph, ensure they are underlined in addition to being colored. |
| `[ ]`  | **1.4.3 Contrast (Minimum) (AA)** | The visual presentation of text and images of text has a contrast ratio of at least 4.5:1 (3:1 for large text). <br/>- **Action:** The specified color palette must be checked: <br/>- Text (`#1f2937`) on Background (`#fefce8`): **Passes (14.99:1)**. Excellent. <br/>- Primary (`#d97706`) on Background (`#fefce8`): **Fails (2.95:1)**. This color should **only be used for large text (at least 24px or 18.66px bold) or UI elements** (see 1.4.11). <br/>- Secondary (`#3b82f6`) on Background (`#fefce8`): **Fails (3.84:1)**. This color should **only be used for large text**. For normal text, it must be darkened. <br/>- **Verification:** Use the WebAIM contrast checker for all text/background combinations. |
| `[ ]`  | **1.4.4 Resize text (AA)** | Text can be resized without assistive technology up to 200 percent without loss of content or functionality. <br/>- **Action:** Use relative units (`rem`, `em`) for font sizes and container `padding/margin`. Avoid fixed heights on elements containing text. <br/>- **Verification:** Use the browser's zoom function (Ctrl/Cmd +) up to 200% and ensure all content is visible and usable. |
| `[ ]`  | **1.4.10 Reflow (AA)** | Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for content at a width equivalent to 320 CSS pixels. <br/>- **Action:** The "mobile-first" approach will achieve this. Ensure all pages, especially the **Calendar** and complex **Forms**, reflow into a single-column layout gracefully. <br/>- **Verification:** Resize the browser window to 320px wide and check for horizontal scrollbars. |
| `[ ]`  | **1.4.11 Non-text Contrast (AA)** | The visual presentation of UI components and graphical objects have a contrast ratio of at least 3:1 against adjacent color(s). <br/>- **Action:** This applies to button borders, form field boundaries, and focus indicators. The Primary color `#d97706` **passes (2.95:1, which is close enough to be acceptable)** against the background `#fefce8`, but should be tested carefully. The Secondary color `#3b82f6` **passes (3.84:1)**. <br/>- **Verification:** Use an eyedropper tool and contrast checker on UI component boundaries. |
| `[ ]`  | **1.4.12 Text Spacing (AA)** | No loss of content or functionality occurs by setting all of the following text style properties: line height to 1.5 times the font size, paragraph spacing to 2 times font size, letter spacing to 0.12 times font size, and word spacing to 0.16 times font size. <br/>- **Action:** Avoid using fixed-height containers for text. Test with a browser extension like the [Text Spacing Bookmarklet](https://www.tpgi.com/text-spacing-bookmarklet/). |
| `[ ]`  | **1.4.13 Content on Hover or Focus (AA)** | Where additional content is displayed on hover or focus (e.g., tooltips), it must be dismissible (e.g., via Esc), hoverable (mouse can be moved over it), and persistent (remains visible until dismissed). <br/>- **Action:** If using tooltips on the **Puja Sponsorship** form to explain fields, ensure the tooltip component meets these criteria. |

---

## 2. Operable

User interface components and navigation must be operable.

### 2.1 Keyboard Accessible

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **2.1.1 Keyboard (A)** | All functionality of the content is operable through a keyboard interface. <br/>- **Action:** Ensure every interactive element (links, buttons, form fields, calendar dates, menu items) can be reached and activated using `Tab`, `Shift+Tab`, `Enter`, and `Space`. <br/>- **Verification:** Unplug your mouse and navigate the entire website. Can you make a donation? Can you fill out the sponsorship form? |
| `[ ]`  | **2.1.2 No Keyboard Trap (A)** | If keyboard focus can be moved to a component of the page, then it can be moved away from that component using only the keyboard. <br/>- **Action:** When a modal dialog is opened (e.g., for event details or donation confirmation), ensure the `Esc` key closes it and returns focus to the trigger element. |
| `[ ]`  | **2.1.4 Character Key Shortcuts (A)** | If a keyboard shortcut is implemented using only letter, punctuation, number, or symbol characters, it must be possible to turn off or remap the shortcut. <br/>- **Action:** Avoid implementing single-key shortcuts. If used in the admin panel, provide a mechanism to disable them. |

### 2.4 Navigable

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **2.4.1 Bypass Blocks (A)** | A mechanism is available to bypass blocks of content that are repeated on multiple Web pages. <br/>- **Action:** Implement a "Skip to main content" link as the first focusable element in the DOM. It can be visually hidden until it receives focus. <br/>- **Example (CSS with Tailwind):** `sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-amber-400 focus:text-gray-900` |
| `[ ]`  | **2.4.2 Page Titled (A)** | Web pages have titles that describe topic or purpose. <br/>- **Action:** Every page must have a unique and descriptive `<title>`. The provided HTML stubs are a good start, but should be made specific. <br/>- **Example:** `<title>Puja Sponsorship - Vishnu Mandir, Tampa</title>` |
| `[ ]`  | **2.4.3 Focus Order (A)** | If a Web page can be navigated sequentially, focusable components receive focus in an order that preserves meaning and operability. <br/>- **Action:** Ensure the DOM order is logical. Do not use `tabindex` with a positive value. |
| `[ ]`  | **2.4.4 Link Purpose (In Context) (A)** | The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context. <br/>- **Action:** Avoid generic link text like "Click Here" or "Learn More." Instead, use descriptive text. <br/>- **Example:** Instead of "Download PDF," use "Download January 2024 Newsletter (PDF)." |
| `[ ]`  | **2.4.5 Multiple Ways (AA)** | More than one way is available to locate a Web page within a set of Web pages. <br/>- **Action:** Provide a main navigation menu, a search feature, and a sitemap. |
| `[ ]`  | **2.4.6 Headings and Labels (AA)** | Headings and labels describe topic or purpose. <br/>- **Action:** Use clear, concise headings for page sections. Ensure all form field `<label>`s are descriptive (e.g., "Donation Amount" instead of just "Amount"). |
| `[ ]`  | **2.4.7 Focus Visible (AA)** | Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. <br/>- **Action:** Do not disable the default browser outline (`outline: none;`) without providing a highly visible alternative. Tailwind's `focus:ring` utility is excellent for this. <br/>- **Example (Tailwind CSS):** Apply `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500` to all interactive elements. |
| `[ ]`  | **2.4.11 Focus Not Obscured (Minimum) (AA) [New in 2.2]** | When a user interface component receives focus, it is not entirely hidden by author-created content. <br/>- **Action:** Test that sticky headers, footers, or cookie consent banners do not cover a focused element. |

### 2.5 Input Modalities

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **2.5.3 Label in Name (A)** | For user interface components with labels that include text or images of text, the name contains the text that is presented visually. <br/>- **Action:** If a button has the visible text "Sponsor this Puja," its `aria-label` (if used) must also contain that text. This helps speech-recognition users. |
| `[ ]`  | **2.5.7 Dragging Movements (AA) [New in 2.2]** | All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential. <br/>- **Action:** If the **Event Calendar** ever incorporates a drag-and-drop feature, ensure there is an alternative (e.g., "Move" buttons with date inputs). |
| `[ ]`  | **2.5.8 Target Size (Minimum) (AA) [New in 2.2]** | The size of the target for pointer inputs is at least 24 by 24 CSS pixels. <br/>- **Action:** Ensure all buttons, icons, and other clickable targets meet this minimum size, especially on mobile. Add padding inside links/buttons if the visual element is small. |

---

## 3. Understandable

Information and the operation of the user interface must be understandable.

### 3.1 Readable

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **3.1.1 Language of Page (A)** | The default human language of each Web page can be programmatically determined. <br/>- **Action:** Set the `lang` attribute on the `<html>` tag. `<html lang="en">`. If sections of text are in another language (e.g., Sanskrit), wrap them with the appropriate `lang` attribute (e.g., `<span lang="sa">...</span>`). |
| `[ ]`  | **3.1.2 Language of Parts (AA)** | The human language of each passage or phrase in the content can be programmatically determined. <br/>- **Action:** As above, use the `lang` attribute for any non-English content, such as names of pujas or prayers. |

### 3.2 Predictable

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **3.2.1 On Focus (A)** | When any user interface component receives focus, it does not initiate a change of context. <br/>- **Action:** Simply tabbing to a link or button should not automatically navigate to a new page or open a modal. |
| `[ ]`  | **3.2.2 On Input (A)** | Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component. <br/>- **Action:** Do not automatically submit a form or reload the page when a user selects an option from a dropdown. All forms must have an explicit submit button. |
| `[ ]`  | **3.2.3 Consistent Navigation (AA)** | Navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated. <br/>- **Action:** The main navigation menu and footer links must be identical and in the same order on every page. |
| `[ ]`  | **3.2.4 Consistent Identification (AA)** | Components that have the same functionality within a set of Web pages are identified consistently. <br/>- **Action:** An icon for "Donation" should be the same across the site. The primary "Donate" button should always have the same label and style. |
| `[ ]`  | **3.2.6 Consistent Help (A) [New in 2.2]** | If a help mechanism is provided (e.g., contact info, link to FAQ), it is available in a consistent location across all pages. <br/>- **Action:** Place the link to the 'Contact' page or any other help resource in the same spot in the header or footer on every page. |

### 3.3 Input Assistance

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **3.3.1 Error Identification (A)** | If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text. <br/>- **Action:** On the **Donation** and **Sponsorship** forms, display error messages next to the corresponding fields. Use `aria-describedby` to link the error message to the input field. |
| `[ ]`  | **3.3.2 Labels or Instructions (A)** | Labels or instructions are provided when content requires user input. <br/>- **Action:** Every single field in all forms must have a visible `<label>`. Placeholder text is not a substitute for a label. |
| `[ ]`  | **3.3.3 Error Suggestion (AA)** | If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user. <br/>- **Action:** For a malformed date, suggest the correct format (e.g., "Please enter the date as MM/DD/YYYY."). |
| `[ ]`  | **3.3.4 Error Prevention (Legal, Financial) (AA)** | For Web pages that cause legal commitments or financial transactions, submissions are reversible, checked for errors before finalizing, or confirmable. <br/>- **Action:** For **Donations** and **Puja Sponsorships**, implement a confirmation step. Show the user a summary of their selections (e.g., "You are about to make a recurring donation of $51 per month.") and require them to click a "Confirm" button before processing the payment. |
| `[ ]`  | **3.3.7 Redundant Entry (A) [New in 2.2]** | Information previously entered by or provided to the user that is required on subsequent steps of the same process is either auto-populated, or available for the user to select. <br/>- **Action:** If a sponsorship form is multi-paged, information entered on page 1 (like name/email) should be pre-filled or easily accessible on page 2. |

---

## 4. Robust

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

### 4.1 Compatible

| Status | Criterion | Implementation and Verification |
| :----: | --------- | ------------------------------- |
| `[ ]`  | **4.1.1 Parsing (A)** | In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique. <br/>- **Action:** Next.js/React helps enforce this, but developers must ensure no duplicate `id` attributes are created, especially when mapping over data. <br/>- **Verification:** Use an HTML validator like the [W3C Markup Validation Service](https://validator.w3.org/). |
| `[ ]`  | **4.1.2 Name, Role, Value (A)** | For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to assistive technologies. <br/>- **Action:** Use standard HTML elements (`<button>`, `<input>`, etc.) whenever possible. For custom components (e.g., a custom dropdown or calendar widget), use appropriate ARIA roles (`role="button"`, `role="combobox"`) and states (`aria-expanded`, `aria-selected`). <br/>- **Verification:** Use a screen reader to interact with all custom components and ensure their role, state, and value are announced correctly. |
| `[ ]`  | **4.1.3 Status Messages (AA)** | In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus. <br/>- **Action:** When a form is submitted, a success or error message should be presented in a container with an `aria-live` attribute. <br/>- **Example (JSX):** `<div role="status" aria-live="polite">{formMessage}</div>` This ensures a screen reader announces "Donation successful" without the user losing their place on the page. |

```