/* tslint:disable:typedef prefer-const */
import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalCrudComponent} from '../../../core/common/modal-crud.component';
import {Entidad} from '../../../shared/_models/entidad.model';
import {ActivatedRoute} from '@angular/router';
import {EntidadService} from '../../../core/services/entidad.service';
import {FormBuilder, Validators} from '@angular/forms';
import {CustomAlertComponent} from '../../../shared/custom-alert/custom-alert.component';
import {CustomAlertDirective} from '../../../shared/custom-alert/custom-alert.directive';

const modalStrings = {
  create: { title: 'Creacion de Entidad', submit: 'Crear', cancel: 'Cancelar' },
  edit: { title: 'Editar Entidad', submit: 'Guardar', cancel: 'Cancelar' },
  delete: { title: 'Borrar Entidad', submit: 'Borrar', cancel: 'Cancelar' },
};

const messagesAlert = {
  create: {
    success: 'Entidad creada exitosamente',
    error: 'Hubo un error al crear la entidad, intente luego',
  },
  edit: {
    success: 'Entidad editada exitosamente',
    error: 'Hubo un error al actualizar la entidad, intente luego',
  },
  delete: {
    success: 'Entidad borrada exitosamente',
    error: 'Hubo un error al borrar la entidad, intente luego',
  },
  image: {
    success: 'Image uploaded correctly',
    error: 'There was an error uploading the image, try again later',
  },
};
const slash = '/';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent extends ModalCrudComponent<Entidad> implements OnInit {

  @ViewChild(CustomAlertDirective, {static: true})
  alertDirective: CustomAlertDirective;

  constructor(
    private route: ActivatedRoute,
    private entidadService: EntidadService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(entidadService, modalStrings, new Entidad())
    this.form = this.fillModal();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resources = [];
      this.title = 'Entidad';
      this.entidadService
        .getAll()
        .subscribe((data) => {this.resources = data});
    });
  }

  fillModal() {
    // Estas validaciones van de acuerdo a la base de datos
    return this.fb.group({
      id: [this.resource.id, Validators.required],
      idDoc: [this.resource.idDoc, Validators.required],
      nroDoc: [this.resource.nroDoc, Validators.required],
      razonSocial: [this.resource.razonSocial, Validators.required],
      estado: [this.resource.estado, Validators.required]
    });
  }

  getId(entidad: Entidad): string {
    return slash.concat(entidad.id.toString());
  }

  // Methods for the search bar:
  keyupEnterSearchBar($event) {
    this.elementRef.nativeElement
      .querySelectorAll('.courseName')
      .forEach((el) => {
        el.parentElement.hidden =
          $event.target.value &&
          !EntidadComponent.refactorString(el.innerHTML)
            .toString()
            .includes(
              EntidadComponent.refactorString($event.target.value)
            );
      });

    $event.preventDefault();
  }

  private static refactorString(value: string): string {
    return value
      .toLowerCase()
      .split('á')
      .join('a')
      .split('é')
      .join('e')
      .split('í')
      .join('i')
      .split('ó')
      .join('o')
      .split('ú')
      .join('u');
  }

  onSubmitModalForm(resource, index, id): void {
    if (this.modal.isDelete) {
      this.dataService.delete(id).subscribe(
        (data) => {
          this.deleteResourceAt(index);
          this.createAlertSuccess(messagesAlert.delete.success);
        },
        (error) => {
          this.createAlertError(messagesAlert.delete.error);
          console.log(error);
        }
      );
    } else if (this.modal.isCreate) {
      this.dataService.create(resource).subscribe(
        (data) => {
          let originalLastIndex = this.resources.length - 1;
          this.addResourceAt(originalLastIndex, data);
          this.createAlertSuccess(messagesAlert.create.success);
        },(error) => {
          this.createAlertError(messagesAlert.create.error);
          console.log(error);
        }
      );
    } else if (this.modal.isEdit) {
      this.dataService.update(resource).subscribe(
        (data) => {
          // Replace the Data with the data updated
          this.replaceResourceAt(index, data);
          this.createAlertSuccess(messagesAlert.edit.success);
        },
        (error) => {
          this.createAlertError(messagesAlert.edit.error);
          console.log(error);
        }
      );
    }
  }

  private createAlertSuccess(message: string) {
    this.createAlert(true, message);
  }

  private createAlertError(message: string) {
    this.createAlert(false, message);
  }

  private createAlert(isSuccess: boolean, message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CustomAlertComponent
    );

    const viewContainerRef = this.alertDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<CustomAlertComponent>(
      componentFactory
    );
    componentRef.instance.isSuccess = isSuccess;
    componentRef.instance.message = message;
  }
}
