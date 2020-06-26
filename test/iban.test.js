import { describe, expect, it, test } from "@jest/globals";
import { IbanStringSchemaType } from '../src/iban';
import yup from "../index"

const valid = 'GB33BUKB20201555555555';
const invalid = 'NL39ABNA1458509540';

const valids = [
  "GB94BARC10201530093459",
  "GB33BUKB20201555555555",
  "GB33 BUKB 2020 1555 5555 55"
];

const invalids = [
  "US64SVBKUS6S3300958879",
  "GB00HLFX11016111455365",
  "GB01BARC20714583608387",
  "GB2LABBY09012857201707",
  "GB78BARCO0201530093459",
  "GB12BARC20201530093A59",
  "GB96BARC202015300934591",
  "GB94BARC20201530093459"
];

describe('IBAN yup extension', () => {

  describe('Class Based', () => {
    it('validates', async () => {
      let schema = new IbanStringSchemaType();
      schema = schema.iban();
      expect(await schema.isValid(valid)).toBeTruthy();
    });

    it('does not validate', async () => {
      let schema = new IbanStringSchemaType();
      schema = schema.iban();
      expect(await schema.isValid(invalid)).toBeFalsy();
    });
  });

  describe('Function based', () => {

    const schema = yup.string().iban();

    test('type checks', async () => {
      expect(schema.isType(false)).toBeFalsy();
      expect(schema.isType(null)).toBeFalsy();
      expect(schema.isType(NaN)).toBeFalsy();
      expect(schema.isType(12345678)).toBeFalsy();
      expect(schema.isType('')).toBeTruthy();
      expect(schema.isType('DE12345678')).toBeTruthy();
    });

    test.each(valids)('validates %s', (input) => {
      expect(schema.isValid(input)).resolves.toBeTruthy();
      expect(schema.isValidSync(valid)).toBeTruthy();
    });

    test.each(invalids)('does NOT validates %s', (input) => {
      expect(schema.isValid(input)).resolves.toBeFalsy();
      expect(schema.isValidSync(input)).toBeFalsy();
    });

    test('spaces in IBAN', () => {
      expect(schema.isValid('GB33 BUKB 2020 1555 5555 55')).resolves.toBeTruthy();
      expect(schema.cast('GB33 BUKB 2020 1555 5555 55')).toBe("GB33BUKB20201555555555");
    });

    test.skip('invalid characters in IBAN', () => {
      const schema = yup.string().iban();
      expect(schema.isValid('GB33 BUKB %$2020 1555 5555#! 55')).resolves.toBeTruthy();
      expect(schema.cast('GB33 BUKB@ 2020 1555 5555! 55')).toBe("GB33BUKB20201555555555");
    });

    test('validates with default error message', () => {
      const schema = yup.string().iban();
      expect(schema.validate(invalid)).rejects.toThrow("Invalid IBAN");
    });

    test('validates with custom error message', () => {
      const schema = yup.string().iban("Custom Error Message");
      expect(schema.validate(invalid)).rejects.toThrow("Custom Error Message");
    });
  });
});
