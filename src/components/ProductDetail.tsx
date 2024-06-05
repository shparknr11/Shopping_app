import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductOne } from "../api/productItemApi";
import useCart from "../hooks/useCart";
import useModal from "../hooks/useModal";
import Modal from "./common/Modal";
import Button from "./common/Button";
import { ProductType } from "../types";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { addCarts } = useCart();
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      <Button label="상품 수정하기" onClick={handleMoveModifyPage} />
      <Button label="상품 구매하기" onClick={handleMovePurchasePage} />
      <Button label="장바구니에 담기" onClick={handleCartAdd} />

      {/* 모달 관련 */}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirm={confirmAction || (() => {})}
      />
    </div>
  );
};

export default ProductDetail;
