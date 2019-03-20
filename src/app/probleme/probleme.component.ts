import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['',[ZonesValidator.longeurMinimum(3), Validators.required]]

      /*<span class="form-text" *ngIf="(problemeForm.get('prenom').touched || 
      problemeForm.get('prenom').dirty) &&
      (problemeForm.get('prenom').errors)">
          <span *ngIf="problemeForm.get('prenom').errors.minlength">
            <small class="text-muted">
              Veuillez entrer plus de caractères.
            </small>
          </span>
          <span *ngIf="problemeForm.get('prenom').errors.required">
            <small class="text-muted">
              Merci de saisir votre prénom.
            </small>
          </span>
      </span>*/
    });
  }

}
