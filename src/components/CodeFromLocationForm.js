import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap'

import Icon from './Icon'

const CodeFromLocationForm = ({
  buttonText,
  codeLength,
  disabled,
  latitude,
  latitudePlaceholder,
  longitude,
  longitudePlaceholder,
  onLatitudeChange,
  onLongitudeChange,
  onCodeChange,
}) => {
  const [geolocationButtonDisabled, setGeolocationButtonDisabled] = React.useState(disabled || !(window.navigator && window.navigator.geolocation));

  const code = React.useMemo(() => {
    const _latitude = parseFloat(latitude);
    const _longitude = parseFloat(longitude);

    if (isNaN(_latitude) || isNaN(_longitude)) {
      return undefined;
    } else {
      try {
        return UniqueBuildingIdentification.v3.encode(_latitude, _longitude, _latitude, _longitude, _latitude, _longitude, codeLength);
      } catch (ex) {
        console.log(ex);

        return undefined;
      }
    }
  }, [
    codeLength,
    latitude,
    longitude,
  ]);

  const handleLatitudeChange = (event) => {
    onLatitudeChange && onLatitudeChange(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    onLongitudeChange && onLongitudeChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (code) {
      onCodeChange && onCodeChange(code);
    }

    return false;
  };

  const handleGeolocationButtonClick = (event) => {
    event.preventDefault();

    if (window.navigator && window.navigator.geolocation) {
      setGeolocationButtonDisabled(true);

      window.navigator.geolocation.getCurrentPosition((position) => {
        handleLatitudeChange({
          target: {
            value: position.coords.latitude,
          },
        });

        handleLongitudeChange({
          target: {
            value: position.coords.longitude,
          },
        });

        setGeolocationButtonDisabled(false);
      });
    }

    return false;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <InputGroup size="sm">
            <Form.Control type="number" min={-90} max={90} step="any" isInvalid={(latitude.toString().trim().length > 0) && isNaN(parseFloat(latitude))} isValid={(latitude.toString().trim().length > 0) && !isNaN(parseFloat(latitude))} disabled={disabled || geolocationButtonDisabled} placeholder={latitudePlaceholder} value={latitude} onChange={handleLatitudeChange} />
            <InputGroup.Append>
              <InputGroup.Text>&deg;</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}>
          <InputGroup size="sm">
            <Form.Control type="number" min={-180} max={180} step="any" isInvalid={(longitude.toString().trim().length > 0) && isNaN(parseFloat(longitude))} isValid={(longitude.toString().trim().length > 0) && !isNaN(parseFloat(longitude))} disabled={disabled || geolocationButtonDisabled} placeholder={longitudePlaceholder} value={longitude} onChange={handleLongitudeChange} />
            <InputGroup.Append>
              <InputGroup.Text>&deg;</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Col sm={{ span: 2, }}>
          <Button className="w-100" disabled={disabled || geolocationButtonDisabled || !(window.navigator && window.navigator.geolocation)} size="sm" variant="success" onClick={handleGeolocationButtonClick}>
            <Icon.Geo />
          </Button>
        </Col>
      </Form.Row>
      <Form.Group as={Row}>
        <Col sm={{ span: 12, }}>
          <Button disabled={disabled || geolocationButtonDisabled || !code} className="w-100" size="sm" variant="primary" type="submit">{buttonText}</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

CodeFromLocationForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  codeLength: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  latitudePlaceholder: PropTypes.string.isRequired,
  longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  longitudePlaceholder: PropTypes.string.isRequired,
  onLatitudeChange: PropTypes.func.isRequired,
  onLongitudeChange: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
}

CodeFromLocationForm.defaultProps = {
  buttonText: 'Encode Location',
  codeLength: 10,
  disabled: false,
  latitude: '',
  latitudePlaceholder: 'Latitude',
  longitude: '',
  longitudePlaceholder: 'Longitude',
  onLatitudeChange: undefined,
  onLongitudeChange: undefined,
  onCodeChange: undefined,
}

export default React.memo(CodeFromLocationForm)
