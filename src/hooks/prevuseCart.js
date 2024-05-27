// useCart.js 정석 코드

import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { getProductOne } from "../api/productItemApi";

// npm i react-cookie
// 쿠키는 기본적으로 키와 값의 형태로 저장이 된다.
// COOKIE_KEY 라는 상수를 만들어서 cart라는 쿠키값의 키를 지정
const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState([]);

  // productIds 변수는 cookie로 부터 가져온 id들의 정보를 저장해놓는 공간
  // 쿠키가 있으면 넣고 없으면 빈배열로 두기
  const productIds = useMemo(() => cookies[COOKIE_KEY] ?? [], [cookies]);

  // 상품 정보 자체를 받는 것이 아니라 id를 넘겨받아서 저장
  const addCarts = id => {
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
      // requestList 변수는 요청 보낼 함수들을 잠시 저장해놓는 변수
      const requestList = [];
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map(),
      );

      Array.from(requestIds.keys()).forEach(id => {
        requestList.push(getProductOne(id));
      });

      Promise.all(requestList).then(responseList => {
        const cartData = responseList.map(response => ({
          ...response.data.product,
          count: requestIds.get(response.data.product.id),
        }));
        setCarts(cartData);
      });
    }
  }, [productIds]);

  const changeCount = (productId, mode) => {
    const index = productIds.indexOf(productId);

    // -1 : 배열에 없는 상품
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
