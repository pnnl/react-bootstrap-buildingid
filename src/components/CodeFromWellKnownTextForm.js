import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import Microsoft from '@pnnl/react-bingmaps'

import {
  Button,
  Form,
} from 'react-bootstrap'

const CodeFromWellKnownTextForm = ({
  buttonText,
  codeLength,
  disabled,
  errorMessages,
  placeholder,
  wkt,
  onWellKnownTextChange,
  onCodeChange,
}) => {
  const shapes = Microsoft.Maps.WellKnownText.useRead(wkt);

  const bounds = Microsoft.Maps.SpatialMath.Geometry.useBounds(shapes);

  const centroid = Microsoft.Maps.SpatialMath.Geometry.useCentroid(shapes);

  const code = React.useMemo(() => {
    if (bounds && centroid) {
      const southeast = bounds.getSoutheast();
      const northwest = bounds.getNorthwest();

      try {
        return UniqueBuildingIdentification.v3.encode(southeast.latitude, northwest.longitude, northwest.latitude, southeast.longitude, centroid.latitude, centroid.longitude, codeLength);
      } catch {
        return undefined;
      }
    } else {
      return undefined;
    }
  }, [
    codeLength,
    bounds,
    centroid,
  ]);

  const handleChange = (event) => {
    onWellKnownTextChange && onWellKnownTextChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (code) {
      onCodeChange && onCodeChange(code);
    }

    return false;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type="text" as="textarea" size="sm" style={{ resize: 'none', }} rows={7} isInvalid={(wkt.length > 0) && (!shapes || (shapes.length === 0))} isValid={(wkt.length > 0) && shapes && (shapes.length === 1)} disabled={disabled} placeholder={placeholder} value={wkt} onChange={handleChange} />
        {
          shapes ? (
            (shapes.length === 0) ? (
              <Form.Text>{errorMessages.invalid}</Form.Text>
            ) : (
              (shapes.length > 1) ? (
                <Form.Text>{errorMessages.length.replace("{length}", shapes.length)}</Form.Text>
              ) : null
            )
          ) : null
        }
      </Form.Group>
      <Form.Group>
        <Button disabled={disabled || !code} size="sm" variant="primary" type="submit" className="w-100">{buttonText}</Button>
      </Form.Group>
    </Form>
  );
}

CodeFromWellKnownTextForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  codeLength: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  errorMessages: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  wkt: PropTypes.string.isRequired,
  onWellKnownTextChange: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
}

CodeFromWellKnownTextForm.defaultProps = {
  buttonText: 'Encode Shape',
  codeLength: 11,
  disabled: false,
  errorMessages: {
    invalid: 'No shapes found.',
    length: 'Too many shapes (expected 1, found {length})',
  },
  placeholder: 'Well Known Text',
  wkt: '',
  onWellKnownTextChange: undefined,
  onCodeChange: undefined,
}

export default React.memo(CodeFromWellKnownTextForm)
