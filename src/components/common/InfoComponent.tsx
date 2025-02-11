import React, { useEffect, useRef } from 'react';
import { useViewStore } from '@/context/useViewerStore';
import config from '@data/navbar_btn_content.json';  // import config file

interface InfoComponentProps {
  onClose: () => void;
  isCredits: boolean;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ onClose, isCredits }) => {
  const { isRotating, toggleRotation } = useViewStore();
  const initialRotationState = useRef<boolean>(isRotating);

  useEffect(() => {
    if (isRotating) {
      toggleRotation(false);
    }

    return () => {
      if (initialRotationState.current) {
        toggleRotation(initialRotationState.current);
      }
    };
  }, [toggleRotation]);

  const { title, containerStyles, titleStyles, content } = isCredits
    ? config.credits
    : config.info;

  return (
    <div className="z-20 absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 mb-16">
      <main className={`w-full max-w-5xl ${containerStyles} bg-opacity-90 p-8 rounded-md shadow-md text-white overflow-auto max-h-full border-4`}>
        <header className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold mb-4 ${titleStyles} text-justify lg:text-center`} dangerouslySetInnerHTML={{ __html: title }} />
        </header>
        <article>
          <section dangerouslySetInnerHTML={{ __html: content }} />
        </article>
        <footer className="flex justify-center mt-6">
          <button
            id="explore-button"
            className="btn-77 mb-8"
            onClick={onClose}
          >
            Esplora
          </button>
        </footer>
      </main>
    </div>
  );
};

export default InfoComponent;
