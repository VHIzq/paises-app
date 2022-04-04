import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

   /* emite un debounce de tipo string */
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  /* emite evento de tipo string */
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();
  termino: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe( debounceTime(300) )
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      });
  }
  /* esta funcion emite el termino con el eventop onEnter para la funcion buscar de por pais */
  buscar() {
    this.onEnter.emit( this.termino )
  }
  /* recibe el termino y el next se suscribe a debouncer */
  teclaPresionada() {

    this.debouncer.next( this.termino );
  }
}
