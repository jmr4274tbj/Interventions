import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypesproblemeService } from './typesprobleme.service';
import { ITypeProbleme } from './typesprobleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

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
      noProbleme: ['', Validators.required], //noTypeProbleme
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}] 
  
    });

    this.typesprobleme.obtenirTypeProbleme()
    .subscribe(type => this.categoriesProbleme = type,
               error => this.errorMessage = <any>error);
  }

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');
   
    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();    
    courrielGroupControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();    
    telephoneControl.disable();

    if (typeNotification=== 'AucuneNotification') {  
      /* Telephone -> Désactivé / Courriel -> Désactivé / CourrielConfirmation -> Désactivé */
      courrielControl.setValidators([Validators.required]);      
      courrielControl.disable();  
      courrielConfirmationControl.setValidators([Validators.required]);              
      courrielConfirmationControl.disable(); 
      telephoneControl.setValidators([Validators.required]);      
      telephoneControl.disable();  
    } else if (typeNotification=== 'ParCourriel') {  
      /* Telephone -> Désactivé / Courriel -> Activé / CourrielConfirmation -> Activé */
      courrielControl.setValidators([Validators.required]);      
      courrielControl.enable();  
      courrielConfirmationControl.setValidators([Validators.required]);              
      courrielConfirmationControl.enable();  
      telephoneControl.setValidators([Validators.required]);      
      telephoneControl.disable();
      // Le validateur est dans un autre fichier (email-matcher.component.ts) : 
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
    } else {

      if(typeNotification === 'ParSMS') {  
        /* Telephone -> Activé / Courriel -> Désactivé / CourrielConfirmation -> Désactivé */
        telephoneControl.setValidators([Validators.required]);      
        telephoneControl.enable();     
        courrielControl.setValidators([Validators.required]);      
        courrielControl.disable();  
        courrielConfirmationControl.setValidators([Validators.required]);              
        courrielConfirmationControl.disable();           
      }
    }

    courrielGroupControl.updateValueAndValidity(); 
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  } 

}
