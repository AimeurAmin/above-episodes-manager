import { useCallback, useState } from "react";
import Button from "./components/button";
import RootRouter from "./routes";

const App = () => {
  const [mode, setmode] = useState<"" | "dark">("");
  const handleModeChange = useCallback(() => {
    setmode(prev => prev === "dark" ? "" : "dark")
   }, [mode])
  
  return (
    <div className={mode}>
      <div className="bg-background-50 h-svh px-20 py-4">
        <Button variant="primary" onClick={handleModeChange}>{mode === "dark" ? "light" : "dark"}</Button>
        <RootRouter />
      </div>
    </div>
  )
}

export default App
