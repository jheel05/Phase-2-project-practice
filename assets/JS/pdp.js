const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

function submitComment() {
    const commentInput = document.getElementById('comments').value.trim();
    if (commentInput !== '') {
      const timestamp = new Date().toLocaleString();
      const comment = { text: commentInput, timestamp: timestamp };
      let comments = JSON.parse(localStorage.getItem('comments')) || [];
      comments.push(comment);
      localStorage.setItem('comments', JSON.stringify(comments));
      displayComments();
      document.getElementById('comments').value = '';
    }
  }

  function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.className = 'comment';
      commentItem.textContent = `${comment.text} - ${comment.timestamp}`;
      commentList.appendChild(commentItem);
    });
  }

  window.onload = displayComments;

  //timestamps code
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
    var productDescription = document.getElementById("productDescription").textContent;

    var tempInput = document.createElement("textarea");
    tempInput.value = productDescription;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    try {
        var successful = document.execCommand('copy');
      
        if (successful) {
          alert("Product description copied to clipboard successfully!");
        } else {
            throw new Error("Failed to copy product description to clipboard");
        }
    } catch (err) {
        
        alert("Failed to copy product description to clipboard");
    }

    document.body.removeChild(tempInput);
}