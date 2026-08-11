
pragma circom 2.2.0;

/* 
    Parameters: nBits
    Input signal(s): in
    Output signal(s): b[nBits]
    The output signals should be an array of bits of length nBits equivalent to the binary representation of in. b[0] is the least significant bit.
*/


template Num2Bits (nBits) {
    signal input in;
    signal output b[nBits];

    var sum = 0;

    for (var i = 0; i < nBits; i++){
        //extract the bits
        b[i] <-- (in >> i) & 1;
        //constrain them
        0 === b[i] * (1 - b[i]);
        sum += b[i] * 2**i;
    }

    //constrain with n
    sum === in;
    
}

