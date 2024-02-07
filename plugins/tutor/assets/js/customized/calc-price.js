// (function($){
//     $( document ).ready( function() {
//         $( "#net_rate" ).on( 'input', function() {
//             var net_rate = $( "#net_rate" ).val();
//             net_rate = Number(net_rate);
//             if ( typeof net_rate !== "number" ) return;

//             var linkido_percentage = $( "#linkido_percentage" ).val();
//             linkido_percentage = Number(linkido_percentage);

//             var end_price = net_rate + net_rate * linkido_percentage / 100;
//             $( "#end_price" ).val( end_price );
//         });
//     });
// })(jQuery);

function handle_change_net_rate() {
    var net_rate = document.getElementById('net_rate').value;
    net_rate = Number(net_rate);
    if ( typeof net_rate !== "number" ) return;

    var linkido_percentage = document.getElementById('linkido_percentage').value;
    linkido_percentage = Number(linkido_percentage);

    var end_price = net_rate + net_rate * linkido_percentage / 100;
    document.getElementById('end_price').value = end_price;
}

window.addEventListener('load', function () {
    document.getElementById('net_rate').addEventListener("input", handle_change_net_rate);
});
  