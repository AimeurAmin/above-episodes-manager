import { useCallback, useState } from "react"
import Button from "./components/button"
import Typography from "./components/typography"
import { useListEpisodesQuery } from "./api/episodes";
import useDebounce from "./hooks/use-debounce";

const App = () => {
  const [mode, setmode] = useState<"" | "dark">("");

  const handleModeChange = useCallback(() => {
   setmode(prev => prev === "dark" ? "" : "dark")
  }, [mode])

  const { debouncedSearch, updateDebounce } = useDebounce<string>("");

  const { data } = useListEpisodesQuery(debouncedSearch);

  console.log(data);
  
  return (
    <div className={mode}>
      <div className="bg-background-50 h-svh px-20 py-4">
        <input className="my-4" onChange={(e) => updateDebounce(e.target.value)} />
        <div className="flex-row space-x-3">
          <Button variant="primary" onClick={handleModeChange}>{mode === "dark" ? "light" : "dark"}</Button>
          <Button variant="secondary" onClick={handleModeChange}>Secondary button</Button>
        </div>
        <Typography className="text-xl font-bold">Primary</Typography>
        <Typography variant="secondary">Secondary</Typography>
      </div>
    </div>
  )
}

export default App
