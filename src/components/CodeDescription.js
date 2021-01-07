import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import Microsoft from '@pnnl/react-bingmaps'

const AreaEquation = ({
  area,
  height,
  width,
  ...props
}) => {
  return (
    <span {...props}>{area.toPrecision(6)} <code className="text-muted">=</code> {width.toPrecision(6)} <code className="text-muted">&times;</code> {height.toPrecision(6)}</span>
  );
}

AreaEquation.propTypes = {
  area: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

AreaEquation.defaultProps = {
  area: undefined,
  height: undefined,
  width: undefined,
}

const AreaEquationDescription = ({
  centerLatitude,
  centerLongitude,
  height,
  width,
}) => {
  const locationRect = Microsoft.Maps.useLocationRect({
    center: {
      latitude: centerLatitude,
      longitude: centerLongitude,
    },
    width: width,
    height: height,
  });

  const shape = Microsoft.Maps.SpatialMath.useLocationRectToPolygon(locationRect);

  const area = Microsoft.Maps.SpatialMath.Geometry.useArea(shape, 'SquareMeters');

  const x0 = Microsoft.Maps.useLocation({
    latitude: centerLatitude - (height / 2),
    longitude: centerLongitude - (width / 2),
  });

  const x1 = Microsoft.Maps.useLocation({
    latitude: centerLatitude - (height / 2),
    longitude: centerLongitude + (width / 2),
  });

  const _width = Microsoft.Maps.SpatialMath.Geometry.useDistance(x0, x1, 'Meters');

  const y0 = Microsoft.Maps.useLocation({
    latitude: centerLatitude - (height / 2),
    longitude: centerLongitude - (width / 2),
  });

  const y1 = Microsoft.Maps.useLocation({
    latitude: centerLatitude + (height / 2),
    longitude: centerLongitude - (width / 2),
  });

  const _height = Microsoft.Maps.SpatialMath.Geometry.useDistance(y0, y1, 'Meters');

  if (area && _width && _height) {
    return (
      <React.Fragment>
        <dt className="overflow-auto text-nowrap">Area (m<sup>2</sup>) <span className="font-weight-normal text-muted">=</span> Width (m) <span className="font-weight-normal text-muted">&times;</span> Height (m)</dt>
        <dd className="overflow-auto text-nowrap"><AreaEquation area={area} width={_width} height={_height} /></dd>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <dt className="overflow-auto text-nowrap">Area (deg<sup>2</sup>) <span className="font-weight-normal text-muted">=</span> Width (&deg;) <span className="font-weight-normal text-muted">&times;</span> Height (&deg;)</dt>
        <dd className="overflow-auto text-nowrap"><AreaEquation area={width * height} width={width} height={height} /></dd>
      </React.Fragment>
    );
  }
}

AreaEquationDescription.propTypes = {
  centerLatitude: PropTypes.number.isRequired,
  centerLongitude: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

AreaEquationDescription.defaultProps = {
  centerLatitude: undefined,
  centerLongitude: undefined,
  height: undefined,
  width: undefined,
}

const Location = ({
  latitude,
  longitude,
  ...props
}) => {
  if (latitude > 90) {
    latitude = 90;
  }

  if (latitude < -90) {
    latitude = -90;
  }

  while (longitude > 180) {
    longitude -= 360;
  }

  while (longitude < -180) {
    longitude += 360;
  }

  return (
    <span {...props}>{Math.abs(latitude).toFixed(6)}&deg; {(latitude >= 0) ? 'N' : 'S'}, {Math.abs(longitude).toFixed(6)}&deg; {(longitude >= 0) ? 'E' : 'W'}</span>
  );
}

Location.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
}

Location.defaultProps = {
  latitude: undefined,
  longitude: undefined,
}

const LocationDescription = ({
  label,
  latitude,
  longitude,
}) => {
  return (
    <React.Fragment>
      <dt className="overflow-auto text-nowrap">{label}</dt>
      <dd className="overflow-auto text-nowrap"><Location latitude={latitude} longitude={longitude} /></dd>
    </React.Fragment>
  );
}

LocationDescription.propTypes = {
  label: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
}

LocationDescription.defaultProps = {
  label: 'Center of Mass',
  latitude: undefined,
  longitude: undefined,
}

const LocationRectDescriptionList = ({
  centerLatitude,
  centerLongitude,
  height,
  width,
  ...props
}) => {
  return (
    <dl {...props}>
      <LocationDescription latitude={centerLatitude} longitude={centerLongitude} />
      <AreaEquationDescription centerLatitude={centerLatitude} centerLongitude={centerLongitude} width={width} height={height} />
    </dl>
  );
}

LocationRectDescriptionList.propTypes = {
  centerLatitude: PropTypes.number.isRequired,
  centerLongitude: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

LocationRectDescriptionList.defaultProps = {
  centerLatitude: undefined,
  centerLongitude: undefined,
  height: undefined,
  width: undefined,
};

const CodeDescription = ({
  code,
}) => {
  const codeArea = React.useMemo(() => {
    try {
      return UniqueBuildingIdentification.v3.decode(code);
    } catch {
      return undefined;
    }
  }, [
    code,
  ]);

  if (codeArea) {
    const codeSubstrings = code.split("-");

    return (
      <div>
        <h5 className="mb-0 overflow-auto text-nowrap"><code>{codeSubstrings[0]}</code></h5>
        <p className="mb-0 overflow-auto text-nowrap"><code className="text-muted">Width</code> <code className="text-muted">=</code> <code className="text-muted">1</code></p>
        <p className="mb-2 overflow-auto text-nowrap"><code className="text-muted">Height</code> <code className="text-muted">=</code> <code className="text-muted">1</code></p>
        <LocationRectDescriptionList
          className="mb-0"
          centerLatitude={codeArea.centerOfMass.latitudeLo + ((codeArea.centerOfMass.latitudeHi - codeArea.centerOfMass.latitudeLo) / 2)}
          centerLongitude={codeArea.centerOfMass.longitudeLo + ((codeArea.centerOfMass.longitudeHi - codeArea.centerOfMass.longitudeLo) / 2)}
          height={codeArea.centerOfMass.latitudeHi - codeArea.centerOfMass.latitudeLo}
          width={codeArea.centerOfMass.longitudeHi - codeArea.centerOfMass.longitudeLo}
        />
        <hr/>
        <h5 className="mb-0 overflow-auto text-nowrap"><code>{codeSubstrings[0]}</code><code className="text-muted">-</code><code>{codeSubstrings[1]}</code><code className="text-muted">-</code><code>{codeSubstrings[2]}</code><code className="text-muted">-</code><code>{codeSubstrings[3]}</code><code className="text-muted">-</code><code>{codeSubstrings[4]}</code></h5>
        <p className="mb-0 overflow-auto text-nowrap"><code className="text-muted">Width</code> <code className="text-muted">=</code> <code>{codeSubstrings[2]}</code> <code className="text-muted">+</code> <code>{codeSubstrings[4]}</code> <code className="text-muted">+</code> <code className="text-muted">1</code> <code className="text-muted">=</code> <code>{1 + parseInt(codeSubstrings[2]) + parseInt(codeSubstrings[4])}</code></p>
        <p className="mb-2 overflow-auto text-nowrap"><code className="text-muted">Height</code> <code className="text-muted">=</code> <code>{codeSubstrings[1]}</code> <code className="text-muted">+</code> <code>{codeSubstrings[3]}</code> <code className="text-muted">+</code> <code className="text-muted">1</code> <code className="text-muted">=</code> <code>{1 + parseInt(codeSubstrings[1]) + parseInt(codeSubstrings[3])}</code></p>
        <LocationRectDescriptionList
          className="mb-0"
          centerLatitude={codeArea.latitudeLo + ((codeArea.latitudeHi - codeArea.latitudeLo) / 2)}
          centerLongitude={codeArea.longitudeLo + ((codeArea.longitudeHi - codeArea.longitudeLo) / 2)}
          height={codeArea.latitudeHi - codeArea.latitudeLo}
          width={codeArea.longitudeHi - codeArea.longitudeLo}
        />
      </div>
    );
  } else {
    return null;
  }
}

CodeDescription.propTypes = {
  code: PropTypes.string.isRequired,
}

CodeDescription.defaultProps = {
  code: '',
}

export default React.memo(CodeDescription)
