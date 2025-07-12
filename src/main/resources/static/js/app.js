document.addEventListener('DOMContentLoaded', () => {
  let employees = [...mockEmployees];
  let filteredEmployees = [...employees];

  const listContainer = document.getElementById('employee-list-container');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-options');
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const filterPanel = document.getElementById('filter-panel');
  const applyFilterBtn = document.getElementById('apply-filter-btn');
  const addEmployeeBtn = document.getElementById('add-employee-btn');
  const departmentInput = document.getElementById('filter-department');
  const roleInput = document.getElementById('filter-role');

  function renderEmployees(list) {
    listContainer.innerHTML = '';

    if (list.length === 0) {
      listContainer.innerHTML = '<p>No employees found.</p>';
      return;
    }

    list.forEach(emp => {
      const div = document.createElement('div');
      div.className = 'employee-card';
      div.innerHTML = `
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <a href="/form?editId=${emp.id}">
          <button class="edit-btn" data-id="${emp.id}">Edit</button>
        </a>
        <button class="delete-btn" data-id="${emp.id}">Delete</button>
      `;
      listContainer.appendChild(div);
    });

    attachDeleteEvents();
  }

  function attachDeleteEvents() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm('Delete employee?')) {
          fetch(`/delete?id=${id}`, { method: 'POST' }).then(() => {
            employees = employees.filter(e => e.id !== id);
            applyFilters();
          });
        }
      });
    });
  }

  function applyFilters() {
    const dept = departmentInput.value.trim().toLowerCase();
    const role = roleInput.value.trim().toLowerCase();
    const search = searchInput.value.trim().toLowerCase();
    let result = [...employees];

    if (dept) result = result.filter(e => e.department.toLowerCase().includes(dept));
    if (role) result = result.filter(e => e.role.toLowerCase().includes(role));
    if (search) result = result.filter(e =>
      e.firstName.toLowerCase().includes(search) ||
      e.lastName.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search)
    );

    const sortBy = sortSelect.value;
    if (sortBy) {
      result.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    filteredEmployees = result;
    renderEmployees(filteredEmployees);
  }

  searchInput?.addEventListener('input', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);
  applyFilterBtn?.addEventListener('click', applyFilters);

  filterToggleBtn?.addEventListener('click', () => {
    filterPanel.classList.toggle('hidden');
  });

  addEmployeeBtn?.addEventListener('click', () => {
    window.location.href = '/form';
  });

  renderEmployees(filteredEmployees);
});
