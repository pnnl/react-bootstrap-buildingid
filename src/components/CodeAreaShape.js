import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import Microsoft from '@pnnl/react-bingmaps'

const CodeAreaShape = ({
  codeArea,
  ...props
}) => {
  const _codeArea = [
    { latitude: codeArea.latitudeLo, longitude: codeArea.longitudeLo, },
    { latitude: codeArea.latitudeHi, longitude: codeArea.longitudeLo, },
    { latitude: codeArea.latitudeHi, longitude: codeArea.longitudeHi, },
    { latitude: codeArea.latitudeLo, longitude: codeArea.longitudeHi, },
    { latitude: codeArea.latitudeLo, longitude: codeArea.longitudeLo, },
  ];

  const _codeArea_centerOfMass = [
    { latitude: codeArea.centerOfMass.latitudeLo, longitude: codeArea.centerOfMass.longitudeLo, },
    { latitude: codeArea.centerOfMass.latitudeHi, longitude: codeArea.centerOfMass.longitudeLo, },
    { latitude: codeArea.centerOfMass.latitudeHi, longitude: codeArea.centerOfMass.longitudeHi, },
    { latitude: codeArea.centerOfMass.latitudeLo, longitude: codeArea.centerOfMass.longitudeHi, },
    { latitude: codeArea.centerOfMass.latitudeLo, longitude: codeArea.centerOfMass.longitudeLo, },
  ];

  const _codeArea_north = [
    { latitude: codeArea.centerOfMass.latitudeHi, longitude: codeArea.centerOfMass.longitudeCenter, },
    { latitude: codeArea.latitudeHi, longitude: codeArea.centerOfMass.longitudeCenter, },
  ];
  const _codeArea_north_isEqual = codeArea.centerOfMass.latitudeHi === codeArea.latitudeHi;

  const _codeArea_south = [
    { latitude: codeArea.centerOfMass.latitudeLo, longitude: codeArea.centerOfMass.longitudeCenter, },
    { latitude: codeArea.latitudeLo, longitude: codeArea.centerOfMass.longitudeCenter, },
  ];
  const _codeArea_south_isEqual = codeArea.centerOfMass.latitudeLo === codeArea.latitudeLo;

  const _codeArea_east = [
    { latitude: codeArea.centerOfMass.latitudeCenter, longitude: codeArea.centerOfMass.longitudeHi, },
    { latitude: codeArea.centerOfMass.latitudeCenter, longitude: codeArea.longitudeHi, },
  ];
  const _codeArea_east_isEqual = codeArea.centerOfMass.longitudeHi === codeArea.longitudeHi;

  const _codeArea_west = [
    { latitude: codeArea.centerOfMass.latitudeCenter, longitude: codeArea.centerOfMass.longitudeLo, },
    { latitude: codeArea.centerOfMass.latitudeCenter, longitude: codeArea.longitudeLo, },
  ];
  const _codeArea_west_isEqual = codeArea.centerOfMass.longitudeLo === codeArea.longitudeLo;

  return (
    <React.Fragment>
      {
        (_codeArea_north_isEqual && _codeArea_south_isEqual && _codeArea_east_isEqual && _codeArea_west_isEqual) ? (
          <Microsoft.Maps.Polygon rings={[_codeArea_centerOfMass]} {...props} />
        ) : (
          <React.Fragment>
            <Microsoft.Maps.Polygon rings={[_codeArea]} {...props} />
            <Microsoft.Maps.Polyline locations={_codeArea_centerOfMass} {...props} />
          </React.Fragment>
        )
      }
      {
        _codeArea_north_isEqual ? null : (
          <Microsoft.Maps.Polyline locations={_codeArea_north} {...props} />
        )
      }
      {
        _codeArea_south_isEqual ? null : (
          <Microsoft.Maps.Polyline locations={_codeArea_south} {...props} />
        )
      }
      {
        _codeArea_east_isEqual ? null : (
          <Microsoft.Maps.Polyline locations={_codeArea_east} {...props} />
        )
      }
      {
        _codeArea_west_isEqual ? null : (
          <Microsoft.Maps.Polyline locations={_codeArea_west} {...props} />
        )
      }
    </React.Fragment>
  );
}

CodeAreaShape.propTypes = {
  codeArea: PropTypes.instanceOf(UniqueBuildingIdentification.CodeArea).isRequired,
}

CodeAreaShape.defaultProps = {
  codeArea: null,
}

export default React.memo(CodeAreaShape)
