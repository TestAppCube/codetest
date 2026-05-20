/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2012-2019. All rights reserved.
 * 
 */

import { Decimal } from 'decimal';
import { Error } from 'error';

/*
 * The input parameter is defined by `@action.param()`.
 */
export class Input {
    @action.param({ type: "String", required: true, description: "the operation type" })
    op: string;

    @action.param({ type: "Number", required: true, description: "the operation value 1" })
    value1: Decimal;

    @action.param({ type: "Number", required: true, description: "the operation value 2" })
    value2: Decimal;
}

/*
 * The output parameter is defined by `@action.param()`.
 */
export class Output {
    @action.param({ type: "Number", required: true })
    result: Decimal;
}

/*
 * Define the main service class.
 * 
 * - The service entry function is defined by `@action.method()`.
 * - All dependent objects should be defined via `@useObject([])` (for objects) or `@useBo([])` (for business objects).
 */
export class Calculator {

    @action.method({ input: "Input", output: "Output", description: "do a operation" })
    run(input: Input): Output {
        let output = new Output();
        switch (input.op) {
            case "+":
                output.result = this.sum(input.value1, input.value2);
                break;
            case "-":
                output.result = this.sub(input.value1, input.value2);
                break;
            default:
                throw new Error("00001", `unsupported calculator operator ${input.op}`);
        }

        return output;
    }

    sum(a: Decimal, b: Decimal): Decimal {
        return a.Add(b)
    }

    sub(a: Decimal, b: Decimal): Decimal {
        return a.Sub(b)
    }
}