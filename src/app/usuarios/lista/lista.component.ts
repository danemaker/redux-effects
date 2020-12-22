import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { AppState } from "../../app.reducer";
import { Store } from "@ngrx/store";
import { cargarUsuarios } from "../../store/actions/usuarios.actions";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styles: [],
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: null;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select("usuarios").subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(cargarUsuarios());

    /*     this.usuarioService.getUsers()
        .subscribe( users => {
          console.log(users);
          this.usuarios = users;
        }); */
  }
}
