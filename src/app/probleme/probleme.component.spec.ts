import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    expect(zone.valid).toBeFalsy(); // A été changer de truthy à falsy
  });

});
