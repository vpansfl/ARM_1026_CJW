// 모든 혜택 문구·금액·조건의 단일 원본. 페이지의 같은 숫자는 전부 여기서 채운다.
// 근거(화면 비노출) — project-notes/content-plan.md 참고
// [공식] woorihero.com /hero/about, /faq (2026-10-26 확인)
// [과거] 교재비 3만 원 환급: 과거 50플러스센터 모집 사례
// [캠페인] 지인 추천 2만 원: 이번 과제의 신규 제안
window.SITE_CONTENT = {
  project: {
    brandName: "우리동네 돌봄히어로",
    officialSite: "https://woorihero.com/hero/about",
    // 내부 과제 목표(4주 / 250명 / 20건 / 8%)는 공개 화면에 노출하지 않는다.
    showTargetsPublicly: false
  },

  coreBenefits: {
    "activity-pay": {
      title: "시급 11,000원부터, 오래 할수록 올라요",
      description: "근무 기간에 따라 시급이 최대 20,000원까지 올라요. 4주마다 정산해 그 주 금요일에 지급해요."
    },
    "professional-training": {
      title: "교육 한 번으로 계속 이어지는 일",
      description: "하루 면접·전문교육을 이수하면 바로 활동해요. 매달 보수교육과 1000가지 히어로 놀이법을 드려요."
    },
    "local-matching": {
      title: "집 근처 30분 거리, 원하는 시간에",
      description: "담당 매니저가 가까운 가정을 찾아 연결해요. 한 번 활동하면 최소 2시간을 보장해요."
    },
    "experience-value": {
      title: "육아 경험이 자격증이 되는 일",
      description: "장기 근무 시 아동놀이코치 2급 자격증을 발급해요. 활동 중 사고에 대비한 배상책임보험도 지원해요."
    }
  },

  // 여러 위치에서 반복되는 숫자·조건 문구
  text: {
    heroSummary: "시급 11,000원부터 · 교육 1회 이수 후 활동 · 1회 최소 2시간 보장",
    payRange: "11,000원부터 (근무 기간에 따라 최대 20,000원)",
    activityTime: "평일 등·하원 시간대, 1회 최소 2시간",
    faqPay: "시급 11,000원부터 시작해 근무 기간에 따라 최대 20,000원까지 올라요. 정기 돌봄은 4주 단위로 정산해 상세내역서를 보내 드리고 그 주 금요일에 지급해요. 비정기 돌봄은 돌봄이 끝난 다음 날 내역서를 안내해요.",
    faqTime: "한 번 활동하면 최소 2시간을 보장하며, 활동 시간은 가정마다 달라요. 주말·공휴일은 원하실 때만 지원하시면 되고 주말 요금으로 계산돼요."
  },

  campaign: {
    // 다섯 번째 혜택 범주 전체 노출 스위치
    enabled: true,
    headline: "처음 시작하는 선생님을 위한 응원 혜택",
    // true이면 각 항목에 근거 상태 라벨을 표시한다(시안 검토용).
    prototypePreviewMode: false,
    items: [
      {
        id: "first-activity-support",
        enabled: true,
        headline: "첫 활동 응원 패키지",
        copy: "첫 활동 시 놀이키트 제공 + 교재비 3만 원 환급",
        conditionCopy: "전문교육 수료 후 첫 돌봄 활동을 마치면 다음 정산일에 교재비를 환급해요.",
        statusLabel: "놀이키트 공식 제공 · 교재비 환급은 과거 사례 기반"
      },
      {
        id: "referral-support",
        enabled: true,
        headline: "지인 추천 동반 혜택",
        copy: "함께 시작하면 추천인과 신규 선생님 각 2만 원 활동지원금",
        conditionCopy: "지원서에 추천인 이름을 적고, 신규 선생님이 첫 4주 정산을 받으면 두 분 모두에게 지급해요.",
        statusLabel: "캠페인 제안 · 운영 승인 후 시행"
      }
    ]
  },

  cta: {
    label: "지원 자격 확인하고 신청하기",
    target: "#apply"
  }
};
