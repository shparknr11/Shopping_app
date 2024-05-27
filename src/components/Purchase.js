import useModal from "../hooks/useModal";
import Button from "./common/Button";
import Modal from "./common/Modal";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const navigate = useNavigate();

  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const handleSubmit = e => {
    e.preventDefault();

    openModal({
      message: "성공적으로 구매하였습니다!",
      onConfirm: () => {
        closeModal();
        navigate("/product");
      },
    });
    console.log("성공적으로 구매하였습니다.");
  };

  return (
    <div>
      <h2>상품 구매하기</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="uname">이름</label>
        <input autoFocus id="uname" type="text" />
        <br />
        <label htmlFor="umail">이메일</label>
        <input id="umail" type="mail" />
        <br />
        <label htmlFor="uaddr">배송주소</label>
        <input id="uaddr" type="text" />
        <br />
        <label htmlFor="pay">결제정보</label>
        <select id="pay">
          <option>신용카드/체크카드</option>
          <option>무통장 입금</option>
          <option>휴대폰 결제</option>
        </select>
        <br />
        {/* <input type="submit" value="구매완료" /> */}
        <Button label="구매완료" />
      </form>

      {/* 모달관련 */}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default Purchase;
