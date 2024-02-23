export enum ERemoveType {
  ONE_ITEM = 'ONE_ITEM',
  ALL_ITEM = 'ALL_ITEM',
}

export interface IAction {
  isVisible: boolean;
  type: ERemoveType;
  itemId?: string;
}

export interface IRemoveModalRef {
  onShowModal(isVisible: boolean, type: ERemoveType, itemId?: string): void;
}
