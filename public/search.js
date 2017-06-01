//Sample process for creating a search function that can be later added to the app. Exploring doing this with vanilla js 

$(/search input element/).on("keyup", function() {
    var g = $(this).val().toLowerCase();
    $(/name of element being searched/).each(function() {
        var s = $(this).text().toLowerCase();
        $(this).closest(/container for items to be shown/)[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
    });
});​