import React from 'react'

import Microsoft from '@pnnl/react-bingmaps'

import {
  CodeFormGroup,
} from '@pnnl/react-bootstrap-buildingid'

import {
  Container,
} from 'react-bootstrap'

const App = () => {
  const [code, setCode] = React.useState('849VQJH6+95J-51-58-42-50');
  const [editing, setEditing] = React.useState(false);
  const [latitude, setLatitude] = React.useState('');
  const [lockedCode, setLockedCode] = React.useState(null);
  const [longitude, setLongitude] = React.useState('');
  const [modalLeftPanelVisible, setModalLeftPanelVisible] = React.useState(false);
  const [modalRightPanelVisible, setModalRightPanelVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [placeholderCodeLength, setPlaceholderCodeLength] = React.useState(11);
  const [query, setQuery] = React.useState('');
  const [wkt, setWellKnownText] = React.useState('');

  return (
    <Microsoft.Maps.Api apiKey={process.env.REACT_APP_BING_MAPS_API_KEY} loadModule={['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.DrawingTools', 'Microsoft.Maps.Search', 'Microsoft.Maps.SpatialMath', 'Microsoft.Maps.WellKnownText']}>
      <Container className="pt-5">
        <CodeFormGroup
          code={code}
          editing={editing}
          latitude={latitude}
          lockedCode={lockedCode}
          longitude={longitude}
          modalLeftPanelVisible={modalLeftPanelVisible}
          modalRightPanelVisible={modalRightPanelVisible}
          modalVisible={modalVisible}
          placeholderCodeLength={placeholderCodeLength}
          query={query}
          wkt={wkt}
          onCodeChange={setCode}
          onCodeLengthChange={setPlaceholderCodeLength}
          onEditingChange={setEditing}
          onLatitudeChange={setLatitude}
          onLockedCodeChange={setLockedCode}
          onLongitudeChange={setLongitude}
          onModalLeftPanelHide={() => setModalLeftPanelVisible(false)}
          onModalLeftPanelShow={() => setModalLeftPanelVisible(true)}
          onModalRightPanelHide={() => setModalRightPanelVisible(false)}
          onModalRightPanelShow={() => setModalRightPanelVisible(true)}
          onModalHide={() => setModalVisible(false)}
          onModalShow={() => setModalVisible(true)}
          onQueryChange={setQuery}
          onWellKnownTextChange={setWellKnownText}
        />
      </Container>
    </Microsoft.Maps.Api>
  );
}

export default App
