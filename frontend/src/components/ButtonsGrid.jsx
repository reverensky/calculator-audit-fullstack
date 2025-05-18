import calculatorButtons from "../store/calculatorButtons.js";
import ACTIONS from "../store/actions.js";
import { Button } from "../ui/Button.jsx";
import clsx from "clsx";
import { useTheme } from "../theme/ThemeContext.jsx";
import { trackEvent } from "../services/trackCalculatorEvent.js";

const getButtonBgColor = (button, theme = "light") => {
  if (button.type === "OPERAND") return "#F1A33B";
  if (button.label === "=") return "#3B82F6";
  if (button.label === "AC" || button.label === "%") return "#A5A5A5";
  return theme === "dark" ? "#333333" : "#D1D5DB";
};

const getActionType = (button) => {
  switch (button.type) {
    case "ACTION":
      return button.action;
    case "OPERAND":
      return ACTIONS.CHOOSE_OPERATION;
    default:
      return ACTIONS.ADD_DIGIT;
  }
};

const getPayload = (button) => {
  if (button.type === "DIGIT") return { digit: button.label };
  return { operation: button.label };
};

export const ButtonsGrid = ({ dispatch }) => {
  const { theme } = useTheme();

  const handleClick = (button) => {
    dispatch({
      type: getActionType(button),
      payload: getPayload(button),
    });
    trackEvent({
      action: getActionType(button),
      value: button.label,
    });
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {calculatorButtons.map((button, index) => (
        <Button
          key={index}
          style={{ backgroundColor: getButtonBgColor(button, theme) }}
          className={clsx(button.className)}
          onClick={() => handleClick(button)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
