import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import CodeAreaMapControl from './CodeAreaMapControl'

const CodeMapControl = ({
  code,
  onCodeChange,
  ...props
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

  const handleCodeAreaChange = (_codeArea, _code) => {
    onCodeChange && onCodeChange(_code, _codeArea);
  };

  return (
    <CodeAreaMapControl codeArea={codeArea} onCodeAreaChange={handleCodeAreaChange} {...props} />
  );
}

CodeMapControl.propTypes = {
  code: PropTypes.string,
  onCodeChange: PropTypes.func.isRequired,
}

CodeMapControl.defaultProps = {
  code: undefined,
  onCodeChange: undefined,
}

export default CodeMapControl
