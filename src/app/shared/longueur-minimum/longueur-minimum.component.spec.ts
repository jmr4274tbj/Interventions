import { ZonesValidator } from "./longueur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('longueur zone Validator', () => {
    /*it('valeur valide 1 pour plage entre 3 et 200', () => {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longeurMinimum(3, 200);
        let control = { value: 3};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat obtenu avec le résultat prévu
        expect(result).toBeNull();
    });
    
    it('valeur invalide 202 pour plage entre 3 et 200', () => {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longeurMinimum(3, 200);
        let control = { value: 202};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat obtenu avec le résultat prévu
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('valeur invalide 10 pour plage entre 10 et 20', () => {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longeurMinimum(10, 20);
        let control = { value: 10};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat obtenu avec le résultat prévu
        expect(result).toBeNull();
    });

    it('valeur null pour plage entre 3 et 200', () => {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longeurMinimum(3, 200);
        let control = { value: 202};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat obtenu avec le résultat prévu
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });*/
    
    it('une chaîne avec 10 espaces est invalide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: '          '};
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec des mots est valide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: 'Vive angular'};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: '   je le veux   '};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('une phrase avec 1 espace et 2 caractères est invalide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: ' xx'};
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 2 espaces et 1 caractère est invalide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: '  x'};
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: '   xxx'};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: '     xxxxx     '};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('une chaîne nulle est invalide', () => {
        let validator = ZonesValidator.longeurMinimum(3);
        let control = { value: null};
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
 
    /* Dans probleme.component.spec.tschanger les titres
    et revisiter ces tests afin de les faire passer au vert:
    - Zone PRÉNOM invalide avec 10 espaces 
    - Zone PRÉNOM invalide avec 2 espaces et 1 caractère */

});