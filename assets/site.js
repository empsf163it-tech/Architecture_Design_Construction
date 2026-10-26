// HouseCraft Daily — Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
  }

  // 2. Contact / Project Consultation Intake Form
  const projectForm = document.querySelector('#project-form');
  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(projectForm);
      const note = document.querySelector('#form-note');
      const name = data.get('name') || 'Builder';
      const projectType = data.get('project_type') || 'Custom Build';
      const budget = data.get('budget') || 'Standard';

      if (note) {
        note.innerHTML = `<strong>Thank you, ${name}!</strong> Your consultation brief for a <em>${projectType}</em> (${budget}) has been recorded. Our architectural advisory team will review your specifications and contact you within 24 business hours.`;
        note.style.display = 'block';
        note.style.color = 'var(--ink)';
        note.style.background = 'var(--cream)';
        note.style.padding = '14px 18px';
        note.style.borderRadius = '4px';
        note.style.borderLeft = '4px solid var(--ochre)';
        note.style.marginTop = '16px';
      }
      projectForm.reset();
    });
  }

  // 3. Technical Errata / Code Correction Hotline Form
  const errataForm = document.querySelector('#errata-form');
  if (errataForm) {
    errataForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.querySelector('#errata-note');
      if (note) {
        note.innerHTML = `<strong>Correction noted!</strong> Thank you for helping keep HouseCraft guides strictly code-compliant. Our editorial review board audits all submissions every Friday.`;
        note.style.display = 'block';
        note.style.color = 'var(--ink)';
        note.style.background = 'var(--sage)';
        note.style.padding = '12px 16px';
        note.style.borderRadius = '4px';
        note.style.marginTop = '12px';
      }
      errataForm.reset();
    });
  }

  // 4. Interactive Cost Estimator (for cost-guides.html)
  const sqftInput = document.querySelector('#calc-sqft');
  const tierSelect = document.querySelector('#calc-tier');
  const scopeSelect = document.querySelector('#calc-scope');

  function updateCostEstimate() {
    if (!sqftInput || !tierSelect || !scopeSelect) return;
    const sqft = parseFloat(sqftInput.value) || 2000;
    const tierRate = parseFloat(tierSelect.value) || 275;
    const scopeFactor = parseFloat(scopeSelect.value) || 1.0;

    const total = Math.round(sqft * tierRate * scopeFactor);
    const materials = Math.round(total * 0.45);
    const labor = Math.round(total * 0.40);
    const contingency = Math.round(total * 0.15);

    // Calculate approximate duration in months
    let months = Math.max(3, Math.round((sqft / 300) * scopeFactor));

    const displayTotal = document.querySelector('#est-total');
    const displayMaterials = document.querySelector('#est-materials');
    const displayLabor = document.querySelector('#est-labor');
    const displayContingency = document.querySelector('#est-contingency');
    const displayTimeline = document.querySelector('#est-timeline');

    if (displayTotal) displayTotal.textContent = '$' + total.toLocaleString();
    if (displayMaterials) displayMaterials.textContent = '$' + materials.toLocaleString();
    if (displayLabor) displayLabor.textContent = '$' + labor.toLocaleString();
    if (displayContingency) displayContingency.textContent = '$' + contingency.toLocaleString();
    if (displayTimeline) displayTimeline.textContent = `${months} - ${months + 2} Months`;
  }

  if (sqftInput && tierSelect && scopeSelect) {
    sqftInput.addEventListener('input', updateCostEstimate);
    tierSelect.addEventListener('change', updateCostEstimate);
    scopeSelect.addEventListener('change', updateCostEstimate);
    updateCostEstimate();
  }

  // 5. Blueprint Plan Filter (for plans-projects.html)
  const filterButtons = document.querySelectorAll('.plan-filter-btn');
  const planCards = document.querySelectorAll('.plan-card');

  if (filterButtons.length && planCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter') || 'all';

        planCards.forEach((card) => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Interactive Moodboard Builder (for design-ideas.html)
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  if (swatchButtons.length) {
    swatchButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.swatch-group');
        if (!group) return;
        group.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const type = btn.getAttribute('data-type');
        const val = btn.getAttribute('data-val');
        const color = btn.getAttribute('data-color');

        if (type === 'wood') {
          const el = document.querySelector('#preview-wood');
          if (el) el.textContent = val;
        } else if (type === 'stone') {
          const el = document.querySelector('#preview-stone');
          if (el) el.textContent = val;
        } else if (type === 'metal') {
          const el = document.querySelector('#preview-metal');
          if (el) el.textContent = val;
        } else if (type === 'paint') {
          const el = document.querySelector('#preview-paint');
          const sample = document.querySelector('#preview-paint-sample');
          if (el) el.textContent = val;
          if (sample && color) sample.style.background = color;
        }
      });
    });
  }

  // 7. Interactive Final Inspection Punchlist Counter (for build-renovate.html)
  const punchlistChecks = document.querySelectorAll('.inspection-list input[type="checkbox"]');
  const punchlistCounter = document.querySelector('#punchlist-counter');
  if (punchlistChecks.length && punchlistCounter) {
    function updateCounter() {
      const checked = document.querySelectorAll('.inspection-list input[type="checkbox"]:checked').length;
      punchlistCounter.textContent = `${checked} of ${punchlistChecks.length} items verified`;
    }
    punchlistChecks.forEach((chk) => chk.addEventListener('change', updateCounter));
    updateCounter();
  }
});
