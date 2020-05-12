import { messageConstants } from '../_constants';

const initialState = {
    messages: [],
    unreadCounter: {},
    bugout: undefined,
    hasOnMessageHandler: false,
    selectedFriend: undefined,
    onlineFriends: [],
}

export function message(state = initialState, action) {
    switch (action.type) {
        case messageConstants.RECEIVE:
            const counter = state.unreadCounter;
            const sender = action.message.sender
            if (!state.selectedFriend || state.selectedFriend.username !== sender) {
                counter[sender] = counter[sender] ? counter[sender] + 1 : 1;
            }
            return {
                ...state,
                messages: state.messages.concat(action.message),
                unreadCounter: { ...counter },
            };
        case messageConstants.PEER_JOIN:
        case messageConstants.PEER_JOIN_ACK:
            if (state.onlineFriends.includes(action.message.sender)) {
                return state;
            } else {
                return {
                    ...state,
                    onlineFriends: state.onlineFriends.concat(action.message.sender),
                };
            }
        case messageConstants.PEER_LEAVE:
            return {
                ...state,
                onlineFriends: state.onlineFriends.filter(friend => friend !== action.message.sender),
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
            state.unreadCounter[action.friend.username] = 0;
            return {
                ...state,
                selectedFriend: action.friend,
                unreadCounter: { ...state.unreadCounter },
            };
        default:
            return state
    }
}