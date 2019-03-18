import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {
    /*static longeurMinimum(longueur: number, valeurMaximum: number): ValidatorFn {
        // Sous angular dans des validateurs pour indiquer un succès retourner null
        return (valeurControle : AbstractControl): { [key: string]: boolean } | null => {
            if(valeurControle.value >= longueur && valeurControle.value <= valeurMaximum) {
                return null;
            }
            return {'nbreCaracteresInsuffisants' : true};
        };
        
    }*/

    static longeurMinimum(longueur: number): ValidatorFn {
        // Sous angular dans des validateurs pour indiquer un succès retourner null
        return (valeurControle : AbstractControl): { [key: string]: boolean } | null => {
            if(valeurControle.value.length >= longueur) {
                return null;
            } else if( valeurControle.value == null || valeurControle.value.length < longueur) {
                return {'nbreCaracteresInsuffisants' : true};
            }
        };
        
    }

}