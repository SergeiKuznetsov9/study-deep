import { Suspense, useState } from "react";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/AppRouter";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import "shared/config/i18n/i18n";
import { Modal } from "shared/ui/Modal/Modal";

export const App = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback={""}>
        <Navbar />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,
            maiores cumque? Nemo voluptatem libero error ipsa accusantium, quod
            obcaecati culpa et eos similique, necessitatibus adipisci nesciunt.
            Soluta quis ad voluptatum.
          </div>
        </Modal>
        <button onClick={() => setIsOpen(true)}>Toggle</button>
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
