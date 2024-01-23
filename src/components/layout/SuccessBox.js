export default function SuccessBox({ children }) {
    return (
      <div className="text-center bg-orange-300 p-4 rounded-lg border-2 border-orange-400">
        {children}
      </div>
    );
}