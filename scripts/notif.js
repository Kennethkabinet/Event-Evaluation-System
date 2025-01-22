

function updateNotificationCount() {
    fetch('get_unread_count.php')
        .then(response => response.json())
        .then(data => {
            console.log('Notification Count:', data); // Debugging
            const notificationCountElement = document.querySelector('.notification-count');
            if (data.unread_count > 0) {
                notificationCountElement.textContent = data.unread_count;
                notificationCountElement.style.display = 'inline';
            } else {
                notificationCountElement.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching notification count:', error));
}


// Call the function periodically
setInterval(updateNotificationCount, 100);


function updateNotificationCount() {
    fetch('get_unread_count.php')
        .then(response => response.json())
        .then(data => {
            console.log('Notification Count:', data); // Debugging
            const notificationCountElement = document.querySelector('.notification-count');
            if (data.unread_count > 0) {
                notificationCountElement.textContent = data.unread_count;
                notificationCountElement.style.display = 'inline';
            } else {
                notificationCountElement.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching notification count:', error));
}


// Call the function periodically
setInterval(updateNotificationCount, 100);
