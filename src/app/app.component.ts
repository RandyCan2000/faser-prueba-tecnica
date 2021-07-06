import { Component } from '@angular/core';
import { isNumber } from 'util';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	AgregarTarea(){
		const TareaNueva = prompt("Ingrese el nombre de la tarea"); // Ingreso Tarea
		if (TareaNueva != null && TareaNueva != ""){ //Verificando Datos
			const TiempoNuevo = prompt("Ingrese el tiempo que dura la tarea"); // Ingreso Tiempo
			if (TiempoNuevo != null && TiempoNuevo != "" && this.service.IsNumeric(TiempoNuevo)){ //Verificando Datos
				const idNuevo = this.tareas.length + 1; // Generando nuevo Id
				this.tareas.push(new Tarea(idNuevo,TareaNueva, Number(TiempoNuevo))) // Agregando a Arreglo
			}else{
				alert("Debe ingresar un numero") // Mensaje Error
			}
		}
	}

	EliminarTareaEspecifica(tarea : Tarea){
		if(this.tareas.includes(tarea)){// Verificando que exista
			const PosicionObjeto = this.tareas.indexOf(tarea) // Buscando Indice del objeto
			if(PosicionObjeto > -1){ // Verificando que el indice sea correcto
				this.tareas.splice(PosicionObjeto,1) // Eliminando el objeto
			}
		}
	}

	DestacarTareaEspecifica(tarea : Tarea){
		if(this.tareas.includes(tarea)){// Verificando que exista
			const PosicionObjeto = this.tareas.indexOf(tarea) // Buscando Indice del objeto
			if(PosicionObjeto > -1){ // Verificando que el indice sea correcto
				const Fila = document.getElementsByClassName('filas')[PosicionObjeto] as HTMLTableRowElement // Obteniendo Etiqueta
				Fila.style.background = "rgb(37,205,205)" // Cambiando Color Fila
			}
		}
	}

	OrdenAscendentePorMinuto(){
		this.tareas.sort(function(a,b){ // Definicion funcion de ordenamiento
			return a.minutos - b.minutos; // Resta para determinar si es menor al siguiente
		})
	}

	OrdenDescendentePorMinuto(){
		this.tareas.sort(function(a,b){	// Definicion funcion de ordenamiento
			return b.minutos - a.minutos; // Resta para determinar si es mayor al siguiente
		})
	}
}
