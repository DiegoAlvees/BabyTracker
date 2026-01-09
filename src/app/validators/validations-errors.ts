import type { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// compara se as senhas estão iguais e retorna erro se estiverem diferentes
export const passwordMatchValidator: ValidatorFn = (
    control: AbstractControl 
): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
}

// valida se a data de nascimento do bebê não é maior que a data atual

export const birthDateValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const babyBirthDate = control.get('babyBirthDate')?.value;
    if (!babyBirthDate) return null;

    const selectedDate = new Date(babyBirthDate);
    const today = new Date();
    
    return selectedDate > today ? {futureDate: true} : null;
}