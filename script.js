const outputArea=document.getElementById('output');
const output=document.createElement('div');
const equationHistory=document.getElementById('equation');
const equation=document.createElement('p');

output.textContent='';
output.classList.add('result')
outputArea.appendChild(output);

equation.textContent='';
equation.classList.add('equation')
equationHistory.appendChild(equation);

let displayVal=0;
let firstInput=0;
let operator='';
let result=0;
let toClear=false;

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function formula(input1, input2, operator){
    if(operator==='+'){
        return add(input1,input2);
    } else if(operator==='-'){
        return subtract(input1,input2);
    } else if(operator==='*'){
        return multiply(input1,input2);
    } else if(operator==='/'){
        return divide(input1,input2);
    };
};
/*
//can't seem to get swithc statement to work but if else does
const formula = function(input1, input2, operator){
    switch(operator){
        case '+':
            add(input1,input2);
            break;
        case '-':
            subtract(input1,input2);
            break;
        case '*':
            multiply(input1,input2);
            break;
        case '/':
            divide(input1,input2);
    };
}; */

function makeCalcNums(){
    let buttons=[1,2,3,4,5,6,7,8,9,0,'dot','equals'];

    for(let i=0;i<buttons.length;i++){
        const numBtns=document.createElement('btn');
        const numbers=document.getElementById('numbers');
        
        if(typeof(buttons[i])=='number'){
            numBtns.classList.add('calcBtn', 'number')
            numBtns.setAttribute('id',`${buttons[i]}`);
            numBtns.textContent=buttons[i];
            numbers.appendChild(numBtns);
        } else {
            numBtns.classList.add('calcBtn', 'function')
            numBtns.setAttribute('id',`${buttons[i]}`);
            numBtns.textContent=buttons[i];
            numbers.appendChild(numBtns);
        };
        
    }
}

function makeCalcOps(){
    let buttons=['+','-','*','/'];

    for(let i=0;i<buttons.length;i++){
        const opBtns=document.createElement('btn');
        const operators=document.getElementById('operators');
        opBtns.classList.add('calcBtn', 'operator')
        opBtns.setAttribute('id',`${buttons[i]}`);
        opBtns.textContent=buttons[i];
        operators.appendChild(opBtns);
    }
}

function makeCalcFunc(){
    let buttons=['clear','back'];

    for(let i=0;i<buttons.length;i++){
        const funcBtns=document.createElement('btn');
        const functions=document.getElementById('functions');
        funcBtns.classList.add('calcBtn', 'function')
        funcBtns.setAttribute('id',`${buttons[i]}`);
        funcBtns.textContent=buttons[i];
        functions.appendChild(funcBtns);
    };
};


function clear(){
    displayVal=0;
    firstInput=0;
    result=0;
    operator='';
    output.textContent='';
    equation.textContent='';
};

function checkForResult(){
    if(toClear){
        clear();
        toClear=false;
    } else {
        //do nothing
    };
};

function checkForDot(){
 
};

makeCalcNums();
makeCalcOps();
makeCalcFunc();

document.querySelectorAll('.number').forEach(btn =>{
    btn.addEventListener('click', function(e){
        
        checkForResult();        
        output.textContent+=btn.textContent;

        if(firstInput!==0){
            equation.textContent=`${firstInput} ${operator} ${output.textContent}`;
        } else {
            equation.textContent=`${output.textContent}`;
        };
        
    });
});

document.querySelectorAll('.operator').forEach(btn =>{
    btn.addEventListener('click',function(e){
        toClear=false;
        operator=btn.id;
        firstInput=parseFloat(output.textContent);
        output.textContent='';
        equation.textContent=`${firstInput} ${operator} ${output.textContent}`;
    });
});

document.querySelector('#clear').addEventListener('click', clear);

document.querySelector('#back').addEventListener('click', ()=>{
    checkForResult();        
    let back=output.textContent.slice(0,-1);
    output.textContent=back;
    if(firstInput!==0){
        equation.textContent=`${firstInput} ${operator} ${output.textContent}`;
    } else {
        equation.textContent=`${output.textContent}`;
    };
});

document.querySelector('#dot').addEventListener('click',()=>{
    if(output.textContent.includes(".")){
        document.getElementById('dot').disable;
    } else {
        document.getElementById('dot').enable;
        output.textContent+='.';
    };
    
});

document.querySelector('#equals').addEventListener('click',()=>{
    displayVal=parseFloat(output.textContent);

    if((firstInput!==0)&&(displayVal!==0)&&(operator!=='')){
        result=formula(firstInput, displayVal, operator);
        if(result%1!==0){
            result=result.toFixed(2);
        };

        output.textContent=result;
        equation.textContent=`${firstInput} ${operator} ${displayVal} = `
        firstInput=result;
        result=0;
        displayVal=0;
        operator='';
        toClear=true;
    } else if(operator==='/'&&displayVal==0){
        output.textContent='Wow you really thought that would work?';
    } else {
        //do nothing
    }
});