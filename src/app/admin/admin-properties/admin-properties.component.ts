import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/service/properties.service';
import { Property } from 'src/app/models/Property.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.scss']
})
export class AdminPropertiesComponent implements OnInit, OnDestroy {

  propertyForm: FormGroup;
  properties: Property[];
  properties$: Subscription;
  editProperty = false;
  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[];

  constructor(private fb: FormBuilder, private propertyService: PropertiesService) { }

  ngOnInit() {
    this.initForm();
    this.properties$ = this.propertyService.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      }
    );
    this.propertyService.getProperties();
    this.propertyService.emitProperties();
  }

  initForm() {
    this.propertyForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  resetForm() {
    this.editProperty = false;
    this.propertyForm.reset();
    this.photosAdded = [];
    this.photoUploaded = false;
    this.photoUploading = false;
  }

  onSaveProperty() {
    const id = this.propertyForm.get('id').value;
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;
    const price = this.propertyForm.get('price').value;
    const photos = this.photosAdded ? this.photosAdded : [];
    const newProperty = new Property(title, category, surface, rooms, description, price, photos);

    if (this.editProperty === true) {
      this.propertyService.updateProperties(newProperty, id);
    } else {
      this.propertyService.createProperties(newProperty);
    }

    $('#propertiesFormModal').modal('hide');
    this.resetForm();
  }

  onDeleteProperty(property: Property) {
    if (property.photos) {
      property.photos.forEach(photo => {
        this.propertyService.removePropertyPhoto(photo);
      });
    }
    this.propertyService.removeProperties(property);
  }

  onEditProperty(property: Property, id: number) {
    $('#propertiesFormModal').modal('show');
    this.propertyForm.get('id').setValue(id);
    this.propertyForm.get('title').setValue(property.title);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('surface').setValue(property.surface);
    this.propertyForm.get('rooms').setValue(property.rooms);
    this.propertyForm.get('description').setValue(property.description);
    this.propertyForm.get('price').setValue(property.price);
    this.photosAdded = property.photos;
    this.editProperty = true;
  }

  detectFile(event) {
    this.photoUploaded = false;
    this.photoUploading = true;
    this.propertyService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.onAddPhoto(url);
        this.photoUploading = false;
        this.photoUploaded = true;
      }
    );
  }

  onAddPhoto(url: string) {
    this.photosAdded.push(url);
  }

  onRemoveAddedPhoto(id: number) {
    this.propertyService.removePropertyPhoto(this.photosAdded[id]);
    this.photosAdded.splice(id, 1);
  }

  ngOnDestroy() {
    this.properties$.unsubscribe();
  }

}
