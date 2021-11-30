import types from "./actionTypes";
import { getEthersContracts } from "./helpers/contractBooter";

export const useActions = (state: any, dispatch: any) => ({
  setWalletConnected: () => {
    dispatch({
      type: types.SetWalletConnected.SET_WALLET_CONNECTED_SUCCESS,
      payload: "",
    });
  },
  setUserBalance: (data: number) => {
    dispatch({
      type: types.SetUserBalance.SET_USER_BALANCE_SUCCESS,
      payload: data,
    });
  },
  setWalletDisconnected: () => {
    dispatch({
      type: types.SetWalletDisconnected.SET_WALLET_DISCONNECTED_SUCCESS,
      payload: "",
    });
  },
  setProvider: (data: any) => {
    dispatch({ type: types.SetProvider.SET_PROVIDER_SUCCESS, payload: data });
  },
  setContracts: (data: any) => {
    dispatch({
      type: types.SetContracts.SET_CONTRACTS_SUCCESS,
      payload: getEthersContracts(data),
    });
  },
  setWalletAddress: (address: string) => {
    dispatch({
      type: types.SetWalletAddress.SET_WALLET_ADDRESS_SUCCESS,
      payload: address,
    });
  },
});

export interface Actions {
  setWalletConnected: () => void;
  setWalletDisconnected: () => void;
  setProvider: (data: any) => void;
  setContracts: (data: any) => void;
  setWalletAddress: (address: string) => void;
  setUserBalance: (data: number) => void;
}
