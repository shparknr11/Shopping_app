import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productCreateApi";
import Button from "./common/Button";

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameChange = e => {
    // console.log("상품이름", e.target.value);
    setName(e.target.value);
  };
  const handlePriceChange = e => {
    // console.log("상품가격", e.target.value);
    setPrice(Number(e.target.value));
  };
  const handleExplanationChange = e => {
    // console.log("상품설명", e.target.value);
    setExplanation(e.target.value);
  };

  const handleCreateProduct = async e => {
    e.preventDefault();
    setIsLoading(true);

    const response = await createProduct({ name, price, explanation });
    if (response) {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleMoveListPage = () => {
    // console.log("상품목록페이지로 이동");
    setIsModalOpen(false);
    navigate(`/product`);
  };

  if (isLoading) {
    return <h3>상품을 등록하는 중 입니다...</h3>;
  }
  if (isModalOpen) {
    return (
      <div>
        <div>상품을 성공적으로 추가하였습니다.</div>
        <div>확인을 누르면 상품 목록 페이지로 이동합니다.</div>
        <button type="button" onClick={handleMoveListPage}>
          확인
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>상품 등록하기</h2>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="상품 이름"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="number"
          placeholder="상품 가격"
          value={price}
          onChange={handlePriceChange}
        />
        <br />
        <textarea
          rows={4}
          type="text"
          placeholder="상품 설명"
          value={explanation}
          onChange={handleExplanationChange}
        />
        <br />
        {/* <input type="submit" value="상품 정보 등록하기" /> */}
        <Button label="상품 정보 등록하기" />
      </form>
    </div>
  );
};

export default Create;
