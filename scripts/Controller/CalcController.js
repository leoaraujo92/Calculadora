class CalcController {


    constructor(){
        this._operation = []
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")
        this._displayCalc = 0
        this._currentDate
        this.initialize()
        this.initButtonsEvents()
    }





    // METODO PRINCIPAL DO CÓDIGO TUDO QUE QUERO QUE ACONTEÇA ASSIM QUE INICIAR A CALCULADORA
    initialize(){

       

        this.displayDate = this.currentDate.toLocaleDateString("pt-br")
        this.displayTime = this.currentDate.toLocaleTimeString("pt-br")

        setInterval(()=>{
            this.displayDate = this.currentDate.toLocaleDateString("pt-br")
            this.displayTime = this.currentDate.toLocaleTimeString("pt-br")
        }, 1000)

        this.setLastNumberToDisplay()
    }

    //MULTIPLOS EVENTOS
   /* addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false)
        })

    }*/



    clearAll(){

        this._operation = []
        this.setLastNumberToDisplay()

    }

    
    clearEntry(){

        this._operation.pop()
        this.setLastNumberToDisplay()
    }

    setError(){
        this.displayCalc = "Error"
    }

    getLastOperation(){ //PEGANDO A ÚLTIMA POSIÇÃO DO ARRAY

        return this._operation[this._operation.length -1]

    }

    isOperator(value){

        return (['+', '-', '*', '%', '/', '.'].indexOf(value) > -1)
        
    }




    calc(){

        let last = this._operation.pop()
        let result = eval(this._operation.join(""))


        if (last == "%"){

            result = result / 100
            this._operation = [result]

        } else {

            this._operation = [result, last]

        }



        this.setLastNumberToDisplay()

    }




    pushOperation(value){

        this._operation.push(value)

        if(this._operation.length > 3){


            this.calc()
            
        }

    }

    
    setLastNumberToDisplay(){

        let lastNumber;

        for (let i = this._operation.length -1; i >= 0; i--){

            if (!this.isOperator(this._operation[i])){

                lastNumber = this._operation[i]
                break;

            }
        }            

        if (!lastNumber) lastNumber = 0
        this.displayCalc = lastNumber
    }

    addOperation(value){

        console.log("Este valor que acabou de entrar " + value)

        if (isNaN(this.getLastOperation())){

            //TRUE IS STRING
            if (this.isOperator(value)) {

                //console.log("Inserindo valor")
                this._operation[this._operation.length  - 1] = value

            } else if(isNaN(value)) {

                //outra coisa
                //console.log(value)
                
            } else {

                console.log("Inserindo número " + value)
                this.pushOperation(value)
                this.setLastNumberToDisplay()
            }


        } else {
            
            if(this.isOperator(value)){

                this.pushOperation(value)

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this._operation[this._operation.length -1] = parseInt(newValue)

                this.setLastNumberToDisplay()
            }
            

        }

    }



    execBtn(value){

        switch (value){
            case 'ac':
                this.clearAll()
                break

            case 'ce':
                this.clearEntry()
                break

            case 'soma':
                this.addOperation("+")
                break

            case 'subtracao':
                this.addOperation("-")
                break

            case 'multiplicacao':
                this.addOperation("*")
                break

            case 'divisao':
                this.addOperation("/")
                break

            case 'porcento':
                this.addOperation("%")
                break

            case 'igual':
                
                break

            case 'ponto':
                this.addOperation(".")
                break

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value))
            break

            default:
                this.setError()
                break


        }

    }


    //EVENTOS DOS BOTÕES DA CALCULADORA
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g")


        buttons.forEach(btn =>{

            btn.addEventListener("mouseover",  e =>{

                btn.style.cursor = "pointer"
                
            })


            btn.addEventListener("click",  e =>{

                let textBtn = btn.className.baseVal.replace("btn-", "")


                this.execBtn(textBtn)
                
            })

            
        })
        

    }
    //--------------------------------------------------------------------------


    //GETERS AND SETTERS
    get displayTime(){
        return this._timeEl.innerHTML
     }

     set displayTime(value){
        this._timeEl.innerHTML= value
    }

     get displayDate(){
        return this._dateEl.innerHTML
     }

     set displayDate(value){
        this._dateEl.innerHTML = value
    }

    get displayCalc(){
       return this._displayCalc
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
     }
 
     set currentDate(value){
         this._currentDate = value
     }
    //----------------------------------------------------------------------------
}   