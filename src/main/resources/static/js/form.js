document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('employee-form');
  const cancelBtn = document.getElementById('cancel-btn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const payload = {
      id: document.getElementById('employee-id').value.trim(),
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      department: document.getElementById('department').value.trim(),
      role: document.getElementById('role').value.trim()
    };

    const params = new URLSearchParams(payload);

    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = '/';
        } else {
          alert('Failed to save employee. Please try again.');
        }
      })
      .catch(err => {
        console.error('Error saving employee:', err);
        alert('An error occurred while saving.');
      });
  });
  
  cancelBtn?.addEventListener('click', () => {
    window.location.href = '/';
  });
});
