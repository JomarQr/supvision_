// Lightweight class name merger (no clsx/cn dependency needed)
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
