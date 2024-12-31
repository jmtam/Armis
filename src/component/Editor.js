import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";

function LogEditor({ data, showEditor, setShowEditor }) {
  const [show, setShow] = useState(showEditor);

  const handleClose = () => {
    setShow(false);
    setShowEditor(false);
  };
  const handleShow = () => setShow(true);

  const updateItem = data;

  const [editorState, setEditorState] = useState(() =>
    updateItem && updateItem
      ? EditorState.createWithContent(ContentState.createFromText(updateItem))
      : EditorState.createEmpty()
  );

  const toolbarOptions = {
    options: [
      "history",
      "inline",
      "blockType",
      "fontSize",
      "colorPicker",
      //"fontFamily",
      "list",
      "textAlign",

      //"link",
      // "embedded",
      //   "emoji",
      //   "image",
      //"remove",
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
    // list: {
    //   inDropdown: false,
    //   className: undefined,
    //   component: undefined,
    //   dropdownClassName: undefined,
    //   options: ["unordered", "ordered"],
    // },
    fontSize: {
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48],
    },
    // fontFamily: {
    //   options: [
    //     "Arial",
    //     "Georgia",
    //     "Impact",
    //     "Tahoma",
    //     "Times New Roman",
    //     "Verdana",
    //   ],
    //   className: undefined,
    //   component: undefined,
    //   dropdownClassName: undefined,
    // },
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="headEditor">
          <Modal.Title className="titleEditor">Datos Log </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%" }} className="titleEditor">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={toolbarOptions}
            wrapperClassName="editor-wrapper"
            editorClassName="message-editor"
            // toolbarClassName="message-toolbar"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogEditor;
