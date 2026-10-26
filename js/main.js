(function () {
  var content = window.SITE_CONTENT || {};

  // Amplitude가 로드되지 않은 환경(로컬 파일, 차단 등)에서도 페이지는 그대로 동작한다.
  // 이름·연락처 등 입력값은 보내지 않는다.
  function track(name, props) {
    try {
      if (window.amplitude && window.amplitude.track) window.amplitude.track(name, props || {});
    } catch (e) {}
  }

  Array.prototype.forEach.call(document.querySelectorAll('a[href="#apply"]'), function (link) {
    link.addEventListener('click', function () {
      var section = link.closest('header') ? null : link.closest('section');
      var location = link.closest('header') ? 'header'
        : section && section.id ? section.id
        : link.closest('.panel') ? 'apply-panel' : 'other';
      track('CTA Clicked', { location: location });
    });
  });

  // ---------- 콘텐츠 설정 적용 (js/content.js가 단일 원본) ----------
  var benefits = content.coreBenefits || {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-benefit]'), function (card) {
    var data = benefits[card.getAttribute('data-benefit')];
    if (!data) return;
    card.querySelector('.benefit-card__title').textContent = data.title;
    card.querySelector('.benefit-card__desc').textContent = data.description;
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-benefit-desc]'), function (el) {
    var data = benefits[el.getAttribute('data-benefit-desc')];
    if (data) el.textContent = data.description;
  });

  var texts = content.text || {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-text]'), function (el) {
    var value = texts[el.getAttribute('data-text')];
    if (value) el.textContent = value;
  });

  if (content.cta) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-cta]'), function (link) {
      link.setAttribute('href', content.cta.target);
      var label = link.querySelector('[data-cta-label]');
      if (label) label.textContent = content.cta.label;
    });
  }

  renderCampaign(content.campaign);

  function renderCampaign(campaign) {
    var root = document.getElementById('campaign');
    if (!root || !campaign) return;

    var items = campaign.enabled === false ? [] : (campaign.items || []).filter(function (item) { return item.enabled; });
    // 모든 제안이 꺼져 있으면 배너 자체를 숨겨 빈 여백을 남기지 않는다.
    if (!items.length) {
      root.hidden = true;
      return;
    }

    root.querySelector('.campaign__title').textContent = campaign.headline;
    var list = root.querySelector('.campaign__items');
    list.innerHTML = '';
    list.classList.toggle('campaign__items--single', items.length === 1);

    items.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'campaign__item';

      if (campaign.prototypePreviewMode && item.statusLabel) {
        var tag = document.createElement('p');
        tag.className = 'campaign__tag';
        tag.textContent = item.statusLabel;
        li.appendChild(tag);
      }

      var heading = document.createElement('h4');
      heading.className = 'campaign__name';
      heading.textContent = item.headline;
      li.appendChild(heading);

      var copy = document.createElement('p');
      copy.className = 'campaign__copy';
      copy.textContent = item.copy;
      li.appendChild(copy);

      if (item.conditionCopy) {
        var condition = document.createElement('p');
        condition.className = 'campaign__condition';
        condition.textContent = item.conditionCopy;
        li.appendChild(condition);
      }

      list.appendChild(li);
    });

    root.hidden = false;
  }

  // ---------- 모바일 메뉴 ----------
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

  // ---------- FAQ 아코디언 ----------
  Array.prototype.forEach.call(document.querySelectorAll('.faq__q'), function (button) {
    button.addEventListener('click', function () {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
      if (!expanded) track('FAQ Opened', { question: button.textContent.trim() });
    });
  });

  // ---------- 지원 폼 (프로토타입: 전송·저장하지 않음) ----------
  var form = document.getElementById('apply-form');
  if (!form) return;

  var phonePattern = /^01[016789]-?\d{3,4}-?\d{4}$/;
  var status = form.querySelector('.form-status');

  var started = false;
  form.addEventListener('focusin', function () {
    if (started) return;
    started = true;
    track('Form Started');
  });

  function setError(name, message) {
    var field = form.querySelector('[data-error-for="' + name + '"]');
    var wrapper = field ? field.parentElement : null;
    if (field) field.textContent = message;
    if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(message));
    var input = form.querySelector('[name="' + name + '"]');
    if (input && input.type !== 'checkbox') input.setAttribute('aria-invalid', String(Boolean(message)));
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
        return phonePattern.test(value) ? '' : '휴대폰 번호 형식으로 입력해 주세요. (예: 010-0000-0000)';
      },
      district: function () {
        return String(data.get('district') || '').trim() ? '' : '거주 동네를 입력해 주세요. (예: 강동구 천호동)';
      },
      experience: function () {
        return data.get('experience') ? '' : '육아·돌봄 경험을 선택해 주세요.';
      },
      time: function () {
        return data.getAll('time').length ? '' : '평일 활동 가능 시간대를 하나 이상 선택해 주세요.';
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
      var invalid = Array.prototype.map.call(form.querySelectorAll('[data-error-for]'), function (el) {
        return el.textContent ? el.getAttribute('data-error-for') : '';
      }).filter(Boolean);
      track('Form Submit Failed', { error_fields: invalid, error_count: invalid.length });
      var firstError = form.querySelector('.is-invalid input, .is-invalid select');
      if (firstError) firstError.focus();
      return;
    }

    var data = new FormData(form);
    track('Form Submitted', {
      experience: data.get('experience'),
      time_slots: data.getAll('time'),
      training: data.get('training') || 'earliest',
      has_referrer: Boolean(String(data.get('referrer') || '').trim())
    });

    // 백엔드가 없으므로 입력값을 전송하거나 저장하지 않는다.
    status.textContent = '';
    status.appendChild(document.createTextNode('프로토타입에서는 실제 지원서가 접수·저장되지 않습니다. 실제 지원은 '));
    var link = document.createElement('a');
    link.href = (content.project && content.project.officialSite) || 'https://woorihero.com/hero/about';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = '공식 홈페이지';
    status.appendChild(link);
    status.appendChild(document.createTextNode('에서 할 수 있어요.'));
  });
})();
