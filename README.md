# Modern ZK Cryptography — Exercises

Circom solutions for the exercises from
[MIT IAP 2023: Modern Zero Knowledge Cryptography](https://zkiap.com/)
(Session 2, [exercises](https://hackmd.io/@gubsheep/S1Hz96Yqo)).

## Setup

Requires [circom](https://docs.circom.io/getting-started/installation/) 2.2.0+
on your PATH.

```bash
npm install
npm test
```

## Layout

- `circuits/`: templates, no `component main`, so they can be included by each other
- `circuits/main/`: thin wrappers instantiating each template for testing
- `tests/`: mocha tests

## Notes

`circom_tester` 0.0.24 is missing the `printDebug` runtime import that circom
now emits, causing a WASM LinkError. Patched via `patch-package; applied
automatically on `npm install`.