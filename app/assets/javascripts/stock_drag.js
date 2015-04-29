$(function(){
  var draggedFromStocks;

  $("#favorite-stocks").sortable({
    axis: "y"
  });

  $("#stock-list li").draggable({
    axis: "y",
    connectToSortable: "#favorite-stocks"
  });

  $( "#stock-list li" ).on( "dragstart", function( event, ui ) {
    draggedFromStocks = true;
  });

  $("#favorite-stocks").on( "sortreceive", function( event, ui ) {
    if(draggedFromStocks) {
      if($("#favorite-stocks").children().length == 6) {
        $("#favorite-stocks li").last().appendTo("#stock-list");
      }

      ids = $("#favorite-stocks li").map(function(i, element, arr) {
        return element.dataset.id
      }).toArray();

      $.ajax({
        url: "/favorites/update",
        method: "POST",
        data: { ids: ids},
        dataType: "json"
      });

      // Should return price history for favorite stocks
      $.ajax({
        url: "/favorites/price_history",
        method: "POST",
        data: {ids: ids},
      }).done(function(data){
        console.log(data)
      });

      // Should return quote data for favorite stocks
      $.ajax({
        url: "/favorites/quote_data",
        method: "POST",
        data: {ids: ids},
      }).done(function(data){
        console.log(data)
      });
    }

    draggedFromStocks = false;
  });
});