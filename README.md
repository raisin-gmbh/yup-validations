# Yup Validation Extensions

Adds IBAN and German Tax ID as a reusable Yup schema.


## Usage

```javascript
import yup from "@raisin/yup-validations";

const schema = yup.string().iban();
schema.isValid("GB94BARC10201530093459"); // true
schema.isValid("GB94 BARC 1020 1530 0934 59"); // true
schema.isValid("US64SVBKUS6S3300958879"); // false
```

---
## Installation

Using NPM:
```shell
$ npm install --save @raisin/yup-validations
```

or Yarn:
```shell
$ yarn add @raisin/yup-validations
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Reach out to us!

- Website at <a href="https://weltsparen.de" target="_blank">`weltsparen.de`</a>
