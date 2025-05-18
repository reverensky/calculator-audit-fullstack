import { useReducer } from "react";
import { useTheme } from "../theme/ThemeContext.jsx";

import { Card } from "../ui/Card.jsx";
import { reducer } from "../store/reducer.js";
import { ButtonsGrid } from "../components/ButtonsGrid.jsx";
import { ToggleThemeButton } from "../components/ToggleThemeButton.jsx";

export default function Calculator() {
  const [{ result, expression, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center w-screen h-screen shadow-md`}
      >
        <Card id="calculator-card" className="max-w-[320px] max-h-[550px] w-full h-full">
          <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
          <div
            className="text-right min-h-[40px] text-gray-400 w-full flex-1 align-text-bottom"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              overflowX: "auto",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
            }}
          >
            {expression || ""} {operation || ""}
          </div>
          <div
            className="text-right min-h-[60px] mb-4 w-full"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              overflowX: "auto",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
            }}
          >
            {result || ""}
          </div>
          <ButtonsGrid dispatch={dispatch} />
        </Card>
      </div>
    </>
  );
}
