import React from 'react'
import PropTypes from 'prop-types'

import CodeAreaShape from './CodeAreaShape'

import useCodeArea from '../hooks-custom/useCodeArea'

const CodeShape = ({
  code,
  ...props
}) => {
  const codeArea = useCodeArea(code);

  if (codeArea) {
    return (
      <CodeAreaShape codeArea={codeArea} {...props} />
    );
  } else {
    return null;
  }
}

CodeShape.propTypes = {
  code: PropTypes.string.isRequired,
}

CodeShape.defaultProps = {
  code: undefined,
}

export default React.memo(CodeShape)
