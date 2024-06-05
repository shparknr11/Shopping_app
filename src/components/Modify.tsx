import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProduct,
  getProductOne,
  modifyProduct,
} from "../api/productModifyApi";
import useModal from "../hooks/useModal";
import { ProductType } from "../types";
import Button from "./common/Button";
import Modal from "./common/Modal";

const initState = {
  id: "",
  name: "",
  price: 0,
  explanation: "",
};

const Modify = () => {
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();
  // useModal 커스텀 훅을 사용하여 모달 상태와 제어 함수 가져오기
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const [product, setProduct] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  // 입력값이 변경될 때 상태를 업데이트하는 함수
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updateProduct = { ...product, [e.target.name]: e.target.value };
    setProduct(updateProduct);
  };

  // 상품 정보를 수정하는 함수
  const handlePatchProduct = async (product: ProductType) => {
    try {
      await modifyProduct(product);
      console.log("수정 완료");
      // 수정 완료 후 모달을 띄움
      openModal({
        message: "수정이 완료되었습니다!",
        onConfirm: () => {
          closeModal();
          navigate(`/product/${productId}`);
        },
      });
    } catch (error) {
      console.log("수정 중 오류 발생", error);
    }
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handlePatchProduct(product);
  };

  // 상품 삭제 확인 모달을 여는 함수
  const handleDelete = () => {
    if (!productId) {
      return;
    }

    openModal({
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          await deleteProduct(productId);
          console.log("삭제 완료");
          closeModal();
          navigate("/product");
        } catch (error) {
          console.log("삭제 중 오류 발생", error);
        }
      },
    });
  };

  // 상품 정보를 가져오는 함수
  const fetchProduct = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await getProductOne(id);
      const data = response?.data;
      if (data && data.product) {
        setProduct(data.product);
        console.log("상품 조회 완료");
      } else {
        console.log("상품 불러오는데 실패");
      }
    } catch (error) {
      console.log("상품 조회 중 오류 발생", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  if (isLoading) {
    return <h3>상품 정보를 불러오는 중입니다...</h3>;
  }

  return (
    <div>
      <h2>상품 수정하기</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={e => handleChange(e)}
        />
        <br />
        <textarea
          rows={4}
          name="explanation"
          value={product.explanation}
          onChange={e => handleChange(e)}
        />
        <br />
        <Button label="상품 수정하기" />
      </form>
      <Button label="상품 삭제하기" onClick={handleDelete} />
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

export default Modify;
