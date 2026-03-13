import { useState, useMemo } from "react";

const TAX_DB = [
  {
    num: 1,
    country: "가봉",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      {
        rate: 0.05,
        article: "제10조",
        content:
          "수익적 소유자가 회사(동업기업은 제외한다)로서 배당을 지급하는 회사 자본의 최소 25퍼센트를 직접적으로 소유하는 경우에는, 배당총액의 5퍼센트",
      },
      {
        rate: 0.15,
        article: "제10조",
        content: "그 밖의 모든 경우에는 배당총액의 15퍼센트",
      },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다. 가봉에 있어서는 법인세 및 개인소득세 등",
    article12_text:
      "제12조 제2항: 이 조 제1항의 규정에도 불구하고, 그러한 사용료에 대하여 부과되는 조세는 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR001",
  },
  {
    num: 2,
    country: "그리스",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.08, article: "제11조", content: "" }],
    dividend: [
      {
        rate: 0.05,
        article: "제10조",
        content:
          "수익적 소유자가 배당을 지급하는 회사자본금의 25퍼센트 이상을 직접 소유하는 회사(조합은 제외한다)인 경우 배당총액의 5퍼센트",
      },
      {
        rate: 0.15,
        article: "제10조",
        content: "여타의 경우 배당총액의 15퍼센트",
      },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 이 조 제1항의 규정에도 불구하고, 그러한 사용료에 대하여 부과되는 조세는 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR002",
  },
  {
    num: 3,
    country: "남아프리카공화국",
    is_cap: false,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "지방소득세 별도",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      {
        rate: 0.05,
        article: "제10조",
        content:
          "그 수익적 소유자가 배당을 지급하는 법인자본의 최소한 25퍼센트를 직접 소유하는 법인(조합은 제외한다)인 경우 배당총액의 5퍼센트",
      },
      {
        rate: 0.15,
        article: "제10조",
        content: "기타의 모든 경우 배당총액의 15퍼센트",
      },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세 및 법인세. ※ 주민세(지방소득세)는 본 협약의 적용 대상 조세에 포함되지 아니하여 별도 가산됨",
    article12_text:
      "제12조 제2항: 이 조 제1항의 규정에도 불구하고, 그러한 사용료에 대하여 부과되는 조세는 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR003",
  },
  {
    num: 4,
    country: "네덜란드",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      {
        rate: 0.1,
        article: "제11조",
        content: "7년을 초과하는 기간동안 차관에 대하여 지급된 이자의 경우",
      },
      { rate: 0.15, article: "제11조", content: "기타의 경우" },
    ],
    dividend: [
      {
        rate: 0.1,
        article: "제10조",
        content:
          "법인의 자본금의 최소한 25퍼센트를 직접 소유하는 법인인 경우 10퍼센트",
      },
      {
        rate: 0.15,
        article: "제10조",
        content: "기타의 경우는 총배당액의 15퍼센트",
      },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 부과되는 조세는 사용료 총액을 초과하여서는 아니 된다: 가호 15% / 나호 10%",
    nts_link_id: "KOR004",
  },
  {
    num: 5,
    country: "네팔",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "*배당, 사용료 최혜국",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 이 조 제1항의 규정에도 불구하고, 그러한 사용료에 대하여 부과되는 조세는 사용료 총액의 15퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR005",
  },
  {
    num: 6,
    country: "노르웨이",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content:
          "특허권, 상표, 의장이나 모델·도면·비밀의 공식이나 공정·산업상·상업상이나 학술상의 장비의 사용 또는 사용할 권리",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content:
          "영화필름을 포함하는 문학상, 예술상 또는 학술상 저작물의 저작권의 사용이나 사용할 권리",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.15, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 나호(특허·산업장비 등) 10% / 가호(저작권·영화필름) 15%",
    nts_link_id: "KOR006",
  },
  {
    num: 7,
    country: "뉴질랜드",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 이 조 제1항의 규정에도 불구하고, 그러한 사용료에 대하여 부과되는 조세는 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR007",
  },
  {
    num: 8,
    country: "대만",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 이 조 제1항의 규정에도 불구하고, 그러한 사용료에 대하여 부과되는 조세는 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR008",
  },
  {
    num: 9,
    country: "덴마크",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업적 투자의 경우에는 사용료 총액의 10퍼센트",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 경우에는 사용료 총액의 15퍼센트",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.15, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(산업적 투자) 10% / 나호(기타) 15%",
    nts_link_id: "KOR009",
  },
  {
    num: 10,
    country: "독일",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content:
          "산업적·상업적 또는 학술적 장비의 사용 또는 사용권에 대한 대가로 지급되는 사용료는 그 총액의 2퍼센트",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 모든 경우에는 그러한 사용료총액의 10퍼센트",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "25% 이상 직접 소유 법인 5%" },
      { rate: 0.15, article: "제10조", content: "기타 15%" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 독일에 있어서는 소득세 및 법인세(영업세 포함)",
    article12_text:
      "제12조 제2항: 가호(산업·상업·학술 장비 사용권) 2% / 나호(기타) 10%",
    nts_link_id: "KOR010",
  },
  {
    num: 11,
    country: "라오스",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR011",
  },
  {
    num: 12,
    country: "라트비아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content:
          "산업적·상업적·과학적 장비의 사용에 대한 사용료는 지급 총액의 5퍼센트",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 사용료는 지급 총액의 10퍼센트",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용료) 5% / 나호(기타) 10%",
    nts_link_id: "KOR012",
  },
  {
    num: 13,
    country: "러시아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: "면제", article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR013",
  },
  {
    num: 14,
    country: "루마니아",
    is_cap: true,
    royalty: [
      {
        rate: 0.07,
        article: "제13조",
        para: "제2항",
        sub: "가호",
        content:
          "특허권·상표권·의장 또는 신안·도면·비밀공식 또는 비밀공정, 산업적·상업적·학술적 장비, 경험에 관한 정보 7%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제13조",
        para: "제2항",
        sub: "나호",
        content: "기타의 모든 경우에는 사용료 총액의 10퍼센트",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.07, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제13조 제2항: 가호(특허·산업장비·경험정보) 7% / 나호(기타) 10%",
    nts_link_id: "KOR014",
  },
  {
    num: 15,
    country: "룩셈부르크",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업적·상업적·과학적 장비, 경험에 관한 정보 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 모든 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.05, article: "제11조", content: "" },
      { rate: 0.1, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비·경험 정보) 5% / 나호(기타) 10%",
    nts_link_id: "KOR015",
  },
  {
    num: 16,
    country: "르완다",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR016",
  },
  {
    num: 17,
    country: "리투아니아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업적·상업적·과학적 장비의 사용에 대한 사용료 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 사용료 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용료) 5% / 나호(기타) 10%",
    nts_link_id: "KOR017",
  },
  {
    num: 18,
    country: "말레이시아",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content:
          "특허, 상표, 의장 등 산업상·상업상·학술상의 장비 또는 경험에 관한 정보 10%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "영화필름, 라디오·텔레비전 방영용, 문학·예술작품 저작권 15%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.15, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(특허·산업장비) 10% / 나호(저작권·영화) 15%",
    nts_link_id: "KOR018",
  },
  {
    num: 19,
    country: "멕시코",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.05, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: "면제", article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR019",
  },
  {
    num: 20,
    country: "모로코",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "저작권 사용료(영화필름·방송 필름 제외) 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(저작권) 5% / 나호(기타) 10%",
    nts_link_id: "KOR020",
  },
  {
    num: 21,
    country: "몰타",
    is_cap: true,
    royalty: [
      {
        rate: "면제",
        article: "제12조",
        para: "제1항",
        sub: "",
        content: "",
        note: "제한세율 적용신청 대상 아님",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조: 사용료 면제 (제한세율 적용신청 대상 아님)",
    nts_link_id: "KOR021",
  },
  {
    num: 22,
    country: "몽골",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [{ rate: 0.05, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR022",
  },
  {
    num: 23,
    country: "미국",
    is_cap: false,
    royalty: [
      {
        rate: 0.1,
        article: "제14조",
        para: "제2항",
        sub: "",
        content:
          "저작권 또는 문학·연극·음악·예술작품의 생산·재생산권, 영화필름의 사용·사용권 10%",
        note: "지방소득세 별도",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제14조",
        para: "제1항",
        sub: "",
        content: "그 밖의 경우 15%",
        note: "지방소득세 별도",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.12, article: "제13조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제12조", content: "" },
      { rate: 0.15, article: "제12조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세 및 법인세. 미국에 있어서는 연방소득세. ※ 주민세(지방소득세)는 본 협약의 적용 대상 조세에 포함되지 아니함",
    article12_text:
      "제14조: 저작권·영화필름 10% / 기타(특허·산업장비 등) 15% — 지방소득세 별도 가산",
    nts_link_id: "KOR023",
  },
  {
    num: 24,
    country: "미얀마",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content:
          "특허권·의장·신안·비밀공식, 산업적·상업적·학술적 장비, 경험정보 10%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 모든 경우 15%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(특허·산업장비·경험정보) 10% / 나호(기타) 15%",
    nts_link_id: "KOR024",
  },
  {
    num: 25,
    country: "바레인",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR025",
  },
  {
    num: 26,
    country: "방글라데시",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR026",
  },
  {
    num: 27,
    country: "베네수엘라",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업적·상업적·학술적 장비 사용권 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.05, article: "제11조", content: "" },
      { rate: 0.1, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용권) 5% / 나호(기타) 10%",
    nts_link_id: "KOR027",
  },
  {
    num: 28,
    country: "베트남",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "특허권·의장·비밀공식, 산업장비, 경험정보 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(특허·산업장비·경험정보) 5% / 나호(기타) 10%",
    nts_link_id: "KOR028",
  },
  {
    num: 29,
    country: "벨기에",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR029",
  },
  {
    num: 30,
    country: "벨라루스",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR030",
  },
  {
    num: 31,
    country: "불가리아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "기술용역 포함",
        note: "기술용역이 국외에서 수행되는 경우 3%(주민세 별도)",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5% (기술용역 포함, 단 국외 수행 기술용역은 3% 주민세 별도)",
    nts_link_id: "KOR031",
  },
  {
    num: 32,
    country: "브라질",
    is_cap: true,
    royalty: [
      {
        rate: 0.25,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "상표의 사용 또는 사용권 25%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타 모든 경우 10% (기술지원·기술용역 포함)",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(상표 사용권) 25% / 나호(기타, 기술지원 포함) 10%",
    nts_link_id: "KOR032",
  },
  {
    num: 33,
    country: "브루나이",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR033",
  },
  {
    num: 34,
    country: "사우디아라비아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·학술 장비 이용권 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 이용권) 5% / 나호(기타) 10%",
    nts_link_id: "KOR034",
  },
  {
    num: 35,
    country: "세르비아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "저작권(영화·방송 필름 포함) 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "특허권, 산업장비, 경험 정보 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(저작권·필름) 5% / 나호(특허·산업장비) 10%",
    nts_link_id: "KOR035",
  },
  {
    num: 36,
    country: "스리랑카",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR036",
  },
  {
    num: 37,
    country: "스웨덴",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "특허권·상표·의장·산업장비 사용권, 경험 정보 10%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "저작권(영화필름 포함) 15%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 나호(특허·산업장비) 10% / 가호(저작권·필름) 15%",
    nts_link_id: "KOR037",
  },
  {
    num: 38,
    country: "스위스",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "문화예술작품(필름포함)의 저작권 포함 5%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [],
    dividend: [],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다. 스위스에 있어서는 연방, 주 및 지방정부가 부과하는 소득세에 적용된다.",
    article12_text: "제12조 제2항: 사용료 총액의 5% (문화예술작품 저작권 포함)",
    protocol: {
      exists: true,
      date: "2012.07.25",
      text: "[개정 의정서(2012.07.25 발효)] 스위스와의 조세조약 개정 의정서에 따라 문화예술작품(필름 포함)의 저작권 등에 대하여 사용료 5% 제한세율이 적용됨을 명확히 하고 있습니다.",
    },
    nts_link_id: "KOR038",
  },
  {
    num: 39,
    country: "스페인",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR039",
  },
  {
    num: 40,
    country: "슬로바키아",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "특허권·상표권·산업장비·경험 정보 10%",
        note: "",
        type: "사용료",
      },
      {
        rate: "면제",
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "문학·예술·학술 저작권 면제",
        note: "제한세율 적용신청 대상 아님",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(특허·산업장비) 10% / 나호(저작권) 면제",
    nts_link_id: "KOR040",
  },
  {
    num: 41,
    country: "슬로베니아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR041",
  },
  {
    num: 42,
    country: "싱가포르",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 싱가포르에 있어서는 소득세",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR042",
  },
  {
    num: 43,
    country: "아랍에미리트연합",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR043",
  },
  {
    num: 44,
    country: "아이슬란드",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR044",
  },
  {
    num: 45,
    country: "아일랜드",
    is_cap: true,
    royalty: [
      {
        rate: "면제",
        article: "제12조",
        para: "제1항",
        sub: "",
        content: "",
        note: "제한세율 적용신청 대상 아님",
        type: "사용료",
      },
    ],
    interest: [{ rate: "면제", article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조: 사용료 면제 (제한세율 적용신청 대상 아님)",
    nts_link_id: "KOR045",
  },
  {
    num: 46,
    country: "아제르바이잔",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "특허권·의장·비밀공식, 경험 정보 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 사용료 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.07, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(특허·경험정보) 5% / 나호(기타) 10%",
    nts_link_id: "KOR046",
  },
  {
    num: 47,
    country: "안도라",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.05, article: "제11조", content: "" },
      { rate: 0.1, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR047",
  },
  {
    num: 48,
    country: "알바니아",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR048",
  },
  {
    num: 49,
    country: "알제리",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업적·상업적·학술적 장비 사용권 2%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(산업장비 사용권) 2% / 나호(기타) 10%",
    nts_link_id: "KOR049",
  },
  {
    num: 50,
    country: "에스토니아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·과학적 장비 사용료 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 사용료 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용료) 5% / 나호(기타) 10%",
    nts_link_id: "KOR050",
  },
  {
    num: 51,
    country: "에콰도르",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·과학적 장비 사용권 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.12,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 모든 경우 12%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.12, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용권) 5% / 나호(기타) 12%",
    nts_link_id: "KOR051",
  },
  {
    num: 52,
    country: "에티오피아",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.075, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.08, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR052",
  },
  {
    num: 53,
    country: "영국",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업적·상업적·학술적 장비 사용권 2%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 모든 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세. 영국에 있어서는 소득세, 법인세 및 자본이득세",
    article12_text: "제12조 제2항: 가호(산업장비 사용권) 2% / 나호(기타) 10%",
    nts_link_id: "KOR053",
  },
  {
    num: 54,
    country: "오만",
    is_cap: true,
    royalty: [
      {
        rate: 0.08,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 8퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR054",
  },
  {
    num: 55,
    country: "오스트리아",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·과학적 장비 사용권 2%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용권) 2% / 나호(기타) 10%",
    nts_link_id: "KOR055",
  },
  {
    num: 56,
    country: "요르단",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR056",
  },
  {
    num: 57,
    country: "우루과이",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR057",
  },
  {
    num: 58,
    country: "우즈베키스탄",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·과학적 장비 사용권 2%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타 모든 경우 5%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용권) 2% / 나호(기타) 5%",
    nts_link_id: "KOR058",
  },
  {
    num: 59,
    country: "우크라이나",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR059",
  },
  {
    num: 60,
    country: "이란",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR060",
  },
  {
    num: 61,
    country: "이스라엘",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·학술적 장비 사용권 2%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "기타의 모든 경우 5%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.075, article: "제11조", content: "" },
      { rate: 0.1, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용권) 2% / 나호(기타) 5%",
    nts_link_id: "KOR061",
  },
  {
    num: 62,
    country: "이집트",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 15퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR062",
  },
  {
    num: 63,
    country: "이탈리아",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR063",
  },
  {
    num: 64,
    country: "인도",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 인도에 있어서는 소득세(부가세 포함)",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR064",
  },
  {
    num: 65,
    country: "인도네시아",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 15퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR065",
  },
  {
    num: 66,
    country: "일본",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세. 일본에 있어서는 소득세, 법인세 및 주민세",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR066",
  },
  {
    num: 67,
    country: "조지아",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR067",
  },
  {
    num: 68,
    country: "중국",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 중화인민공화국에 있어서는 개인소득세 및 기업소득세",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR068",
  },
  {
    num: 69,
    country: "체코",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.05, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 산업·특허 사용료 10% (문학·예술·저작권은 면제)",
    nts_link_id: "KOR069",
  },
  {
    num: 70,
    country: "칠레",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·과학적 장비 사용권 2% (2017.1.1 이후)",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 모든 경우 10% (2017.1.1 이후)",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.04, article: "제11조", content: "" },
      { rate: 0.05, article: "제11조", content: "" },
      { rate: 0.1, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(장비 사용권) 2% / 나호(기타) 10% (2017.1.1 이후 적용)",
    nts_link_id: "KOR070",
  },
  {
    num: 71,
    country: "카자흐스탄",
    is_cap: true,
    royalty: [
      {
        rate: 0.02,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "상업·산업·학술적 장비 사용 대가(최혜국)",
        note: "최혜국",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "기타",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 장비 사용료 2%(최혜국) / 기타 10%",
    nts_link_id: "KOR071",
  },
  {
    num: 72,
    country: "카타르",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 5퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR072",
  },
  {
    num: 73,
    country: "캄보디아",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR073",
  },
  {
    num: 74,
    country: "캐나다",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 캐나다에 있어서는 캐나다 정부가 부과하는 소득세",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR074",
  },
  {
    num: 75,
    country: "케냐",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.12, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.08, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR075",
  },
  {
    num: 76,
    country: "콜롬비아",
    is_cap: false,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "기술용역 포함",
        note: "지방소득세 별도, 기술용역이 국외에서 수행되는 경우 3%(주민세 별도)",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세 및 법인세. ※ 지방소득세는 본 협약의 적용 대상 조세에 포함되지 아니하여 별도 가산됨",
    article12_text:
      "제12조 제2항: 사용료 총액의 10% — 지방소득세 별도 가산 (기술용역 국외 수행시 3% 주민세 별도)",
    nts_link_id: "KOR076",
  },
  {
    num: 77,
    country: "쿠웨이트",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [{ rate: 0.05, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 15퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR077",
  },
  {
    num: 78,
    country: "크로아티아",
    is_cap: true,
    royalty: [
      {
        rate: "면제",
        article: "제12조",
        para: "제1항",
        sub: "",
        content: "",
        note: "제한세율 적용신청 대상 아님",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조: 사용료 면제 (제한세율 적용신청 대상 아님)",
    nts_link_id: "KOR078",
  },
  {
    num: 79,
    country: "키르기즈",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호 5% / 나호 10%",
    nts_link_id: "KOR079",
  },
  {
    num: 80,
    country: "타지키스탄",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.08, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR080",
  },
  {
    num: 81,
    country: "태국",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "소프트웨어, 문학·예술·과학 저작물 5%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "특허권, 상표권, 비밀공식 10%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "다호",
        content: "산업·상업·과학적 장비, 경험 정보 15%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 가호(소프트웨어·저작물) 5% / 나호(특허·상표) 10% / 다호(장비·경험정보) 15%",
    nts_link_id: "KOR081",
  },
  {
    num: 82,
    country: "투르크메니스탄",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR082",
  },
  {
    num: 83,
    country: "튀니지",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "기술적·경제적 연구, 기술지원 대가 포함 15%",
        note: "기술용역이 국외에서 수행되는 경우 3%(주민세 별도)",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.12, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 15% (기술지원 포함, 단 국외 수행 기술용역은 3% 주민세 별도)",
    nts_link_id: "KOR083",
  },
  {
    num: 84,
    country: "튀르키예",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR084",
  },
  {
    num: 85,
    country: "파나마",
    is_cap: true,
    royalty: [
      {
        rate: 0.03,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "산업·상업·과학적 장비 사용권 3%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 모든 경우 10%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.05, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(장비 사용권) 3% / 나호(기타) 10%",
    nts_link_id: "KOR085",
  },
  {
    num: 86,
    country: "파키스탄",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "기술, 경영, 자문 용역 포함 10%",
        note: "기술용역이 국외에서 수행되는 경우 3%(주민세 별도)",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.125, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.125, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10% (기술·경영·자문 용역 포함, 국외 기술용역 3% 주민세 별도)",
    nts_link_id: "KOR086",
  },
  {
    num: 87,
    country: "파푸아뉴기니",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR087",
  },
  {
    num: 88,
    country: "페루",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "가호",
        content: "기술적 지원 제공 대가 10%",
        note: "",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "나호",
        content: "그 밖의 모든 경우 15%",
        note: "",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [{ rate: 0.1, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 가호(기술지원) 10% / 나호(기타) 15%",
    nts_link_id: "KOR088",
  },
  {
    num: 89,
    country: "포르투갈",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.15, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR089",
  },
  {
    num: 90,
    country: "폴란드",
    is_cap: true,
    royalty: [
      {
        rate: 0.05,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "2017.1.1 이후 5% 적용",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조 제2항: 사용료 총액의 5% (2017.1.1 이후 적용)",
    nts_link_id: "KOR090",
  },
  {
    num: 91,
    country: "프랑스",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 프랑스에 있어서는 소득세, 법인세 및 부가가치세",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR091",
  },
  {
    num: 92,
    country: "피지",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR092",
  },
  {
    num: 93,
    country: "핀란드",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR093",
  },
  {
    num: 94,
    country: "필리핀",
    is_cap: false,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제3항",
        sub: "",
        content: "",
        note: "지방소득세 별도",
        type: "사용료",
      },
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "지방소득세 별도",
        type: "사용료",
      },
    ],
    interest: [
      { rate: 0.1, article: "제11조", content: "" },
      { rate: 0.15, article: "제11조", content: "" },
    ],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.25, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세 및 법인세. ※ 주민세(지방소득세)는 본 협약의 적용 대상 조세에 포함되지 아니하여 별도 가산됨",
    article12_text: "제12조: 10% 또는 15% — 지방소득세 별도 가산",
    nts_link_id: "KOR094",
  },
  {
    num: 95,
    country: "헝가리",
    is_cap: true,
    royalty: [
      {
        rate: "면제",
        article: "제12조",
        para: "제1항",
        sub: "",
        content: "",
        note: "제한세율 적용신청 대상 아님",
        type: "사용료",
      },
    ],
    interest: [{ rate: "면제", article: "제11조", content: "" }],
    dividend: [
      { rate: 0.05, article: "제10조", content: "" },
      { rate: 0.1, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text: "제12조: 사용료 면제 (제한세율 적용신청 대상 아님)",
    nts_link_id: "KOR095",
  },
  {
    num: 96,
    country: "호주",
    is_cap: true,
    royalty: [
      {
        rate: 0.15,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.15, article: "제11조", content: "" }],
    dividend: [{ rate: 0.15, article: "제10조", content: "" }],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 소득세, 법인세 및 주민세(지방소득세). 호주에 있어서는 호주소득세",
    article12_text:
      "제12조 제2항: 사용료 총액의 15퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR096",
  },
  {
    num: 97,
    country: "홍콩",
    is_cap: true,
    royalty: [
      {
        rate: 0.1,
        article: "제12조",
        para: "제2항",
        sub: "",
        content: "",
        note: "",
        type: "사용료",
      },
    ],
    interest: [{ rate: 0.1, article: "제11조", content: "" }],
    dividend: [
      { rate: 0.1, article: "제10조", content: "" },
      { rate: 0.15, article: "제10조", content: "" },
    ],
    article2_text:
      "이 협약은 다음의 조세에 적용된다: 대한민국에 있어서는 (가) 소득세, (나) 법인세, (다) 주민세[현행: 지방소득세](소득세 또는 법인세의 부가세로서 부과되는 것)에 적용된다.",
    article12_text:
      "제12조 제2항: 사용료 총액의 10퍼센트를 초과하여서는 아니 된다.",
    nts_link_id: "KOR097",
  },
];

const DEFAULT_USD_RATE = 1350;
const NTS_BASE = "https://taxlaw.nts.go.kr/st/USESTC001M.do";

const fmtPct = (r) =>
  typeof r === "number"
    ? `${(r * 100).toFixed((r * 100) % 1 === 0 ? 0 : 1)}%`
    : String(r);

function calculateTax(entry, royaltyIdx, amount) {
  if (!entry) {
    const incomeTax = amount * 0.2;
    const localTax = amount * 0.02;
    return {
      incomeTax,
      localTax,
      total: incomeTax + localTax,
      rate: 0.2,
      effectiveTotal: 0.22,
      mode: "no_treaty",
    };
  }

  const r = entry.royalty[royaltyIdx];
  if (!r || typeof r.rate !== "number") return null;
  const rate = r.rate;
  const is_cap = entry.is_cap;

  if (is_cap) {
    const incomeTax = (amount * rate) / 1.1;
    const localTax = incomeTax * 0.1;
    const total = incomeTax + localTax;
    return {
      incomeTax,
      localTax,
      total,
      rate,
      effectiveTotal: rate,
      mode: "cap",
    };
  } else {
    const incomeTax = amount * rate;
    const localTax = incomeTax * 0.1;
    const total = incomeTax + localTax;
    return {
      incomeTax,
      localTax,
      total,
      rate,
      effectiveTotal: rate * 1.1,
      mode: "separate",
    };
  }
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Syne+Mono&family=Syne:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0f172a; }
  :root {
    --bg: #0f172a;
    --bg2: #1e293b;
    --bg3: #0f172a;
    --bg4: #19213a;
    --border: #334155;
    --border2: #475569;
    --accent: #3b82f6;
    --accent2: #60a5fa;
    --gold: #f59e0b;
    --green: #10b981;
    --red: #ef4444;
    --amber: #f59e0b;
    --text1: #f1f5f9;
    --text2: #cbd5e1;
    --text3: #64748b;
    --mono: 'Syne Mono', monospace;
    --sans: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  }
  .app { min-height: 100vh; background: var(--bg); color: var(--text1); font-family: var(--sans); padding-bottom: 60px; }
  .header { background: linear-gradient(135deg,#1e3a5f,#0f172a); border-bottom: 1px solid #1e3a5f; padding: 18px 20px 14px; position: relative; overflow: hidden; }
  .header-content { max-width: 700px; margin: 0 auto; }
  .header-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .logo-icon { background: #2563eb; border-radius: 7px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .logo-text { font-size: 10px; letter-spacing: 2px; color: #3b82f6; font-weight: 700; }
  .header-title { font-size: 19px; font-weight: 800; color: #f8fafc; margin: 0; }
  .header-sub { margin: 3px 0 0; font-size: 11px; color: #475569; }
  .tab-bar { display: flex; gap: 0; border-bottom: 1px solid var(--border); background: var(--bg2); padding: 0 32px; justify-content: center; }
  .tab { padding: 14px 24px; font-size: 13px; font-weight: 700; color: var(--text3); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; letter-spacing: 0.3px; }
  .tab:hover { color: var(--text2); }
  .tab.active { color: var(--accent2); border-bottom-color: var(--accent); }
  .content { padding: 18px 14px 60px; max-width: 700px; margin: 0 auto; }
  .content-wide { max-width: 1000px; }
  
  .card { background: var(--bg2); border: 1px solid var(--border); border-radius: 13px; padding: 15px 16px; margin-bottom: 9px; }
  .card-title { font-size: 10px; font-weight: 700; color: #3b82f6; letter-spacing: 1px; margin-bottom: 7px; text-transform: uppercase; }
  
  .search-container { position: relative; }
  .search-input { width: 100%; background: #0f172a; border: 2px solid var(--border); border-radius: 9px; padding: 11px 13px; font-size: 14px; color: #f1f5f9; outline: none; box-sizing: border-box; transition: border-color 0.2s; }
  .search-input:focus { border-color: var(--accent); }
  .search-dropdown { position: absolute; top: calc(100% + 3px); left: 0; right: 0; background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; max-height: 180px; overflow-y: auto; z-index: 200; box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
  .search-item { padding: 9px 13px; cursor: pointer; font-size: 13px; color: #e2e8f0; border-bottom: 1px solid #0f172a; display: flex; align-items: center; gap: 7px; transition: background 0.1s; }
  .search-item:hover { background: #334155; }
  .search-item span { color: #3b82f6; font-size: 10px; }
  
  .alert-banner { margin-top: 7px; padding: 9px 11px; background: rgba(239,68,68,0.12); border-radius: 7px; border: 1px solid rgba(239,68,68,0.3); font-size: 12px; color: #fca5a5; line-height: 1.5; }
  
  .currency-toggle { display: flex; gap: 6px; margin-bottom: 10px; }
  .currency-btn { padding: 6px 14px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; border: 2px solid var(--border); background: transparent; color: var(--text3); }
  .currency-btn.active { border-color: var(--accent); background: rgba(37,99,235,0.15); color: #60a5fa; }
  .usd-input-wrapper { display: flex; align-items: center; gap: 6px; margin-left: auto; }
  .usd-input { width: 70px; background: #0f172a; border: 1px solid var(--border); border-radius: 6px; padding: 4px 8px; font-size: 12px; color: #f1f5f9; outline: none; text-align: right; }
  
  .amount-input-wrapper { display: flex; align-items: center; gap: 9px; }
  .amount-input { flex: 1; background: #0f172a; border: 2px solid var(--border); border-radius: 9px; padding: 11px 13px; font-size: 14px; color: #f1f5f9; outline: none; box-sizing: border-box; }
  .amount-unit { color: var(--text3); font-size: 13px; white-space: nowrap; }

  .royalty-options { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
  .royalty-option { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 10px 14px; cursor: pointer; transition: all 0.15s; }
  .royalty-option:hover { border-color: var(--border2); }
  .royalty-option.selected { border-color: var(--accent); background: rgba(37,99,235,0.06); }
  .royalty-option-rate { font-size: 14px; font-weight: 700; color: #10b981; }
  .royalty-option-desc { font-size: 11px; color: var(--text3); margin-top: 3px; line-height: 1.4; }

  /* Steps UI Components */
  .result-area { display: flex; flex-direction: column; gap: 16px; margin-top: 15px; }
  .steps { background: var(--bg2); border: 1px solid var(--border); border-radius: 13px; overflow: hidden; }
  .step { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; border-bottom: 1px solid var(--border); }
  .step:last-child { border-bottom: none; }
  .step-num { width: 24px; height: 24px; border-radius: 50%; background: var(--bg4); border: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 11px; color: var(--text3); flex-shrink: 0; }
  .step.active .step-num { background: rgba(59,130,246,0.15); border-color: var(--accent); color: var(--accent2); }
  .step.no-treaty .step-num { background: rgba(239,68,68,0.15); border-color: #ef4444; color: #fca5a5; }
  .step-body { flex: 1; }
  .step-title { font-size: 12px; font-weight: 700; color: var(--text2); letter-spacing: 0.5px; margin-bottom: 8px; }
  .step-content { font-size: 12px; color: var(--text1); line-height: 1.6; }
  
  .badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
  .badge-cap { background: rgba(16,185,129,0.12); color: var(--green); border: 1px solid rgba(16,185,129,0.25); }
  .badge-sep { background: rgba(245,158,11,0.12); color: var(--gold); border: 1px solid rgba(245,158,11,0.25); }
  .badge-red { background: rgba(239,68,68,0.12); color: var(--red); border: 1px solid rgba(239,68,68,0.25); }
  .badge-gold { background: rgba(245,158,11,0.12); color: var(--gold); border: 1px solid rgba(245,158,11,0.25); }

  .formula-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; font-family: var(--mono); font-size: 12px; color: var(--text2); line-height: 1.8; }
  .formula-box .var { color: #94a3b8; font-weight: 600; }
  .formula-box .eq { color: var(--accent2); }
  
  .tax-breakdown { background: var(--bg3); border: 1px solid var(--border); border-radius: 9px; overflow: hidden; margin-top: 4px; }
  .tax-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 14px; border-bottom: 1px solid var(--bg2); }
  .tax-row:last-child { border-bottom: none; }
  .tax-row.total { background: rgba(59,130,246,0.06); border-top: 1px solid var(--accent); }
  .tax-row.total.no-treaty { background: rgba(239,68,68,0.06); border-top: 1px solid #ef4444; }
  .tax-label { font-size: 12px; color: var(--text3); }
  .tax-val { font-size: 13px; color: var(--text1); font-weight: 500; font-variant-numeric: tabular-nums; }
  .tax-val.gold { color: var(--gold); font-size: 14px; font-weight: 700; }
  .tax-val.accent { color: var(--accent2); }
  .tax-val.red { color: #f87171; }
  
  .insight-box { margin-top: 15px; background: rgba(71,85,105,0.15); border: 1px solid rgba(71,85,105,0.25); border-radius: 9px; padding: 14px; }
  .insight-title { font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; }
  .insight-section { margin-bottom: 12px; }
  .insight-section:last-child { margin-bottom: 0; }
  .insight-label { font-size: 10px; font-weight: 700; color: var(--text3); margin-bottom: 4px; }
  .insight-text { font-size: 11px; color: #cbd5e1; line-height: 1.5; background: var(--bg3); border: 1px solid var(--border); border-radius: 5px; padding: 8px 10px; }

  .protocol-badge { display: inline-block; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); padding: 3px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; margin-bottom: 4px; }

  .nts-link-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 6px; color: #60a5fa; font-size: 11px; font-weight: 700; text-decoration: none; transition: background 0.2s; margin-top: 4px; }
  .nts-link-btn:hover { background: rgba(59,130,246,0.25); }

  .footer-text { margin-top: 18px; font-size: 11px; color: #334155; text-align: center; line-height: 1.7; }

  /* DB Table Styles */
  .table-wrap { overflow-x: auto; background: var(--bg3); border-radius: 9px; border: 1px solid var(--border); }
  table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
  thead th { background: #1e3a5f; color: #60a5fa; padding: 12px 14px; font-size: 11px; font-weight: 700; cursor: pointer; user-select: none; white-space: nowrap; }
  tbody tr { border-top: 1px solid var(--border); transition: background 0.1s; cursor: pointer; }
  tbody tr:hover { background: #1e293b; }
  tbody td { padding: 12px 14px; color: var(--text2); vertical-align: top; }
`;

export default function App() {
  const [tab, setTab] = useState("calc");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [royaltyIdx, setRoyaltyIdx] = useState(0);

  // 금액 및 환율
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("KRW");
  const [usdRate, setUsdRate] = useState(String(DEFAULT_USD_RATE));

  // DB 탭 필터/정렬
  const [dbSearch, setDbSearch] = useState("");
  const [sortField, setSortField] = useState("num");
  const [sortDir, setSortDir] = useState("asc");

  const countries = useMemo(() => TAX_DB.map((d) => d.country).sort(), []);
  const filtered = useMemo(
    () => (search ? countries.filter((c) => c.includes(search)) : countries),
    [search, countries]
  );

  const entry = useMemo(
    () => TAX_DB.find((d) => d.country === country),
    [country]
  );
  const isNoTreaty = search.length > 0 && filtered.length === 0;
  const usdRateNum = parseFloat(usdRate) || DEFAULT_USD_RATE;

  const feeKRW = useMemo(() => {
    const raw = parseFloat(amount.replace(/,/g, "")) || 0;
    return currency === "USD" ? raw * usdRateNum : raw;
  }, [amount, currency, usdRateNum]);

  const result = useMemo(() => {
    if (!country && !isNoTreaty) return null;
    return calculateTax(entry, royaltyIdx, feeKRW);
  }, [entry, royaltyIdx, feeKRW, country, isNoTreaty]);

  const handlePickCountry = (c) => {
    setCountry(c);
    setSearch(c);
    setShowDrop(false);
    setRoyaltyIdx(0);
  };

  const fmtCurrency = (n) => {
    if (!n) return "0원";
    if (currency === "USD")
      return (
        "$" +
        (n / usdRateNum).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
    return Math.round(n).toLocaleString() + "원";
  };

  // DB 테이블 정렬 로직
  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredDB = useMemo(() => {
    let data = [...TAX_DB];
    if (dbSearch) data = data.filter((d) => d.country.includes(dbSearch));
    data.sort((a, b) => {
      let av = a[sortField],
        bv = b[sortField];
      if (sortField === "royalty_rate") {
        av = a.royalty[0]?.rate ?? 999;
        bv = b.royalty[0]?.rate ?? 999;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [dbSearch, sortField, sortDir]);

  return (
    <div className="app" onClick={() => setShowDrop(false)}>
      <style>{STYLES}</style>
      <div className="header">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">COLOSO GLOBAL</span>
          </div>
          <h1 className="header-title">Coloso 국가별 조세조약 계산기</h1>
          <p className="header-sub">
            국세청 조세조약상 제한세율 요약표 (2025.8 기준) · 97개 체약국
          </p>
        </div>
      </div>

      <div className="tab-bar">
        {[
          ["calc", "원천징수 계산기"],
          ["db", "조세조약 DB 조회"],
        ].map(([k, l]) => (
          <div
            key={k}
            className={`tab ${tab === k ? "active" : ""}`}
            onClick={() => setTab(k)}
          >
            {l}
          </div>
        ))}
      </div>

      {tab === "calc" && (
        <div className="content">
          <div className="card">
            <div className="card-title">STEP 1 · 연사 거주국 검색</div>
            <div
              className="search-container"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDrop(true);
                  if (!e.target.value) setCountry("");
                }}
                onFocus={() => setShowDrop(true)}
                placeholder="🔍  국가명 입력 (예: 미국, 캐나다, 일본, 호주)"
                className="search-input"
                style={{
                  borderColor: country
                    ? "#2563eb"
                    : isNoTreaty
                    ? "#ef4444"
                    : "#334155",
                }}
              />
              {showDrop && search && filtered.length > 0 && (
                <div className="search-dropdown">
                  {filtered.slice(0, 20).map((c) => (
                    <div
                      key={c}
                      onClick={() => handlePickCountry(c)}
                      className="search-item"
                    >
                      <span>●</span> {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isNoTreaty && (
              <div className="alert-banner">
                ⚠ <strong>조세조약 미체결국</strong> — 국내법 세율{" "}
                <strong>22%</strong> (소득세 20% + 지방소득세 2%) 적용 / Tax
                Reduction Application 불필요
              </div>
            )}
          </div>

          {entry && (
            <div className="card">
              <div className="card-title" style={{ color: "#64748b" }}>
                🔍 조약 요약 — {country}
              </div>
              {entry.royalty.length > 1 ? (
                <div className="royalty-options">
                  {entry.royalty.map((r, i) => (
                    <div
                      key={i}
                      className={`royalty-option ${
                        royaltyIdx === i ? "selected" : ""
                      }`}
                      onClick={() => setRoyaltyIdx(i)}
                    >
                      <div className="royalty-option-rate">
                        {fmtPct(r.rate)}
                      </div>
                      <div className="royalty-option-desc">
                        {r.sub && (
                          <strong style={{ color: "#60a5fa", marginRight: 4 }}>
                            {r.sub}
                          </strong>
                        )}
                        {r.content || r.article + " " + r.para}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#10b981",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  제한세율: {fmtPct(entry.royalty[0].rate)}
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      fontWeight: 400,
                      marginLeft: "6px",
                    }}
                  >
                    ({entry.royalty[0].article})
                  </span>
                </div>
              )}
            </div>
          )}

          {(country || isNoTreaty) && (
            <div className="card">
              <div className="card-title">STEP 2 · 계약 금액 입력 (선택)</div>
              <div className="currency-toggle">
                {["KRW", "USD"].map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      setAmount("");
                    }}
                    className={`currency-btn ${
                      currency === cur ? "active" : ""
                    }`}
                  >
                    {cur}
                  </button>
                ))}
                {currency === "USD" && (
                  <div className="usd-input-wrapper">
                    <span style={{ fontSize: 11, color: "#64748b" }}>
                      환율 1 USD =
                    </span>
                    <input
                      className="usd-input"
                      value={usdRate}
                      onChange={(e) => setUsdRate(e.target.value)}
                    />
                    <span style={{ fontSize: 11, color: "#64748b" }}>원</span>
                  </div>
                )}
              </div>

              <div className="amount-input-wrapper">
                <input
                  className="amount-input"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setAmount(
                      val ? parseInt(val, 10).toLocaleString("ko-KR") : ""
                    );
                  }}
                  placeholder={
                    currency === "KRW" ? "예: 5,000,000" : "예: 3,700"
                  }
                />
                <span className="amount-unit">{currency}</span>
              </div>

              {currency === "USD" && feeKRW > 0 && (
                <div style={{ marginTop: 5, fontSize: 11, color: "#475569" }}>
                  ≈ {Math.round(feeKRW).toLocaleString()}원 (1 USD ={" "}
                  {usdRateNum.toLocaleString()}원 기준)
                </div>
              )}
            </div>
          )}

          {/* STEP-BY-STEP RESULTS UI */}
          {result && (
            <div className="result-area">
              <div className="steps">
                {/* STEP 01 */}
                <div
                  className={`step ${
                    result.mode === "no_treaty" ? "no-treaty" : "active"
                  }`}
                >
                  <div className="step-num">01</div>
                  <div className="step-body">
                    <div
                      className="step-title"
                      style={{
                        color:
                          result.mode === "no_treaty"
                            ? "#ef4444"
                            : "var(--text2)",
                      }}
                    >
                      {result.mode === "no_treaty"
                        ? "법령 확인 — 조세조약 미체결국 (국내법 적용)"
                        : "법령 확인 — 조세조약 제2조 (대상조세)"}
                    </div>
                    <div className="step-content">
                      {result.mode === "no_treaty" ? (
                        <span
                          className="badge badge-red"
                          style={{ marginBottom: "8px" }}
                        >
                          ⚠️ 지방소득세 별도 가산 (국내법)
                        </span>
                      ) : (
                        <span
                          className={`badge ${
                            result.mode === "cap" ? "badge-cap" : "badge-sep"
                          }`}
                          style={{ marginBottom: "8px" }}
                        >
                          {result.mode === "cap"
                            ? "✅ 지방소득세 포함 (CAP 방식)"
                            : "⚠️ 지방소득세 별도 가산"}
                        </span>
                      )}
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text3)",
                          marginTop: "4px",
                          lineHeight: "1.6",
                        }}
                      >
                        {result.mode === "no_treaty"
                          ? "해당 국가는 대한민국과 조세조약이 체결되어 있지 않아, 국내 세법에 따른 원천징수세율(소득세 20% + 지방소득세 2%)이 적용됩니다."
                          : result.mode === "cap"
                          ? "대한민국의 주민세(지방소득세)가 조약 적용 대상 조세에 포함됨 → 조약 제한세율이 소득세+지방세의 합계 상한선으로 작동"
                          : "대한민국의 주민세(지방소득세)가 조약 적용 대상 조세에 포함되지 않음 → 조약 제한세율은 소득세에만 적용되며, 지방세는 별도 추가"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 02 */}
                <div
                  className={`step ${
                    result.mode === "no_treaty" ? "no-treaty" : "active"
                  }`}
                >
                  <div className="step-num">02</div>
                  <div className="step-body">
                    <div className="step-title">
                      {result.mode === "no_treaty"
                        ? "사용료 조문 매칭 — 해당 없음"
                        : `사용료 조문 매칭 — ${entry.royalty[royaltyIdx]?.article} ${entry.royalty[royaltyIdx]?.para}`}
                    </div>
                    <div className="step-content">
                      <div
                        style={{
                          marginBottom:
                            result.mode !== "no_treaty" &&
                            entry.royalty[royaltyIdx]?.content
                              ? "8px"
                              : "0",
                        }}
                      >
                        <span style={{ color: "var(--text3)" }}>
                          적용 제한세율:{" "}
                        </span>
                        <span
                          className="badge badge-gold"
                          style={{ marginLeft: 4 }}
                        >
                          {fmtPct(result.rate)}
                        </span>
                      </div>
                      {result.mode !== "no_treaty" &&
                        entry.royalty[royaltyIdx]?.content && (
                          <div
                            style={{
                              fontSize: "11px",
                              color: "var(--text2)",
                              lineHeight: "1.6",
                              background: "var(--bg3)",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {entry.royalty[royaltyIdx].content}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* STEP 03 */}
                <div
                  className={`step ${
                    result.mode === "no_treaty" ? "no-treaty" : "active"
                  }`}
                >
                  <div className="step-num">03</div>
                  <div className="step-body">
                    <div className="step-title">
                      산식 적용 —{" "}
                      {result.mode === "cap"
                        ? "Cap 방식 (지방세 포함 상한)"
                        : "별도 가산 방식"}
                    </div>
                    <div className="step-content">
                      <div className="formula-box">
                        {result.mode === "cap" ? (
                          <>
                            <div>
                              <span className="var">소득세</span>{" "}
                              <span className="eq">=</span> 지급금액 × 제한세율(
                              {fmtPct(result.rate)}) ÷ 1.1
                            </div>
                            <div>
                              <span className="var">지방소득세</span>{" "}
                              <span className="eq">=</span> 소득세 × 10%
                            </div>
                            <div
                              style={{
                                marginTop: "4px",
                                borderTop: "1px solid var(--border)",
                                paddingTop: "4px",
                              }}
                            >
                              <span className="var">합계</span>{" "}
                              <span className="eq">=</span> 소득세 + 지방소득세{" "}
                              <span
                                style={{ color: "var(--green)", marginLeft: 4 }}
                              >
                                = 지급금액 × {fmtPct(result.rate)} (Cap)
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="var">소득세</span>{" "}
                              <span className="eq">=</span> 지급금액 ×{" "}
                              {result.mode === "no_treaty"
                                ? "국내세율(20%)"
                                : `제한세율(${fmtPct(result.rate)})`}
                            </div>
                            <div>
                              <span className="var">지방소득세</span>{" "}
                              <span className="eq">=</span> 소득세 × 10%{" "}
                              <span
                                style={{
                                  color: "var(--red)",
                                  fontSize: "11px",
                                  marginLeft: 4,
                                }}
                              >
                                (별도 가산)
                              </span>
                            </div>
                            <div
                              style={{
                                marginTop: "4px",
                                borderTop: "1px solid var(--border)",
                                paddingTop: "4px",
                              }}
                            >
                              <span className="var">합계</span>{" "}
                              <span className="eq">=</span> 소득세 × 1.1{" "}
                              <span
                                style={{ color: "var(--amber)", marginLeft: 4 }}
                              >
                                = 지급금액 × {fmtPct(result.effectiveTotal)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 04 */}
                <div
                  className={`step ${
                    result.mode === "no_treaty" ? "no-treaty" : "active"
                  }`}
                >
                  <div className="step-num">04</div>
                  <div className="step-body">
                    <div className="step-title">
                      최종 세액 — 지급금액 {fmtCurrency(feeKRW)}
                    </div>
                    <div className="step-content">
                      <div className="tax-breakdown">
                        <div className="tax-row">
                          <span className="tax-label">
                            계약 금액 (세전 Gross)
                          </span>
                          <span className="tax-val">{fmtCurrency(feeKRW)}</span>
                        </div>
                        <div className="tax-row">
                          <span className="tax-label">
                            소득세 (
                            {fmtPct(
                              result.mode === "cap"
                                ? result.rate / 1.1
                                : result.rate
                            )}{" "}
                            적용)
                          </span>
                          <span className="tax-val accent">
                            - {fmtCurrency(result.incomeTax)}
                          </span>
                        </div>
                        <div className="tax-row">
                          <span className="tax-label">
                            지방소득세 (소득세 × 10%)
                            {result.mode !== "cap" && (
                              <span
                                style={{
                                  color: "var(--red)",
                                  fontSize: "10px",
                                  marginLeft: "4px",
                                }}
                              >
                                {" "}
                                별도가산
                              </span>
                            )}
                          </span>
                          <span className="tax-val red">
                            - {fmtCurrency(result.localTax)}
                          </span>
                        </div>
                        <div
                          className={`tax-row total ${
                            result.mode === "no_treaty" ? "no-treaty" : ""
                          }`}
                        >
                          <span
                            className="tax-label"
                            style={{ fontWeight: 700, color: "var(--text1)" }}
                          >
                            총 원천징수세액
                          </span>
                          <span
                            className="tax-val gold"
                            style={{
                              color:
                                result.mode === "no_treaty"
                                  ? "#ef4444"
                                  : "var(--gold)",
                            }}
                          >
                            - {fmtCurrency(result.total)}
                          </span>
                        </div>
                        <div className="tax-row">
                          <span
                            className="tax-label"
                            style={{ color: "#cbd5e1" }}
                          >
                            연사 실수령액 (세후 Net)
                          </span>
                          <span
                            className="tax-val"
                            style={{
                              color: "#10b981",
                              fontSize: 15,
                              fontWeight: 800,
                            }}
                          >
                            {fmtCurrency(feeKRW - result.total)}
                          </span>
                        </div>
                        <div
                          className="tax-row"
                          style={{ borderTop: "1px solid var(--bg2)" }}
                        >
                          <span className="tax-label">합산 실효세율</span>
                          <span
                            className="tax-val"
                            style={{ color: "var(--amber)" }}
                          >
                            {((result.total / (feeKRW || 1)) * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {currency === "USD" && feeKRW > 0 && (
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 11,
                            color: "#475569",
                            textAlign: "right",
                          }}
                        >
                          원화 산출 기준 — 총 세액:{" "}
                          {Math.round(result.total).toLocaleString()}원
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 법령 정보 박스 (조세조약 체결국 전용) */}
              {result.mode !== "no_treaty" && entry && (
                <div className="insight-box">
                  <div className="insight-title">
                    <span>📜</span> 법령 근거 — Insight Box
                  </div>
                  <div className="insight-section">
                    <div className="insight-label">
                      제2조 — 대상조세 (지방소득세 판정 근거)
                    </div>
                    <div className="insight-text">{entry.article2_text}</div>
                  </div>
                  <div className="insight-section">
                    <div className="insight-label">
                      {entry.royalty[0]?.article || "제12조"} — 사용료 제한세율
                      조문
                    </div>
                    <div className="insight-text">{entry.article12_text}</div>
                  </div>
                  {entry.protocol && entry.protocol.exists && (
                    <div className="insight-section">
                      <div className="protocol-badge">
                        개정 의정서({entry.protocol.date})
                      </div>
                      <div className="insight-text">{entry.protocol.text}</div>
                    </div>
                  )}
                  <div className="divider" style={{ margin: "14px 0" }} />
                  <div
                    className="insight-label"
                    style={{ marginBottom: "6px" }}
                  >
                    국세청 조세조약 원문 확인
                  </div>
                  <a
                    className="nts-link-btn"
                    href={NTS_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      국세법령정보시스템 · 조세조약 원문 조회 → {country}
                    </span>
                  </a>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      marginTop: "8px",
                    }}
                  >
                    💡 조세조약 원문은 taxlaw.nts.go.kr 접속 후 '{country}'
                    국가명으로 검색하여 확인하세요.
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="footer-text">
            출처: 국세청 조세조약상 제한세율 요약표 (2025.8 현재) · 강의 콘텐츠
            저작권(Royalty) 기준
            <br />
            최종 세율 판단은 반드시 회계팀 또는 세무사 확인 후 계약서에
            반영하세요.
          </p>
        </div>
      )}

      {/* DB 조회 탭 */}
      {tab === "db" && (
        <div className="content content-wide">
          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div className="card-title">전체 조세조약 DB — 97개국</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                국세청 조세조약 제한세율 요약표 2025년 8월 현재 기준
              </div>
            </div>
            <div style={{ position: "relative", width: "250px" }}>
              <input
                placeholder="국가명 검색..."
                value={dbSearch}
                onChange={(e) => setDbSearch(e.target.value)}
                className="search-input"
                style={{ padding: "8px 12px" }}
              />
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {[
                    ["num", "#"],
                    ["country", "체약상대국"],
                    ["royalty_rate", "사용료 제한세율"],
                    ["is_cap", "지방세 판정"],
                    ["article2_text", "제2조 (대상조세) 요약"],
                    ["", "국세청 원문"],
                  ].map(([f, l]) => (
                    <th key={f || l} onClick={() => f && handleSort(f)}>
                      {l} {sortField === f && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDB.map((d) => {
                  const royaltyRates = [
                    ...new Set(
                      d.royalty
                        .filter((r) => typeof r.rate === "number")
                        .map((r) => r.rate)
                    ),
                  ];
                  return (
                    <tr
                      key={d.country}
                      onClick={() => {
                        setCountry(d.country);
                        setSearch(d.country);
                        setRoyaltyIdx(0);
                        setTab("calc");
                      }}
                    >
                      <td style={{ color: "#64748b" }}>{d.num}</td>
                      <td style={{ color: "#f1f5f9", fontWeight: 600 }}>
                        {d.country}
                      </td>
                      <td>
                        {royaltyRates.length === 0
                          ? "-"
                          : royaltyRates.map((r, i) => (
                              <span
                                key={i}
                                style={{
                                  background: "rgba(245,158,11,0.15)",
                                  color: "#fbbf24",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  marginRight: "4px",
                                  fontWeight: 700,
                                }}
                              >
                                {fmtPct(r)}
                              </span>
                            ))}
                        {d.royalty.some((r) => r.rate === "면제") && (
                          <span
                            style={{
                              background: "rgba(100,116,139,0.15)",
                              color: "#94a3b8",
                              padding: "2px 6px",
                              borderRadius: "4px",
                            }}
                          >
                            면제
                          </span>
                        )}
                      </td>
                      <td>
                        {d.is_cap ? (
                          <span style={{ color: "#10b981" }}>CAP 포함</span>
                        ) : (
                          <span style={{ color: "#ef4444" }}>별도 가산</span>
                        )}
                      </td>
                      <td
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          maxWidth: "280px",
                          lineHeight: 1.5,
                        }}
                      >
                        {d.article2_text.length > 80
                          ? d.article2_text.substring(0, 80) + "..."
                          : d.article2_text}
                      </td>
                      <td>
                        <a
                          className="nts-link-btn"
                          style={{ padding: "4px 8px" }}
                          href={NTS_BASE}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          NTS ↗
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            style={{
              marginTop: "12px",
              fontSize: "11px",
              color: "#64748b",
              lineHeight: 1.7,
              textAlign: "center",
            }}
          >
            ※ 표의 행을 클릭하면 계산기 화면으로 이동하여 상세 요약과 세액을
            확인할 수 있습니다.
          </div>
        </div>
      )}
    </div>
  );
}
