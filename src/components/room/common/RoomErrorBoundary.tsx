import { ErrorBoundary } from "react-error-boundary";

const RoomErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <p>Oops! Something went wrong...</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default RoomErrorBoundary;
