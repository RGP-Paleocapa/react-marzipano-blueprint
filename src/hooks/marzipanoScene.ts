import Marzipano, { Viewer } from 'marzipano';
import { AppData } from '@/types/marzipano-types';

export const createScene = (viewer: Viewer, data: AppData['scenes'][0]) => {
  const source = Marzipano.ImageUrlSource.fromString(
    `./assets/tiles/${data.id}/{z}/{f}/{y}/{x}.jpg`,
    { cubeMapPreviewUrl: `./assets/tiles/${data.id}/preview.jpg` }
  );

  const levels = data.levels;
  const faceSize = data.faceSize;
  const geometry = new Marzipano.CubeGeometry(levels);
  const limiter = Marzipano.RectilinearView.limit.traditional(faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
  const view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

  const scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });

  return scene;
};
