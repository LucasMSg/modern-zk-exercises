const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const assert = require("assert");

describe("IsZero", function () {
  this.timeout(100000);
  let circuit;

  before(async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "../circuits/main/iszero.circom")
    );
  });

  it("is not zero", async () => {
    const w = await circuit.calculateWitness({ in: 12 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 0 });
  });

  it("is zero", async () => {
    const w = await circuit.calculateWitness({ in: 0 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 1 });
  });

  it("rejects a forged witness", async () => {
    // in = 5, out = 1, inv = 0 — the lie your second constraint must block
    await assert.rejects(circuit.checkConstraints([1n, 1n, 5n, 0n]));
  });
});
