# @pnnl/react-bootstrap-buildingid

> React components for Unique Building Identification (UBID)

[![NPM](https://img.shields.io/npm/v/@pnnl/react-bootstrap-buildingid.svg)](https://www.npmjs.com/package/@pnnl/react-bootstrap-buildingid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @pnnl/react-bootstrap-buildingid
```

## Usage

```js
import React from 'react'

import Microsoft from '@pnnl/react-bingmaps'
import '@pnnl/react-bingmaps/dist/index.css'

import { CodeFormGroup } from '@pnnl/react-bootstrap-buildingid'
import '@pnnl/react-bootstrap-buildingid/dist/index.css'

import { Container } from 'react-bootstrap'
import '@pnnl/react-bootstrap-buildingid/dist/index.css'

const App = () => {
  const [code, setCode] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [latitude, setLatitude] = React.useState('');
  const [lockedCode, setLockedCode] = React.useState(undefined);
  const [longitude, setLongitude] = React.useState('');
  const [modalLeftPanelVisible, setModalLeftPanelVisible] = React.useState(false);
  const [modalRightPanelVisible, setModalRightPanelVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [placeholderCodeLength, setPlaceholderCodeLength] = React.useState(11);
  const [query, setQuery] = React.useState('');
  const [wkt, setWellKnownText] = React.useState('');

  return (
    <Microsoft.Maps.Api apiKey={process.env.REACT_APP_BING_MAPS_API_KEY} loadModule={['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.DrawingTools', 'Microsoft.Maps.Search', 'Microsoft.Maps.SpatialMath', 'Microsoft.Maps.WellKnownText']}>
      <Container className="py-5">
        <CodeFormGroup
          code={code}
          editing={editing}
          history={history}
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
          onHistoryChange={setHistory}
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
```

## License

Copyright © 2021, Battelle Memorial Institute

See LICENSE in [LICENSE.txt](https://github.com/pnnl/react-bootstrap-buildingid/blob/master/LICENSE.txt)
