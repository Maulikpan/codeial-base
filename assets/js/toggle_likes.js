// Create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;

            // Use 'self' instead of 'this' in AJAX callbacks
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function (data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                if (data.data.deleted === true) {
                    likesCount -= 1;
                } else {
                    likesCount += 1;
                }
                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function (errData) {
                console.log('Error in completing the request');
            });
        });
    }
}

// Apply the ToggleLike class to all elements with the .toggle-like-button class
$('.toggle-like-button').each(function () {
    new ToggleLike(this);
});
