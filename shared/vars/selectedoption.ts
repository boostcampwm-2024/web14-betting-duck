export const selectedOption = ["1", "2"] as const;
export type SelectedOption = (typeof selectedOption)[number];
