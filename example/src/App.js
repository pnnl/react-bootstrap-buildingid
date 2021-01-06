import React from 'react'

import Microsoft from '@pnnl/react-bingmaps'

import {
  CodeMapControl,
} from '@pnnl/react-bootstrap-buildingid'

import {
  Container,
} from 'react-bootstrap'

const App = () => {
  const [code, setCode] = React.useState('849VQJH6+95J-51-58-42-50');
  const [isEditing, setEditing] = React.useState(false);

  return (
    <Microsoft.Maps.Api apiKey={process.env.REACT_APP_BING_MAPS_API_KEY} loadModule={['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.DrawingTools', 'Microsoft.Maps.Search', 'Microsoft.Maps.SpatialMath', 'Microsoft.Maps.WellKnownText']}>
      <Container className="pt-5">
        <div style={{ width: 600, height: 400, }}>
          <CodeMapControl code={code} isEditing={isEditing} onChange={setCode} onEditChange={setEditing} />
        </div>
      </Container>
    </Microsoft.Maps.Api>
  );
}

export default App
