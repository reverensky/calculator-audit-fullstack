import { ACTIONS } from "../store/actions.js";

function roundTo(num, decimals = 12) {
  return Number(Math.round(num + "e" + decimals) + "e-" + decimals);
}

function preprocessUnaryMinus(tokens) {
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (
      t === "-" &&
      (i === 0 || ["+", "-", "*", "/", "("].includes(tokens[i - 1]))
    ) {
      // Unary minus detected, merge with next token
      if (i + 1 < tokens.length) {
        result.push("-" + tokens[i + 1]);
        i++; // Skip next token because merged
      } else {
        // No number after unary minus => error
        return null;
      }
    } else {
      result.push(t);
    }
  }
  return result;
}

function evaluateExpression(input) {
  if (!input) return 0;
  const sanitized = input.trim();

  const tokenRegex = /[+\-*/()]|\d+\.?\d*(e[+-]?\d+)?/gi;
  let tokens = sanitized.match(tokenRegex);
  if (!tokens) return "Error";

  tokens = preprocessUnaryMinus(tokens);
  if (!tokens) return "Error";

  // Now your existing logic on tokens
  let reduced = [];
  let i = 0;
  while (i < tokens.length) {
    let t = tokens[i];
    if ((t === "*" || t === "/") && reduced.length) {
      const prev = reduced.pop();
      const next = tokens[++i];
      const val = parseFloat(prev);
      const num = parseFloat(next);
      if (isNaN(val) || isNaN(num)) return "Error";
      const res = t === "*" ? val * num : num === 0 ? NaN : val / num;
      if (isNaN(res)) return "Error";
      reduced.push(String(res));
    } else {
      reduced.push(t);
    }
    i++;
  }

  let result = parseFloat(reduced[0]);
  if (isNaN(result)) return "Error";
  for (let j = 1; j < reduced.length; j += 2) {
    const op = reduced[j];
    const num = parseFloat(reduced[j + 1]);
    if (isNaN(num)) return "Error";
    result = op === "+" ? result + num : result - num;
  }

  return roundTo(result, 12);
}

// Initial state for the calculator
const initialState = {
  expression: null,
  result: null,
  currentOperand: null,
  operation: null,
  overwrite: false,
};

// Add digit logic
function handleAddDigit(state, payload) {
  if (state.overwrite) {
    return {
      expression: payload.digit,
      operation: null,
      currentOperand: payload.digit,
      overwrite: false,
    };
  }
  if (payload.digit === "0" && state.currentOperand === "0") return state;
  if (state.currentOperand === "0" && payload.digit !== ".") {
    return {
      ...state,
      currentOperand: payload.digit,
      expression: `${state.expression?.slice(0, -1) || ""}${payload.digit}`,
    };
  }
  if (
    payload.digit === "." &&
    (state.currentOperand?.includes(".") || !state.currentOperand)
  )
    return state;
  if (state.operation) {
    return {
      ...state,
      expression: `${state.expression || ""} ${state.operation || ""} ${
        payload.digit
      }`,
      currentOperand: payload.digit,
      operation: null,
    };
  }
  return {
    ...state,
    expression: `${state.expression || ""}${payload.digit}`,
    currentOperand: `${state.currentOperand || ""}${payload.digit}`,
  };
}

// Choose operation without evaluating
function handleChooseOperation(state, payload) {
  if (state.overwrite) {
    return {
      expression: state.result,
      currentOperand: null,
      operation: payload.operation,
      overwrite: false,
      result: null,
    };
  }
  if (!state.expression && payload.operation !== "-") return state;

  if (!state.expression && payload.operation === "-") {
    return {
      ...state,
      expression: "-",
      currentOperand: "-",
      operation: null,
      overwrite: false,
    };
  }

  if (state.currentOperand == "-") {
    return state;
  }

  if (state.operation === payload.operation) return state;

  // if(state.operation && payload.operation == "-" && !state.currentOperand) {
  //   return {
  //     ...state,
  //     expression: `${state.expression || ""} ${state.operation || ""} -`,
  //     currentOperand: "-",
  //   };
  // }

  if (state.currentOperand) {
    return {
      ...state,
      operation: payload.operation,
      currentOperand: null,
    };
  }

  // state.operation should be there
  return {
    ...state,
    operation: payload.operation,
  };
}

// Clear calculator
function handleClear() {
  return { ...initialState };
}

// Delete last digit
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

// Evaluate only when "=" is pressed
function handleEvaluate(state) {
  if (!state.expression) {
    return state;
  }
  return {
    ...state,
    overwrite: true,
    currentOperand: null,
    operation: null,
    result: evaluateExpression(state.expression).toString(),
  };
}

// Main reducer
export function reducer(state = initialState, { type, payload }) {
  console.log("Reducer called with type:", type);
  console.log("Reducer called with payload:", payload);

  if (state.result === "Error" && type !== ACTIONS.ADD_DIGIT && type !== ACTIONS.CLEAR) {
    return state;
  }

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
