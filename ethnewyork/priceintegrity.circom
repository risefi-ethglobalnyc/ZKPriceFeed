pragma circom 2.0.0;

include "circomlib/circuits/comparators.circom";

template PriceIntegrity() {
    signal input a[5];
    signal b[5];
    signal result1;
    signal result2;
    signal output c;

    result1 <== 1;

    result2 <== 1;


    for (var i = 0; i < 5; i++) {
        LessThan(32) {
            in <== [a[i], 1];
            out --> b[i];
        }
    }
    for (var i = 0; i < 5; i++) {
        result1 <== result1 * b[i];
    }  

    for (var i = 0; i < 5; i++) {
        GreaterThan(32) {
            in <== [a[i], 0];
            out --> b[i];
        }
    }
    for (var i = 0; i < 5; i++) {
        result2 <== result2 * b[i];
    }
    
    c <== result1 * result2;
    c === 1;

    
}
component main = PriceIntegrity();