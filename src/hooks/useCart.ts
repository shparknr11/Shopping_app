import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { getProductOne } from "../api/productItemApi";
import { ProductType } from "../types";

type CartType = ProductType & { count: number };

// 쿠키는 기본적으로 키와 값의 형태로 저장이 된다.
// COOKIE_KEY 라는 상수를 만들어서 cart라는 쿠키값의 키를 지정
const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState<CartType[]>([]);

  // productIds 변수는 cookie로 부터 가져온 id들의 정보를 저장해놓는 공간
  const productIds = useMemo(
    () => (cookies[COOKIE_KEY] as string[]) ?? [],
    [cookies],
  );

  // 상품 정보 자체를 받는 것이 아니라 id를 넘겨받아서 저장
  const addCarts = (id: string) => {
    const nextCartIds = [...productIds, id];

    setCookies(COOKIE_KEY, nextCartIds, { path: "/" });
  };

  // getProductById 함수는 인자값으로 id를 넣어주면 요청을 보내고
  // 각 상품의 id를 담아놓은 배열들을 0부터 끝까지 순회하면서
  // 각각 요청을 보내서 그 응답을 배열에 누적해야한다.
  //   const getProductById = id => {
  //     return fetch(`/product/${id}`).then(response => response.json());
  //   };

  useEffect(() => {
    if (productIds && productIds.length) {
      // 요청할 함수들을 잠시 저장해놓는 변수
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map<string, number>(),
      );

      const fetchData = async () => {
        const newCartData: CartType[] = [];
        for (const id of requestIds.keys()) {
          const response = await getProductOne(id);
          newCartData.push({
            ...response?.data.product,
            count: requestIds.get(response?.data.product.id),
          });
        }

        setCarts(prevCarts => {
          // 이전 상태를 복사하고, 새 데이터로 덮어쓰기
          const updatedCarts = [...prevCarts];
          newCartData.forEach(newCart => {
            const index = updatedCarts.findIndex(
              cart => cart.id === newCart.id,
            );
            if (index !== -1) {
              // 기존 항목을 업데이트
              updatedCarts[index] = newCart;
            } else {
              // 새 항목을 추가
              updatedCarts.push(newCart);
            }
          });
          return updatedCarts;
        });
      };

      fetchData();
    }
  }, [productIds]);

  const changeCount = (productId: string, mode: "increase" | "decrease") => {
    const index = productIds.indexOf(productId);

    if (index === -1) {
      return;
    }

    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);

      if (!tempArr.includes(productId)) {
        return;
      }

      setCookies(COOKIE_KEY, tempArr, { path: "/" });
    }

    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], { path: "/" });
    }
  };

  return { carts, addCarts, changeCount };
};

export default useCart;
