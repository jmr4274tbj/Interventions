import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {
    static courrielDifferents(): ValidatorFn {
        // Sous angular dans des validateurs pour indiquer un succès retourner null
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
                return null;
            } else {
                return c['controls'].courriel.value ===
                c['controls'].courrielConfirmation.value ? null : { match: true };
            }
        };
    }
} 
