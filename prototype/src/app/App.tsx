import { InteractiveMockup } from "./components/InteractiveMockup";

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="relative" style={{ width: 540, height: 1170 }}>
        <InteractiveMockup />
      </div>
    </div>
  );
}
