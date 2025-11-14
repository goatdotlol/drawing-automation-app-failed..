import { ReactNode } from "react";

interface MainAreaProps {
  children: ReactNode;
}

export default function MainArea({ children }: MainAreaProps) {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-discord-darker">
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

