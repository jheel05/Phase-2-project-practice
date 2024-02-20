
  function submitComment() {
    const commentsTextarea = document.getElementById('comments');
    const commentText = commentsTextarea.value.trim();
    if (commentText !== '') {
      const commentTimestamp = new Date().getTime();
      const comment = {
        text: commentText,
        timestamp: commentTimestamp
      };
      saveComment(comment);
      renderComments();
      commentsTextarea.value = '';
    }
  }

  function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  function renderComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
      const li = document.createElement('li');
      li.classList.add('comment');
      li.textContent = comment.text;
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.textContent = 'X';
      deleteBtn.addEventListener('click', () => {
        deleteComment(comment.timestamp);
        renderComments();
      });
      li.appendChild(deleteBtn);
      const timestamp = document.createElement('div');
      timestamp.classList.add('timestamp');
      timestamp.textContent = getTimeAgo(comment.timestamp);
      li.appendChild(timestamp);
      commentList.appendChild(li);
    });
  }

  function deleteComment(timestamp) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(comment => comment.timestamp !== timestamp);
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  function getTimeAgo(timestamp) {
    const now = new Date().getTime();
    const difference = now - timestamp;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Posted a few seconds ago';
    }
  }

  window.onload = renderComments;


  function copyProductDescription() {
    var code = document.getElementById("code").textContent;

    navigator.clipboard.writeText(code)
        .then(() => {
            alert("Code copied to clipboard successfully!");
        })
        .catch((error) => {
            console.error("Failed to copy code to clipboard:", error);
            alert("Failed to copy copy to clipboard");
        });
}
