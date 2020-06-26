import taxValidator from 'german-tax-id-validator';
import StringSchema from 'yup/lib/string';

const DE_TIN_REPLACE_REGEX = /[^a-zA-Z0-9]/g;

export class GermanTaxIdStringSchemaType extends StringSchema {
  constructor() {
    super();

    this.withMutation(() => {
      this.transform((value) => value.replace(DE_TIN_REPLACE_REGEX, ''));
    });
  }

  germanTaxId() {
    return this.test({
      name: 'germanTaxId',
      message: 'Invalid Tax ID',
      test(value) {
        return taxValidator.validate(value);
      },
    });
  }
}

export function germanTaxId(errorMessage) {
  this.withMutation(() => {
    this.transform((value) => value.replace(DE_TIN_REPLACE_REGEX, ''));
  });

  return this.test({
    name: 'germanTaxId',
    message: errorMessage || 'Invalid TIN',
    exclusive: true,
    test: (value) => taxValidator.validate(value),
  });
}
