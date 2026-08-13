pragma circom 2.2.0;
include "./iszero.circom";

/*
    IsEqual
    Parameters: none
    Input signal(s): in[2]
    Output signal(s): out
    Specification: If in[0] is equal to in[1], out should be 1. Otherwise, out should be 0.
*/


template IsEqual () {
    signal input in[2];
    signal output out;

    component isz = IsZero();
    isz.in <== in[0] - in [1];
    out <== isz.out;
}