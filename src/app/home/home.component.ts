import { Component, OnInit, OnDestroy } from '@angular/core';
import { Property } from '../models/Property.model';
import { Subscription } from 'rxjs';
import { PropertiesService } from '../service/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties: Property[];
  properties$: Subscription;

  constructor(private propertyService: PropertiesService, private router: Router) { }

  ngOnInit() {
    this.properties$ = this.propertyService.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      }
    );
    this.propertyService.getProperties();
    this.propertyService.emitProperties();
  }

  onViewProperty(id: number) {
    this.router.navigate(['/property', id]);
  }

  ngOnDestroy() {
    this.properties$.unsubscribe();
  }
}
