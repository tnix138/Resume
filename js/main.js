function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  if (isDark) {
    html.classList.remove('dark');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'حالت تاریک';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'حالت روشن';
    localStorage.setItem('theme', 'dark');
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'حالت روشن';
  }
}

function loadProjects() {
  fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
      const container = document.getElementById('project-list');
      projects.forEach(p => {
        const el = document.createElement('div');
        el.className = "project-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg";
        el.innerHTML = `
        <div class="flex items-center mb-3">
          <span class="text-2xl ml-3">${p.icon}</span>
          <h3 class="font-bold text-lg">${p.title}</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${p.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${p.tags.map(tag => `<span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">${tag}</span>`).join("")}
        </div>
        <a href="${p.demo}" onclick="showProjectDemo('${p.type}')" class="text-blue-500 hover:text-blue-600 text-sm font-medium">
          مشاهده دمو →
        </a>
        `;
        container.appendChild(el);
      });
    });
}

function loadSkills() {
  fetch('data/skills.json')
    .then(res => res.json())
    .then(skills => {
      const techContainer = document.getElementById('skills-technical');
      const designContainer = document.getElementById('skills-design');
      const networkContainer = document.getElementById('skills-network');

      const renderSkill = (container, skill) => {
        const el = document.createElement('div');
        el.innerHTML = `
          <div class="flex justify-between mb-1">
            <span class="text-sm">${skill.name}</span>
            <span class="text-sm">${skill.level}%</span>
          </div>
          <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="skill-bar" style="width: ${skill.level}%"></div>
          </div>
        `;
        container.appendChild(el);
      };

      skills.technical.forEach(skill => renderSkill(techContainer, skill));
      skills.design.forEach(skill => renderSkill(designContainer, skill));
      if (skills.network) {
        skills.network.forEach(skill => renderSkill(networkContainer, skill));
      }
    });
}

function showProjectDemo(projectType) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');

  if (projectType === '2fa') {
    title.textContent = 'سیستم مدیریت کاربران با 2FA';
    content.innerHTML = `
        <div class="space-y-4">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iI0U1RTdFQiIvPgo8dGV4dCB4PSIyMDAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCI+2YTZiNqv24zZhiDYs9uM2LPYqtmFPC90ZXh0Pgo8cmVjdCB4PSI4MCIgeT0iMTIwIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0iI0Y5RkFGQiIgc3Ryb2tlPSIjRDFENUREIi8+CjxyZWN0IHg9IjgwIiB5PSIxNzAiIHdpZHRoPSIyNDAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjRjlGQUZCIiBzdHJva2U9IiNEMUQ1REIiLz4KPHJlY3QgeD0iMTUwIiB5PSIyMjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjNEY0NkU1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMiI+2YjYsdmI2K88L3RleHQ+Cjwvc3ZnPgo=" alt="2FA Demo" class="w-full rounded-lg border" />
            <p class="text-sm text-gray-600 dark:text-gray-400">
                این سیستم شامل ویژگی‌های زیر است:
            </p>
            <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>✅ احراز هویت دو مرحله‌ای با Google Authenticator</li>
                <li>✅ مدیریت کاربران و نقش‌ها</li>
                <li>✅ لاگ فعالیت‌های کاربران</li>
                <li>✅ رمزنگاری پیشرفته</li>
                <li>✅ پنل مدیریت کامل</li>
            </ul>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm"><strong>تکنولوژی‌های استفاده شده:</strong></p>
                <p class="text-sm text-gray-600 dark:text-gray-400">PHP 8.1, MySQL, Bootstrap 5, Google Authenticator API</p>
            </div>
        </div>
    `;
  } else if (projectType === 'bot') {
    title.textContent = 'ربات مدیریت پروکسی تلگرام';
    content.innerHTML = `
        <div class="space-y-4">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjI5RUQ5Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIyMCIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTAwIiByPSIyMCIgZmlsbD0iIzIyOUVEOSIvPgo8dGV4dCB4PSIxNjAiIHk9IjkwIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+2LHYqNmI2Kog2YXYr9uM2LHbjNiqINm+2LHZiNqp2LPbjDwvdGV4dD4KPHR4dCB4PSIxNjAiIHk9IjExMCIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxMiI+2KLZhtin2K/ZhyDYqNix2KfbjCDYp9iz2KrZgdin2K/ZhzwvdGV4dD4KPHJlY3QgeD0iODAiIHk9IjE0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiByeD0iMTUiIGZpbGw9IiMyMjlFRDkiLz4KPHR4dCB4PSIxMjAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTAiPtmF2LTYp9mH2K/ZhzwvdGV4dD4KPHJlY3QgeD0iMTgwIiB5PSIxNDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIgcng9IjE1IiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjIyMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMCI+2K/YsdmK2KfZgdiqPC90ZXh0Pgo8cmVjdCB4PSIyODAiIHk9IjE0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMwIiByeD0iMTUiIGZpbGw9IiNFRjQ0NDQiLz4KPHR4dCB4PSIzMjAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTAiPtiq2YbYuNuM2YXYp9iqPC90ZXh0Pgo8L3N2Zz4K" alt="Bot Demo" class="w-full rounded-lg border" />
            <p class="text-sm text-gray-600 dark:text-gray-400">
                ربات هوشمند تلگرام با قابلیت‌های پیشرفته:
            </p>
            <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>🤖 مدیریت خودکار پروکسی‌ها</li>
                <li>📊 آمار و گزارش‌گیری دقیق</li>
                <li>💰 سیستم پرداخت یکپارچه</li>
                <li>🔄 به‌روزرسانی خودکار سرورها</li>
                <li>👥 پنل مدیریت کاربران</li>
                <li>📱 رابط کاربری ساده و کاربردی</li>
            </ul>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm"><strong>ویژگی‌های خاص:</strong></p>
                <p class="text-sm text-gray-600 dark:text-gray-400">پشتیبانی از پروتکل‌های مختلف، مانیتورینگ 24/7، بک‌آپ خودکار</p>
            </div>
        </div>
    `;
  }

  modal.classList.remove('hidden');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadProjects();
  loadSkills();
  const modal = document.getElementById('project-modal');
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
});

window.toggleDarkMode = toggleDarkMode;
window.showProjectDemo = showProjectDemo;
window.closeProjectModal = closeProjectModal;
