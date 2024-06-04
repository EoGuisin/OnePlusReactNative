import React, {memo} from 'react';
import MapboxGL from '@rnmapbox/maps';

interface Props {
  positions: number[][];
  index: number;
}

function ShapeSourceMap(props: Props) {
  return (
    <MapboxGL.ShapeSource
    shape={{
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            scalerank: null,
            featureclass: 'WGS84 bounding box',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [props.positions],
          },
        },
      ],
    }}>
    </MapboxGL.ShapeSource>
  );
}

export const ShapeSource = memo(ShapeSourceMap);
