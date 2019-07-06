import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  counter: 0,
  center:[24,49],
  map: undefined
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;