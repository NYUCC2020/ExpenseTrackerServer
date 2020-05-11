import { messageConstants } from '../_constants';

const initialState = {
    messages: [],
    bugout: undefined,
    hasOnMessageHandler: false,
    selectedFriend: undefined,
}

export function message(state = initialState, action) {
    switch (action.type) {
        case messageConstants.RECEIVE:
            return {
                ...state,
                messages: state.messages.concat(action.message),
            };
        case messageConstants.CREATE_BUGOUT:
            const bugout = window.Bugout("expense-tracker", { timeout: 60 * 60 * 1000 });
            return {
                ...state,
                bugout,
            };
        case messageConstants.SET_BUGOUT_ON_MESSAGE_STATUS:
            return {
                ...state,
                hasOnMessageHandler: true,
            };
        case messageConstants.SELECT_FRIEND:
            return {
                ...state,
                selectedFriend: action.friend,
            };
        default:
            return state
    }
}