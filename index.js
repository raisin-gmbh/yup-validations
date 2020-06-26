import * as yup from 'yup';
import { germanTaxId } from './src/germanTaxId';
import { iban } from './src/iban';

yup.addMethod(yup.string, 'germanTaxId', germanTaxId);
yup.addMethod(yup.string, 'iban', iban);

export default yup;
