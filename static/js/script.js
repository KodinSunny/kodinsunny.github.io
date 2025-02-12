document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        var hoverSound = document.getElementById('hoverSound');
        hoverSound.play();
    });
});

document.querySelectorAll('.socialmediaico i').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        var hoverSound = document.getElementById('socialmediahoverSound');
        hoverSound.play();
    });
});
const playSound = () => {
    const hoverSound = document.getElementById('buttonclickSound');
    hoverSound.currentTime = 0; // Reset to start
    hoverSound.play();
};

document.querySelectorAll('.socialmediaico i, button').forEach(element => {
    element.addEventListener('click', playSound);
});

function toggleSidebar() {
    const sidebar = document.querySelector('.menu');
    sidebar.classList.toggle('active');
}

function tooglecomments() {
    const sidebar = document.querySelector('.comments');
    sidebar.classList.toggle('active');
}


var btn = $('check');

async function submitComment() {
    const content = document.getElementById('commentContent').value;
    const username = document.getElementById('username').value;

    if (!content || !username) {
        alert("Please enter both a username and a comment.");
        return;
    }

    try {
        const response = await fetch('http://localhost/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, content: content }),
        });

        if (response.ok) {
            fetchComments(); // Refresh comments after posting
            document.getElementById('commentContent').value = ''; // Clear the textarea
            document.getElementById('username').value = ''; // Clear the username
        } else {
            console.error("Error posting comment:", response.statusText);
        }
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
}

async function deleteComment(commentId) {
    try {
        const response = await fetch(`http://localhost/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchComments(); // Refresh comments after deletion
        } else {
            alert("Failed to delete comment.");
            console.error("Error deleting comment:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}

// Fetch comments on page load
window.onload = fetchComments;  

window.onload = function () {
    commentBox('my-project-id', {
        backgroundColor: '#000',  // Black background
        textColor: '#FFFFFF'  // White text color
    });
};

