import React from "react";
import Modal from "../common/Modal";

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
  const title = "ポストの削除";
  const description = "削除されたポストは復旧できません。よろしいですか？";

  return (
    <Modal
      visible={visible}
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;
