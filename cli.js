#!/usr/bin/env node
var shell = require("shelljs");
var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);
const [,, ...args] = process.argv;

let counter = 0;
const pjson = require('./package.json');
console.log(`current version is: v${pjson.version}`);


const former = [
  "build and prepare for set version (yes or no) ? ","set commit message: ","set new virsion: v"
];

const buildAndSetVersion = (input) => {
  if(input === 'no') return rl.close();
  console.log(`npm run build && git add -A .`);
  shell.exec(`npm run build && git add -A .`);
  console.log(`done!`);
  return counter++;
  // q1();
}

const commitMessage = (input) => {
  console.log(`git commit -m '${input}'`);
  shell.exec(`git commit -m '${input}'`);
  console.log(`done!`);
  return counter++;
  // q1();
}

const setNewVersion = (input) => {
  shell.exec(`npm version ${input}`);
  if(input === pjson.version) {
    return counter--
  }else{
    console.log(`done!`);
    console.log(`please type 'npm run publisher'`);
    return counter++;
  }
  // q1();
}

const q1 = (func) =>{
  console.log(counter)
  if(counter > former.length - 1){
    rl.close();
    return true;
  }
  
  rl.question(former[counter], (input) => {
    return func(input);
  });
}

function* anotherGenerator() {
  yield q1(buildAndSetVersion);
  yield q1(commitMessage);
  yield q1(setNewVersion);
}

function* anotherGenerator() {
  yield setTimeout(()=>console.log(1),100);
  yield console.log(2);
  yield console.log(3);
}

var gen = anotherGenerator();
gen.next();
gen.next();
gen.next();

// console.log(gen.next().value); // 0
// console.log(gen.next().value); // 1
// console.log(gen.next().value); // 2
// console.log(gen.next().value); // 3

// q1();