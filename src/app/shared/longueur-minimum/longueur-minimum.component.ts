import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {

    static longeurMinimum(longueur: number): ValidatorFn {
        // Sous angular dans des validateurs pour indiquer un succès retourner null
        return (valeurControle : AbstractControl): { [key: string]: boolean } | null => {
            if(valeurControle.value.trim().length >= longueur) {
                return null;
            } else {
                return {'nbreCaracteresInsuffisants' : true};
            }
        };
        
    }

}