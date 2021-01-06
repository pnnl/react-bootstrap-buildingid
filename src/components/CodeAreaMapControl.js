import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import Microsoft from '@pnnl/react-bingmaps'

import CodeAreaShape from './CodeAreaShape';

const CodeAreaMapControl = ({
  codeArea,
  isEditing,
  onChange,
  onEditChange,
  ...props
}) => {
  const codeAreaBounds = React.useMemo(() => {
    if (codeArea) {
      return {
        center: {
          latitude: (codeArea.latitudeLo + ((codeArea.latitudeHi - codeArea.latitudeLo) / 2)),
          longitude: (codeArea.longitudeLo + ((codeArea.longitudeHi - codeArea.longitudeLo) / 2)),
        },
        height: (codeArea.latitudeHi - codeArea.latitudeLo),
        width: (codeArea.longitudeHi - codeArea.longitudeLo),
      };
    } else {
      return undefined;
    }
  }, [
    codeArea,
  ]);

  const codeAreaRings = React.useMemo(() => {
    if (codeArea) {
      return [
        [
          {
            latitude: codeArea.latitudeLo,
            longitude: codeArea.longitudeLo,
          },
          {
            latitude: codeArea.latitudeHi,
            longitude: codeArea.longitudeLo,
          },
          {
            latitude: codeArea.latitudeHi,
            longitude: codeArea.longitudeHi,
          },
          {
            latitude: codeArea.latitudeLo,
            longitude: codeArea.longitudeHi,
          },
          {
            latitude: codeArea.latitudeLo,
            longitude: codeArea.longitudeLo,
          },
        ],
      ];
    } else {
      return undefined;
    }
  }, [
    codeArea,
  ]);

  const ref = React.useRef(null);

  const api = React.useContext(Microsoft.Maps.ApiContext);

  const handleDrawingModeChanged = (drawingMode) => {
    if (isEditing) {
      if (codeArea && ref.current) {
        ref.current.finish((shape) => {
          if (api && api && api.Maps && api.Maps.SpatialMath && api.Maps.SpatialMath.Geometry) {
            const bounds = api.Maps.SpatialMath.Geometry.bounds(shape);

            const centroid = api.Maps.SpatialMath.Geometry.centroid(shape);

            const southeast = bounds.getSoutheast();
            const northwest = bounds.getNorthwest();

            const code = UniqueBuildingIdentification.v3.encode(southeast.latitude, northwest.longitude, northwest.latitude, southeast.longitude, centroid.latitude, centroid.longitude, codeArea.centerOfMass.codeLength);

            const _codeArea = UniqueBuildingIdentification.v3.decode(code);

            onChange && onChange(_codeArea, code);

            onEditChange && onEditChange(false);
          }
        });
      } else {
        onEditChange && onEditChange(false);
      }
    } else {
      onEditChange && onEditChange(true);
    }
  };

  return (
    <Microsoft.Maps.Map
      bounds={codeAreaBounds}
      disableBirdseye={true}
      disableKeyboardInput={true}
      disableStreetside={true}
      disableStreetsideAutoCoverage={true}
      mapTypeId="aerial"
      showLocateMeButton={false}
    >
      <Microsoft.Maps.Layer visible={!isEditing}>
        {
          codeArea ? (
            <CodeAreaShape codeArea={codeArea} {...props} />
          ) : null
        }
      </Microsoft.Maps.Layer>
      <Microsoft.Maps.DrawingTools.DrawingTools ref={ref}>
        <Microsoft.Maps.DrawingTools.DrawingManager drawingBarActions={['edit']} drawingBarVisible={!!codeArea} drawingMode={isEditing ? 'edit' : 'none'} onDrawingModeChanged={handleDrawingModeChanged}>
          {
            (codeArea && isEditing) ? (
              <Microsoft.Maps.Polygon editable={true} rings={codeAreaRings} {...props} />
            ) : null
          }
        </Microsoft.Maps.DrawingTools.DrawingManager>
      </Microsoft.Maps.DrawingTools.DrawingTools>
    </Microsoft.Maps.Map>
  );
}

CodeAreaMapControl.propTypes = {
  codeArea: PropTypes.instanceOf(UniqueBuildingIdentification.CodeArea),
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onEditChange: PropTypes.func,
}

CodeAreaMapControl.defaultProps = {
  codeArea: undefined,
  isEditing: false,
  onChange: undefined,
  onEditChange: undefined,
}

export default CodeAreaMapControl
