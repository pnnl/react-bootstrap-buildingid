import React from 'react'

import UniqueBuildingIdentification from 'pnnl-buildingid'

export default function useCodeArea(code) {
  return React.useMemo(() => {
    try {
      return UniqueBuildingIdentification.v3.decode(code);
    } catch {
      return undefined;
    }
  }, [
    code,
  ]);
}
