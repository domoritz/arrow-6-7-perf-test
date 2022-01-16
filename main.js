const arrow6 = require('apache-arrow');
const arrow7 = require('@domoritz/apache-arrow');
const b = require('benny');

const LENGTH = 1000000;

const array = Float64Array.from({ length: LENGTH }, () => Math.random() * 255)

const vector6 = arrow6.FloatVector.from(array);
const vector7 = arrow7.makeVector(array);

console.log(vector6.type);
console.log(vector7.type);

b.suite(
    'Create',

    b.add('Arrow 6', () => {
        arrow6.FloatVector.from(array);
    }),

    b.add('Arrow 7', () => {
        arrow7.makeVector(array);
    }),
  
    b.cycle(),
    b.complete(),
)

b.suite(
    'Get',

    b.add('Arrow 6', () => {
        for (let j = 0; j < vector6.length; j++) {
            vector6.get(j);
        }
    }),

    b.add('Arrow 7', () => {
        for (let j = 0; j < vector7.length; j++) {
            vector7.get(j);
        }
    }),

    b.add('Typed Array', () => {
        for (let j = 0; j < vector7.length; j++) {
            array[j];
        }
    }),

    b.cycle(),
    b.complete(),
)

b.suite(
    'Iterate',

    b.add('Arrow 6', () => {
        for (const _ of vector6) {
        }
    }),

    b.add('Arrow 7', () => {
        for (const _ of vector7) {
        }
    }),

    b.add('Typed Array', () => {
        for (const _ of array) {
        }
    }),

    b.cycle(),
    b.complete(),
);
