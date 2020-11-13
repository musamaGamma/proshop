import { createOrderFail, createOrderSuccess, createOrderRequest, orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset, orderListMyRequest, orderListMySuccess, orderListMyFail, orderListMyRESET, orderListRequest, orderListSuccess, orderListFail, orderListRESET, orderDeliverRequest, orderDeliverSuccess, orderDeliverFail, orderDeliverReset } from "../constants/orderConstants"


export const orderCreateReducer= (state={}, action)=> {

    switch(action.type) {

        case createOrderRequest:
            return {loading: true}
        case createOrderSuccess:
            return {loading:false, success: true, order: action.payload}
        case createOrderFail: 
            return {loading: false, error: action.payload}
        default:
        return state
    }
}
export const orderDetailsReducer= (state= { loading:true,orderItems:[], shippingAddress: {}}, action)=> {

    switch(action.type) {

        case orderDetailsRequest:
            return {...state,loading: true}
        case orderDetailsSuccess:
            return {loading:false, order: action.payload}
        case orderDetailsFail: 
            return {loading: false, error: action.payload}
        default:
        return state
    }
}
export const orderPayReducer= (state= { }, action)=> {

    switch(action.type) {

        case orderPayRequest:
            return {loading: true}
        case orderPaySuccess:
            return {loading:false,success:true, order: action.payload}
        case orderPayFail: 
            return {loading: false, error: action.payload}
        case orderPayReset:
            return {}
        default:
        return state
    }
}
export const orderDeliverReducer= (state= { }, action)=> {

    switch(action.type) {

        case orderDeliverRequest:
            return {loading: true}
        case orderDeliverSuccess:
            return {loading:false,success:true}
        case orderDeliverFail: 
            return {loading: false, error: action.payload}
        case orderDeliverReset:
            return {}
        default:
        return state
    }
}
export const orderListMyReducer= (state= {orders: [] }, action)=> {

    switch(action.type) {

        case orderListMyRequest:
            return {...state, loading: true}
        case orderListMySuccess:
            return {loading:false, orders: action.payload}
        case orderListMyFail: 
            return {loading: false, error: action.payload}
        case orderListMyRESET: 
        return {orders: []}
        default:
        return state
    }
}
export const orderListReducer= (state= {orders: [] }, action)=> {

    switch(action.type) {

        case orderListRequest:
            return {...state, loading: true}
        case orderListSuccess:
            return {loading:false, orders: action.payload}
        case orderListFail: 
            return {loading: false, error: action.payload}
        case orderListRESET: 
        return {orders: []}
        default:
        return state
    }
}