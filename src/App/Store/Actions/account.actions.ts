import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { accountService } from '@/Services/account.service'
import { IAppState } from '@/Store'
import { ILoginCredentials, IRegisterPayload } from '@/Types'

export const ACTIONS = {
  SET_LOGGED_USER: 'SET_LOGGED_USER',
  REGISTER_USER: 'REGISTER_USER',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
}

export function registerUser(
  userData: IRegisterPayload
): ThunkAction<Promise<void>, IAppState, unknown, AnyAction> {
  return async (dispatch) => {
    const { user, token } = await accountService.registerUser(userData)
    accountService.saveAuthToken(token)
    dispatch({ type: ACTIONS.SET_LOGGED_USER, user })
  }
}

export function loginUser(
  credentials: ILoginCredentials
): ThunkAction<Promise<void>, IAppState, unknown, AnyAction> {
  return async (dispatch) => {
    const { user, token } = await accountService.loginUser(credentials)
    accountService.saveAuthToken(token)
    dispatch({ type: ACTIONS.SET_LOGGED_USER, user })
  }
}

export function logoutUser(): ThunkAction<
  Promise<void>,
  IAppState,
  unknown,
  AnyAction
> {
  return async (dispatch) => {
    await accountService.logoutUser()
    accountService.clearAuthToken()
    dispatch({ type: ACTIONS.SET_LOGGED_USER, user: null })
  }
}

export function loadUser(): ThunkAction<
  Promise<void>,
  IAppState,
  unknown,
  AnyAction
> {
  return async (dispatch) => {
    try {
      const token = accountService.loadAuthToken()
      if (!token) return

      const user = await accountService.getLoggedInUser()
      dispatch({ type: ACTIONS.SET_LOGGED_USER, user })
    } catch (error: any) {
      // Incase of invalid / expired token remove from local storage
      if (error?.response?.status === 401) accountService.clearAuthToken()
      throw error
    }
  }
}
