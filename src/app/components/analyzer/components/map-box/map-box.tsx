import { useCallback, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map-box.css';
import { ControlPosition, FullscreenControl, GeolocateControl, Map, MapLayerMouseEvent, Marker, NavigationControl, useControl } from 'react-map-gl/maplibre';
import MapBoxDraw from '@mapbox/mapbox-gl-draw';
import { MapContextValue } from 'react-map-gl/dist/esm/components/map';

const MAP_STYLE_URL = "https://api.maptiler.com/maps/streets/style.json?key=QawikB7KNjfTnEh0nljM";



/******************** Draw Control ********************/

type DrawControlProps = ConstructorParameters<typeof MapBoxDraw>[0] & {
  position?: ControlPosition;
};
type Listener = (event?: any) => any;
function MapDrawControl(props: DrawControlProps & {onCreate?: Listener, onUpdate?: Listener, onDelete?: Listener}) {
  useControl<MapBoxDraw>(
    () => new MapBoxDraw(props),
    ({map}: MapContextValue) => {
      if(props.onCreate) map.on('draw.create', props.onCreate);
      if(props.onUpdate) map.on('draw.update', props.onUpdate);
      if(props.onDelete) map.on('draw.delete', props.onDelete);
    },
    ({map}: MapContextValue) => {
      if(props.onCreate) map.off('draw.create', props.onCreate);
      if(props.onUpdate) map.off('draw.update', props.onUpdate);
      if(props.onDelete) map.off('draw.delete', props.onDelete);
    },
    { position: props.position }
  );
  return null;
}

/*********************************************************/


/******************** Marker ********************/
function MapBoxMarker({longitude, latitude}: {longitude: number, latitude: number}) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom"></Marker>
  )
}
/*********************************************************/


/******************** Map ********************/
export function MapBox() {
  const [cursor, setCursor] = useState<string>('auto');
  const [positions, setPositions] = useState<{longitude: number, latitude: number}[]>([]);

  const addPosition = useCallback((longitude: number, latitude: number) => {
    setPositions([...positions, {latitude, longitude}])
  }, [])

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);
  const onClick = useCallback((event: MapLayerMouseEvent) => {
    console.log(event);
    const pos = event.lngLat
    if(pos) {
      setPositions((ps) => ([...ps, {latitude: pos.lat, longitude: pos.lng}]));

    }
  }, []);

  const onCreate = useCallback((event: any) => {
    console.log(event);
  }, [])

  const onUpdate = useCallback((event: any) => {
    console.log(event);
  }, [])

  const onRemove = useCallback((event: any) => {
    console.log(event);
  }, [])

  return (
    <div className='map-box'>
      <Map
        mapStyle={MAP_STYLE_URL}
        cursor={cursor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <MapDrawControl
          displayControlsDefault={false}
          controls={{
            line_string: true
          }}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onRemove}
        />
        {positions.map((position) => <MapBoxMarker latitude={position.latitude} longitude={position.longitude}/>)}
      </Map>
    </div>
  )
}
/*********************************************************/