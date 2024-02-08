function handle_change_linkido(user_id) {
    var linkido = document.getElementById( 'show_linkido_percentage_' + user_id ).value;
    linkido = Number(linkido);
    console.log("linkido: " + linkido);
    if ( typeof linkido !== "number" ) return;

    document.getElementById( 'hidden_linkido_percentage_' + user_id ).value = linkido;
    console.log("hidden value: " + document.getElementById( 'hidden_linkido_percentage_' + user_id ).value);
}

