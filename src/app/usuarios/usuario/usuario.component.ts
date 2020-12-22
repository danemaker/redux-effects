import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from './../../store/actions';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario;
  loading: boolean = false;
  error = null;
  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select("usuario")
    .subscribe(({ user, loading, error }) => {
      this.usuario = user;
      this.loading = loading;
      this.error = error;
    });
    this.activatedRoute.params.subscribe(({id})=>{
      this.store.dispatch(cargarUsuario({id: id}))
    })
  }

}
