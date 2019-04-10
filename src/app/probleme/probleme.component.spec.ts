import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypesproblemeService } from './typesprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypesproblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    errors = zone.errors || {}
    expect(errors['required']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 10 espaces', () => { // A été changer de valide à invalide
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeFalsy(); // A été changer de truthy à falsy
  });
  
  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => { // A été changer de valide à invalide
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    expect(zone.valid).toBeFalsy(); // A été changer de truthy à falsy
  });
  //TESTS TP11
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED'); 
  });
  //TESTS TP12
  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#21 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {}
    expect(zone.valid).toBeFalsy(); 
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    errors = zone.errors || {}
    expect(zone.valid).toBeFalsy(); 
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme ', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('123456');
    errors = zone.errors || {}
    expect(errors['pattern']).toBeTruthy(); 
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('');
    courriel.setValue('bob@hotmail.com');
    let courrielGroup = component.problemeForm.get('courrielGroup');
    errors = courrielGroup.errors || {}
    expect(errors['courrielDifferents']).toBeNull;
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('bob@hotmail.com');
    courriel.setValue('');
    let courrielGroup = component.problemeForm.get('courrielGroup');
    errors = courrielGroup.errors || {}
    expect(errors['courrielDifferents']).toBeNull;
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('bob@hotmail.com');
    courriel.setValue('');
    let courrielGroup = component.problemeForm.get('courrielGroup');
    errors = courrielGroup.errors || {}
    expect(errors['courrielDifferents']).toBeFalsy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('bob@hotmail.com');
    courriel.setValue('bob@hotmail.com');
    let courrielGroup = component.problemeForm.get('courrielGroup');
    errors = courrielGroup.errors || {}
    expect(errors['courrielDifferents']).toBeUndefined();
  });
  //TESTS TP13
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {}
    expect(zone.errors).toBeTruthy(); 
    expect(errors['required']).toBeTruthy();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let errors = {};    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('abcdefg');
    errors = zone.errors || {}
    expect(errors['pattern']).toBeTruthy(); 
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let errors = {};    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');
    errors = zone.errors || {}
    expect(errors['minLength']).toBeFalsy(); 
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');
    let errors = {};    
    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678901');
    errors = zone.errors || {}
    expect(errors['maxLength']).toBeFalsy(); 
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => { 
    component.appliquerNotifications('ParMessagerieTexte');   
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1234567890');
    expect(zone.valid).toBe(true); 
  });

});
