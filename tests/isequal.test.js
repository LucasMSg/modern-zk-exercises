const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const assert = require("assert");

describe("IsEqual", function () {
  this.timeout(100000);
  let circuit;

  before(async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "../circuits/main/isequal.circom")
    );
  });

  it("is not equal", async () => {
    const w = await circuit.calculateWitness({ in: [7, 8] }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 0 });
  });

  it("is equal", async () => {
    const w = await circuit.calculateWitness({ in: [7, 7] }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 1 });
  });

  it("rejects a flipped output", async () => {
    const w = await circuit.calculateWitness({ in: [7, 8] }, true);
    w[1] = 1n; // out was 0; forge a claim of equality
    await assert.rejects(circuit.checkConstraints(w));
  });
  
  const p =
    21888242871839275222246405745257275088548364400416034343698204186575808495617n;

  it("handles field wraparound", async () => {
    const w = await circuit.calculateWitness({ in: [0, p - 1n] }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 0 });
  });
});
