JavaScript Global Execution Context (GEC) – Complete Theory

Imagine you are a JavaScript engine (like Google's V8). Whenever you execute a JavaScript program, the first thing you create is the Global Execution Context (GEC).

Definition:
The Global Execution Context (GEC) is the environment where JavaScript executes the global code before executing any function.

Step 1: JavaScript Starts Execution

Suppose we have this code:

var a = 10;
var b = 20;

function add() {
    var c = 30;
    console.log(a + b + c);
}

add();

The JavaScript engine does NOT execute the code line by line immediately.

Instead, it goes through two phases.

Program Starts
      │
      ▼
Create Global Execution Context
      │
      ▼
Memory Creation Phase
      │
      ▼
Execution Phase
      │
      ▼
Program Ends
Global Execution Context Structure
                 Global Execution Context (GEC)
        ┌─────────────────────────────────────┐
        │                                     │
        │   Memory Component (Variable Env.)  │
        │                                     │
        ├─────────────────────────────────────┤
        │                                     │
        │      Code Component (Thread)        │
        │                                     │
        └─────────────────────────────────────┘

The GEC contains two major components.

Component	Purpose
Memory Component	Stores variables and functions
Code Component	Executes JavaScript code line by line
Phase 1: Memory Creation Phase

During this phase,

JavaScript scans the entire program.

It does not execute any code.

Instead, it allocates memory.

For our example,

var a = 10;
var b = 20;

function add(){
   var c = 30;
}

Memory becomes

Memory

a   → undefined

b   → undefined

add → Entire Function

Diagram

           Memory Creation Phase

      ┌─────────────────────────────┐
      │ a       → undefined         │
      │                             │
      │ b       → undefined         │
      │                             │
      │ add()   → Function Object   │
      └─────────────────────────────┘

Notice

Variables receive

undefined

Functions receive

Entire Function Definition
Why Undefined?

Many beginners think

var a;

means

a = null

Wrong.

JavaScript automatically assigns

undefined

because memory has been reserved but value has not yet been assigned.

Phase 2: Execution Phase

Now JavaScript starts executing line by line.

Line 1

var a = 10;

Memory changes

a → 10

Line 2

var b = 20;

Memory

b → 20

Function declaration

function add(){}

Already stored.

Nothing happens.

Next

add();

JavaScript calls the function.

Function Call

When

add();

runs,

JavaScript creates a new Execution Context.

             Global Execution Context
                     │
                     │
                     ▼
          Function Execution Context

Now the stack becomes

                Call Stack

        ┌─────────────────────┐
        │ add() Context        │
        ├─────────────────────┤
        │ Global Context       │
        └─────────────────────┘
Function Memory Phase

Inside

function add(){

   var c = 30;

}

Memory

c → undefined
          Function Memory

      ┌───────────────────┐
      │ c → undefined      │
      └───────────────────┘
Function Execution Phase

Now

c = 30;

Memory

c → 30
      ┌──────────────────┐
      │ c → 30           │
      └──────────────────┘

Then

console.log(a+b+c);

prints

60
Function Ends

After completion,

Function Execution Context is removed.

Before Return

Stack

┌──────────────────┐
│ add()            │
├──────────────────┤
│ Global           │
└──────────────────┘


After Return

┌──────────────────┐
│ Global           │
└──────────────────┘
Finally

Global code finishes.

Global Execution Context is removed.

Program Starts

      │

      ▼

Create GEC

      │

      ▼

Memory Creation

      │

      ▼

Execution

      │

      ▼

Function Call

      │

      ▼

Create FEC

      │

      ▼

Execute Function

      │

      ▼

Delete FEC

      │

      ▼

Delete GEC

      │

      ▼

Program Ends
Complete Flow Diagram
                 JavaScript Engine

                       │
                       ▼

        Create Global Execution Context

                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼

 Memory Creation Phase         Execution Phase

        │                             │

a → undefined                  a → 10

b → undefined                  b → 20

add → function                 add()

                                     │

                                     ▼

                    Create Function Execution Context

                                     │

                    c → undefined

                                     │

                    c → 30

                                     │

                 console.log(60)

                                     │

                  Delete Function Context

                                     │

                  Delete Global Context

                                     │

                           Program Ends
Call Stack Visualization
Initially

┌──────────────┐
│              │
└──────────────┘


Program Starts

┌──────────────┐
│ Global       │
└──────────────┘


Function Called

┌──────────────┐
│ add()        │
├──────────────┤
│ Global       │
└──────────────┘


Function Ends

┌──────────────┐
│ Global       │
└──────────────┘


Program Ends

┌──────────────┐
│ Empty        │
└──────────────┘
Memory Changes Step-by-Step
Initial
a → undefined
b → undefined
add → function

↓

After Line 1
a → 10
b → undefined
add → function

↓

After Line 2
a → 10
b → 20
add → function

↓

Function Called
c → undefined

↓

Execution
c → 30

↓

Function Ends
c removed
Interview Points ⭐
Every JavaScript program creates one Global Execution Context.
JavaScript has two phases: Memory Creation and Execution.
Variables declared with var are initialized with undefined during the memory phase.
Function declarations are stored completely in memory before execution begins.
Each function call creates a new Function Execution Context (FEC).
Execution Contexts are managed using the Call Stack (LIFO).
When a function finishes, its execution context is popped from the Call Stack.
The Global Execution Context remains until the entire program finishes.
Quick Revision (1 Minute)
Program Starts
      │
      ▼
Create Global Execution Context (GEC)
      │
      ▼
Memory Creation Phase
   ├─ var → undefined
   └─ function → full definition
      │
      ▼
Execution Phase
   ├─ Assign variable values
   ├─ Execute statements
   └─ Call functions
      │
      ▼
Create Function Execution Context (FEC)
      │
      ▼
Execute Function
      │
      ▼
Remove FEC from Call Stack
      │
      ▼
Finish Global Code
      │
      ▼
Remove GEC
      │
      ▼
Program Ends