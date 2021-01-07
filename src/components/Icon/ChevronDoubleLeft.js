import React from 'react'
import PropTypes from 'prop-types'

const ChevronDoubleLeft = ({
  className,
  height,
  width,
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`bi bi-chevron-double-left ${className}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  );
}

ChevronDoubleLeft.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

ChevronDoubleLeft.defaultProps = {
  className: null,
  height: 16,
  width: 16,
}

export default React.memo(ChevronDoubleLeft)
