export const selectedOption = ["option1", "option2"] as const;
export type SelectedOption = (typeof selectedOption)[number];
