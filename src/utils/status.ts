export const STATUSES = [
  'gerade wahrscheinlich am coden, oder auch nicht',
  'baut grad was für roblox',
  'irgendwo zwischen zwei projekten',
  'schach nebenbei offen, wie immer',
];

export function randomStatus(): string {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)];
}
