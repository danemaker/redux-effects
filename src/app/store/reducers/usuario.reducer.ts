import { createReducer, on } from "@ngrx/store";
import {
  cargarUsuario,
  cargarUsuarioSuccess,
  cargarUsuarioError,
} from "./../actions";
import { Usuario } from "../../models/usuario.model";

export interface usuarioState {
  id: number;
  user: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuarioInitialState: usuarioState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _usuarioReducer = createReducer(
  usuarioInitialState,

  on(cargarUsuario, (state, {id}) => ({ ...state, id: id, loading: true })),

  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: {...usuario},
  })),

  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function usuarioReducer(state, action) {
  return _usuarioReducer(state, action);
}
