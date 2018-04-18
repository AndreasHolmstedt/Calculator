window.addEventListener("load", function () {

    let vm = new Vue({
        el: "#root",
        data: {
            result: "", // string with the result of numbers entered before entering an operator.
            toCalc: [], // array consisting of the numbers entered before making the calculation.
            history: [], // array consisting of all calculations made.
            memory: "",
            historySwitch: "enableHistory",
            disableSquare: false,
            opacity: "",
        },
        methods: {
            clear: function (evt) {
              //resets everything but history.
                this.disableSquare = false;
                this.opacity = "";
                this.result = "";
                this.memory = "";
                this.toCalc = [];
            },
            square: function(evt) {
                    //first calculate numbers entered prior to square root calculation.
                    if(this.toCalc.length != 0){
                        this.equals();
                    }
                    //then calculate the square root of the number.
                    if(this.memory){
                        let temp = (Math.round(Math.sqrt(this.memory)*10)/10);
                        this.history.push(`${this.memory} √ ${temp}`);
                        this.memory = temp;
                        this.result = "";
                    }
                    if(this.result){
                        console.log(this.result);
                        console.log(Math.sqrt(this.result));
                        let temp = (Math.round(Math.sqrt(this.result)*10)/10);
                        this.memory = temp;
                        this.history.push(`${this.result} √ ${this.memory}`);
                        this.result = "";
                    }
            },
            raised: function(evt) {
              //first calculate numbers entered prior to square calculation.
              if(this.toCalc.length != 0){
                  this.equals();
              }
              //then calculate the square of the number.
              if(this.memory){
                  let temp = this.memory * this.memory;
                  this.history.push(`${this.memory} ^2 = ${temp}`);
                  this.memory = temp;

                  this.result = "";
              }
              if(this.result){
                  let temp = this.result * this.result;
                  this.memory = temp;
                  this.history.push(`${this.result} ^2 = ${this.memory}`);
                  this.result = "";

              }
            },
            divide: function (evt) {

                // add / to the calculation.
                if(this.memory){
                  this.toCalc.push(this.memory);
                  this.toCalc.push("/");
                  this.memory = "";
                }
                if (this.result) {
                    this.toCalc.push(this.result);
                    this.toCalc.push("/");
                    this.result = "";
                }
            },
            multiply: function (evt) {

                //add * to the calculation.
                if(this.memory){
                  this.toCalc.push(this.memory);
                  this.toCalc.push("*");
                  this.memory = "";
                }
                if (this.result) {
                    this.toCalc.push(this.result);
                    this.toCalc.push("*");
                    this.result = "";
                }
            },
            subtract: function (evt) {

                // add - to the calculation.
                if(this.memory){
                  this.toCalc.push(this.memory);
                  this.toCalc.push("-");
                }
                if(this.result){
                  this.toCalc.push(this.result);
                  this.toCalc.push("-");
                }
                //check if a negative value should be calculated.
                if(!this.result && !this.memory){
                  this.toCalc.push("-");
                  this.disableSquare = true;
                  this.opacity = "lowerOpacity";
                }
                this.memory = "";
                this.result = "";
            },
            add: function (evt) {

                // add + to the calculation.
                if(this.memory){
                  this.toCalc.push(this.memory);
                  this.toCalc.push("+");
                  this.memory = "";
                }
                if(this.result){
                    this.toCalc.push(this.result);
                    this.toCalc.push("+");
                    this.result = "";
                }


            },
            comma: function (evt) {
              //add , to the result.
              if(this.result){
                this.result += "."
              }
            },
            showHistory: function(evt){
              //show or hide history tab.
              if(this.historySwitch == "enableHistory"){
                this.historySwitch = "disableHistory";
              }else{
                this.historySwitch = "enableHistory";
              }
            },
            equals: function (evt) {
              //if the array of numbers to calculate is empty, return.
              if(this.toCalc.length == 0){
                return;
              }
                this.toCalc.push(this.result);
                console.log("före while", this.toCalc);
                //if last index of this.toCalc is not a number, remove it.
                while(this.toCalc[this.toCalc.length-1] == "+" ||
                    this.toCalc[this.toCalc.length-1] == "-" ||
                    this.toCalc[this.toCalc.length-1] == "*" ||
                    this.toCalc[this.toCalc.length-1] == "/" ||
                    this.toCalc[this.toCalc.length-1] == ""){
                      console.log("går in i pop med: ", this.toCalc);
                      this.toCalc.pop();
                      console.log("efter pop: ", this.toCalc);
                  }
                let toHistory = "";

                for(let i in this.toCalc){
                  toHistory += `${this.toCalc[i]} `;
                }

                let calculated = 0;

                if(this.toCalc[0] == "-"){
                  this.toCalc.shift();
                  this.toCalc[0] = this.toCalc[0] * -1;
                }
                  calculated = Number(this.toCalc[0]);
                   /*because of the checks prior to running the equals function we can be shure that
                   the toCalc array odd indexes are numbers and the equal indexes are operators.
                   We then iterate over the array and calculate numbers depending on the following operators
                   and save the result in the 'calculated' variable.*/
                for(let i in this.toCalc){
                    if(Number(i) < (this.toCalc.length - 1)){
                        switch(this.toCalc[i]){
                            case "+":
                                calculated = calculated + Number(this.toCalc[(Number(i)+1)])
                                break;
                            case "-":
                                calculated = calculated - Number(this.toCalc[(Number(i)+1)])
                                break;
                            case "*":
                                calculated = (Math.round(calculated * Number(this.toCalc[(Number(i)+1)])*1000)/1000)
                                break;
                            case "/":
                                calculated = (Math.round(calculated / Number(this.toCalc[(Number(i)+1)])*1000)/1000)
                                break;
                        }
                    }

                }

                this.result = calculated;
                this.clear();
                this.memory = calculated;
                if(this.memory > 0){
                  this.disableSquare = false;
                  this.opacity = "";
                }else{
                  this.disableSquare = true;
                  this.opacity = "lowerOpacity";
                }
                this.history.push(`${toHistory} = ${calculated}`);
            },
            nr9: function (evt) {
              this.memory = "";
              this.result += "9";
            },
            nr8: function (evt) {
                this.memory = "";
                this.result += "8"
            },
            nr7: function (evt) {
                this.memory = "";
                this.result += "7"
            },
            nr6: function (evt) {
                this.memory = "";
                this.result += "6"
            },
            nr5: function (evt) {
                this.memory = "";
                this.result += "5"
            },
            nr4: function (evt) {
                this.memory = "";
                this.result += "4"
            },
            nr3: function (evt) {
                this.memory = "";
                this.result += "3"
            },
            nr2: function (evt) {
                this.memory = "";
                this.result += "2"
            },
            nr1: function (evt) {
                this.memory = "";
                this.result += "1"
            },
            nr0: function (evt) {
                this.memory = "";
                this.result += "0"
            },

        },



    })

});
