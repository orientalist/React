# Overview
[本篇來源](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

***
## JavaScript的型別
1. Number
2. String
3. Boolean
4. Function
5. Object
   1. Function
   2. Array
   3. Date
   4. RegExp
6. **Symbol**(new in ES2015)
7. null
8. undefined
   
除此外還有一些內建的Error型別,現在只討論上方列出的。
***

## Number
定義:**double-precision 64-bit format IEEE 754 values**。
這導致一些特殊情形,由於沒有integer型別,當你在JavaScript用Java與C的運算時,會有一些特殊狀況,如下。
```js
let result=0.1+0.1;
//result為0.30000000000000004
```
integer一般為32-bit,使用integer數字(型別為Number)運算便會造成位元運算誤差。

JavaScript內建了基本運算子,以及內建的`Math`型別(Object的子類別),用於進階運算。
```js
//正弦值
Math.sin(3.5);
let circumference=2*Math.PI*r;
```
1. `parseInt('字串'/數字,進位?)`-用以將字串/數字轉換為指定進位的數字,進位預設為10。
2. `parseFloat('字串'/數字)`-用以將字串/數字轉換為10進位的浮點數。
```js
let num=parseInt('11',2);//=>3
num=parseInt(11,2);//=>3
let flo=parseFloat('0.11');//=>0.11
flo=parseFloat(0.11);//=>0.11
```
`+`運算子-將字串/數字轉換為number/浮點數
```js
let num=+ '5';//=>5
num=+ -5;//=>-5
num=+ 0.54;//=>0.54
```
當值非數字時,回傳`NaN`。
```js
let num=parseInt('hello');//=>NaN
```
`NaN`是毒藥,當他與其他數字運算時,結果為`NaN`。
```js
let result=NaN+5;//=>NaN
```
`isNaN(值)`-檢測值是否為NaN
```js
isNaN(NaN);//=>true
```
`Infinity`與`-Infinity`
```js
1/0;//=>Infinity
-1/0;//=>-Infinity
```
`isFinite(值)`-用以檢測值是否**不是**`Infinity`
```js
isFinite(1/0);//=>false
isFinite(-Infinity);//=>false
isFinite(NaN);//=>false
```
> The parseInt() and parseFloat() functions parse a string until they reach a character that isn't valid for the specified number format, then return the number parsed up to that point. However the "+" operator simply converts the string to NaN if there is an invalid character contained within it. Just try parsing the string "10.2abc" with each method by yourself in the console and you'll understand the differences better.
***

## String
String其實是Unicode characters的序列,更精確地說,是UTF-16的序列。每一個字元是由16-bit的數字代表,每個字元由1-2個單位組成。

`length`-計算字串長度
```js
'hello'.length;//=>5
```
注意到了嗎,String其實也是一種Object,我們才能透過`.length`取得他的長度,其他方法還有:
```js
let txt='hello';
txt.charAt(0);//=?h
txt.replace('ll','vv');//=>hevvo
txt.toUpperCase();//=>HELLO
```
***
## Other types
### 區別`null`與`undefined`:
1. null表示空值(虛無)。
2. undefined表示變數值尚未被指派。
### boolean
任何值皆可轉換為boolean值,規則如下
1. `false`,`0`,`''`(空字串),`NaN`,`null`,`undefined`為false。
2. 其他為true

`Boolean(值)`-轉換為boolean值
```js
Boolean('');//=>false
Boolean(234);//=>true
```
> However, this is rarely necessary, as JavaScript will silently perform this conversion when it expects a boolean, such as in an if statement (see below). For this reason, we sometimes speak simply of "true values" and "false values," meaning values that become true and false, respectively, when converted to booleans. Alternatively, such values can be called "truthy" and "falsy", respectively.
Boolean operations such as && (logical and), || (logical or), and ! (logical not) are supported; see below.

***
## Variable
變數宣告關鍵字:
1. `let`
   - 用以建立`block-level`變數(變數僅生存於block)
2. `var`
   - 用以建立`function-level`變數
3. `const`
   - 用以建立`bolck-level`,值不可變的變數
> If you declare a variable without assigning any value to it, its type is undefined.

> An important difference between JavaScript and other languages like Java is that in JavaScript, blocks do not have scope; only functions have a scope. So if a variable is defined using var in a compound statement (for example inside an if control structure), it will be visible to the entire function. However, starting with ECMAScript 2015, let and const declarations allow you to create block-scoped variables.
***

## Operators
1. 當`+`運算內含有string時,會輸出字串。

其餘略
***

## Control structures
1. `do-white`-用以確保至少執行一次
2. `for`
   1. `for(let i=0;i<11;i++){}`-用於執行N次
   2. `for(let value of array){}`-用於逐一調用array
   3. `for(let property in object){}`-用以逐一調用object的屬性
3. `&&`與`||`-用於決定是否執行第二個陳述式,常用於在取用object的屬性前檢查該object是否為null
   1. `&&`-當第一個陳述式為truthy,執行第二個陳述式
      ```js
      //當o為truthy時才調用o.getName();
      let name=o&&o.getName();
      ```
   2. `||`-當第一個陳述式為falsy,執行第二個陳述式
      ```js
      //當cachename為falsy時,執行cacheName=getName(),並且把值帶給name
      let name=cachename||(cacheName=getName());
      ```
其餘略
***

## Object
1. JavaScript內的Object可視為簡單的`name-value`集合
2. value可以是任意型別的資料
3. 建立方法
   ```js
   //1.
   let obj=new Object();
   //2.物件實字object literal
   let obj={};
   ```

其餘略

***
## Arrays
1. `Array.length`**未必**等於陣列長度,而是最後元素的index加上1
   ```js
   let arr=[1,2,3];
   arr.length;//=>3;
   arr[50]=4;
   arr.length;//=>50
   ```
2. 若調用不存在的元素,會得到`undefined`
   ```js
   let arr=[1,2,3];
   arr[3];//=>undefined
   ```
3. 逐一調用陣列元素
   ```js
   let arr=[1,2,3];
   for(let element of arr){
         element;//=>1,2,3
   }
   for(let i=0;i<arr.length;i++){
         arr[i];
   }
   //ECMAScript 5
   arr.forEach(e=>{
         e;
   });
   ```
4. 其他方法
![](imgs/arrayFunctions.png)
***

## Function
1. `return`-用以回傳function執行輸出,若無使用,則回傳`undefined`
2. 傳遞的參數未必要依照function宣告
   ```js
   function add(x,y){
         return x+y;
   }
   add();//=>NaN
   add(2,3,4);//=>5
   ```
   - 事實上,傳遞給function的參數可以在function內透過`argument`取得,`argument`為類array結構。
      ```js
      function add(){
            let result=0;
            for(let i=0;i<argument.length;i++){
                  result+=argument[i];
            }
            return result;
      };
      add(2,3,4,5);//=>14
      ```
   - `...args`-用以代表所有傳遞給function的參數
      ```js
      function add(...args){
            let result=0;
            for(let v of args){
                  result+=v;
            }
            return result;
      }
      add(2,3,4,5);//=>14
      ```
      > It is important to note that wherever the rest parameter operator is placed in a function declaration it will store all arguments after its declaration, but not before. i.e. function avg(firstValue, ...args) will store the first value passed into the function in the firstValue variable and the remaining arguments in args. That's another useful language feature but it does lead us to a new problem.

其餘略
***
## Custom objects
1. 物件導向-與其他語言(java/c#)相比,JavaScript不具備class,而是用function達到物件封裝的目的。
```js
function Person(first,last){
      this.first=first;
      this.last=last;
}

Person.prototype.fullName=function(){
      return `${this.first} ${this.last}`;
};

Person.prototype.fullNameReversed=function(){
      return `${this.last} ${this.first}`;
};

let s=new Person('Peter','Parker');
s.fullName();//=>Peter Parker
s.fullNameReverser();//=>Parker Peter
```
2. `this`
   1. function內的`this`指向調用function的Object
   2. 若直接調用function(非透過Object./Object[]),則this指向全域

其餘略

***
## Closures
```js
function makeAdder(a){
      return function(b){
            return a+b;
      };
};

let add5=makeAdder(5);
let add20=makeAdder(20);
add5(6);//=>11
add20(7);//=>27
```
在JavaScript的function執行時,會形成Scope,包含function內的所有變數,於function執行完畢時銷毀。

然而,當function回傳若參考到function Scope的變數時,scope便不會被銷毀。
未被銷毀的Scope因此形成`Scope chain`。

未被銷毀的Scope與回傳則形成`Closure`(閉包),可用以保存回傳(function)中某些特定的值。
***