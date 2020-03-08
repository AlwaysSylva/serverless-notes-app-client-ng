import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent {
  @Input() class: string;
  @Input() label: string;
  @Input() parentForm: FormGroup;
  @Input() isLoading: Observable<boolean>;

  constructor() { }

}
