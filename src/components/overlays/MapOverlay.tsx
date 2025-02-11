import { useState, useEffect } from 'react';
import map from '@/assets/images/image.jpeg';
import Dot from '../hotspots/Dot';
import { useViewStore } from '@/context/useViewerStore';
import dot from '@data/map_dot_locations.json';

const MapOverlay = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isFullScreen) {
      setIsAnimating(true);
    }
  }, [isFullScreen]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const closeFullScreen = (withAnimation = true) => {
    if (!withAnimation) {
      setIsAnimating(false);
    }
    setIsFullScreen(false);
  };

  // Example array of dot positions (in percentages) with index
  const dotPositions = dot; // imported from data/map_dot_location.config

  const { mapEnabled } = useViewStore();
  if (!mapEnabled) { return null;}

  return (
    <div>
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" onClick={() => closeFullScreen(true)}></div>
      )}
      <div
        className={`z-10 rounded-lg cursor-pointer max-w-full max-h-full ${
          isFullScreen ? 'fixed inset-0 m-auto flex items-center justify-center w-full h-full' : 'absolute bottom-20 right-0 lg:bottom-20 lg:right-6 w-auto lg:w-[250px]'
        } ${isAnimating ? 'transition-all duration-300 ease-in-out' : ''}`}
        onClick={!isFullScreen ? toggleFullScreen : undefined}
      >
        <div className={`relative w-fit h-fit bg-blue-600 ${isFullScreen ? 'rounded-none' : 'rounded-3xl'} ${isAnimating ? 'transition-transform transform' : ''} ${!isFullScreen ? 'hover:scale-105' : ''}`}>
          <img
            src={map}
            alt="Map"
            className={`w-full h-full object-contain ${!isFullScreen ? 'hover:opacity-75 rounded-inherit bg-transparent hidden lg:block' : 'rounded-3xl'}`}
            style={{ borderRadius: isFullScreen ? '0' : 'inherit' }}
          />
          <button
            className={`px-6 py-3 text-sm ${isFullScreen ? 'hidden' : 'lg:hidden'}`}
          >
            Apri mappa
          </button>
          {isFullScreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFullScreen();
              }}
              className="absolute invisible lg:visible top-5 right-5 mt-2 mr-2 cursor-pointer bg-red-700 text-white w-12 h-12 border-2 rounded-lg shadow-lg"
            >
              X
            </button>
          )}
          {dotPositions.map(({ index, x, y, roomIndexes }) => (
            <Dot
              key={index}
              index={index}
              x={x}
              y={y}
              closeFullScreen={() => closeFullScreen(false)} // Disable animation when a dot is clicked
              toggleFullScreen={toggleFullScreen}
              isFullScreen={isFullScreen}
              roomIndexes={roomIndexes}
            />
          ))}
        </div>
        {isFullScreen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeFullScreen();
            }}
            className="fixed lg:hidden top-5 right-5 mt-24 lg:mt-2 mr-2 cursor-pointer bg-red-700 text-white w-12 h-12 border-2 rounded-lg shadow-lg z-20 animate-pulse"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default MapOverlay;
