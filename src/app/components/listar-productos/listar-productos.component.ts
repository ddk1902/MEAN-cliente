import { Component } from '@angular/core';
import { producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {
constructor(private _productoService:ProductoService, private toast: ToastrService){}
listaProductos: producto[]=[];
// Cuando inicia el ciclo de vida del módulo llamamos a la funcion getProductos
ngOnInit():void{
this.obtenerProductos();

}


obtenerProductos(){
  this._productoService.getProductos().subscribe(data=>{
    console.log(data);
    this.listaProductos=data;
    }, error => { 
      console.log(error);
    })
 
}

eliminarProducto(id:any){
          this._productoService.eliminarProductos(id).subscribe(data=>{
          this.toast.error('','Producto eliminado con éxito');
          this.obtenerProductos();
}, error=>{
  console.log(error)
})

}
}
