import ACTIONS from "../store/actions.js";

// Utility function to perform calculation
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  switch (operation) {
    case "+":
      return (prev + current).toString();
    case "-":
      return (prev - current).toString();
    case "*":
      return (prev * current).toString();
    case "/":
      return current === 0 ? "Error" : (prev / current).toString();
    default:
      return "";
  }
}

// Initial state for the calculator
const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

function handleAddDigit(state, payload) {
  if (state.overwrite) {
    return {
      ...state,
      currentOperand: payload.digit,
      overwrite: false,
    };
  }
  if (payload.digit === "0" && state.currentOperand === "0") return state;
  if (payload.digit === "." && state.currentOperand?.includes(".")) return state;
  return {
    ...state,
    currentOperand: `${state.currentOperand || ""}${payload.digit}`,
  };
}

function handleChooseOperation(state, payload) {
  if (!state.currentOperand && !state.previousOperand) return state;
  if (!state.currentOperand) {
    return {
      ...state,
      operation: payload.operation,
    };
  }
  if (!state.previousOperand) {
    return {
      ...state,
      operation: payload.operation,
      previousOperand: state.currentOperand,
      currentOperand: null,
    };
  }
  return {
    ...state,
    previousOperand: evaluate(state),
    operation: payload.operation,
    currentOperand: null,
  };
}

function handleClear() {
  return { ...initialState };
}

function handleDeleteDigit(state) {
  if (state.overwrite) {
    return { ...state, overwrite: false, currentOperand: null };
  }
  if (!state.currentOperand) return state;
  if (state.currentOperand.length === 1) {
    return { ...state, currentOperand: null };
  }
  return {
    ...state,
    currentOperand: state.currentOperand.slice(0, -1),
  };
}

function handleEvaluate(state) {
  if (
    !state.operation ||
    !state.currentOperand ||
    !state.previousOperand
  ) {
    return state;
  }
  return {
    ...state,
    overwrite: true,
    previousOperand: null,
    operation: null,
    currentOperand: evaluate(state),
  };
}

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return handleAddDigit(state, payload);
    case ACTIONS.CHOOSE_OPERATION:
      return handleChooseOperation(state, payload);
    case ACTIONS.CLEAR:
      return handleClear();
    case ACTIONS.DELETE_DIGIT:
      return handleDeleteDigit(state);
    case ACTIONS.EVALUATE:
      return handleEvaluate(state);
    default:
      return state;
  }
}