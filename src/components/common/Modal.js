const Modal = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <p>{message}</p>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default Modal;
