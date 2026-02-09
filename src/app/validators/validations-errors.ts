import type { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// compara se as senhas estão iguais e retorna erro se estiverem diferentes
export const passwordMatchValidator: ValidatorFn = (
    control: AbstractControl 
): ValidationErrors | null => {
    const password = control.get('senha')?.value;
    const confirmPassword = control.get('confirmarSenha')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
}

// valida se a data de nascimento do bebê não é maior que a data atual


export function birthDateValidator(
  fieldName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = control.get(fieldName)?.value;
    if (!birthDate) return null;

    const selectedDate = new Date(birthDate);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? { futureDate: true } : null;
  };
}
