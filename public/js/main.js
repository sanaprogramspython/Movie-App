document.querySelectorAll('.delete-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const confirmed = window.confirm('Delete this movie from your library?');
    if (!confirmed) event.preventDefault();
  });
});
