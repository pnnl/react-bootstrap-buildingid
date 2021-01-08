import React from 'react'

import UniqueBuildingIdentification from 'pnnl-buildingid'

export default function useCodeArea(code) {
  return React.useMemo(() => {
    if (UniqueBuildingIdentification.v3.isValid(code)) {
      try {
        return UniqueBuildingIdentification.v3.decode(code);
      } catch (ex) {
        console.log(ex);

        return undefined;
      }
    } else {
      return undefined;
    }
  }, [
    code,
  ]);
}
