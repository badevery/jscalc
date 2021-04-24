const numpad = document.querySelectorAll("[data-number]")
const allClear = document.querySelector("[data-AC]")
const del = document.querySelector("[data-delete]")
const eq = document.querySelector("[data-equals]")
const opor = document.querySelectorAll("[data-operation]")
const pOperand = document.querySelector("[data-previous-operand]")
const cOperand = document.querySelector("[data-current-operand]")
class Calc{
     constructor(pOperandTxtElmnt,cOperandTxtElmnt){
        this.pOperandTxtElmnt = pOperandTxtElmnt
        this.cOperandTxtElmnt = cOperandTxtElmnt
        this.clear()
     }
     clear(){
        console.log("this works")
        this.prevOperand = ""
        this.currentOperand = ""
     }
     delete(){
         
    }
    compute(){
         let computation
         const prev = parseFloat(this.prevOperand)
         const current = parseFloat(this.currentOperand)
         switch(this.operation){
            case "+":
               computation = prev+current
               break
            case "-":
                  computation = prev-current
                  break
            case "*":
                     computation = prev*current
                     break
            case "/":
               computation = prev/current
               break
               default:
                  return
            
                     
         }
         this.currentOperand = computation
         this.operation = undefined
         this.prevOperand = ""

    }
    updateDisp(){
        this.cOperandTxtElmnt.innerText = this.getDisplayNumber(this.currentOperand)
        this.pOperandTxtElmnt.innerText = this.prevOperand
    }
    addNum(num){
        if(num==="."&&this.currentOperand.includes(".")){
                return
        }
         console.log(num)
         this.currentOperand+=num.toString()
    }
    setOperation(operation){
       if(this.currentOperand===""){
         return
       }
       if(this.prevOperand!==""){
          this.compute()
       }
       this.operation = operation
       this.prevOperand = this.currentOperand
       this.currentOperand = ""
    }
    getDisplayNumber(number){
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if(isNaN(integerDigits)){
          integerDisplay = ''
      } else {
          integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
      }
      if(decimalDigits != null){
          return `${integerDisplay}.${decimalDigits}`
      } else {
          return integerDisplay
      }

  }


 }
 const calc = new Calc(pOperand,cOperand)
 allClear.addEventListener("click",()=>{
     calc.clear()
    calc.updateDisp() 
 })
 numpad.forEach(button=>{
     button.addEventListener("click",()=>{
        calc.addNum(button.innerText)
       calc.updateDisp()})
 })
 opor.forEach(button=>{
    button.addEventListener("click",()=>{
      calc.setOperation(button.innerText)
      calc.updateDisp()
    })})
    eq.addEventListener("click",()=>{
      calc.compute()
     calc.updateDisp() 
  })