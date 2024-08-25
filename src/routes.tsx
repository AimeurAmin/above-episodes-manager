import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import EpisodeDetails from "./pages/episodes/episode-details";
import EpisodesList from "./pages/episodes";

const RootRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<EpisodesList />} />
        <Route path=":id" element={<EpisodeDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RootRouter;