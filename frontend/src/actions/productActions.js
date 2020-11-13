import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productDeleteRequest,
  productDeleteFail,
  productDeleteSuccess,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productTopRequest,
  productTopSuccess,
  productTopFail,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: productListRequest });
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({ type: productListSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productDetailsRequest });
    const { data } = await axios.get("/api/products/" + id);

    dispatch({ type: productDetailsSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productDetailsFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: productDeleteRequest });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete("/api/products/" + id, config);

    dispatch({ type: productDeleteSuccess });
  } catch (error) {
    dispatch({
      type: productDeleteFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: productCreateRequest });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/products/", {}, config);

    dispatch({ type: productCreateSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productCreateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: productUpdateRequest });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: productUpdateSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productUpdateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const productCreateReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: productCreateReviewRequest });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({ type: productCreateReviewSuccess });
  } catch (error) {
    dispatch({
      type: productCreateReviewFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productTopRequest });
    const { data } = await axios.get(`/api/products/top`);
    console.log("what is your freakin problem", data)

    dispatch({ type: productTopSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productTopFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};