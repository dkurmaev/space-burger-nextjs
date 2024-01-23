export default function InfoBox({ children }) {
  return (
    <div className="text-center bg-rot-300 p-4 rounded-lg border-2 border-rot-400">
      {children}
    </div>
  );
}