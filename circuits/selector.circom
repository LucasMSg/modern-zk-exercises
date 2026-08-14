pragma circom 2.2.0;
include "./isequal.circom";


/*
Selector
Parameters: nChoices
Input signal(s): in[nChoices], index
Output: out
Specification: The output out should be equal to in[index]. If index is out of bounds (not in [0, nChoices)), out should be 0.
*/


template Selector (nChoices) {
    signal input in[nChoices];
    signal input index;
    signal output out;

    component eq[nChoices];
    signal partial[nChoices + 1];
    partial[0] <== 0;

    for (var i = 0; i < nChoices; i++) {
        eq[i] = IsEqual();
        eq[i].in[0] <== index;
        eq[i].in[1] <== i;
        partial[i + 1] <== partial[i] + in[i] * eq[i].out;
    }

    out <== partial[nChoices];

}