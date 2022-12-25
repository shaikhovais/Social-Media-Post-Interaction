const textarea = document.querySelector("#newComment");
const addCommentButton = document.querySelector("#addButton");
const commentBtn = document.querySelector(".comment-btn");
let totalLikesOnPost = document.querySelector(".totalLikes").innerText;

commentBtn.addEventListener("click", () => {
  textarea.focus();
});

let likesOnPost = parseInt(
  totalLikesOnPost.slice(0, 3) + totalLikesOnPost.slice(4, 7)
);

const likeBtn = document.querySelector(".like");
let liked = false;

likeBtn.addEventListener("click", () => {
  if (liked === true) {
    likesOnPost--;
    document.querySelector(".totalLikes").innerText = `${addCommasInNum(
      likesOnPost
    )} Likes`;
    likeBtn.style.backgroundColor = "#fff8ef";
    liked = false;
    return;
  }
  likesOnPost++;
  document.querySelector(".totalLikes").innerText = `${addCommasInNum(
    likesOnPost
  )} Likes`;
  likeBtn.style.backgroundColor = "#f0a53b";
  liked = true;
});

function addCommasInNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//comments are the main comment which we pass from 'add comment' button
//replies are the inner comment to the already passed comment which we pass from 'add reply' button

addCommentButton.addEventListener("click", (event) => {
  //if comment is not empty then only add it to comments section
  if (textarea.value !== "") {
    const container = document.querySelector(".comments-section");
    //Every time when we want to add a comment or reply to some other comment than we will pass the container(parent div), so that we
    // can append new comment or reply to that container. On line no 79 we are adding reply with it's parent container
    addComment(textarea.value, container);
    textarea.value = "";
  } else {
    textarea.placeholder = "Enter your comment !!!";
  }
});

function addComment(comment, container) {
  const newReply = document.createElement("div");
  newReply.classList.add("containerInner");
  newReply.innerHTML = `<p id="comment">${comment}</p>
                        <button class="reply-btn"  >Reply</button>
                        <button class="likeReply-btn" >Like</button>
                        <button class="delete-btn" >Delete</button>

                        <div class="replyContainer">
  
                        <!-- from here we can add replies and every time when we create a comment it will be hidden(check css .addReplyContainer) and we will make it visible when we click on add reply button. check line no 58 -->
                        <div class="addReplyContainer">   
                          <textarea name="replyText" id="newReply" cols="device-width" rows="1" ></textarea>
                          <button id ="addReplyButton">Add Reply</button>
                          <button id ="clearReplyButton">Clear</button>
                        </div> 

                        <!-- in this div or container we will add replies on this comment -->
                        <div class="innerReplyContainer"></div>`;

  let replyButton = newReply.getElementsByTagName("button")[0];
  let likeButton = newReply.getElementsByTagName("button")[1];
  let deleteButton = newReply.getElementsByTagName("button")[2];

  likeButton.addEventListener("click", () => {
    let like = likeButton.innerText.toString();
    if (like === "Dislike") {
      likeButton.innerHTML = `Like`;
      likeButton.style.backgroundColor = "white";
      likeButton.style.color = "#e29b38";
      return;
    }
    //getting last value from like button for 'e.g Likes "4"' and then add 1 to it and put it back
    likeButton.innerHTML = `Dislike`;
    likeButton.style.backgroundColor = "#e29b38";
    likeButton.style.color = "white";
  });

  deleteButton.addEventListener("click", (event) => {
    //'event' tells us everything about that click or event. Do console.log(event) on next line to see it. This will solve the problem of how to access parent element.
    let parentComment = event.path[1];
    parentComment.style.display = "none";
  });

  replyButton.addEventListener("click", (event) => {
    let replyContainer = event.path[1].children[4];
    let addReplyContainer = replyContainer.getElementsByTagName("div")[0];
    addReplyContainer.style.display = "flex"; //making the addReplyContainer visible

    let addReplyButton = replyContainer.getElementsByTagName("button")[0];
    addReplyButton.addEventListener("click", () => {
      let replyText = replyContainer.getElementsByTagName("textarea")[0];
      if (replyText.value != "") {
        //here innerReplyContainer is the parent container on which we will append our new reply
        let innerReplyContainer = replyContainer.getElementsByTagName("div")[1];
        addComment(replyText.value, innerReplyContainer);

        let addReplyContainer = replyContainer.getElementsByTagName("div")[0];
        //hide the addReplyContainer after adding reply and also erase textvalue
        replyText.value = "";
        addReplyContainer.style.display = "none";
      } else {
        replyText.placeholder = "Enter your reply !!!";
      }
    });

    let clearReplyButton = replyContainer.getElementsByTagName("button")[1];
    clearReplyButton.addEventListener("click", () => {
      //hide the addReplyContainer and also erase textvalue
      let addReplyContainer = replyContainer.getElementsByTagName("div")[0];
      replyContainer.getElementsByTagName("textarea")[0].value = "";
      addReplyContainer.style.display = "none";
    });

    addReplyContainer.children[0].focus();
  });

  //appending our comment or reply to it's container
  container.append(newReply);
}
