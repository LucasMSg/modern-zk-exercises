const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const assert = require("assert");

describe("Selector", function () {
  this.timeout(100000);
  let circuit;

  const values = [11, 22, 33, 44, 55, 66, 77, 88, 99, 110];

  before(async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "../circuits/main/selector_10.circom")
    );
    await circuit.loadConstraints();
    console.log("    constraints:", circuit.constraints.length);
  });

  it("selects the first element", async () => {
    const w = await circuit.calculateWitness({ in: values, index: 0 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 11 });
  });

  it("selects a middle element", async () => {
    const w = await circuit.calculateWitness({ in: values, index: 2 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 33 });
  });

  it("selects the last element", async () => {
    const w = await circuit.calculateWitness({ in: values, index: 4 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 55 });
  });

  it("returns 0 when index is past the end", async () => {
    const w = await circuit.calculateWitness({ in: values, index: 10 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 0 });
  });

  it("returns 0 for a far out-of-range index", async () => {
    const w = await circuit.calculateWitness({ in: values, index: 99 }, true);
    await circuit.checkConstraints(w);
    await circuit.assertOut(w, { out: 0 });
  });

  it("rejects a forged output", async () => {
    const w = await circuit.calculateWitness({ in: values, index: 2 }, true);
    w[1] = 44n; // claim in[3] was selected
    await assert.rejects(circuit.checkConstraints(w));
  });
});