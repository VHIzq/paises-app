import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  
  /* ActivatedRoute permite suscribirnos a cualquier cambio de la url */
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ) {}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.paisService.getPaisPorAlpha( id )),
      tap( console.log )
    )
    .subscribe( pais => {
      this.pais = pais[0];
    })

    /*
    los params son un observable, extrae el if y se lo manda a getAlpha
    */
    /* this.activatedRoute.params
      .subscribe(( {id} ) => {
        console.log(id);

        this.paisService.getPaisPorAlpha( id )
          .subscribe( pais => {
            console.log(pais);
          })
      }) */
  }

}
