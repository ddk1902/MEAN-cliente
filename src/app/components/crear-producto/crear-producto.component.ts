import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
titulo= 'Agregar Producto';
id:string|null;

constructor(private fb:FormBuilder, private router: Router,
  private toast: ToastrService,
  private _productoService:ProductoService,
  private aRouter:ActivatedRoute){
  this.productoForm= this.fb.group({
    nombre:['',Validators.required],
    categoria:['',Validators.required],
    ubicacion:['',Validators.required],
    precio:['',Validators.required],
  })

  this.id= this.aRouter.snapshot.paramMap.get('id')
}
  ngOnInit(): void {
  this.esEditar();
  }

  agregarProducto(){

  const PRODUCTO: producto={
    nombre: this.productoForm.get('nombre')?.value,
    categoria: this.productoForm.get('categoria')?.value,
    ubicacion: this.productoForm.get('ubicacion')?.value,
    precio: this.productoForm.get('precio')?.value,
  }

  if(this.id!==null){   //Editamos el producto
   this._productoService.editarProducto(this.id,PRODUCTO).subscribe(data=>{
    this.toast.info('', 'Producto fue actualizado con éxito');
      this.router.navigate(['/']);
   },error=>{
    console.log(error);
    this.toast.error('', 'Se ha producido un error, por favor intente de nuevo');
    this.productoForm.reset();
  })
  }else{ //Agregamos
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data=>{
      this.toast.success('', 'Producto agregado a la lista con éxito');
      this.router.navigate(['/']);
    },error=>{
      console.log(error);
      this.toast.error('', 'Se ha producido un error, por favor intente de nuevo');
      this.productoForm.reset();
    })
  }

}
  esEditar(){
    if (this.id !==null){ //Le decimos que si el valor de id es distitnto a null entonces estamos editando
     this.titulo=' Editar producto';
     this._productoService.obtenerProducto(this.id).subscribe(data=>{
      this.productoForm.setValue({
        nombre: data.nombre,
        categoria:data.categoria,
        ubicacion:data.ubicacion,
        precio:data.precio,
      })
     })
    }

  
  
}
}
