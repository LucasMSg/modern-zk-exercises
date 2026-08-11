const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const assert = require("assert");

describe("Num2Bits", function () {
  this.timeout(100000);
  let circuit;

  before(async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "../circuits/main/num2bits_5.circom")
    );
  });

  it("decomposes 27", async () => {
    const w = await circuit.calculateWitness({ in: 27 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { b: [1, 1, 0, 1, 1] });
  });

  it("rejects inputs that don't fit", async () => {
    await assert.rejects(circuit.calculateWitness({ in: 32 }, true));
  });
});