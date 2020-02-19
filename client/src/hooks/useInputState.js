import { useState } from "react";

const useInputState = () => {
  const [state, setState] = useState();
  const handleChange = e => {
    setState(e.target.value);
  };
  return [state, handleChange];
};

export default useInputState;
