$( "input" ).click(function() {
  $(this).blur(() => {
    $(this).addClass( "input-check" );
  });
});