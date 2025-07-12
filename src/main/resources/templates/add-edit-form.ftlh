<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><#if (employee?? && employee.id??)>Edit<#else>Add</#if> Employee</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

  <h2><#if (employee?? && employee.id??)>Edit<#else>Add</#if> Employee</h2>

  <form id="employee-form" method="post" action="/save">
    <input type="hidden" name="id" id="employee-id" value="${(employee.id)!}" />

    <label>
      First Name:
      <input type="text" name="firstName" id="first-name" value="${(employee.firstName)!}" required />
    </label>
    <label>
      Last Name:
      <input type="text" name="lastName" id="last-name" value="${(employee.lastName)!}" required />
    </label>
    <label>
      Email:
      <input type="email" name="email" id="email" value="${(employee.email)!}" required />
    </label>
    <label>
      Department:
      <input type="text" name="department" id="department" value="${(employee.department)!}" required />
    </label>
    <label>
      Role:
      <input type="text" name="role" id="role" value="${(employee.role)!}" required />
    </label>

    <div class="form-actions">
      <button type="submit">Save</button>
      <button type="button" id="cancel-btn">Cancel</button>
    </div>
  </form>

  <script>
    document.getElementById('cancel-btn')?.addEventListener('click', () => {
      window.location.href = "/";
    });
  </script>
</body>
</html>
