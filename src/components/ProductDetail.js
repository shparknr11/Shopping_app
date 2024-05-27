import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductOne } from "../api/productItemApi";
import useCart from "../hooks/useCart";
import useModal from "../hooks/useModal";
import Modal from "./common/Modal";
import Button from "./common/Button";

const ProductDetail = () => {
  const navigate = useNavigate();
  // id를 조회해서 productId에 담다
  const { productId } = useParams();
  const { addCarts } = useCart();
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지이동 헨들러
  const handleMoveModifyPage = () => {
    if (productId) {
      navigate(`/modify/${productId}`);
    }
  };
  const handleMovePurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };

  const handleCartAdd = () => {
    if (product) {
      addCarts(product.id);
      openModal({
        message: "장바구니에 성공적으로 추가하였습니다!",
        onConfirm: () => {
          closeModal();
          navigate("/cart");
        },
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (productId) {
      getProductOne(productId)
        .then(response => {
          const data = response?.data.product;
          setProduct(data);
          // console.log(data);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [productId]);
  //.data.product는 백엔드가 주는것
  //productId는 동적이므로 id가 바뀔때마다 업데이트 돼야함

  if (isLoading) {
    return <h3>해당 상품 정보를 불러오는중입니다...</h3>;
  }

  if (!product) {
    return <h3>찾으시는 상품이 없습니다.</h3>;
  }

  return (
    <div>
      <h2>상품 상세보기</h2>
      <div>{product.name}</div>
      <div>{product.price.toLocaleString("KO-kr")}원</div>
      <div>{product.explanation}</div>

      {/* <button type="button" onClick={handleMoveModifyPage}>
        상품 수정하기
      </button>
      <button type="button" onClick={handleMovePurchasePage}>
        상품 구매하기
      </button>
      <button type="button" onClick={handleCartAdd}>
        장바구니에 담기
      </button> */}
      <Button label="상품 수정하기" onClick={handleMoveModifyPage} />

      <Button label="상품 구매하기" onClick={handleMovePurchasePage} />

      <Button label="장바구니에 담기" onClick={handleCartAdd} />
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

export default ProductDetail;
