import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import CodeAreaMapControl from './CodeAreaMapControl';

const CodeMapControl = ({
  code,
  onChange,
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

  const handleChange = (_codeArea, _code) => {
    onChange && onChange(_code, _codeArea);
  };

  return (
    <CodeAreaMapControl codeArea={codeArea} onChange={handleChange} {...props} />
  );
}

CodeMapControl.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

CodeMapControl.defaultProps = {
  code: undefined,
  onChange: undefined,
}

export default CodeMapControl
