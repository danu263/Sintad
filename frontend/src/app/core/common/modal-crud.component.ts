/* tslint:disable:typedef prefer-const */
import {FormGroup} from '@angular/forms';
import {DataService} from './data.service';
import {Modal} from '../../shared/_dto/modal.model';


export abstract class ModalCrudComponent<T> {
  // Must-haves
  title: string;
  form: FormGroup;
  modal = new Modal();
  dataService: DataService<T>;
  modalStrings;

  // Resources
  resources: T[];
  resource: T;

  // Must not change
  newResource: T;

  protected constructor(
    dataService: DataService<T>,
    modalStrings: any,
    newResource: T
  ) {
    this.dataService = dataService;
    this.modalStrings = modalStrings;
    this.resource = newResource;
    this.newResource = newResource;
  }

  // Methods to be implemented by the Component
  abstract getId(resource: T): string;
  abstract fillModal(): FormGroup;

  // Methods for the modal
  modalEdit(id: string) {
    this.modal.modalEdit(this.modalStrings.edit);
    this.dataService.get(id).subscribe(
      (data) => {
        this.resource = data;
        this.form = this.fillModal();
      },
      (error) => {
        alert('Hubo un error: ' + error);
      }
    );
  }

  modalCreate() {
    this.resource = this.newResource;
    this.modal.modalCreate(this.modalStrings.create);
    this.form = this.fillModal();
  }

  modalDelete(id: string) {
    this.modal.modalDelete(this.modalStrings.delete);
    this.dataService.get(id).subscribe(
      (data) => {
        this.resource = data;
        this.form = this.fillModal();
      },
      (error) => {
        alert('Hubo un error: ' + error);
      }
    );
  }

  submitModalForm() {
    // Using Pessimistic update
    if (!this.form.valid) {
      alert('Invalid submit');
      return;
    }
    // Getting utils variables
    let resource: T = this.form.value;
    let id: string = this.getId(resource);
    let index: number = this.resources.indexOf(
      this.resources.filter((r) => this.getId(r) === id)[0]
    );
    this.onSubmitModalForm(resource, index, id);
  }

  abstract onSubmitModalForm(resource: T, index: number, id: string): void;

  protected addResourceAt(index: number, resource: T): void {
    this.resources.splice(index, 0, resource);
  }

  protected replaceResourceAt(index: number, resource: T): void {
    this.resources.splice(index, 1, resource);
  }

  protected deleteResourceAt(index: number): void {
    this.resources.splice(index, 1);
  }
}
