(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var form = document.getElementById('apply-form');
  if (!form) return;

  var phonePattern = /^01[016789]-?\d{3,4}-?\d{4}$/;
  var status = form.querySelector('.form-status');

  function setError(name, message) {
    var field = form.querySelector('[data-error-for="' + name + '"]');
    var wrapper = field ? field.parentElement : null;
    if (field) field.textContent = message;
    if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(message));
  }

  function validate() {
    var data = new FormData(form);
    var valid = true;

    var checks = {
      name: function () {
        return String(data.get('name') || '').trim() ? '' : '이름을 입력해 주세요.';
      },
      phone: function () {
        var value = String(data.get('phone') || '').trim();
        if (!value) return '연락처를 입력해 주세요.';
        return phonePattern.test(value) ? '' : '올바른 연락처 형식으로 입력해 주세요. (예: 010-0000-0000)';
      },
      district: function () {
        if (!data.get('district')) return '거주 지역을 선택해 주세요.';
        return data.get('district') === 'gangdong' ? '' : '모집 대상은 강동구 거주자입니다. 그 외 지역은 지원이 어려울 수 있습니다.';
      },
      experience: function () {
        return data.get('experience') ? '' : '돌봄/양육 경험을 선택해 주세요.';
      },
      time: function () {
        return data.getAll('time').length ? '' : '활동 가능 시간대를 하나 이상 선택해 주세요.';
      },
      consent: function () {
        return data.get('consent') ? '' : '개인정보 수집·이용에 동의해 주세요.';
      }
    };

    Object.keys(checks).forEach(function (name) {
      var message = checks[name]();
      if (message) valid = false;
      setError(name, message);
    });

    return valid;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';

    if (!validate()) {
      var firstError = form.querySelector('.field.is-invalid input, .field.is-invalid select');
      if (firstError) firstError.focus();
      return;
    }

    // 데모 페이지: 백엔드가 없으므로 입력값을 전송하거나 저장하지 않는다.
    status.textContent = '데모 안내: 이 페이지는 프로토타입입니다. 입력하신 정보는 전송되거나 저장되지 않습니다.';
  });
})();
