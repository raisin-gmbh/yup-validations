import { describe, expect, it, test } from "@jest/globals";
import { GermanTaxIdStringSchemaType } from '../src/germanTaxId';
import yup from "../index"

const valid = '44567139207';
const invalid = '12345678912';

const valids = [
  "44567139207",
  44567139207,
  "44/567/139207",
  "44 567 139207"
];

describe('German Tax ID yup extension', () => {
  describe('Class', () => {
    it('validates', () => {
      let schema = new GermanTaxIdStringSchemaType();
      schema = schema.germanTaxId();
      expect(schema.isValid(valid)).resolves.toBeTruthy();
    });

    it('does not validate', () => {
      let schema = new GermanTaxIdStringSchemaType();
      schema = schema.germanTaxId();
      expect(schema.isValid(invalid)).resolves.toBeFalsy();
    });
  });

  describe('Function', () => {

    const schema = yup.string().germanTaxId();

    test('validates', () => {
      expect(schema.isValid(valid)).resolves.toBeTruthy();
    });

    test.each(valids)('validates with odd inputs %s', (input) => {
      expect(schema.isValid(input)).resolves.toBeTruthy();
    });

    test('does not validate', () => {
      expect(schema.isValid(invalid)).resolves.toBeFalsy();
    });

    test('cast to clean value', () => {
      expect(schema.cast("44/567/139207")).toBe('44567139207');
      expect(schema.cast("44 567 139207")).toBe('44567139207');
    });
  });
});
