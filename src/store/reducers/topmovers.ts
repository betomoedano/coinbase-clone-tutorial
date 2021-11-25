import { AnyAction } from 'redux';
import Coin from '../../models/Coin';
import { SET_TOPMOVERS_DATA } from '../actions/topmovers';

export interface TopmoversState {
    topMoversData: Coin[];
}

const initialState: TopmoversState = {
    topMoversData: []
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_TOPMOVERS_DATA:
            return {
                topMoversData: action.coinData
            };
    }
    return state;
}