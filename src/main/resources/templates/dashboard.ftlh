<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1>Employee Directory</h1>

  <div id="controls">
   <input type="text" id="search-input" placeholder="Search by name or email..." value="${(param.search)!}">


    <button id="filter-toggle-btn">Filter</button>
    <select id="sort-options">
      <option value="">Sort By</option>
      <option value="firstName">First Name</option>
      <option value="department">Department</option>
    </select>
    <button id="add-employee-btn">Add Employee</button>
  </div>

  <div id="filter-panel" class="hidden">
    <h3>Filters</h3>
    <label>Department: <input type="text" id="filter-department" placeholder="e.g., IT"></label>
    <label>Role: <input type="text" id="filter-role" placeholder="e.g., Manager"></label>
    <button id="apply-filter-btn">Apply Filters</button>
  </div>

  <div id="employee-list-container">
    <#if employees?? && employees?size gt 0>
      <#list employees as employee>
        <div class="employee-card" data-employee-id="${employee.id}">
          <h3>${employee.firstName} ${employee.lastName}</h3>
          <p>Email: ${employee.email}</p>
          <p>Department: ${employee.department}</p>
          <p>Role: ${employee.role}</p>
          <a href="/form?editId=${employee.id}">
            <button class="edit-btn" data-id="${employee.id}">Edit</button>
          </a>
          <button class="delete-btn" data-id="${employee.id}">Delete</button>
        </div>
      </#list>
    <#else>
      <p>No employees found.</p>
    </#if>
  </div>

  <div id="pagination-controls">
    <#if totalPages?? && totalPages gt 1>
      <#list 1..totalPages as p>
        <a href="/?page=${p}" class="${page == p?string('active', '')}">${p}</a>
      </#list>
    </#if>
  </div>

  <script>
  const mockEmployees = [
    <#list employees as emp>
    {
      id: "${emp.id}",
      firstName: "${emp.firstName}",
      lastName: "${emp.lastName}",
      email: "${emp.email}",
      department: "${emp.department}",
      role: "${emp.role}"
    }<#if emp_has_next>,</#if>
    </#list>
  ];
</script>


  <script src="/js/app.js"></script>

</body>
</html>
