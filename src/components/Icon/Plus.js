import React from 'react'
import PropTypes from 'prop-types'

const Plus = ({
  className,
  height,
  width,
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`bi bi-plus ${className}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  );
}

Plus.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

Plus.defaultProps = {
  className: null,
  height: 16,
  width: 16,
}

export default React.memo(Plus)
