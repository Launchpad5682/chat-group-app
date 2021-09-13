import { createContext, useContext, useState } from "react";

export const ModalOverlayContext = createContext();

export const useModalOverlayContext = () => useContext(ModalOverlayContext);

export const ModalOverlayProvider = (props) => {
  const [modalOverlay, setModalOverlay] = useState(false);

  const value = {
    modalOverlay,
    setModalOverlay,
  };

  return (
    <ModalOverlayContext.Provider value={value}>
      {props.children}
    </ModalOverlayContext.Provider>
  );
};
