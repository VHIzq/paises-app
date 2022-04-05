import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(  private paisService: PaisService) { }

  buscar( termino: string ) {

    this.mostrarSugerencias = false;
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

  sugerencias( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .pipe( tap( console.log ))
      .subscribe(
        paises => {
        if ( paises.message !== 'Not found') {
          this.paisesSugeridos  = paises.splice(0, 3)
        } },
        (err) => { this.paisesSugeridos = [] }
      );

    }
    buscarSugerido( termino: string ) {
      this.buscar( termino );
    }

}
