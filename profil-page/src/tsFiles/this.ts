import * as React from "react";

class Test {
    private objet: number;
    constructor(input: number) {
        this.objet = input;
    }
    getOutput = (): void => {
        console.log(this.objet);
    }
}