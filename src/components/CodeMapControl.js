import React from 'react'
import PropTypes from 'prop-types'

import CodeAreaMapControl from './CodeAreaMapControl'

import useCodeArea from '../hooks-custom/useCodeArea'

const CodeMapControl = ({
  code,
  onCodeChange,
  ...props
}) => {
  const codeArea = useCodeArea(code);

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
