import ACTIONS from "../store/actions.js";

// DIGIT has default action of ADD_DIGIT
// OPERAND has default action of ADD_OPERAND
export default [
    { type: 'PROCESS', label: "AC", className: "col-span-2 w-auto", action: ACTIONS.CLEAR }, 
    { type: 'OPERAND', label: "%" }, 
    { type: 'OPERAND', label: "/" },
    { type: 'DIGIT', label: 7 }, 
    { type: 'DIGIT', label: 8 }, 
    { type: 'DIGIT', label: 9 }, 
    { type: 'OPERAND', label: "*" }, 

    { type: 'DIGIT', label: 4 }, 
    { type: 'DIGIT', label: 5 }, 
    { type: 'DIGIT', label: 6 }, 
    { type: 'OPERAND', label: "-" }, 

    { type: 'DIGIT', label: 1 }, 
    { type: 'DIGIT', label: 2 }, 
    { type: 'DIGIT', label: 3 }, 
    { type: 'OPERAND', label: "+" }, 

    { type: 'DIGIT', label: "0", className: "col-span-2 w-auto" }, 
    { type: 'DIGIT', label: "." }, 
    { type: 'PROCESS', label: "=", action: ACTIONS.EVALUATE },
]

{/* <Button
          variant="gray"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="col-span-2 w-auto"
        >
          AC
        </Button> */}