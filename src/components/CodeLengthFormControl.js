import React from 'react'
import PropTypes from 'prop-types'

import {
  Form,
} from 'react-bootstrap'

const CodeLengthFormControl = ({
  codeLength,
  codeLengths,
  onCodeLengthChange,
  ...props
}) => {
  const ref = React.useRef(null);

  const handleChange = (event) => {
    if (ref.current) {
      ref.current.blur();
    }

    onCodeLengthChange && onCodeLengthChange(parseInt(event.target.value));
  };

  if (codeLengths.includes(codeLength)) {
    return (
      <Form.Control
        ref={ref}
        as="select"
        custom
        value={codeLength}
        onChange={handleChange}
        {...props}
      >
        {
          codeLengths.map((codeLength) => {
            return (
              <option key={codeLength} value={codeLength}>{codeLength}</option>
            );
          })
        }
      </Form.Control>
    );
  } else {
    return null;
  }
}

CodeLengthFormControl.propTypes = {
  codeLength: PropTypes.number.isRequired,
  codeLengths: PropTypes.arrayOf(PropTypes.number).isRequired,
  onCodeLengthChange: PropTypes.func.isRequired,
}

CodeLengthFormControl.defaultProps = {
  codeLength: undefined,
  codeLengths: [0, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15],
  onCodeLengthChange: undefined,
}

export default React.memo(CodeLengthFormControl)
