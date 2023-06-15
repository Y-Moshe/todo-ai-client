import { ACTIONS } from '../Actions/account.actions'

export interface IAccountState {
  loggedUser: IUser | null
}

const initialState: IAccountState = {
  loggedUser: null,
}

export function boardsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.user,
      }

    default:
      return state
  }
}