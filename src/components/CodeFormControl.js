import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import {
  Form,
} from 'react-bootstrap'

function getClassName(code) {
  if (code) {
    code = code.toString().trim();

    if (code.length === 0) {
      return null;
    } else if (UniqueBuildingIdentification.v3.isValid(code)) {
      return "is-valid";
    } else {
      return "is-invalid";
    }
  } else {
    return null;
  }
}

function getPlaceholder(codeLength) {
  if (codeLength && (codeLength >= 0) && ((codeLength > 10) || ((codeLength % 2) === 0))) {
    return `${"0".repeat(Math.min(codeLength, 8))}${"0".repeat(Math.max(8 - codeLength, 0))}+${"0".repeat(Math.max(codeLength - 8, 0))}-0-0-0-0`;
  } else {
    return null;
  }
}

const CodeFormControl = ({
  code,
  placeholderCodeLength,
  onCodeChange,
  ...props
}) => {
  const handleChange = (event) => {
    onCodeChange && onCodeChange(event.target.value);
  };

  return (
    <Form.Control
      onChange={handleChange}
      className={getClassName(code)}
      placeholder={getPlaceholder(placeholderCodeLength)}
      type="text"
      value={code}
      {...props}
    />
  );
}

CodeFormControl.propTypes = {
  code: PropTypes.string.isRequired,
  placeholderCodeLength: PropTypes.number.isRequired,
  onCodeChange: PropTypes.func.isRequired,
}

CodeFormControl.defaultProps = {
  code: '',
  placeholderCodeLength: 11,
  onCodeChange: undefined,
}

export default React.memo(CodeFormControl)
