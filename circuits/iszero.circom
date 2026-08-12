pragma circom 2.2.0;

/*
    Parameters: none
    Input signal(s): in
    Output signal(s): out
    Specification: If in is zero, out should be 1. If in is nonzero, out should be 0. This one is a little tricky!
*/

template IsZero () {
    
    signal input in;
    signal output out;

    signal inv;
    inv <-- in != 0 ? 1 / in : 0;

    out <== 1 - in * inv;
    
    // verify through multiplication
    0 === in * out;
    
}