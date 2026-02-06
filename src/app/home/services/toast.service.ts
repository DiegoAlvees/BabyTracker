import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  

  success(message: string) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    }).fire({
      icon: 'success',
      title: message,
    });
  }
  
  confirmDelete(message = 'Essa ação não pode ser desfeita') {
  return Swal.fire({
    title: 'Excluir?',
    text: message,
    icon: 'warning',
    width: 330,
    showCancelButton: true,
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
    cancelButtonColor: '#d1d5db',
    iconColor: '#10b981',
    background: '#ecfdf5',
    color: '#064e3b',
    focusCancel: true,
  });
}


}
