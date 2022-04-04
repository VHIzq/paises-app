import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(  private paisService: PaisService) { }

  buscar( termino: string ) {

    this.hayError = false;
    /* el this.termino es de la clase y el termino es el que recibo por la funcion buscar del input */
    this.termino = termino;
    /* consumir api */
    this.paisService.buscarPais( termino )
      .subscribe( ( paises ) => {
        console.log( paises );
        this.paises = paises;
        /* manejo de errores */
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      })
  }

  sugerencias( termino: string) {
    this.hayError = false;
    //TODO: crear sugerencias
  }

}
