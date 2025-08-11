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
