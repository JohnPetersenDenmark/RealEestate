import { Directive, Input } from "@angular/core"
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms"


@Directive(
    {
        selector : '[formcompare2fieldsValidatorDirective]',
        providers : [{
            provide : NG_VALIDATORS,
            useExisting : Compare2fieldsValidatorDirective,
            multi : true
        }]
    }
)

export class Compare2fieldsValidatorDirective implements Validator
{
    @Input() formcompare2fieldsValidatorDirective : string = "";

     validate(control : AbstractControl) : { [key : string] : any } | null
    {
        const controlToCompare = control.parent?.get(this.formcompare2fieldsValidatorDirective);
        if ( controlToCompare && controlToCompare.value !== control.value)
        {
            return {notEqual : true}
        }

        return null;
    }
}