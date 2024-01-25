export type TCustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
