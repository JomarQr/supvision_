export function getSectionScrollTop(target: HTMLElement) {
  const top = target.getBoundingClientRect().top + window.scrollY;
  const paddingTop = Number.parseFloat(window.getComputedStyle(target).paddingTop) || 0;

  // Scroll to the actual content start, not the outer section box with top padding.
  return Math.max(top + paddingTop - 16, 0);
}

export function scrollToSection(target: HTMLElement, behavior: ScrollBehavior = 'smooth') {
  window.scrollTo({
    top: getSectionScrollTop(target),
    behavior,
  });
}
