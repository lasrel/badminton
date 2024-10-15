const writeComment = (userName, userComment) => {
  const container = document.getElementById("comments");

  const comment = document.createElement("div");
  comment.className = "comment";
  const commentContent = /*html*/ `
    <div class="comment-name">${userName}</div>
    <div class="comment-content">${userComment}</div>
  `;
  comment.innerHTML = commentContent;
  container.append(comment);
};

const comment = (e) => {
  const userName = e[0].value;
  const userComment = e[1].value;
  if (!userName || !userComment) return console.error("no input");

  writeComment(userName, userComment);

  const storageComments = localStorage.getItem("user-comments");
  const comments = JSON.parse(storageComments);
  const newComment = { userName: userName, userComment: userComment };
  localStorage.setItem("user-comments", JSON.stringify(comments ? [...comments, newComment] : [newComment]));

  e[0].value = "";
  e[1].value = "";
};

onload = () => {
  const storageComments = localStorage.getItem("user-comments");
  const comments = JSON.parse(storageComments);
  console.log(comments);
  if (!comments) return console.info("no comments");

  comments.map(({ userName, userComment }) => writeComment(userName, userComment));
};
