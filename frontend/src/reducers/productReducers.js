import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsSuccess,
  productDetailsRequest,
  productDetailsFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateReset,
  productCreateSuccess,
  productCreateFail,
  productCreateRequest,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productCreateReviewReset,
  productTopRequest,
  productTopSuccess,
  productTopFail,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productListRequest:
      return { loading: true, products: [] };
    case productListSuccess:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case productListFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case productDetailsRequest:
      return { loading: true, ...state };
    case productDetailsSuccess:
      return { loading: false, product: action.payload };
    case productDetailsFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productDeleteRequest:
      return { loading: true };
    case productDeleteSuccess:
      return { loading: false, success: true };
    case productDeleteFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productCreateRequest:
      return { loading: true };
    case productCreateSuccess:
      return { loading: false, success: true, product: action.payload };
    case productCreateFail:
      return { loading: false, error: action.payload };
    case productCreateReset:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productUpdateRequest:
      return { loading: true };
    case productUpdateSuccess:
      return { loading: false, success: true, product: action.payload };
    case productUpdateFail:
      return { loading: false, error: action.payload };
    case productUpdateReset:
      return { product: {} };
    default:
      return state;
  }
};
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productCreateReviewRequest:
      return { loading: true };
    case productCreateReviewSuccess:
      return { loading: false, success: true };
    case productCreateReviewFail:
      return { loading: false, error: action.payload };
    case productCreateReviewReset:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productTopRequest:
      return { loading: true, products: [] };
    case productTopSuccess:
      return { loading: false, products: action.payload };
    case productTopFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
