document.addEventListener("DOMContentLoaded", function () {
  const commentInput = document.getElementById("commentInput");
  const submitCommentBtn = document.getElementById("submitComment");
  const commentSection = document.getElementById("commentSection");

  // Handle comment submission
  submitCommentBtn.addEventListener("click", function () {
    const commentText = commentInput.value.trim();

    if (commentText) {
      addComment(commentText);
      commentInput.value = ""; // Clear input after submitting
    } else {
      alert("Please enter a comment before submitting.");
    }
  });

  // Function to add a new comment
  function addComment(text) {
    const commentCard = document.createElement("div");
    commentCard.className = "card mb-2 p-2";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const commentTextElement = document.createElement("p");
    commentTextElement.className = "card-text";
    commentTextElement.textContent = text;

    const commentDate = document.createElement("small");
    commentDate.className = "text-muted mb-2";
    commentDate.textContent = "Posted on " + new Date().toISOString().split("T")[0];

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex gap-2 mt-2"; // Bootstrap classes for spacing

    // Create edit button
    const editButton = document.createElement("button");
    editButton.className = "btn btn-sm edit-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editComment(commentTextElement);
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      commentCard.remove();
    });

    /// Create save button
    const saveButton = document.createElement("button");
    saveButton.className = "btn btn-sm save-btn";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function () {
      // Save the comment in the DOM (already visible)

      // Show an alert that the comment is saved
      alert("Comment saved");
    });

    // Append buttons to container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(saveButton);

    // Append elements
    cardBody.appendChild(commentTextElement);
    cardBody.appendChild(commentDate);
    cardBody.appendChild(buttonContainer);
    commentCard.appendChild(cardBody);

    // Add the new comment to the comment section
    commentSection.prepend(commentCard);
  }

  // Function to edit a comment
  function editComment(commentTextElement) {
    const newText = prompt("Edit your comment:", commentTextElement.textContent);
    if (newText !== null && newText.trim() !== "") {
      commentTextElement.textContent = newText.trim();
    }
  }
});
