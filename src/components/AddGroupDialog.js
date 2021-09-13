import React from "react";
import { useModalOverlayContext } from "../context/ModalOverlayContext";

function AddGroupDialog(props) {
  const { setModalOverlay } = useModalOverlayContext();

  function closeHandler(e) {
    e.preventDefault();
    setModalOverlay(false);
  }

  return (
    <div className="flex fixed inset-0 justify-center items-center bg-gray-900 bg-opacity-50 ">
      <div className="bg-black w-4/12 h-96 px-6 py-4 rounded-xl text-white">
        <h1 className="text-white">NEW CHANNEL</h1>
        <form>
          <input
            className="bg-gray-700 w-full outline-none my-4 py-2 px-3"
            placeholder="Channel name"
          ></input>
          <textarea
            className="bg-gray-700 w-full outline-none py-2 px-3 h-52 resize-none"
            placeholder="Channel description"
          ></textarea>
          <button
            className="bg-red-600 py-1 px-5 mt-2 float-right"
            onClick={closeHandler}
          >
            Close
          </button>
          <button className="bg-green-600 py-1 px-5 mt-2 float-right mr-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGroupDialog;
