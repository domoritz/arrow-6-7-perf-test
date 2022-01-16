const arrow6 = require("apache-arrow");
const arrow7 = require("@domoritz/apache-arrow");
const b = require("benny");
const fs = require("fs");

const LENGTH = 1000000;

const file = fs.readFileSync("flights-10k.arrow");

const table6 = arrow6.Table.from(file);
const table7 = arrow7.tableFromIPC(file);

{
    const array = Float64Array.from(
        { length: LENGTH },
        () => Math.random() * 255
    );

    const vector6 = arrow6.FloatVector.from(array);
    const vector7 = arrow7.makeVector(array);

    console.log(vector6.type);
    console.log(vector7.type);

    b.suite(
        "Create Float Vector",

        b.add("Arrow 6", () => {
            arrow6.FloatVector.from(array);
        }),

        b.add("Arrow 7", () => {
            arrow7.makeVector(array);
        }),

        b.cycle(),
        b.complete()
    );

    b.suite(
        "Get Float Vector",

        b.add("Arrow 6", () => {
            for (let j = 0; j < vector6.length; j++) {
                vector6.get(j);
            }
        }),

        b.add("Arrow 7", () => {
            for (let j = 0; j < vector7.length; j++) {
                vector7.get(j);
            }
        }),

        b.add("Typed Array", () => {
            for (let j = 0; j < vector7.length; j++) {
                array[j];
            }
        }),

        b.cycle(),
        b.complete()
    );

    b.suite(
        "Iterate Float Vector",

        b.add("Arrow 6", () => {
            for (const _ of vector6) {
            }
        }),

        b.add("Arrow 7", () => {
            for (const _ of vector7) {
            }
        }),

        b.add("Typed Array", () => {
            for (const _ of array) {
            }
        }),

        b.cycle(),
        b.complete()
    );
}

{
    const array = Int32Array.from(
        { length: LENGTH },
        () => Math.random() * 255
    );

    const vector6 = arrow6.IntVector.from(array);
    const vector7 = arrow7.makeVector(array);

    console.log(vector6.type);
    console.log(vector7.type);

    b.suite(
        "Create Int Vector",

        b.add("Arrow 6", () => {
            arrow6.FloatVector.from(array);
        }),

        b.add("Arrow 7", () => {
            arrow7.makeVector(array);
        }),

        b.cycle(),
        b.complete()
    );

    b.suite(
        "Get Int Vector",

        b.add("Arrow 6", () => {
            for (let j = 0; j < vector6.length; j++) {
                vector6.get(j);
            }
        }),

        b.add("Arrow 7", () => {
            for (let j = 0; j < vector7.length; j++) {
                vector7.get(j);
            }
        }),

        b.add("Typed Array", () => {
            for (let j = 0; j < vector7.length; j++) {
                array[j];
            }
        }),

        b.cycle(),
        b.complete()
    );

    b.suite(
        "Iterate Int Vector",

        b.add("Arrow 6", () => {
            for (const _ of vector6) {
            }
        }),

        b.add("Arrow 7", () => {
            for (const _ of vector7) {
            }
        }),

        b.add("Typed Array", () => {
            for (const _ of array) {
            }
        }),

        b.cycle(),
        b.complete()
    );
}

{
    const array = Array.from({ length: 100 })
        .map(() => ["a", "b", "c", "d", "e", "f"])
        .flat(1);

    const builder = new arrow6.DictionaryBuilder({
        type: new arrow6.Dictionary(new arrow6.Utf8(), new arrow6.Int32()),
        nullValues: [null, "n/a"],
    });
    array.forEach((value) => builder.append(value));
    const vector6 = builder.finish().toVector();

    const vector7 = arrow7.vectorFromArray(array);

    console.log(vector6.type);
    console.log(vector7.type);

    b.suite(
        "Get Dictionary Vector",

        b.add("Arrow 6", () => {
            for (let j = 0; j < vector6.length; j++) {
                vector6.get(j);
            }
        }),

        b.add("Arrow 7", () => {
            for (let j = 0; j < vector7.length; j++) {
                vector7.get(j);
            }
        }),

        b.add("Native Array", () => {
            for (let j = 0; j < vector7.length; j++) {
                array[j];
            }
        }),

        b.cycle(),
        b.complete()
    );

    b.suite(
        "Iterate Dictionary Vector",

        b.add("Arrow 6", () => {
            for (const _ of vector6) {
            }
        }),

        b.add("Arrow 7", () => {
            for (const _ of vector7) {
            }
        }),

        b.add("Native Array", () => {
            for (const _ of array) {
            }
        }),

        b.cycle(),
        b.complete()
    );
}

b.suite(
    "Parse",

    b.add("Arrow 6", () => {
        arrow6.Table.from(file);
    }),

    b.add("Arrow 7", () => {
        arrow7.tableFromIPC(file);
    }),

    b.cycle(),
    b.complete()
);

b.suite(
    "Get Table",

    b.add("Arrow 6", () => {
        for (let j = 0; j < table6.length; j++) {
            table6.get(j);
        }
    }),

    b.add("Arrow 7", () => {
        for (let j = 0; j < table7.numRows; j++) {
            table7.get(j);
        }
    }),

    b.cycle(),
    b.complete()
);

b.suite(
    "Iterate Table",

    b.add("Arrow 6", () => {
        for (const _ of table6) {
        }
    }),

    b.add("Arrow 7", () => {
        for (const _ of table7) {
        }
    }),

    b.cycle(),
    b.complete()
);
