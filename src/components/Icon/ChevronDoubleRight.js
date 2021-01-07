import React from 'react'
import PropTypes from 'prop-types'

const ChevronDoubleRight = ({
  className,
  height,
  width,
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`bi bi-chevron-double-right ${className}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
      <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  );
}

ChevronDoubleRight.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

ChevronDoubleRight.defaultProps = {
  className: null,
  height: 16,
  width: 16,
}

export default React.memo(ChevronDoubleRight)
