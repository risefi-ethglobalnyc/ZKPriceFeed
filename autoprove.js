const snarkjs = require("snarkjs");
const fs = require("fs");

async function run() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({"a": [1, 2, 3, 2, 2], "price": [3,1,6,2,4], "markpricetimes10": 35}, "./priceintegrity_js/priceintegrity.wasm", "priceintegrity_final.zkey");


    const funcinput = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
    // const funcinput = await snarkjs.zkesc(proof, publicSignals);
    //console.log("Proof: ");
    //console.log(JSON.stringify(proof, null, 1));
    console.log("Public Signals: ");
    console.log(funcinput);
    //const [_pA, _pB, _pC, _pubSignals] = funcinput;
    console.log(typeof funcinput); 
    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }


}

run().then(() => {
    process.exit(0);
});