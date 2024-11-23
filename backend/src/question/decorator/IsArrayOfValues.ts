import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsArrayOfValuesConstraint implements ValidatorConstraintInterface {
  validate(array: any[], args: any) {
    const allowedValues = args.constraints[0];
    if (!Array.isArray(array)) {
      return false;
    }
    return array.every((value) => allowedValues.includes(value));
  }

  defaultMessage(args: any) {
    const allowedValues = args.constraints[0];
    return `Each value in the array must be one of the allowed values: ${allowedValues.join(', ')}`;
  }
}

export function IsArrayOfValues(
  allowedValues: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [allowedValues],
      validator: IsArrayOfValuesConstraint,
    });
  };
}

// 배열 내의 값이 모두 배열 안에 들어있는지 검사
