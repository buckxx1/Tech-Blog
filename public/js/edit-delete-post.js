//handle editing the post
async function editPostHandler(event) {
  event.preventDefault();
  //get the post title and the text
  const title = document.querySelector("#post-title").innerHTML;
  const body = document.querySelector("#post-body").innerHTML;
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(title, body);
  document.location.replace("/edit/" + post_id);
}

//handle deleting the post
async function deletePostHandler(event) {
  event.preventDefault();
  //make request to post route delete with the current post id in nav bar
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch("/api/posts/" + post_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //check if all good
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText); // find better way
  }
}

//edit post
document.querySelector("#edit-btn").addEventListener("click", editPostHandler);
//delete post
document
  .querySelector("#delete-btn")
  .addEventListener("click", deletePostHandler);
