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
  //TESTS TP11
  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => { // A été changer de valide à invalide
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    expect(zone.valid).toBeFalsy(); // A été changer de truthy à falsy
  });
  
  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => { 
    component.appliquerNotifications('AucuneNotification');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED'); 
  });
  //TESTS TP12
  it('Zone TELEPHONE est désactivée quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status !== 'DISABLED'); 
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status !== 'DISABLED'); 
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {}
    expect(zone.valid).toBeFalsy(); 
  });

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    errors = zone.errors || {}
    expect(zone.valid).toBeFalsy(); 
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme ', () => { 
    component.appliquerNotifications('ParCourriel');
    let errors = {};    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('123456');
    errors = zone.errors || {}
    expect(errors['pattern']).toBeTruthy(); 
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => { 
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

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => { 
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

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => { 
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

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ', () => { 
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

});
