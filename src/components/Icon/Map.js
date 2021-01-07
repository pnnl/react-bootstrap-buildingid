import React from 'react'
import PropTypes from 'prop-types'

const Map = ({
  className,
  height,
  width,
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`bi bi-map ${className}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98l4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
    </svg>
  );
}

Map.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

Map.defaultProps = {
  className: null,
  height: 16,
  width: 16,
}

export default React.memo(Map)
