export interface IAction {
  isVisible: boolean;
  conversationId?: string;
}

export interface IConfirmModalRef {
  onShowModal(isVisible: boolean, itemId?: string): void;
}
