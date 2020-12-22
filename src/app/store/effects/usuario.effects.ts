import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from "rxjs/operators";
import {
  cargarUsuario,
  cargarUsuarioSuccess,
} from "../actions/usuario.actions";
import { UsuarioService } from "../../services/usuario.service";
import { of } from "rxjs";
import { cargarUsuarioError } from "../actions/usuario.actions";

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioervice: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarUsuario),
      mergeMap((action) =>
        this.usuarioervice.getUser(action.id).pipe(
          map((user) => cargarUsuarioSuccess({ usuario: user })),
          catchError((error) => of(cargarUsuarioError({ payload: error })))
        )
      )
    )
  );
}
