$(function(){
  function buildHTML(comment){
    let html =`<p>
                <strong>
                  <a href=/users/${comment.user_id}>${comment.user_name}</a>：
                </strong>
                ${comment.text}
              </p>`
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Comments__list').append(html);
      $('form')[0].reset();
      $('.Comments__list').animate({ scrollTop: $('.Comments__list')[0].scrollHeight});
      $('.textbox').val('');
      $('.button').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.button').prop("disabled", false);
    })
  })
});