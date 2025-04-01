import { DateTime } from "luxon";
import { SubComponent } from "./SubComponent";

export function App() {
  return (
    <>
      <SubComponent />
      {DateTime.now()}
    </>
  );
}
