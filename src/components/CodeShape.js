import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import CodeAreaShape from './CodeAreaShape'

const CodeShape = ({
  code,
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
