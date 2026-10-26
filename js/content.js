// 모든 혜택 문구와 캠페인 설정의 단일 원본.
// content-config.example.json과 같은 내용이며, 공개 배포 전 운영 승인 상태에 맞게 수정한다.
window.SITE_CONTENT = {
  project: {
    brandName: "우리동네 돌봄히어로",
    // 내부 과제 목표(4주 / 250명 / 20건 / 8%)는 공개 화면에 노출하지 않는다.
    showTargetsPublicly: false
  },

  coreBenefits: {
    "activity-pay": {
      title: "돌봄 활동으로 수입 기회",
      // 현행 회차 활동비 금액이 확인되기 전까지 금액을 쓰지 않는다.
      description: "활동비와 지급 기준은 모집 공고에서 확인하세요."
    },
    "professional-training": {
      title: "활동 전 전문교육",
      description: "돌봄 활동에 필요한 이론과 실무 교육 과정을 안내합니다."
    },
    "local-matching": {
      title: "시간·지역을 고려한 가정 매칭",
      description: "활동 가능한 시간과 지역을 고려해 돌봄 가정과의 연결을 지원합니다."
    },
    "experience-value": {
      title: "양육 경험이 강점이 되는 일",
      description: "자녀 양육 경험과 기존 돌봄 경력을 활동의 강점으로 활용해 보세요."
    }
  },

  campaign: {
    // 다섯 번째 혜택 범주 전체 노출 스위치. 운영 승인 전 공개 배포에서는 false로 둔다.
    enabled: true,
    headline: "처음 시작하는 선생님을 위한 응원 혜택",
    // true이면 시안 상태 라벨을 함께 표시한다. 공개 배포 시 운영 승인 후 false로 바꾼다.
    prototypePreviewMode: true,
    items: [
      {
        id: "first-activity-support",
        enabled: true,
        headline: "첫 활동 응원 패키지",
        copy: "첫 활동 완료 시 교재비 3만 원 환급 + 놀이키트 제공",
        conditionCopy: "과거 모집 공고를 기반으로 한 캠페인 시안입니다. 현 모집 회차 적용 여부와 조건을 확인해야 합니다.",
        statusLabel: "캠페인 시안 · 운영 확인 필요"
      },
      {
        id: "referral-support",
        enabled: true,
        headline: "지인 추천 동반 혜택",
        copy: "추천인과 신규 선생님에게 각각 2만 원의 활동지원금",
        conditionCopy: "신규 캠페인 제안입니다. 추천 인정 기준과 운영 승인 후 적용됩니다.",
        statusLabel: "캠페인 제안 · 운영 승인 후 시행"
      }
    ]
  },

  cta: {
    label: "지원 자격 확인하고 신청하기",
    target: "#apply"
  }
};
