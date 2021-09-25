import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useModalOverlayContext } from "../context/ModalOverlayContext";

function AddGroupDialog() {
  const { setModalOverlay } = useModalOverlayContext();
  const groupName = useRef(null);
  const groupDesc = useRef(null);
  const { addGroup } = useAuth();

  function closeHandler(e) {
    e.preventDefault();
    setModalOverlay(false);
  }

  function submitHandler(e) {
    e.preventDefault();
    addGroup(groupName.current.value, groupDesc.current.value);
    groupName.current.value = null;
    groupDesc.current.value = null;
    setModalOverlay(false);
  }

  return (
    <div className="flex fixed inset-0 justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-black w-4/12 h-96 px-6 py-4 rounded-xl text-white">
        <h1 className="text-white">NEW CHANNEL</h1>
        <form onSubmit={submitHandler}>
          <input
            className="bg-gray-700 w-full outline-none my-4 py-2 px-3 rounded-md"
            placeholder="Channel name"
            ref={groupName}
          ></input>
          <textarea
            className="bg-gray-700 w-full outline-none py-2 px-3 h-52 resize-none rounded-md"
            placeholder="Channel description"
            ref={groupDesc}
          ></textarea>
          <button
            className="bg-red-600 py-1 px-5 mt-2 float-right rounded-md"
            onClick={closeHandler}
          >
            Close
          </button>
          <button className="bg-green-600 py-1 px-5 mt-2 float-right mr-3 rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGroupDialog;
