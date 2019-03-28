import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypesproblemeService } from './typesprobleme.service';
import { ITypeProbleme } from './typesprobleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typesprobleme: TypesproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['',[ZonesValidator.longeurMinimum(3), Validators.required]],
      nom: ['',[ZonesValidator.longeurMaximum(50), Validators.required]],
      noProbleme: ['', Validators.required]
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),  
    });

    this.typesprobleme.obtenirTypeProbleme()
    .subscribe(type => this.categoriesProbleme = type,
               error => this.errorMessage = <any>error);
  }

  appliquerNotifications(): void {
    const courrielControl = this.problemeForm.get('');
    courrielControl.disable();
  } 

}
