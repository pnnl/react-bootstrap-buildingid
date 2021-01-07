import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import Microsoft from '@pnnl/react-bingmaps'

import {
  Form,
  InputGroup,
} from 'react-bootstrap'

const Control = React.forwardRef(({
  ...props
}, ref) => {
  return (
    <Form.Control ref={ref} type="search" autoCapitalize="none" autoComplete="none" {...props} />
  );
})

const ControlWithAutosuggest = Microsoft.Maps.AutoSuggest.attachAutosuggest(Control)

const CodeAutosuggestForm = ({
  codeLength,
  disabled,
  placeholder,
  query,
  onCodeChange,
  onQueryChange,
  ...props
}) => {
  const $api = React.useContext(Microsoft.Maps.$ApiContext);

  const [geocoder, setGeocoder] = React.useState(null);

  React.useEffect(() => {
    if (geocoder) {
      return;
    }

    if ($api) {
      $api.Module.container.instanceAsync('Geocoder', setGeocoder);
    }
  }, [
    $api,
    geocoder,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    return false;
  }

  const handleLocationChange = ({
    latitude,
    longitude,
  }) => {
    try {
      const code = UniqueBuildingIdentification.v3.encode(latitude, longitude, latitude, longitude, latitude, longitude, codeLength);

      onCodeChange && onCodeChange(code);
    } catch {}
  };

  const handleSuggestionItemSelected = (selectedSuggestion) => {
    if (selectedSuggestion.location) {
      handleLocationChange(selectedSuggestion.location);
    } else if (geocoder) {
      geocoder.geocode(selectedSuggestion.formattedSuggestion, (data) => {
        if (data.success && data.results && data.results[0]) {
          const [latitude, longitude] = data.results[0].point.coordinates;

          handleLocationChange({
            latitude,
            longitude,
          });
        }
      }, null, 1, false, false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Microsoft.Maps.AutoSuggest.AutosuggestManager {...props}>
          <ControlWithAutosuggest disabled={disabled || !geocoder} placeholder={placeholder} value={query} onChange={onQueryChange} onSuggestionItemSelected={handleSuggestionItemSelected} />
        </Microsoft.Maps.AutoSuggest.AutosuggestManager>
      </Form.Group>
    </Form>
  );
}

CodeAutosuggestForm.propTypes = {
  codeLength: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
}

CodeAutosuggestForm.defaultProps = {
  codeLength: 11,
  disabled: false,
  placeholder: 'Search by address or place',
  query: '',
  onCodeChange: undefined,
  onQueryChange: undefined,
}

export default React.memo(CodeAutosuggestForm)
