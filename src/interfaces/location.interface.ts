export interface ILocationParams {
  q?: string;
  page: number;
  size: number;
  lid?: number;
}

export interface ILocation {
  provinceId: string;
  id: string;
  name: string;
  type: number;
  typeText: string;
}
