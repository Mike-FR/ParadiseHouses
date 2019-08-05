import { Component, OnInit } from '@angular/core';
import { Property } from '../models/Property.model';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../service/properties.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;

  constructor(private route: ActivatedRoute, private propertyService: PropertiesService) { }

  ngOnInit() {
    this.property = new Property('', '', '', null, '', null, []);
    const id = this.route.snapshot.params['id'];
    this.propertyService.getSingleProperty(+id).then(
      (property: Property) => {
        this.property = property;
      }
    );
  }

}
