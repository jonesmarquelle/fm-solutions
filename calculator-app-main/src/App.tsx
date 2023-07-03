import { useState } from "react";
import "./App.css";
import NumberedSlider from "./components/NumberedSlider";

type Key = {
  value: any;
  text: string;
  f: (a?: any) => void;
};

enum Operation {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "×",
  DIVIDE = "/",
}

const DELETE = "delete";

function App() {
  const [overwrite, setOverwrite] = useState<boolean>(false);
  const [screen, setScreen] = useState<string[]>([]);
  const [buffer, setBuffer] = useState<number>();
  const [currentOp, setCurrentOp] = useState<Operation>();

  const getFormattedText = () => {
    if (!screen.length) return "0";
    const n = Number.parseFloat(screen.join(""));
    return n.toLocaleString("en-US");
  };

  const addDigit = (n: number) => {
    if (overwrite) {
      setOverwrite(false);
      setScreen([n.toString()]);
      return;
    }

    setScreen([...screen, n.toString()]);
  };

  const addDecimal = () => {
    if (overwrite) {
      delScreen();
      setOverwrite(false);
    }

    if (!screen.length) return;
    setScreen([...screen, "."]);
  };

  const delChar = () => {
    if (overwrite) {
      delScreen();
      setOverwrite(false);
    }

    if (!screen.length) return;
    setScreen(screen.slice(0, -1));
  };

  const delScreen = () => {
    if (!screen.length) return;
    setScreen([]);
  };

  const delBuffer = () => {
    if (buffer === undefined) return;
    setBuffer(undefined);
  };

  const resetCalc = () => {
    delBuffer();
    delScreen();
  };

  const addBinaryOperation = (op: Operation) => {
    if (buffer !== undefined && currentOp !== undefined) {
      setBuffer(evaluate());
      setScreen([buffer.toString()]);
      setOverwrite(true);
    } else {
      setBuffer(getScreenNum(screen));
      delScreen();
    }
    setCurrentOp(op);
  };

  const doBinaryOperation = (op: Operation, a: number, b: number) => {
    setCurrentOp(undefined);
    switch (op) {
      case Operation.ADD:
        return a + b;
      case Operation.SUBTRACT:
        return a - b;
      case Operation.MULTIPLY:
        return a * b;
      case Operation.DIVIDE:
        try {
          return a / b;
        } catch (error) {
          return NaN;
        }
    }
  };

  const doEquals = () => {
    if (buffer === undefined || screen === undefined) return;
    const result = evaluate();
    delBuffer();
    setScreen([result!.toString()]);
    setOverwrite(true);
  };

  const getScreenNum = (screen: string[]) => {
    return Number.parseFloat(screen.join(""));
  };

  const evaluate = () => {
    if (currentOp === undefined) return;
    if (buffer === undefined) return;
    return doBinaryOperation(currentOp, buffer, getScreenNum(screen));
  };

  const buttons: Key[] = [
    7,
    8,
    9,
    DELETE,
    4,
    5,
    6,
    "+",
    1,
    2,
    3,
    "-",
    ".",
    0,
    "/",
    "×",
  ].map((v) => {
    if (Number.isInteger(v)) {
      return {
        value: v,
        text: v.toString(),
        f: addDigit,
      };
    }
    switch (v) {
      case DELETE:
        return {
          value: DELETE,
          text: "DEL",
          f: delChar,
        };
      case ".":
        return {
          value: "DEC",
          text: ".",
          f: addDecimal,
        };
      default:
        return {
          value: v,
          text: v.toString(),
          f: addBinaryOperation,
        };
    }
  });

  const [theme, setTheme] = useState<number>(0);
  const themes = ["theme-main", "theme-secondary", "theme-tertiary"];

  return (
    <>
      <div id="bg" className={themes[theme]}>
        <div id="calculator">
          <div className={`title-bar`}>
            <div className="title">calc</div>
            <div className="theme-label">THEME</div>
            <NumberedSlider
              ticks={3}
              defaultVal={theme}
              onSliderChange={(v) => {
                setTheme(v);
              }}
            />
          </div>

          <div className="screen">{getFormattedText()}</div>

          <div className="button-grid">
            {buttons.map((key) => (
              <button
                className={key.value === DELETE ? "del-button" : "button"}
                key={key.text}
                onClick={() => key.f(key.value)}
              >
                {key.text}
              </button>
            ))}
            <button className="reset-button" onClick={resetCalc}>
              RESET
            </button>
            <button className="equal-button" onClick={doEquals}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
