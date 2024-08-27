import { useState } from "react";
import { Toaster } from "react-hot-toast";
import RootRouter from "./routes";

const App = () => {
  const [mode, /*setmode*/] = useState<"" | "dark">("");
  // const handleModeChange = useCallback(() => {
  //   setmode(prev => prev === "dark" ? "" : "dark")
  //  }, [mode])
  
  return (
    <div className={mode}>
      <div className="bg-background-50 h-svh px-20 py-4">
        {/* <Button variant="primary" onClick={handleModeChange}>{mode === "dark" ? "light" : "dark"}</Button> */}
        <RootRouter />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  )
}

export default App
