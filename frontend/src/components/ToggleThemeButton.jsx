import { FaSun, FaMoon } from "react-icons/fa";

export const ToggleThemeButton = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: theme === "dark" ? "#222" : "#eee",
        border: theme === "dark" ? "2px solid #444" : "2px solid #ccc",
        borderRadius: "999px",
        padding: "4px",
        width: "48px",
        height: "28px",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        position: "relative",
        marginRight: "auto",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: theme === "dark" ? "#111" : "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          position: "absolute",
          left: theme === "dark" ? "24px" : "4px",
          transition: "left 0.3s, background 0.3s",
          fontSize: "14px",
          color: theme === "dark" ? "#ffd700" : "#333",
        }}
      >
        {theme === "dark" ? <FaMoon color="#fff"/> : <FaSun color="#000"/>}
      </span>
    </button>
  );
};