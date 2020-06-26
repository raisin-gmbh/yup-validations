import { electronicFormatIBAN, isValidIBAN } from 'ibantools';
import StringSchema from 'yup/lib/string';

export class IbanStringSchemaType extends StringSchema {
  constructor() {
    super();

    this.withMutation(() => {
      this.transform((value) => electronicFormatIBAN(value));
    });
  }

  iban(errorMessage) {
    return this.test({
      name: 'iban',
      message: errorMessage || 'Invalid IBAN',
      test(value) {
        return isValidIBAN(value);
      },
    });
  }
}

export function iban(errorMessage) {
  this.withMutation(() => {
    // Removes spaces from IBAN.
    this.transform((value) => {
      if (!this.isType(value)) return value;

      return electronicFormatIBAN(value);
    });
  });

  return this.test({
    name: 'iban',
    message: errorMessage || 'Invalid IBAN',
    exclusive: true,
    test: (value) => {
      if (!this.isType(value)) return value;

      return isValidIBAN(value);
    },
  });
}
