import * as productActions from './product.actions';
import { EProductActions } from './product.constants';
import productSlice from './product.slice';

export { EProductActions };
export const {
  actions: {},
} = productSlice;
export const { reducer: productReducer } = productSlice;
export const { getListProductAction, getProductCategoryAction } = productActions;
